import asyncHandler from 'express-async-handler';
import Page from '../../public/models/pageModel.js';
import Category from '../../public/models/categoryModel.js';
import Subcategory from '../../public/models/subcategoryModel.js';

// ========================================
// ADMIN PAGE MANAGEMENT
// ========================================

/**
 * @desc    Get all pages (with optional filters)
 * @route   GET /api/v1/admin/pages
 * @access  Admin
 * @query   ?pageType=category&isActive=true
 */
export const getAllPages = asyncHandler(async (req, res) => {
    const query = {};

    // Filter by page type
    if (req.query.pageType) {
        query.pageType = req.query.pageType;
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === 'true';
    }

    // Filter by category
    if (req.query.categoryId) {
        query.categoryId = req.query.categoryId;
    }

    const pages = await Page.find(query)
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug')
        .populate('filterIds', 'name slug filterType')
        .sort({ fullPath: 1 });

    res.json({
        success: true,
        count: pages.length,
        data: pages
    });
});

/**
 * @desc    Get page by path (for frontend routing)
 * @route   GET /api/v1/pages/path
 * @access  Public
 * @query   ?path=/wedding-rings/women/platinum
 */
export const getPageByPath = asyncHandler(async (req, res) => {
    const { path } = req.query;

    if (!path) {
        res.status(400);
        throw new Error('Path query parameter is required');
    }

    const page = await Page.findByPath(path);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    // Populate relationships
    await page.populate([
        { path: 'categoryId', select: 'name slug' },
        { path: 'subcategoryId', select: 'name slug' },
        { path: 'filterIds', select: 'name slug filterType' }
    ]);

    // Get products for this page
    const products = await page.getProducts();

    // Increment view count (don't await to avoid slowing down response)
    page.incrementViews().catch(err => console.error('Error incrementing views:', err));

    res.json({
        success: true,
        data: {
            ...page.toObject(),
            products
        }
    });
});

/**
 * @desc    Get page by ID
 * @route   GET /api/v1/admin/pages/:id
 * @access  Admin
 */
export const getPageById = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id)
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug')
        .populate('filterIds', 'name slug filterType');

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    res.json({
        success: true,
        data: page
    });
});

/**
 * @desc    Create new page
 * @route   POST /api/v1/admin/pages
 * @access  Admin
 * @body    { pageType, title, slug, fullPath, content, productQuery, seo, etc. }
 */
export const createPage = asyncHandler(async (req, res) => {
    // Validate required fields
    if (!req.body.pageType) {
        res.status(400);
        throw new Error('Page type is required');
    }

    if (!req.body.title) {
        res.status(400);
        throw new Error('Page title is required');
    }

    // Check if page with same fullPath exists
    if (req.body.fullPath) {
        const existingPage = await Page.findOne({ fullPath: req.body.fullPath });
        if (existingPage) {
            res.status(400);
            throw new Error('Page with this path already exists');
        }
    }

    // Verify category exists if provided
    if (req.body.categoryId) {
        const category = await Category.findById(req.body.categoryId);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }
    }

    // Verify subcategory exists if provided
    if (req.body.subcategoryId) {
        const subcategory = await Subcategory.findById(req.body.subcategoryId);
        if (!subcategory) {
            res.status(404);
            throw new Error('Subcategory not found');
        }
    }

    // Create page
    const page = await Page.create(req.body);

    // Populate relationships
    await page.populate([
        { path: 'categoryId', select: 'name slug' },
        { path: 'subcategoryId', select: 'name slug' },
        { path: 'filterIds', select: 'name slug filterType' }
    ]);

    res.status(201).json({
        success: true,
        message: 'Page created successfully',
        data: page
    });
});

/**
 * @desc    Update page
 * @route   PUT /api/v1/admin/pages/:id
 * @access  Admin
 */
export const updatePage = asyncHandler(async (req, res) => {
    let page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    // Check if changing fullPath to one that already exists
    if (req.body.fullPath && req.body.fullPath !== page.fullPath) {
        const existingPage = await Page.findOne({
            fullPath: req.body.fullPath,
            _id: { $ne: req.params.id }
        });

        if (existingPage) {
            res.status(400);
            throw new Error('Page with this path already exists');
        }
    }

    // Verify category exists if changing
    if (req.body.categoryId && req.body.categoryId !== page.categoryId?.toString()) {
        const category = await Category.findById(req.body.categoryId);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }
    }

    // Verify subcategory exists if changing
    if (req.body.subcategoryId && req.body.subcategoryId !== page.subcategoryId?.toString()) {
        const subcategory = await Subcategory.findById(req.body.subcategoryId);
        if (!subcategory) {
            res.status(404);
            throw new Error('Subcategory not found');
        }
    }

    // Update page
    page = await Page.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    ).populate([
        { path: 'categoryId', select: 'name slug' },
        { path: 'subcategoryId', select: 'name slug' },
        { path: 'filterIds', select: 'name slug filterType' }
    ]);

    res.json({
        success: true,
        message: 'Page updated successfully',
        data: page
    });
});

/**
 * @desc    Update page content
 * @route   PUT /api/v1/admin/pages/:id/content
 * @access  Admin
 */
export const updatePageContent = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    // Update content section
    page.content = {
        ...page.content,
        ...req.body
    };

    await page.save();

    res.json({
        success: true,
        message: 'Page content updated successfully',
        data: page.content
    });
});

/**
 * @desc    Update page product query
 * @route   PUT /api/v1/admin/pages/:id/product-query
 * @access  Admin
 */
export const updatePageProductQuery = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    // Update product query
    page.productQuery = {
        ...page.productQuery,
        ...req.body
    };

    await page.save();

    res.json({
        success: true,
        message: 'Product query updated successfully',
        data: page.productQuery
    });
});

/**
 * @desc    Update page SEO
 * @route   PUT /api/v1/admin/pages/:id/seo
 * @access  Admin
 */
export const updatePageSEO = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    // Update SEO section
    page.seo = {
        ...page.seo,
        ...req.body
    };

    await page.save();

    res.json({
        success: true,
        message: 'SEO updated successfully',
        data: page.seo
    });
});

/**
 * @desc    Delete page
 * @route   DELETE /api/v1/admin/pages/:id
 * @access  Admin
 */
export const deletePage = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    await page.deleteOne();

    res.json({
        success: true,
        message: 'Page deleted successfully'
    });
});

/**
 * @desc    Toggle page active status
 * @route   PATCH /api/v1/admin/pages/:id/toggle-active
 * @access  Admin
 */
export const togglePageActive = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    page.isActive = !page.isActive;
    await page.save();

    res.json({
        success: true,
        message: `Page ${page.isActive ? 'activated' : 'deactivated'} successfully`,
        data: { isActive: page.isActive }
    });
});

/**
 * @desc    Get page analytics
 * @route   GET /api/v1/admin/pages/:id/analytics
 * @access  Admin
 */
export const getPageAnalytics = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
        res.status(404);
        throw new Error('Page not found');
    }

    res.json({
        success: true,
        data: page.analytics
    });
});

/**
 * @desc    Bulk create pages (for seeding)
 * @route   POST /api/v1/admin/pages/bulk
 * @access  Admin
 * @body    { pages: [{ pageType, title, fullPath, ... }] }
 */
export const bulkCreatePages = asyncHandler(async (req, res) => {
    const { pages } = req.body;

    if (!pages || !Array.isArray(pages)) {
        res.status(400);
        throw new Error('Pages array is required');
    }

    // Validate each page
    for (const page of pages) {
        if (!page.pageType || !page.title) {
            res.status(400);
            throw new Error('Each page must have pageType and title');
        }
    }

    // Create pages
    const createdPages = await Page.insertMany(pages);

    res.status(201).json({
        success: true,
        message: `${createdPages.length} pages created successfully`,
        count: createdPages.length,
        data: createdPages
    });
});

/**
 * @desc    Get page statistics (for dashboard)
 * @route   GET /api/v1/admin/pages/stats
 * @access  Admin
 */
export const getPageStats = asyncHandler(async (req, res) => {
    // Get counts by page type
    const stats = await Page.aggregate([
        {
            $group: {
                _id: '$pageType',
                total: { $sum: 1 },
                active: {
                    $sum: { $cond: ['$isActive', 1, 0] }
                },
                totalViews: { $sum: '$analytics.viewCount' }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    // Get total counts
    const totalPages = await Page.countDocuments();
    const activePages = await Page.countDocuments({ isActive: true });

    // Get most viewed pages
    const mostViewed = await Page.find({ isActive: true })
        .select('title fullPath analytics.viewCount')
        .sort({ 'analytics.viewCount': -1 })
        .limit(10);

    res.json({
        success: true,
        data: {
            total: totalPages,
            active: activePages,
            byType: stats,
            mostViewed
        }
    });
});

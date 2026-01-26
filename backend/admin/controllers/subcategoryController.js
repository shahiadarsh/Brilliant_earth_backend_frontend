import asyncHandler from 'express-async-handler';
import Subcategory from '../../public/models/subcategoryModel.js';
import Category from '../../public/models/categoryModel.js';

// ========================================
// ADMIN SUBCATEGORY MANAGEMENT
// ========================================

/**
 * @desc    Get all subcategories (with optional filters)
 * @route   GET /api/v1/admin/subcategories
 * @access  Admin
 * @query   ?categoryId=xxx&isActive=true
 */
export const getAllSubcategories = asyncHandler(async (req, res) => {
    const query = {};

    // Filter by category
    if (req.query.categoryId) {
        query.categoryId = req.query.categoryId;
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === 'true';
    }

    // Filter by featured status
    if (req.query.isFeatured !== undefined) {
        query.isFeatured = req.query.isFeatured === 'true';
    }

    const subcategories = await Subcategory.find(query)
        .populate('categoryId', 'name slug')
        .sort({ displayOrder: 1, name: 1 });

    res.json({
        success: true,
        count: subcategories.length,
        data: subcategories
    });
});

/**
 * @desc    Get subcategories by category slug (for frontend)
 * @route   GET /api/v1/subcategories/category/:categorySlug
 * @access  Public
 */
export const getSubcategoriesByCategory = asyncHandler(async (req, res) => {
    // Find category first
    const category = await Category.findOne({
        slug: req.params.categorySlug,
        isActive: true
    });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Get subcategories
    const subcategories = await Subcategory.find({
        categoryId: category._id,
        isActive: true
    })
        .select('name slug title description bannerImage displayOrder isFeatured')
        .sort({ displayOrder: 1 });

    res.json({
        success: true,
        category: {
            name: category.name,
            slug: category.slug
        },
        count: subcategories.length,
        data: subcategories
    });
});

/**
 * @desc    Get subcategory by ID
 * @route   GET /api/v1/admin/subcategories/:id
 * @access  Admin
 */
export const getSubcategoryById = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id)
        .populate('categoryId', 'name slug');

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // Get breadcrumbs
    const breadcrumbs = await subcategory.getBreadcrumbs();

    // Get products count
    const Ring = (await import('../../public/models/ringModel.js')).default;
    const productsCount = await Ring.countDocuments({
        subcategory: subcategory._id,
        isActive: true
    });

    res.json({
        success: true,
        data: {
            ...subcategory.toObject(),
            breadcrumbs,
            productsCount
        }
    });
});

/**
 * @desc    Get subcategory by slug
 * @route   GET /api/v1/subcategories/slug/:slug
 * @access  Public
 */
export const getSubcategoryBySlug = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findOne({
        slug: req.params.slug,
        isActive: true
    })
        .populate('categoryId', 'name slug');

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    res.json({
        success: true,
        data: subcategory
    });
});

/**
 * @desc    Create new subcategory
 * @route   POST /api/v1/admin/subcategories
 * @access  Admin
 * @body    { name, categoryId, description, availableFilters, seo, etc. }
 */
export const createSubcategory = asyncHandler(async (req, res) => {
    // Validate required fields
    if (!req.body.name) {
        res.status(400);
        throw new Error('Subcategory name is required');
    }

    if (!req.body.categoryId) {
        res.status(400);
        throw new Error('Category ID is required');
    }

    // Verify category exists
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Check if subcategory with same name exists in this category
    const existingSubcategory = await Subcategory.findOne({
        name: req.body.name,
        categoryId: req.body.categoryId
    });

    if (existingSubcategory) {
        res.status(400);
        throw new Error('Subcategory with this name already exists in this category');
    }

    // Create subcategory
    const subcategory = await Subcategory.create(req.body);

    // Populate category info
    await subcategory.populate('categoryId', 'name slug');

    res.status(201).json({
        success: true,
        message: 'Subcategory created successfully',
        data: subcategory
    });
});

/**
 * @desc    Update subcategory
 * @route   PUT /api/v1/admin/subcategories/:id
 * @access  Admin
 */
export const updateSubcategory = asyncHandler(async (req, res) => {
    let subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // If changing category, verify new category exists
    if (req.body.categoryId && req.body.categoryId !== subcategory.categoryId.toString()) {
        const category = await Category.findById(req.body.categoryId);
        if (!category) {
            res.status(404);
            throw new Error('New category not found');
        }
    }

    // Update subcategory
    subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    ).populate('categoryId', 'name slug');

    res.json({
        success: true,
        message: 'Subcategory updated successfully',
        data: subcategory
    });
});

/**
 * @desc    Update subcategory available filters
 * @route   PUT /api/v1/admin/subcategories/:id/filters
 * @access  Admin
 */
export const updateSubcategoryFilters = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // Update available filters
    subcategory.availableFilters = {
        ...subcategory.availableFilters,
        ...req.body
    };

    await subcategory.save();

    res.json({
        success: true,
        message: 'Filters updated successfully',
        data: subcategory.availableFilters
    });
});

/**
 * @desc    Update subcategory SEO
 * @route   PUT /api/v1/admin/subcategories/:id/seo
 * @access  Admin
 */
export const updateSubcategorySEO = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // Update SEO section
    subcategory.seo = {
        ...subcategory.seo,
        ...req.body
    };

    await subcategory.save();

    res.json({
        success: true,
        message: 'SEO updated successfully',
        data: subcategory.seo
    });
});

/**
 * @desc    Delete subcategory
 * @route   DELETE /api/v1/admin/subcategories/:id
 * @access  Admin
 */
export const deleteSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // Check if subcategory has products
    const Ring = (await import('../../public/models/ringModel.js')).default;
    const productsCount = await Ring.countDocuments({
        subcategory: subcategory._id
    });

    if (productsCount > 0) {
        res.status(400);
        throw new Error(
            `Cannot delete subcategory with ${productsCount} products. ` +
            'Please delete or reassign products first.'
        );
    }

    await subcategory.deleteOne();

    res.json({
        success: true,
        message: 'Subcategory deleted successfully'
    });
});

/**
 * @desc    Reorder subcategories (drag & drop)
 * @route   PUT /api/v1/admin/subcategories/reorder
 * @access  Admin
 * @body    { subcategories: [{ id, displayOrder }] }
 */
export const reorderSubcategories = asyncHandler(async (req, res) => {
    const { subcategories } = req.body;

    if (!subcategories || !Array.isArray(subcategories)) {
        res.status(400);
        throw new Error('Subcategories array is required');
    }

    // Update display order for each subcategory
    const updatePromises = subcategories.map(({ id, displayOrder }) =>
        Subcategory.findByIdAndUpdate(id, { displayOrder })
    );

    await Promise.all(updatePromises);

    res.json({
        success: true,
        message: 'Subcategories reordered successfully'
    });
});

/**
 * @desc    Toggle subcategory active status
 * @route   PATCH /api/v1/admin/subcategories/:id/toggle-active
 * @access  Admin
 */
export const toggleSubcategoryActive = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    subcategory.isActive = !subcategory.isActive;
    await subcategory.save();

    res.json({
        success: true,
        message: `Subcategory ${subcategory.isActive ? 'activated' : 'deactivated'} successfully`,
        data: { isActive: subcategory.isActive }
    });
});

/**
 * @desc    Toggle subcategory featured status
 * @route   PATCH /api/v1/admin/subcategories/:id/toggle-featured
 * @access  Admin
 */
export const toggleSubcategoryFeatured = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    subcategory.isFeatured = !subcategory.isFeatured;
    await subcategory.save();

    res.json({
        success: true,
        message: `Subcategory ${subcategory.isFeatured ? 'featured' : 'unfeatured'} successfully`,
        data: { isFeatured: subcategory.isFeatured }
    });
});

/**
 * @desc    Get subcategory analytics
 * @route   GET /api/v1/admin/subcategories/:id/analytics
 * @access  Admin
 */
export const getSubcategoryAnalytics = asyncHandler(async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404);
        throw new Error('Subcategory not found');
    }

    // Get products count
    const Ring = (await import('../../public/models/ringModel.js')).default;
    const productsCount = await Ring.countDocuments({
        subcategory: subcategory._id,
        isActive: true
    });

    // Update product count in analytics
    subcategory.analytics.productCount = productsCount;
    await subcategory.save();

    res.json({
        success: true,
        data: subcategory.analytics
    });
});

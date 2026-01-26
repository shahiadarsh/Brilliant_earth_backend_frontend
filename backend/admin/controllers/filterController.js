import asyncHandler from 'express-async-handler';
import Filter from '../../public/models/filterModel.js';

// ========================================
// ADMIN FILTER MANAGEMENT
// ========================================

/**
 * @desc    Get all filters (with optional filters)
 * @route   GET /api/v1/admin/filters
 * @access  Admin
 * @query   ?filterType=metal&isActive=true
 */
export const getAllFilters = asyncHandler(async (req, res) => {
    const query = {};

    // Filter by type
    if (req.query.filterType) {
        query.filterType = req.query.filterType;
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === 'true';
    }

    // Filter by popular status
    if (req.query.isPopular !== undefined) {
        query.isPopular = req.query.isPopular === 'true';
    }

    const filters = await Filter.find(query)
        .sort({ filterType: 1, displayOrder: 1, name: 1 });

    res.json({
        success: true,
        count: filters.length,
        data: filters
    });
});

/**
 * @desc    Get filters grouped by type (for frontend)
 * @route   GET /api/v1/filters/grouped
 * @access  Public
 * @query   ?category=engagement-rings
 */
export const getFiltersGrouped = asyncHandler(async (req, res) => {
    const categorySlug = req.query.category;

    // Get all active filters grouped by type
    const grouped = await Filter.getAllGrouped(categorySlug);

    res.json({
        success: true,
        data: grouped
    });
});

/**
 * @desc    Get filters by type
 * @route   GET /api/v1/filters/type/:filterType
 * @access  Public
 * @query   ?category=engagement-rings
 */
export const getFiltersByType = asyncHandler(async (req, res) => {
    const { filterType } = req.params;
    const categorySlug = req.query.category;

    // Validate filter type
    const validTypes = ['metal', 'shape', 'stone', 'style', 'color', 'setting', 'band-width', 'prong-style'];
    if (!validTypes.includes(filterType)) {
        res.status(400);
        throw new Error(`Invalid filter type. Must be one of: ${validTypes.join(', ')}`);
    }

    const filters = await Filter.getByType(filterType, categorySlug);

    res.json({
        success: true,
        filterType,
        count: filters.length,
        data: filters
    });
});

/**
 * @desc    Get filter by ID
 * @route   GET /api/v1/admin/filters/:id
 * @access  Admin
 */
export const getFilterById = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    res.json({
        success: true,
        data: filter
    });
});

/**
 * @desc    Get filter by slug
 * @route   GET /api/v1/filters/slug/:slug
 * @access  Public
 */
export const getFilterBySlug = asyncHandler(async (req, res) => {
    const filter = await Filter.findOne({
        slug: req.params.slug,
        isActive: true
    });

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    res.json({
        success: true,
        data: filter
    });
});

/**
 * @desc    Create new filter
 * @route   POST /api/v1/admin/filters
 * @access  Admin
 * @body    { filterType, name, slug, icon, colorCode, applicableCategories, etc. }
 */
export const createFilter = asyncHandler(async (req, res) => {
    // Validate required fields
    if (!req.body.filterType) {
        res.status(400);
        throw new Error('Filter type is required');
    }

    if (!req.body.name) {
        res.status(400);
        throw new Error('Filter name is required');
    }

    // Check if filter with same name and type exists
    const existingFilter = await Filter.findOne({
        name: req.body.name,
        filterType: req.body.filterType
    });

    if (existingFilter) {
        res.status(400);
        throw new Error('Filter with this name and type already exists');
    }

    // Create filter
    const filter = await Filter.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Filter created successfully',
        data: filter
    });
});

/**
 * @desc    Update filter
 * @route   PUT /api/v1/admin/filters/:id
 * @access  Admin
 */
export const updateFilter = asyncHandler(async (req, res) => {
    let filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    // Update filter
    filter = await Filter.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        message: 'Filter updated successfully',
        data: filter
    });
});

/**
 * @desc    Update filter SEO
 * @route   PUT /api/v1/admin/filters/:id/seo
 * @access  Admin
 */
export const updateFilterSEO = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    // Update SEO section
    filter.seo = {
        ...filter.seo,
        ...req.body
    };

    await filter.save();

    res.json({
        success: true,
        message: 'SEO updated successfully',
        data: filter.seo
    });
});

/**
 * @desc    Delete filter
 * @route   DELETE /api/v1/admin/filters/:id
 * @access  Admin
 */
export const deleteFilter = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    // Check if filter is being used by products
    // This is a simplified check - you might want to check across all product types
    const Ring = (await import('../../public/models/ringModel.js')).default;

    let productsCount = 0;

    if (filter.filterType === 'metal') {
        productsCount = await Ring.countDocuments({
            'attributes.metals': filter.name
        });
    } else if (filter.filterType === 'shape') {
        productsCount = await Ring.countDocuments({
            'attributes.shape': filter.name
        });
    } else if (filter.filterType === 'style') {
        productsCount = await Ring.countDocuments({
            'attributes.style': filter.name
        });
    } else if (filter.filterType === 'stone') {
        productsCount = await Ring.countDocuments({
            'attributes.stoneType': filter.name
        });
    }

    if (productsCount > 0) {
        res.status(400);
        throw new Error(
            `Cannot delete filter being used by ${productsCount} products. ` +
            'Please update products first.'
        );
    }

    await filter.deleteOne();

    res.json({
        success: true,
        message: 'Filter deleted successfully'
    });
});

/**
 * @desc    Reorder filters (drag & drop)
 * @route   PUT /api/v1/admin/filters/reorder
 * @access  Admin
 * @body    { filters: [{ id, displayOrder }] }
 */
export const reorderFilters = asyncHandler(async (req, res) => {
    const { filters } = req.body;

    if (!filters || !Array.isArray(filters)) {
        res.status(400);
        throw new Error('Filters array is required');
    }

    // Update display order for each filter
    const updatePromises = filters.map(({ id, displayOrder }) =>
        Filter.findByIdAndUpdate(id, { displayOrder })
    );

    await Promise.all(updatePromises);

    res.json({
        success: true,
        message: 'Filters reordered successfully'
    });
});

/**
 * @desc    Toggle filter active status
 * @route   PATCH /api/v1/admin/filters/:id/toggle-active
 * @access  Admin
 */
export const toggleFilterActive = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    filter.isActive = !filter.isActive;
    await filter.save();

    res.json({
        success: true,
        message: `Filter ${filter.isActive ? 'activated' : 'deactivated'} successfully`,
        data: { isActive: filter.isActive }
    });
});

/**
 * @desc    Toggle filter popular status
 * @route   PATCH /api/v1/admin/filters/:id/toggle-popular
 * @access  Admin
 */
export const toggleFilterPopular = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    filter.isPopular = !filter.isPopular;
    await filter.save();

    res.json({
        success: true,
        message: `Filter ${filter.isPopular ? 'marked as popular' : 'unmarked as popular'} successfully`,
        data: { isPopular: filter.isPopular }
    });
});

/**
 * @desc    Bulk create filters
 * @route   POST /api/v1/admin/filters/bulk
 * @access  Admin
 * @body    { filters: [{ filterType, name, ... }] }
 */
export const bulkCreateFilters = asyncHandler(async (req, res) => {
    const { filters } = req.body;

    if (!filters || !Array.isArray(filters)) {
        res.status(400);
        throw new Error('Filters array is required');
    }

    // Validate each filter
    for (const filter of filters) {
        if (!filter.filterType || !filter.name) {
            res.status(400);
            throw new Error('Each filter must have filterType and name');
        }
    }

    // Create filters
    const createdFilters = await Filter.insertMany(filters);

    res.status(201).json({
        success: true,
        message: `${createdFilters.length} filters created successfully`,
        count: createdFilters.length,
        data: createdFilters
    });
});

/**
 * @desc    Get filter analytics
 * @route   GET /api/v1/admin/filters/:id/analytics
 * @access  Admin
 */
export const getFilterAnalytics = asyncHandler(async (req, res) => {
    const filter = await Filter.findById(req.params.id);

    if (!filter) {
        res.status(404);
        throw new Error('Filter not found');
    }

    // Get usage count from products
    const Ring = (await import('../../public/models/ringModel.js')).default;

    let usageCount = 0;

    if (filter.filterType === 'metal') {
        usageCount = await Ring.countDocuments({
            'attributes.metals': filter.name,
            isActive: true
        });
    } else if (filter.filterType === 'shape') {
        usageCount = await Ring.countDocuments({
            'attributes.shape': filter.name,
            isActive: true
        });
    } else if (filter.filterType === 'style') {
        usageCount = await Ring.countDocuments({
            'attributes.style': filter.name,
            isActive: true
        });
    } else if (filter.filterType === 'stone') {
        usageCount = await Ring.countDocuments({
            'attributes.stoneType': filter.name,
            isActive: true
        });
    }

    // Update usage count
    filter.analytics.usageCount = usageCount;
    await filter.save();

    res.json({
        success: true,
        data: filter.analytics
    });
});

/**
 * @desc    Get filter statistics (for dashboard)
 * @route   GET /api/v1/admin/filters/stats
 * @access  Admin
 */
export const getFilterStats = asyncHandler(async (req, res) => {
    // Get counts by filter type
    const stats = await Filter.aggregate([
        {
            $group: {
                _id: '$filterType',
                total: { $sum: 1 },
                active: {
                    $sum: { $cond: ['$isActive', 1, 0] }
                },
                popular: {
                    $sum: { $cond: ['$isPopular', 1, 0] }
                }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    // Get total counts
    const totalFilters = await Filter.countDocuments();
    const activeFilters = await Filter.countDocuments({ isActive: true });
    const popularFilters = await Filter.countDocuments({ isPopular: true });

    res.json({
        success: true,
        data: {
            total: totalFilters,
            active: activeFilters,
            popular: popularFilters,
            byType: stats
        }
    });
});

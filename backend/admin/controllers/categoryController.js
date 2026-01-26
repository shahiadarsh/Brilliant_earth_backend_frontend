import asyncHandler from 'express-async-handler';
import Category from '../../public/models/categoryModel.js';
import Subcategory from '../../public/models/subcategoryModel.js';

// ========================================
// ADMIN CATEGORY MANAGEMENT
// ========================================

/**
 * @desc    Get all categories (with optional filters)
 * @route   GET /api/v1/admin/categories
 * @access  Admin
 * @query   ?level=0&isActive=true&parent=null
 */
export const getAllCategories = asyncHandler(async (req, res) => {
    // Build query from request parameters
    const query = {};

    // Filter by level (0 = main categories, 1 = subcategories)
    if (req.query.level !== undefined) {
        query.level = parseInt(req.query.level);
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === 'true';
    }

    // Filter by parent (null = root categories)
    if (req.query.parent !== undefined) {
        query.parent = req.query.parent === 'null' ? null : req.query.parent;
    }

    // Filter by main category flag
    if (req.query.isMainCategory !== undefined) {
        query.isMainCategory = req.query.isMainCategory === 'true';
    }

    // Execute query with population
    const categories = await Category.find(query)
        .populate('parent', 'name slug')
        .sort({ displayOrder: 1, name: 1 });

    // Get subcategories count for each category
    const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
            const subcategoriesCount = await Category.countDocuments({
                parent: category._id
            });

            return {
                ...category.toObject(),
                subcategoriesCount
            };
        })
    );

    res.json({
        success: true,
        count: categoriesWithCount.length,
        data: categoriesWithCount
    });
});

/**
 * @desc    Get main categories (for header navigation)
 * @route   GET /api/v1/admin/categories/main
 * @access  Public
 */
export const getMainCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({
        isMainCategory: true,
        isActive: true,
        level: 0
    })
        .select('name slug icon displayOrder menuGroup')
        .sort({ displayOrder: 1 });

    res.json({
        success: true,
        count: categories.length,
        data: categories
    });
});

/**
 * @desc    Get category by ID with full details
 * @route   GET /api/v1/admin/categories/:id
 * @access  Admin
 */
export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
        .populate('parent', 'name slug');

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Get subcategories
    const subcategories = await Category.find({ parent: category._id })
        .select('name slug displayOrder isActive')
        .sort({ displayOrder: 1 });

    // Get breadcrumbs
    const breadcrumbs = await category.getBreadcrumbs();

    res.json({
        success: true,
        data: {
            ...category.toObject(),
            subcategories,
            breadcrumbs
        }
    });
});

/**
 * @desc    Get category by slug (for frontend)
 * @route   GET /api/v1/admin/categories/slug/:slug
 * @access  Public
 */
export const getCategoryBySlug = asyncHandler(async (req, res) => {
    const category = await Category.findOne({
        slug: req.params.slug,
        isActive: true
    });

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Get subcategories
    const subcategories = await Category.find({
        parent: category._id,
        isActive: true
    })
        .select('name slug description displayOrder')
        .sort({ displayOrder: 1 });

    res.json({
        success: true,
        data: {
            ...category.toObject(),
            subcategories
        }
    });
});

/**
 * @desc    Create new category
 * @route   POST /api/v1/admin/categories
 * @access  Admin
 * @body    { name, description, parent, level, hero, seo, etc. }
 */
export const createCategory = asyncHandler(async (req, res) => {
    // Validate required fields
    if (!req.body.name) {
        res.status(400);
        throw new Error('Category name is required');
    }

    // Check if category with same name exists
    const existingCategory = await Category.findOne({
        name: req.body.name,
        parent: req.body.parent || null
    });

    if (existingCategory) {
        res.status(400);
        throw new Error('Category with this name already exists');
    }

    // Create category
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category
    });
});

/**
 * @desc    Update category
 * @route   PUT /api/v1/admin/categories/:id
 * @access  Admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Prevent circular parent reference
    if (req.body.parent && req.body.parent === req.params.id) {
        res.status(400);
        throw new Error('Category cannot be its own parent');
    }

    // Update category
    category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        message: 'Category updated successfully',
        data: category
    });
});

/**
 * @desc    Update category hero section
 * @route   PUT /api/v1/admin/categories/:id/hero
 * @access  Admin
 */
export const updateCategoryHero = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Update hero section
    category.hero = {
        ...category.hero,
        ...req.body
    };

    await category.save();

    res.json({
        success: true,
        message: 'Hero section updated successfully',
        data: category.hero
    });
});

/**
 * @desc    Update category SEO
 * @route   PUT /api/v1/admin/categories/:id/seo
 * @access  Admin
 */
export const updateCategorySEO = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Update SEO section
    category.seo = {
        ...category.seo,
        ...req.body
    };

    await category.save();

    res.json({
        success: true,
        message: 'SEO updated successfully',
        data: category.seo
    });
});

/**
 * @desc    Update category promo
 * @route   PUT /api/v1/admin/categories/:id/promo
 * @access  Admin
 */
export const updateCategoryPromo = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Update promo section
    category.promo = {
        ...category.promo,
        ...req.body
    };

    await category.save();

    res.json({
        success: true,
        message: 'Promo updated successfully',
        data: category.promo
    });
});

/**
 * @desc    Delete category
 * @route   DELETE /api/v1/admin/categories/:id
 * @access  Admin
 */
export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Check if category has subcategories
    const subcategoriesCount = await Category.countDocuments({
        parent: category._id
    });

    if (subcategoriesCount > 0) {
        res.status(400);
        throw new Error(
            `Cannot delete category with ${subcategoriesCount} subcategories. ` +
            'Please delete or reassign subcategories first.'
        );
    }

    // Check if category has products
    const Ring = (await import('../../public/models/ringModel.js')).default;
    const productsCount = await Ring.countDocuments({ category: category._id });

    if (productsCount > 0) {
        res.status(400);
        throw new Error(
            `Cannot delete category with ${productsCount} products. ` +
            'Please delete or reassign products first.'
        );
    }

    await category.deleteOne();

    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
});

/**
 * @desc    Reorder categories (drag & drop)
 * @route   PUT /api/v1/admin/categories/reorder
 * @access  Admin
 * @body    { categories: [{ id, displayOrder }] }
 */
export const reorderCategories = asyncHandler(async (req, res) => {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories)) {
        res.status(400);
        throw new Error('Categories array is required');
    }

    // Update display order for each category
    const updatePromises = categories.map(({ id, displayOrder }) =>
        Category.findByIdAndUpdate(id, { displayOrder })
    );

    await Promise.all(updatePromises);

    res.json({
        success: true,
        message: 'Categories reordered successfully'
    });
});

/**
 * @desc    Toggle category active status
 * @route   PATCH /api/v1/admin/categories/:id/toggle-active
 * @access  Admin
 */
export const toggleCategoryActive = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    category.isActive = !category.isActive;
    await category.save();

    res.json({
        success: true,
        message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
        data: { isActive: category.isActive }
    });
});

/**
 * @desc    Get category analytics
 * @route   GET /api/v1/admin/categories/:id/analytics
 * @access  Admin
 */
export const getCategoryAnalytics = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    // Get products count
    const Ring = (await import('../../public/models/ringModel.js')).default;
    const productsCount = await Ring.countDocuments({
        category: category._id,
        isActive: true
    });

    // Get subcategories count
    const subcategoriesCount = await Category.countDocuments({
        parent: category._id
    });

    res.json({
        success: true,
        data: {
            ...category.analytics,
            productsCount,
            subcategoriesCount
        }
    });
});

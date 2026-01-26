import express from 'express';

// Import Subcategory Controllers
import {
    getSubcategoriesByCategory,
    getSubcategoryBySlug
} from '../../admin/controllers/subcategoryController.js';

// Import Filter Controllers
import {
    getFiltersGrouped,
    getFiltersByType,
    getFilterBySlug
} from '../../admin/controllers/filterController.js';

// Import Page Controllers
import {
    getPageByPath
} from '../../admin/controllers/pageController.js';

// Import Category Controllers
import {
    getMainCategories,
    getCategoryBySlug
} from '../../admin/controllers/categoryController.js';

const router = express.Router();

// ========================================
// PUBLIC CATEGORY ROUTES
// ========================================

/**
 * @route   GET /api/v1/categories/main
 * @desc    Get main categories (for header navigation)
 * @access  Public
 */
router.get('/categories/main', getMainCategories);

/**
 * @route   GET /api/v1/categories/slug/:slug
 * @desc    Get category by slug
 * @access  Public
 */
router.get('/categories/slug/:slug', getCategoryBySlug);

// ========================================
// PUBLIC SUBCATEGORY ROUTES
// ========================================

/**
 * @route   GET /api/v1/subcategories/category/:categorySlug
 * @desc    Get subcategories by category slug
 * @access  Public
 */
router.get('/subcategories/category/:categorySlug', getSubcategoriesByCategory);

/**
 * @route   GET /api/v1/subcategories/slug/:slug
 * @desc    Get subcategory by slug
 * @access  Public
 */
router.get('/subcategories/slug/:slug', getSubcategoryBySlug);

// ========================================
// PUBLIC FILTER ROUTES
// ========================================

/**
 * @route   GET /api/v1/filters/grouped
 * @desc    Get filters grouped by type
 * @access  Public
 * @query   ?category=engagement-rings
 */
router.get('/filters/grouped', getFiltersGrouped);

/**
 * @route   GET /api/v1/filters/type/:filterType
 * @desc    Get filters by type
 * @access  Public
 * @query   ?category=engagement-rings
 */
router.get('/filters/type/:filterType', getFiltersByType);

/**
 * @route   GET /api/v1/filters/slug/:slug
 * @desc    Get filter by slug
 * @access  Public
 */
router.get('/filters/slug/:slug', getFilterBySlug);

// ========================================
// PUBLIC PAGE ROUTES
// ========================================

/**
 * @route   GET /api/v1/pages/path
 * @desc    Get page by path (for frontend routing)
 * @access  Public
 * @query   ?path=/wedding-rings/women/platinum
 */
router.get('/pages/path', getPageByPath);

export default router;

import express from 'express';

// Import Category Controllers
import {
    getAllCategories,
    getMainCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    updateCategoryHero,
    updateCategorySEO,
    updateCategoryPromo,
    deleteCategory,
    reorderCategories,
    toggleCategoryActive,
    getCategoryAnalytics
} from '../controllers/categoryController.js';

// Import Subcategory Controllers
import {
    getAllSubcategories,
    getSubcategoriesByCategory,
    getSubcategoryById,
    getSubcategoryBySlug,
    createSubcategory,
    updateSubcategory,
    updateSubcategoryFilters,
    updateSubcategorySEO,
    deleteSubcategory,
    reorderSubcategories,
    toggleSubcategoryActive,
    toggleSubcategoryFeatured,
    getSubcategoryAnalytics
} from '../controllers/subcategoryController.js';

// Import Filter Controllers
import {
    getAllFilters,
    getFiltersGrouped,
    getFiltersByType,
    getFilterById,
    getFilterBySlug,
    createFilter,
    updateFilter,
    updateFilterSEO,
    deleteFilter,
    reorderFilters,
    toggleFilterActive,
    toggleFilterPopular,
    bulkCreateFilters,
    getFilterAnalytics,
    getFilterStats
} from '../controllers/filterController.js';

// Import Page Controllers
import {
    getAllPages,
    getPageByPath,
    getPageById,
    createPage,
    updatePage,
    updatePageContent,
    updatePageProductQuery,
    updatePageSEO,
    deletePage,
    togglePageActive,
    getPageAnalytics,
    bulkCreatePages,
    getPageStats
} from '../controllers/pageController.js';

// Import Dashboard Controller
import { getStats } from '../controllers/dashboardController.js';

// Import Mega Menu Controller
import {
    getMegaMenus,
    createMegaMenu,
    updateMegaMenu,
    deleteMegaMenu
} from '../controllers/megaMenuController.js';

// Import Promo Controller
import {
    getPromos,
    createPromo,
    updatePromo,
    deletePromo
} from '../controllers/promoController.js';

// Import Middleware
import { protect, restrictTo } from '../../public/middleware/authMiddleware.js';
import upload from '../../public/middleware/uploadMiddleware.js';

const router = express.Router();

// ========================================
// MIDDLEWARE - Protect all admin routes
// ========================================

// ... (Rest of the file)

// ========================================
// BLOG ROUTES
// ========================================

router.route('/blogs')
    .get(getAllBlogs)
    .post(upload.single('image'), createBlog);

router.route('/blogs/:id')
    .get(getBlogById)
    .put(upload.single('image'), updateBlog)
    .delete(deleteBlog);
router.use(protect);
router.use(restrictTo('admin'));

// ========================================
// CATEGORY ROUTES
// ========================================

/**
 * @route   GET /api/v1/admin/categories
 * @desc    Get all categories with optional filters
 * @access  Admin
 * @query   ?level=0&isActive=true&parent=null
 */
router.get('/categories', getAllCategories);

/**
 * @route   GET /api/v1/admin/categories/main
 * @desc    Get main categories (for header navigation)
 * @access  Admin
 */
router.get('/categories/main', getMainCategories);

/**
 * @route   POST /api/v1/admin/categories
 * @desc    Create new category
 * @access  Admin
 */
router.post('/categories', createCategory);

/**
 * @route   PUT /api/v1/admin/categories/reorder
 * @desc    Reorder categories (drag & drop)
 * @access  Admin
 */
router.put('/categories/reorder', reorderCategories);

/**
 * @route   GET /api/v1/admin/categories/slug/:slug
 * @desc    Get category by slug
 * @access  Admin
 */
router.get('/categories/slug/:slug', getCategoryBySlug);

/**
 * @route   GET /api/v1/admin/categories/:id
 * @desc    Get category by ID
 * @access  Admin
 */
router.get('/categories/:id', getCategoryById);

/**
 * @route   PUT /api/v1/admin/categories/:id
 * @desc    Update category
 * @access  Admin
 */
router.put('/categories/:id', updateCategory);

/**
 * @route   DELETE /api/v1/admin/categories/:id
 * @desc    Delete category
 * @access  Admin
 */
router.delete('/categories/:id', deleteCategory);

/**
 * @route   PUT /api/v1/admin/categories/:id/hero
 * @desc    Update category hero section
 * @access  Admin
 */
router.put('/categories/:id/hero', updateCategoryHero);

/**
 * @route   PUT /api/v1/admin/categories/:id/seo
 * @desc    Update category SEO
 * @access  Admin
 */
router.put('/categories/:id/seo', updateCategorySEO);

/**
 * @route   PUT /api/v1/admin/categories/:id/promo
 * @desc    Update category promo
 * @access  Admin
 */
router.put('/categories/:id/promo', updateCategoryPromo);

/**
 * @route   PATCH /api/v1/admin/categories/:id/toggle-active
 * @desc    Toggle category active status
 * @access  Admin
 */
router.patch('/categories/:id/toggle-active', toggleCategoryActive);

/**
 * @route   GET /api/v1/admin/categories/:id/analytics
 * @desc    Get category analytics
 * @access  Admin
 */
router.get('/categories/:id/analytics', getCategoryAnalytics);

// ========================================
// SUBCATEGORY ROUTES
// ========================================

/**
 * @route   GET /api/v1/admin/subcategories
 * @desc    Get all subcategories
 * @access  Admin
 * @query   ?categoryId=xxx&isActive=true
 */
router.get('/subcategories', getAllSubcategories);

/**
 * @route   POST /api/v1/admin/subcategories
 * @desc    Create new subcategory
 * @access  Admin
 */
router.post('/subcategories', createSubcategory);

/**
 * @route   PUT /api/v1/admin/subcategories/reorder
 * @desc    Reorder subcategories
 * @access  Admin
 */
router.put('/subcategories/reorder', reorderSubcategories);

/**
 * @route   GET /api/v1/admin/subcategories/:id
 * @desc    Get subcategory by ID
 * @access  Admin
 */
router.get('/subcategories/:id', getSubcategoryById);

/**
 * @route   PUT /api/v1/admin/subcategories/:id
 * @desc    Update subcategory
 * @access  Admin
 */
router.put('/subcategories/:id', updateSubcategory);

/**
 * @route   DELETE /api/v1/admin/subcategories/:id
 * @desc    Delete subcategory
 * @access  Admin
 */
router.delete('/subcategories/:id', deleteSubcategory);

/**
 * @route   PUT /api/v1/admin/subcategories/:id/filters
 * @desc    Update subcategory available filters
 * @access  Admin
 */
router.put('/subcategories/:id/filters', updateSubcategoryFilters);

/**
 * @route   PUT /api/v1/admin/subcategories/:id/seo
 * @desc    Update subcategory SEO
 * @access  Admin
 */
router.put('/subcategories/:id/seo', updateSubcategorySEO);

/**
 * @route   PATCH /api/v1/admin/subcategories/:id/toggle-active
 * @desc    Toggle subcategory active status
 * @access  Admin
 */
router.patch('/subcategories/:id/toggle-active', toggleSubcategoryActive);

/**
 * @route   PATCH /api/v1/admin/subcategories/:id/toggle-featured
 * @desc    Toggle subcategory featured status
 * @access  Admin
 */
router.patch('/subcategories/:id/toggle-featured', toggleSubcategoryFeatured);

/**
 * @route   GET /api/v1/admin/subcategories/:id/analytics
 * @desc    Get subcategory analytics
 * @access  Admin
 */
router.get('/subcategories/:id/analytics', getSubcategoryAnalytics);

// ========================================
// FILTER ROUTES
// ========================================

/**
 * @route   GET /api/v1/admin/filters
 * @desc    Get all filters
 * @access  Admin
 * @query   ?filterType=metal&isActive=true
 */
router.get('/filters', getAllFilters);

/**
 * @route   GET /api/v1/admin/filters/stats
 * @desc    Get filter statistics
 * @access  Admin
 */
router.get('/filters/stats', getFilterStats);

/**
 * @route   POST /api/v1/admin/filters
 * @desc    Create new filter
 * @access  Admin
 */
router.post('/filters', createFilter);

/**
 * @route   POST /api/v1/admin/filters/bulk
 * @desc    Bulk create filters
 * @access  Admin
 */
router.post('/filters/bulk', bulkCreateFilters);

/**
 * @route   PUT /api/v1/admin/filters/reorder
 * @desc    Reorder filters
 * @access  Admin
 */
router.put('/filters/reorder', reorderFilters);

/**
 * @route   GET /api/v1/admin/filters/:id
 * @desc    Get filter by ID
 * @access  Admin
 */
router.get('/filters/:id', getFilterById);

/**
 * @route   PUT /api/v1/admin/filters/:id
 * @desc    Update filter
 * @access  Admin
 */
router.put('/filters/:id', updateFilter);

/**
 * @route   DELETE /api/v1/admin/filters/:id
 * @desc    Delete filter
 * @access  Admin
 */
router.delete('/filters/:id', deleteFilter);

/**
 * @route   PUT /api/v1/admin/filters/:id/seo
 * @desc    Update filter SEO
 * @access  Admin
 */
router.put('/filters/:id/seo', updateFilterSEO);

/**
 * @route   PATCH /api/v1/admin/filters/:id/toggle-active
 * @desc    Toggle filter active status
 * @access  Admin
 */
router.patch('/filters/:id/toggle-active', toggleFilterActive);

/**
 * @route   PATCH /api/v1/admin/filters/:id/toggle-popular
 * @desc    Toggle filter popular status
 * @access  Admin
 */
router.patch('/filters/:id/toggle-popular', toggleFilterPopular);

/**
 * @route   GET /api/v1/admin/filters/:id/analytics
 * @desc    Get filter analytics
 * @access  Admin
 */
router.get('/filters/:id/analytics', getFilterAnalytics);

// ========================================
// PAGE ROUTES
// ========================================

/**
 * @route   GET /api/v1/admin/pages
 * @desc    Get all pages
 * @access  Admin
 * @query   ?pageType=category&isActive=true
 */
router.get('/pages', getAllPages);

/**
 * @route   GET /api/v1/admin/pages/stats
 * @desc    Get page statistics
 * @access  Admin
 */
router.get('/pages/stats', getPageStats);

/**
 * @route   POST /api/v1/admin/pages
 * @desc    Create new page
 * @access  Admin
 */
router.post('/pages', createPage);

/**
 * @route   POST /api/v1/admin/pages/bulk
 * @desc    Bulk create pages
 * @access  Admin
 */
router.post('/pages/bulk', bulkCreatePages);

/**
 * @route   GET /api/v1/admin/pages/:id
 * @desc    Get page by ID
 * @access  Admin
 */
router.get('/pages/:id', getPageById);

/**
 * @route   PUT /api/v1/admin/pages/:id
 * @desc    Update page
 * @access  Admin
 */
router.put('/pages/:id', updatePage);

/**
 * @route   DELETE /api/v1/admin/pages/:id
 * @desc    Delete page
 * @access  Admin
 */
router.delete('/pages/:id', deletePage);

/**
 * @route   PUT /api/v1/admin/pages/:id/content
 * @desc    Update page content
 * @access  Admin
 */
router.put('/pages/:id/content', updatePageContent);

/**
 * @route   PUT /api/v1/admin/pages/:id/product-query
 * @desc    Update page product query
 * @access  Admin
 */
router.put('/pages/:id/product-query', updatePageProductQuery);

/**
 * @route   PUT /api/v1/admin/pages/:id/seo
 * @desc    Update page SEO
 * @access  Admin
 */
router.put('/pages/:id/seo', updatePageSEO);

/**
 * @route   PATCH /api/v1/admin/pages/:id/toggle-active
 * @desc    Toggle page active status
 * @access  Admin
 */
router.patch('/pages/:id/toggle-active', togglePageActive);

/**
 * @route   GET /api/v1/admin/pages/:id/analytics
 * @desc    Get page analytics
 * @access  Admin
 */
router.get('/pages/:id/analytics', getPageAnalytics);

// ========================================
// MEGA MENU ROUTES
// ========================================

router.route('/megamenus')
    .get(getMegaMenus)
    .post(createMegaMenu);

router.route('/megamenus/:id')
    .put(updateMegaMenu)
    .delete(deleteMegaMenu);

// ========================================
// PROMO ROUTES
// ========================================

router.route('/promos')
    .get(getPromos)
    .post(createPromo);

router.route('/promos/:id')
    .put(updatePromo)
    .delete(deletePromo);

// Import Blog Controller
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';

// ... (existing imports)

// ========================================
// BLOG ROUTES
// ========================================

router.route('/blogs')
    .get(getAllBlogs)
    .post(upload.single('image'), createBlog);

router.route('/blogs/:id')
    .get(getBlogById)
    .put(upload.single('image'), updateBlog)
    .delete(deleteBlog);

// Import User Controller
import {
    getAllUsers,
    updateUserRole,
    deleteUser
} from '../controllers/userAdminController.js';

// ========================================
// USER MANAGEMENT ROUTES
// ========================================

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// ========================================
// DASHBOARD ROUTES
// ========================================

router.get('/dashboard/stats', getStats);

export default router;

import express from 'express';

// Import Product Admin Controllers
import {
    getAllProducts,
    getProductById,
    createRing,
    updateRing,
    deleteRing,
    createDiamond,
    updateDiamond,
    deleteDiamond,
    createGemstone,
    updateGemstone,
    deleteGemstone,
    createJewelry,
    updateJewelry,
    deleteJewelry,
    bulkUpdateProducts,
    bulkDeleteProducts,
    getProductAnalytics
} from '../controllers/productAdminController.js';

// Import Middleware
import { protect, restrictTo } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

// ========================================
// MIDDLEWARE - Protect all admin routes
// ========================================
router.use(protect);
router.use(restrictTo('admin'));

// ========================================
// UNIFIED PRODUCT ROUTES
// ========================================

/**
 * @route   GET /api/v1/admin/products
 * @desc    Get all products with advanced filtering
 * @access  Admin
 * @query   ?productType=ring&category=xxx&metal=platinum&minPrice=1000&page=1&limit=20
 */
router.get('/products', getAllProducts);

/**
 * @route   GET /api/v1/admin/products/analytics
 * @desc    Get product analytics
 * @access  Admin
 * @query   ?productType=ring
 */
router.get('/products/analytics', getProductAnalytics);

/**
 * @route   PUT /api/v1/admin/products/bulk-update
 * @desc    Bulk update products
 * @access  Admin
 * @body    { productType, ids: [], updates: {} }
 */
router.put('/products/bulk-update', bulkUpdateProducts);

/**
 * @route   DELETE /api/v1/admin/products/bulk-delete
 * @desc    Bulk delete products
 * @access  Admin
 * @body    { productType, ids: [] }
 */
router.delete('/products/bulk-delete', bulkDeleteProducts);

/**
 * @route   GET /api/v1/admin/products/:productType/:id
 * @desc    Get product by ID
 * @access  Admin
 */
router.get('/products/:productType/:id', getProductById);

// ========================================
// RING ROUTES
// ========================================

/**
 * @route   POST /api/v1/admin/products/rings
 * @desc    Create new ring
 * @access  Admin
 */
router.post('/products/rings', createRing);

/**
 * @route   PUT /api/v1/admin/products/rings/:id
 * @desc    Update ring
 * @access  Admin
 */
router.put('/products/rings/:id', updateRing);

/**
 * @route   DELETE /api/v1/admin/products/rings/:id
 * @desc    Delete ring
 * @access  Admin
 */
router.delete('/products/rings/:id', deleteRing);

// ========================================
// DIAMOND ROUTES
// ========================================

/**
 * @route   POST /api/v1/admin/products/diamonds
 * @desc    Create new diamond
 * @access  Admin
 */
router.post('/products/diamonds', createDiamond);

/**
 * @route   PUT /api/v1/admin/products/diamonds/:id
 * @desc    Update diamond
 * @access  Admin
 */
router.put('/products/diamonds/:id', updateDiamond);

/**
 * @route   DELETE /api/v1/admin/products/diamonds/:id
 * @desc    Delete diamond
 * @access  Admin
 */
router.delete('/products/diamonds/:id', deleteDiamond);

// ========================================
// GEMSTONE ROUTES
// ========================================

/**
 * @route   POST /api/v1/admin/products/gemstones
 * @desc    Create new gemstone
 * @access  Admin
 */
router.post('/products/gemstones', createGemstone);

/**
 * @route   PUT /api/v1/admin/products/gemstones/:id
 * @desc    Update gemstone
 * @access  Admin
 */
router.put('/products/gemstones/:id', updateGemstone);

/**
 * @route   DELETE /api/v1/admin/products/gemstones/:id
 * @desc    Delete gemstone
 * @access  Admin
 */
router.delete('/products/gemstones/:id', deleteGemstone);

// ========================================
// JEWELRY ROUTES
// ========================================

/**
 * @route   POST /api/v1/admin/products/jewelry
 * @desc    Create new jewelry
 * @access  Admin
 */
router.post('/products/jewelry', createJewelry);

/**
 * @route   PUT /api/v1/admin/products/jewelry/:id
 * @desc    Update jewelry
 * @access  Admin
 */
router.put('/products/jewelry/:id', updateJewelry);

/**
 * @route   DELETE /api/v1/admin/products/jewelry/:id
 * @desc    Delete jewelry
 * @access  Admin
 */
router.delete('/products/jewelry/:id', deleteJewelry);

export default router;

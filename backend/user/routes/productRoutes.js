import express from 'express';

// Import Product Controllers
import {
    getProducts,
    getProductBySlug,
    searchProducts,
    getRelatedProducts,
    getBestSellers,
    getNewArrivals
} from '../controllers/productController.js';

const router = express.Router();

// ========================================
// PUBLIC PRODUCT ROUTES (No Auth Required)
// ========================================

/**
 * @route   GET /api/v1/products
 * @desc    Get products with filters (for frontend listing pages)
 * @access  Public
 * @query   ?categorySlug=engagement-rings&styleSlug=solitaire&metal=platinum&shape=round&sort=price-asc&page=1&limit=20
 */
router.get('/', getProducts);

/**
 * @route   GET /api/v1/products/search
 * @desc    Search products
 * @access  Public
 * @query   ?q=diamond+ring&productType=ring&page=1&limit=20
 */
router.get('/search', searchProducts);

/**
 * @route   GET /api/v1/products/best-sellers
 * @desc    Get best sellers
 * @access  Public
 * @query   ?productType=ring&categorySlug=engagement-rings&limit=12
 */
router.get('/best-sellers', getBestSellers);

/**
 * @route   GET /api/v1/products/new-arrivals
 * @desc    Get new arrivals
 * @access  Public
 * @query   ?productType=ring&categorySlug=engagement-rings&limit=12
 */
router.get('/new-arrivals', getNewArrivals);

/**
 * @route   GET /api/v1/products/slug/:slug
 * @desc    Get product by slug (for product detail page)
 * @access  Public
 * @query   ?productType=ring
 */
router.get('/slug/:slug', getProductBySlug);

/**
 * @route   GET /api/v1/products/:id/related
 * @desc    Get related products
 * @access  Public
 * @query   ?productType=ring&limit=8
 */
router.get('/:id/related', getRelatedProducts);

export default router;

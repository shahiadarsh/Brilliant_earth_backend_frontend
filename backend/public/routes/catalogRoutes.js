import express from 'express';
import { getMegaMenu, getCategories } from '../controllers/categoryController.js';
import { getProducts, getProductBySlug } from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../utils/s3Upload.js';
import {
    createRing, updateRing, deleteRing,
    createDiamond, updateDiamond, deleteDiamond,
    createGemstone, updateGemstone, deleteGemstone,
    createJewelry, updateJewelry, deleteJewelry
} from '../../admin/controllers/productAdminController.js';

const router = express.Router();

// Categories
router.get('/categories/mega-menu', getMegaMenu);
router.get('/categories/menu', getMegaMenu);
router.get('/categories', getCategories);

// Rings
router.route('/rings')
    .get(getProducts)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createRing);
router.route('/rings/:id')
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateRing)
    .delete(protect, restrictTo('admin'), deleteRing);

// Diamonds
router.route('/diamonds')
    .get(getProducts)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createDiamond);
router.route('/diamonds/:id')
    .get(getProductBySlug) // For public view but using ID or slug
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateDiamond)
    .delete(protect, restrictTo('admin'), deleteDiamond);

// Gemstones
router.route('/gemstones')
    .get(getProducts)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createGemstone);
router.route('/gemstones/:id')
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateGemstone)
    .delete(protect, restrictTo('admin'), deleteGemstone);

// Jewelry
router.route('/jewelry')
    .get(getProducts)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createJewelry);
router.route('/jewelry/:id')
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateJewelry)
    .delete(protect, restrictTo('admin'), deleteJewelry);

// Original Products (legacy or catch-all)
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);

export default router;

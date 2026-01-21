import express from 'express';
import {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, restrictTo('admin'), getAllOrders);

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').patch(protect, updateOrderToPaid);

export default router;

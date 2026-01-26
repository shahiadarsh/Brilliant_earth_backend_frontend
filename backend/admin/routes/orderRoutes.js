import express from 'express';
import {
    getAllOrders,
    updateOrderStatus,
    updateOrderToPaid
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/pay', updateOrderToPaid);

export default router;

import express from 'express';
import { getMyOrders, getOrderDetails } from '../controllers/orderController.js';
import { protect } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All user order routes require login

router.get('/myorders', getMyOrders);
router.get('/:id', getOrderDetails);

export default router;

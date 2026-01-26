import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getCart)
    .post(addToCart);

router.route('/:itemId')
    .delete(removeFromCart);

export default router;

import express from 'express';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getWishlist)
    .post(addToWishlist)
    .delete(clearWishlist);

router.route('/:itemId')
    .delete(removeFromWishlist);

export default router;

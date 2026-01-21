import express from 'express';
import { subscribe, getAllSubscribers, unsubscribe } from '../controllers/newsletterController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', protect, restrictTo('admin'), getAllSubscribers);
router.patch('/unsubscribe/:email', unsubscribe);

export default router;

import express from 'express';
import { getDashboardStats, getInventoryAlerts, getRecentTransactions } from '../controllers/dashboardController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.get('/stats', getDashboardStats);
router.get('/inventory-alerts', getInventoryAlerts);
router.get('/recent-transactions', getRecentTransactions);

export default router;

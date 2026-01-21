import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getSettings)
    .patch(protect, restrictTo('admin'), updateSettings);

export default router;

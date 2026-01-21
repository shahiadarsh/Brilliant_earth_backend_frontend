import express from 'express';
import {
    getAllPromos,
    createPromo,
    getPromo,
    updatePromo,
    deletePromo
} from '../controllers/promoController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllPromos)
    .post(protect, restrictTo('admin'), upload.single('image'), createPromo);

router.route('/:id')
    .get(getPromo)
    .patch(protect, restrictTo('admin'), upload.single('image'), updatePromo)
    .delete(protect, restrictTo('admin'), deletePromo);

export default router;

import express from 'express';
import {
    getAllGemstones,
    createGemstone,
    getGemstone,
    updateGemstone,
    deleteGemstone
} from '../controllers/gemstoneController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllGemstones)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createGemstone);

router.route('/:id')
    .get(getGemstone)
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateGemstone)
    .delete(protect, restrictTo('admin'), deleteGemstone);

export default router;

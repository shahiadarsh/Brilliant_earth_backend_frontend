import express from 'express';
import {
    getAllJewelry,
    createJewelry,
    getJewelry,
    updateJewelry,
    deleteJewelry
} from '../controllers/jewelryController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllJewelry)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createJewelry);

router.route('/:id')
    .get(getJewelry)
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateJewelry)
    .delete(protect, restrictTo('admin'), deleteJewelry);

export default router;

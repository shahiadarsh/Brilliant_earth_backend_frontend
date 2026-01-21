import express from 'express';
import {
    getAllDiamonds,
    createDiamond,
    getDiamond,
    updateDiamond,
    deleteDiamond
} from '../controllers/diamondController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllDiamonds)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createDiamond);

router.route('/:id')
    .get(getDiamond)
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateDiamond)
    .delete(protect, restrictTo('admin'), deleteDiamond);

export default router;

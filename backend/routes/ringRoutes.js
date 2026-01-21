import express from 'express';
import {
    getAllRings,
    createRing,
    getRing,
    updateRing,
    deleteRing
} from '../controllers/ringController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllRings)
    .post(protect, restrictTo('admin'), upload.array('images', 5), createRing);

router.route('/:id')
    .get(getRing)
    .patch(protect, restrictTo('admin'), upload.array('images', 5), updateRing)
    .delete(protect, restrictTo('admin'), deleteRing);

export default router;

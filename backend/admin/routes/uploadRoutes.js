import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, restrictTo } from '../../public/middleware/authMiddleware.js';
import upload from '../../public/utils/s3Upload.js';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), upload.single('image'), uploadImage);

export default router;

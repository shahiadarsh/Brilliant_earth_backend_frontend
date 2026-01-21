import express from 'express';
import {
    getAllBlogs,
    createBlog,
    getBlogBySlug,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

import upload from '../utils/s3Upload.js';

const router = express.Router();

router.route('/')
    .get(getAllBlogs)
    .post(protect, restrictTo('admin'), upload.single('image'), createBlog);

router.route('/:id')
    .patch(protect, restrictTo('admin'), upload.single('image'), updateBlog)
    .delete(protect, restrictTo('admin'), deleteBlog);

router.get('/slug/:slug', getBlogBySlug);

export default router;

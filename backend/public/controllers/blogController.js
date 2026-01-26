import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

export const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort('-createdAt');
    res.json({ success: true, data: blogs });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) res.json({ success: true, data: blog });
    else { res.status(404); throw new Error('Blog not found'); }
});

import Blog from '../../public/models/blogModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all blogs (Admin)
// @route   GET /api/v1/admin/management/blogs
// @access  Private/Admin
export const getAllBlogs = asyncHandler(async (req, res) => {
    const { title, status, sort } = req.query;

    let query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (status) query.status = status;

    let sortStr = '-createdAt';
    if (sort) sortStr = sort;

    const blogs = await Blog.find(query).sort(sortStr);
    res.json({ success: true, count: blogs.length, data: { blogs } });
});

// @desc    Get blog by ID
// @route   GET /api/v1/admin/management/blogs/:id
// @access  Private/Admin
export const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }
    res.json({ success: true, data: blog });
});

// @desc    Create a new blog
// @route   POST /api/v1/admin/management/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
    // Generate slug from title if not provided
    if (!req.body.slug && req.body.title) {
        req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Handle Image Upload
    if (req.file) {
        // Cloudinary storage returns the full URL in req.file.path
        req.body.image = req.file.path;
        req.body.featuredImage = req.file.path;
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
});

// @desc    Update blog
// @route   PUT /api/v1/admin/management/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    // Handle Image Upload
    if (req.file) {
        // Cloudinary storage returns the full URL in req.file.path
        req.body.image = req.file.path;
        req.body.featuredImage = req.file.path;
    }

    // Update slug if title changes and slug isn't explicitly provided (optional logic, usually keep slug stable)
    // For now, trust the body

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.json({ success: true, data: blog });
});

// @desc    Delete blog
// @route   DELETE /api/v1/admin/management/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    await blog.deleteOne();
    res.json({ success: true, message: 'Blog removed' });
});

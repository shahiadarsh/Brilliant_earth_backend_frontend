import Blog from '../models/blogModel.js';

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort('-createdAt');
        res.status(200).json({
            status: 'success',
            results: blogs.length,
            data: { blogs }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const createBlog = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.location;
        }
        const newBlog = await Blog.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { blog: newBlog }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'No blog found with that slug'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { blog }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'No blog found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { blog }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'No blog found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Blog title is required'], trim: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    tags: [{ type: String }],
    category: { type: String, required: true },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    readTime: { type: String },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

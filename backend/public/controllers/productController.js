import asyncHandler from 'express-async-handler';
import Ring from '../models/ringModel.js';
import Jewelry from '../models/jewelryModel.js';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';
import Category from '../models/categoryModel.js';
import Review from '../models/reviewModel.js';

// @desc    Get all products (PLP)
// @route   GET /api/v1/public/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const {
        categorySlug,
        metal,
        styleSlug,
        shape,
        minPrice,
        maxPrice,
        sort,
        page = 1,
        limit = 12
    } = req.query;

    let query = {};
    let model = Ring;

    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        if (category) {
            const rootCategory = await getRootCategory(category);
            const rootName = rootCategory.name.toLowerCase();

            if (rootName.includes('diamond')) model = Diamond;
            else if (rootName.includes('gemstone')) model = Gemstone;
            else if (rootName.includes('jewelry')) model = Jewelry;
            else model = Ring;

            query.category = category._id;
        }
    }

    if (styleSlug) {
        const subCat = await Category.findOne({ slug: styleSlug });
        if (subCat) query.subcategory = subCat._id;
    }

    if (metal) query.metals = metal;
    if (shape) query.shape = shape;

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    let sortQuery = {};
    if (sort === 'price-asc') sortQuery.price = 1;
    else if (sort === 'price-desc') sortQuery.price = -1;
    else sortQuery.createdAt = -1;

    const products = await model.find(query)
        .populate('category subcategory')
        .sort(sortQuery)
        .limit(Number(limit))
        .skip(skip);

    const total = await model.countDocuments(query);

    res.json({
        success: true,
        data: products,
        pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
    });
});

// @desc    Get single product details (PDP)
// @route   GET /api/v1/public/products/:slug
export const getProductBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const searchModels = [
        { model: Ring, type: 'ring' },
        { model: Jewelry, type: 'jewelry' },
        { model: Diamond, type: 'diamond' },
        { model: Gemstone, type: 'gemstone' }
    ];

    let found = null;
    let productModel = null;

    for (const item of searchModels) {
        found = await item.model.findOne({ slug }).populate('category subcategory');
        if (found) {
            productModel = item.model;
            break;
        }
    }

    if (!found) {
        res.status(404);
        throw new Error('Product not found');
    }

    const reviews = await Review.find({ product: found._id });
    const breadcrumbs = [];
    let currentCat = found.category;
    if (currentCat) {
        breadcrumbs.push({ name: currentCat.name, slug: currentCat.slug });
        while (currentCat.parent) {
            currentCat = await Category.findById(currentCat.parent);
            if (!currentCat) break;
            breadcrumbs.unshift({ name: currentCat.name, slug: currentCat.slug });
        }
    }

    const relatedProducts = await productModel.find({
        category: found.category?._id,
        _id: { $ne: found._id }
    }).limit(4).populate('category subcategory');

    res.json({
        success: true,
        data: { product: found, breadcrumbs, relatedProducts, reviews }
    });
});

async function getRootCategory(category) {
    let current = category;
    while (current.parent) {
        const parent = await Category.findById(current.parent);
        if (!parent) break;
        current = parent;
    }
    return current;
}

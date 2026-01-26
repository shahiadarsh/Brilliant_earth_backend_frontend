import asyncHandler from 'express-async-handler';
import Ring from '../../public/models/ringModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Gemstone from '../../public/models/gemstoneModel.js';
import Jewelry from '../../public/models/jewelryModel.js';
import Category from '../../public/models/categoryModel.js';
import Subcategory from '../../public/models/subcategoryModel.js';
import Filter from '../../public/models/filterModel.js';

// ========================================
// USER/FRONTEND PRODUCT CONTROLLER
// ========================================

/**
 * @desc    Get products with filters (for frontend listing pages)
 * @route   GET /api/v1/products
 * @access  Public
 * @query   ?categorySlug=engagement-rings&styleSlug=solitaire&metal=platinum&shape=round&sort=price-asc&page=1&limit=20
 */
export const getProducts = asyncHandler(async (req, res) => {
    const {
        productType = 'ring',
        categorySlug,
        styleSlug,
        metal,
        shape,
        style,
        stoneType,
        minPrice,
        maxPrice,
        minCarat,
        maxCarat,
        page = 1,
        limit = 20,
        sort = 'featured'
    } = req.query;

    // Select model based on product type
    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    // Build query
    const query = { isActive: true };

    // Category filter
    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        if (category) {
            query.category = category._id;
        }
    }

    // Subcategory/Style filter
    if (styleSlug) {
        const subcategory = await Subcategory.findOne({ slug: styleSlug });
        if (subcategory) {
            query.subcategory = subcategory._id;
        }
    }

    // Attribute filters
    if (metal) query['attributes.metals'] = metal;
    if (shape) query['attributes.shape'] = shape;
    if (style) query['attributes.style'] = style;
    if (stoneType) query['attributes.stoneType'] = stoneType;

    // Price range filter
    if (minPrice || maxPrice) {
        query.basePrice = {};
        if (minPrice) query.basePrice.$gte = parseFloat(minPrice);
        if (maxPrice) query.basePrice.$lte = parseFloat(maxPrice);
    }

    // Carat range filter (for diamonds/gemstones)
    if (minCarat || maxCarat) {
        query['attributes.caratWeight'] = {};
        if (minCarat) query['attributes.caratWeight'].$gte = parseFloat(minCarat);
        if (maxCarat) query['attributes.caratWeight'].$lte = parseFloat(maxCarat);
    }

    // Sorting
    let sortOption = {};
    switch (sort) {
        case 'price-asc':
            sortOption = { basePrice: 1 };
            break;
        case 'price-desc':
            sortOption = { basePrice: -1 };
            break;
        case 'newest':
            sortOption = { createdAt: -1 };
            break;
        case 'popular':
            sortOption = { 'analytics.salesCount': -1 };
            break;
        case 'featured':
        default:
            sortOption = { isFeatured: -1, isBestSeller: -1, displayOrder: 1 };
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Model.find(query)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .select('-analytics -seo') // Exclude internal fields
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Model.countDocuments(query);

    // Get available filters for current query
    const availableFilters = await getAvailableFilters(Model, query, categorySlug);

    res.json({
        success: true,
        data: products,
        pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit)
        },
        filters: availableFilters
    });
});

/**
 * @desc    Get product by slug (for product detail page)
 * @route   GET /api/v1/products/slug/:slug
 * @access  Public
 */
export const getProductBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { productType = 'ring' } = req.query;

    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    const product = await Model.findOne({ slug, isActive: true })
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug');

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Increment view count (async, don't wait)
    product.incrementViews().catch(err => console.error('Error incrementing views:', err));

    // Get related products
    const relatedProducts = await Model.find({
        category: product.category,
        _id: { $ne: product._id },
        isActive: true
    })
        .select('name slug basePrice images defaultImage')
        .limit(8);

    res.json({
        success: true,
        data: product,
        relatedProducts
    });
});

/**
 * @desc    Search products
 * @route   GET /api/v1/products/search
 * @access  Public
 * @query   ?q=diamond+ring&productType=ring&page=1&limit=20
 */
export const searchProducts = asyncHandler(async (req, res) => {
    const { q, productType = 'ring', page = 1, limit = 20 } = req.query;

    if (!q) {
        res.status(400);
        throw new Error('Search query is required');
    }

    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    // Build search query
    const searchQuery = {
        isActive: true,
        $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
        ]
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Model.find(searchQuery)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .select('-analytics -seo')
        .sort({ isFeatured: -1, 'analytics.viewCount': -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Model.countDocuments(searchQuery);

    res.json({
        success: true,
        query: q,
        data: products,
        pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit)
        }
    });
});

/**
 * @desc    Get related products
 * @route   GET /api/v1/products/:id/related
 * @access  Public
 */
export const getRelatedProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { productType = 'ring', limit = 8 } = req.query;

    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    const product = await Model.findById(id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Find similar products based on category, subcategory, and attributes
    const relatedProducts = await Model.find({
        $or: [
            { category: product.category },
            { subcategory: product.subcategory },
            { 'attributes.style': product.attributes?.style }
        ],
        _id: { $ne: product._id },
        isActive: true
    })
        .select('name slug basePrice images defaultImage isBestSeller')
        .limit(parseInt(limit));

    res.json({
        success: true,
        count: relatedProducts.length,
        data: relatedProducts
    });
});

/**
 * @desc    Get best sellers
 * @route   GET /api/v1/products/best-sellers
 * @access  Public
 */
export const getBestSellers = asyncHandler(async (req, res) => {
    const { productType = 'ring', categorySlug, limit = 12 } = req.query;

    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    const query = {
        isActive: true,
        isBestSeller: true
    };

    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        if (category) {
            query.category = category._id;
        }
    }

    const products = await Model.find(query)
        .populate('category', 'name slug')
        .select('name slug basePrice images defaultImage')
        .sort({ 'analytics.salesCount': -1 })
        .limit(parseInt(limit));

    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

/**
 * @desc    Get new arrivals
 * @route   GET /api/v1/products/new-arrivals
 * @access  Public
 */
export const getNewArrivals = asyncHandler(async (req, res) => {
    const { productType = 'ring', categorySlug, limit = 12 } = req.query;

    let Model;
    switch (productType) {
        case 'ring':
            Model = Ring;
            break;
        case 'diamond':
            Model = Diamond;
            break;
        case 'gemstone':
            Model = Gemstone;
            break;
        case 'jewelry':
            Model = Jewelry;
            break;
        default:
            Model = Ring;
    }

    const query = {
        isActive: true,
        isNewArrival: true
    };

    if (categorySlug) {
        const category = await Category.findOne({ slug: categorySlug });
        if (category) {
            query.category = category._id;
        }
    }

    const products = await Model.find(query)
        .populate('category', 'name slug')
        .select('name slug basePrice images defaultImage')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get available filters for current product query
 */
async function getAvailableFilters(Model, baseQuery, categorySlug) {
    // Get distinct values for each filter type
    const [metals, shapes, styles, stoneTypes] = await Promise.all([
        Model.distinct('attributes.metals', baseQuery),
        Model.distinct('attributes.shape', baseQuery),
        Model.distinct('attributes.style', baseQuery),
        Model.distinct('attributes.stoneType', baseQuery)
    ]);

    // Get price range
    const priceRange = await Model.aggregate([
        { $match: baseQuery },
        {
            $group: {
                _id: null,
                min: { $min: '$basePrice' },
                max: { $max: '$basePrice' }
            }
        }
    ]);

    // Get carat range (if applicable)
    const caratRange = await Model.aggregate([
        { $match: { ...baseQuery, 'attributes.caratWeight': { $exists: true } } },
        {
            $group: {
                _id: null,
                min: { $min: '$attributes.caratWeight' },
                max: { $max: '$attributes.caratWeight' }
            }
        }
    ]);

    return {
        metals: metals.filter(Boolean),
        shapes: shapes.filter(Boolean),
        styles: styles.filter(Boolean),
        stoneTypes: stoneTypes.filter(Boolean),
        priceRange: priceRange[0] || { min: 0, max: 0 },
        caratRange: caratRange[0] || { min: 0, max: 0 }
    };
}

export default {
    getProducts,
    getProductBySlug,
    searchProducts,
    getRelatedProducts,
    getBestSellers,
    getNewArrivals
};

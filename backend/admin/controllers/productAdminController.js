import asyncHandler from 'express-async-handler';
import Ring from '../../public/models/ringModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Gemstone from '../../public/models/gemstoneModel.js';
import Jewelry from '../../public/models/jewelryModel.js';
import Category from '../../public/models/categoryModel.js';
import Subcategory from '../../public/models/subcategoryModel.js';

// ========================================
// UNIFIED PRODUCT CONTROLLER (ADMIN)
// ========================================

/**
 * @desc    Get all products with advanced filtering
 * @route   GET /api/v1/admin/products
 * @access  Admin
 * @query   ?productType=ring&category=xxx&metal=platinum&minPrice=1000&maxPrice=5000
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    const {
        productType = 'ring',
        category,
        subcategory,
        metal,
        shape,
        style,
        stoneType,
        minPrice,
        maxPrice,
        isActive,
        isBestSeller,
        isFeatured,
        stockStatus,
        page = 1,
        limit = 20,
        sort = '-createdAt'
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
    const query = {};

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (metal) query['attributes.metals'] = metal;
    if (shape) query['attributes.shape'] = shape;
    if (style) query['attributes.style'] = style;
    if (stoneType) query['attributes.stoneType'] = stoneType;

    if (minPrice || maxPrice) {
        query.basePrice = {};
        if (minPrice) query.basePrice.$gte = parseFloat(minPrice);
        if (maxPrice) query.basePrice.$lte = parseFloat(maxPrice);
    }

    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (isBestSeller !== undefined) query.isBestSeller = isBestSeller === 'true';
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
    if (stockStatus) query.stockStatus = stockStatus;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Model.find(query)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Model.countDocuments(query);

    res.json({
        success: true,
        count: products.length,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        data: products
    });
});

/**
 * @desc    Get product by ID
 * @route   GET /api/v1/admin/products/:productType/:id
 * @access  Admin
 */
export const getProductById = asyncHandler(async (req, res) => {
    const { productType, id } = req.params;

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
            res.status(400);
            throw new Error('Invalid product type');
    }

    const product = await Model.findById(id)
        .populate('category', 'name slug')
        .populate('subcategory', 'name slug');

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json({
        success: true,
        data: product
    });
});

// ========================================
// RING OPERATIONS
// ========================================

/**
 * @desc    Create ring
 * @route   POST /api/v1/admin/products/rings
 * @access  Admin
 */
export const createRing = asyncHandler(async (req, res) => {
    // Handle file uploads
    const images = req.files ? req.files.map(f => f.location) : [];
    const ringData = { ...req.body, images };

    // Verify category exists
    if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }
    }

    // Verify subcategory exists
    if (req.body.subcategory) {
        const subcategory = await Subcategory.findById(req.body.subcategory);
        if (!subcategory) {
            res.status(404);
            throw new Error('Subcategory not found');
        }
    }

    const ring = await Ring.create(ringData);

    res.status(201).json({
        success: true,
        message: 'Ring created successfully',
        data: ring
    });
});

/**
 * @desc    Update ring
 * @route   PUT /api/v1/admin/products/rings/:id
 * @access  Admin
 */
export const updateRing = asyncHandler(async (req, res) => {
    let ring = await Ring.findById(req.params.id);

    if (!ring) {
        res.status(404);
        throw new Error('Ring not found');
    }

    // Handle new file uploads
    let images = req.body.images || ring.images || [];
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.location)];
    }

    ring = await Ring.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Ring updated successfully',
        data: ring
    });
});

/**
 * @desc    Delete ring
 * @route   DELETE /api/v1/admin/products/rings/:id
 * @access  Admin
 */
export const deleteRing = asyncHandler(async (req, res) => {
    const ring = await Ring.findById(req.params.id);

    if (!ring) {
        res.status(404);
        throw new Error('Ring not found');
    }

    await ring.deleteOne();

    res.json({
        success: true,
        message: 'Ring deleted successfully'
    });
});

// ========================================
// DIAMOND OPERATIONS
// ========================================

export const createDiamond = asyncHandler(async (req, res) => {
    const images = req.files ? req.files.map(f => f.location) : [];
    const diamond = await Diamond.create({ ...req.body, images });

    res.status(201).json({
        success: true,
        message: 'Diamond created successfully',
        data: diamond
    });
});

export const updateDiamond = asyncHandler(async (req, res) => {
    let diamond = await Diamond.findById(req.params.id);

    if (!diamond) {
        res.status(404);
        throw new Error('Diamond not found');
    }

    let images = req.body.images || diamond.images || [];
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.location)];
    }

    diamond = await Diamond.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Diamond updated successfully',
        data: diamond
    });
});

export const deleteDiamond = asyncHandler(async (req, res) => {
    const diamond = await Diamond.findById(req.params.id);

    if (!diamond) {
        res.status(404);
        throw new Error('Diamond not found');
    }

    await diamond.deleteOne();

    res.json({
        success: true,
        message: 'Diamond deleted successfully'
    });
});

// ========================================
// GEMSTONE OPERATIONS
// ========================================

export const createGemstone = asyncHandler(async (req, res) => {
    const images = req.files ? req.files.map(f => f.location) : [];
    const gemstone = await Gemstone.create({ ...req.body, images });

    res.status(201).json({
        success: true,
        message: 'Gemstone created successfully',
        data: gemstone
    });
});

export const updateGemstone = asyncHandler(async (req, res) => {
    let gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
        res.status(404);
        throw new Error('Gemstone not found');
    }

    let images = req.body.images || gemstone.images || [];
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.location)];
    }

    gemstone = await Gemstone.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Gemstone updated successfully',
        data: gemstone
    });
});

export const deleteGemstone = asyncHandler(async (req, res) => {
    const gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
        res.status(404);
        throw new Error('Gemstone not found');
    }

    await gemstone.deleteOne();

    res.json({
        success: true,
        message: 'Gemstone deleted successfully'
    });
});

// ========================================
// JEWELRY OPERATIONS
// ========================================

export const createJewelry = asyncHandler(async (req, res) => {
    const images = req.files ? req.files.map(f => f.location) : [];
    const jewelry = await Jewelry.create({ ...req.body, images });

    res.status(201).json({
        success: true,
        message: 'Jewelry created successfully',
        data: jewelry
    });
});

export const updateJewelry = asyncHandler(async (req, res) => {
    let jewelry = await Jewelry.findById(req.params.id);

    if (!jewelry) {
        res.status(404);
        throw new Error('Jewelry not found');
    }

    let images = req.body.images || jewelry.images || [];
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.location)];
    }

    jewelry = await Jewelry.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Jewelry updated successfully',
        data: jewelry
    });
});

export const deleteJewelry = asyncHandler(async (req, res) => {
    const jewelry = await Jewelry.findById(req.params.id);

    if (!jewelry) {
        res.status(404);
        throw new Error('Jewelry not found');
    }

    await jewelry.deleteOne();

    res.json({
        success: true,
        message: 'Jewelry deleted successfully'
    });
});

// ========================================
// BULK OPERATIONS
// ========================================

/**
 * @desc    Bulk update products
 * @route   PUT /api/v1/admin/products/bulk-update
 * @access  Admin
 * @body    { productType, ids: [], updates: {} }
 */
export const bulkUpdateProducts = asyncHandler(async (req, res) => {
    const { productType, ids, updates } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400);
        throw new Error('Product IDs array is required');
    }

    if (!updates || Object.keys(updates).length === 0) {
        res.status(400);
        throw new Error('Updates object is required');
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
            res.status(400);
            throw new Error('Invalid product type');
    }

    const result = await Model.updateMany(
        { _id: { $in: ids } },
        { $set: updates }
    );

    res.json({
        success: true,
        message: `${result.modifiedCount} products updated successfully`,
        modifiedCount: result.modifiedCount
    });
});

/**
 * @desc    Bulk delete products
 * @route   DELETE /api/v1/admin/products/bulk-delete
 * @access  Admin
 * @body    { productType, ids: [] }
 */
export const bulkDeleteProducts = asyncHandler(async (req, res) => {
    const { productType, ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400);
        throw new Error('Product IDs array is required');
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
            res.status(400);
            throw new Error('Invalid product type');
    }

    const result = await Model.deleteMany({ _id: { $in: ids } });

    res.json({
        success: true,
        message: `${result.deletedCount} products deleted successfully`,
        deletedCount: result.deletedCount
    });
});

/**
 * @desc    Get product analytics
 * @route   GET /api/v1/admin/products/analytics
 * @access  Admin
 */
export const getProductAnalytics = asyncHandler(async (req, res) => {
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

    // Get various statistics
    const totalProducts = await Model.countDocuments();
    const activeProducts = await Model.countDocuments({ isActive: true });
    const inStockProducts = await Model.countDocuments({ stockStatus: 'in-stock' });
    const bestSellers = await Model.countDocuments({ isBestSeller: true });
    const featured = await Model.countDocuments({ isFeatured: true });

    // Get top viewed products
    const topViewed = await Model.find({ isActive: true })
        .select('name slug analytics.viewCount basePrice')
        .sort({ 'analytics.viewCount': -1 })
        .limit(10);

    // Get top selling products
    const topSelling = await Model.find({ isActive: true })
        .select('name slug analytics.salesCount basePrice')
        .sort({ 'analytics.salesCount': -1 })
        .limit(10);

    res.json({
        success: true,
        data: {
            total: totalProducts,
            active: activeProducts,
            inStock: inStockProducts,
            bestSellers,
            featured,
            topViewed,
            topSelling
        }
    });
});

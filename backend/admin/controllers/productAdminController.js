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
        case 'ring': Model = Ring; break;
        case 'diamond': Model = Diamond; break;
        case 'gemstone': Model = Gemstone; break;
        case 'jewelry': Model = Jewelry; break;
        default: Model = Ring;
    }

    // Build query
    const query = {};

    // Handle Category/Subcategory (Robustly handle IDs or Slugs)
    if (category && category !== 'All Categories') {
        if (mongoose.Types.ObjectId.isValid(category)) {
            query.category = category;
        } else {
            const cat = await Category.findOne({ slug: category });
            if (cat) query.category = cat._id;
        }
    }

    if (subcategory && subcategory !== 'All Styles' && subcategory !== 'All Varieties') {
        if (mongoose.Types.ObjectId.isValid(subcategory)) {
            query.subcategory = subcategory;
        } else {
            const sub = await Category.findOne({ slug: subcategory });
            if (sub) {
                query.subcategory = sub._id;
            } else {
                // If it's not a category slug, maybe it's a specific style/type string
                if (productType === 'ring') query['attributes.style'] = subcategory;
                if (productType === 'gemstone') query['attributes.stoneType'] = subcategory;
            }
        }
    }

    if (metal) query['attributes.metals'] = metal;
    if (shape) query['attributes.shape'] = shape;
    if (style) query['attributes.style'] = style;
    if (stoneType) query['attributes.stoneType'] = stoneType;

    // Search by name or SKU
    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: 'i' } },
            { title: { $regex: req.query.search, $options: 'i' } },
            { sku: { $regex: req.query.search, $options: 'i' } },
            { 'seo.metaTitle': { $regex: req.query.search, $options: 'i' } },
            { metaTitle: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
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
        data: products,
        pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
        }
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
    const images = req.files ? req.files.map(f => f.path) : [];

    // Parse variants if provided as string
    let variants = req.body.variants;
    if (typeof variants === 'string') {
        try { variants = JSON.parse(variants); } catch (e) { variants = []; }
    }

    // Recalculate stock from variants if they exist
    let stock = req.body.stock || 0;
    if (variants && variants.length > 0) {
        stock = variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0);
    }

    // Parse priceByMetal if provided
    let priceByMetal = req.body.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = {}; }
    }

    // Standardize attributes
    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : [],
        prongStyle: req.body.prongStyle,
        bandWidth: req.body.bandWidth
    };

    // SEO Structure
    const seo = {
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.keywords
    };

    const ringData = { ...req.body, images, variants, stock, priceByMetal, attributes, seo };

    // Verify category exists
    if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
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

    // Handle images: Start with existing images if provided (parsed from JSON), else fallback to current
    let images = ring.images;

    if (req.body.existingImages) {
        try {
            images = JSON.parse(req.body.existingImages);
        } catch (e) {
            // Fallback strategy if not JSON (though frontend should send JSON)
            images = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
        }
    }

    // Append new uploaded files
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.path)];
    }

    // Handle variants and stock
    let variants = req.body.variants || ring.variants;
    if (typeof variants === 'string') {
        try { variants = JSON.parse(variants); } catch (e) { variants = ring.variants; }
    }

    let stock = req.body.stock || ring.stock;
    if (req.body.variants) { // Only recalculate if variants were provided in update
        stock = variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0);
    }

    // Handle priceByMetal
    let priceByMetal = req.body.priceByMetal || ring.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = ring.priceByMetal; }
    }

    // Standardize attributes
    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : (ring.attributes?.metals || []),
        prongStyle: req.body.prongStyle || ring.attributes?.prongStyle,
        bandWidth: req.body.bandWidth || ring.attributes?.bandWidth
    };

    // SEO Structure
    const seo = {
        metaTitle: req.body.metaTitle || (ring.seo ? ring.seo.metaTitle : undefined),
        metaDescription: req.body.metaDescription || (ring.seo ? ring.seo.metaDescription : undefined),
        metaKeywords: req.body.keywords || (ring.seo ? ring.seo.metaKeywords : undefined)
    };

    // Build update object - only include fields that are actually provided
    const updateData = {};

    // Only update fields if they are provided and not empty
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.slug) updateData.slug = req.body.slug;
    if (req.body.price !== undefined && req.body.price !== null && req.body.price !== '') {
        updateData.price = parseFloat(req.body.price);
    }
    if (req.body.stock !== undefined && req.body.stock !== null && req.body.stock !== '') {
        updateData.stock = stock; // Use calculated stock from above
    }
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.subcategory) updateData.subcategory = req.body.subcategory;
    if (req.body.collection) updateData.collection = req.body.collection;
    if (req.body.gender) updateData.gender = req.body.gender;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.isSustainable !== undefined) updateData.isSustainable = req.body.isSustainable;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;
    if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller;
    if (req.body.stockStatus) updateData.stockStatus = req.body.stockStatus;

    // Always update these if provided
    updateData.images = images;
    updateData.variants = variants;
    updateData.priceByMetal = priceByMetal;
    updateData.attributes = attributes;
    updateData.seo = seo;

    ring = await Ring.findByIdAndUpdate(
        req.params.id,
        updateData,
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
    const images = req.files ? req.files.map(f => f.path) : [];
    let priceByMetal = req.body.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = {}; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : []
    };

    const seo = {
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.keywords
    };

    const diamond = await Diamond.create({ ...req.body, images, priceByMetal, attributes, seo });

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

    // Handle images
    let images = diamond.images;
    if (req.body.existingImages) {
        try {
            images = JSON.parse(req.body.existingImages);
        } catch (e) {
            images = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
        }
    }

    // Append new uploaded files
    if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map(f => f.path)];
    }

    let priceByMetal = req.body.priceByMetal || diamond.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = diamond.priceByMetal; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : (diamond.attributes ? diamond.attributes.metals : [])
    };

    const seo = {
        metaTitle: req.body.metaTitle || (diamond.seo ? diamond.seo.metaTitle : undefined),
        metaDescription: req.body.metaDescription || (diamond.seo ? diamond.seo.metaDescription : undefined),
        metaKeywords: req.body.keywords || (diamond.seo ? diamond.seo.metaKeywords : undefined)
    };

    diamond = await Diamond.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images, priceByMetal, attributes, seo },
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
    const images = req.files ? req.files.map(f => f.path) : [];
    let priceByMetal = req.body.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = {}; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : []
    };

    const seo = {
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.keywords
    };

    const gemstone = await Gemstone.create({ ...req.body, images, priceByMetal, attributes, seo });

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
        images = [...images, ...req.files.map(f => f.path)];
    }

    let priceByMetal = req.body.priceByMetal || gemstone.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = gemstone.priceByMetal; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : (gemstone.attributes ? gemstone.attributes.metals : [])
    };

    const seo = {
        metaTitle: req.body.metaTitle || (gemstone.seo ? gemstone.seo.metaTitle : undefined),
        metaDescription: req.body.metaDescription || (gemstone.seo ? gemstone.seo.metaDescription : undefined),
        metaKeywords: req.body.keywords || (gemstone.seo ? gemstone.seo.metaKeywords : undefined)
    };

    gemstone = await Gemstone.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images, priceByMetal, attributes, seo },
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
    const images = req.files ? req.files.map(f => f.path) : [];

    // Variants and stock for Jewelry
    let variants = req.body.variants;
    if (typeof variants === 'string') {
        try { variants = JSON.parse(variants); } catch (e) { variants = []; }
    }

    let stock = req.body.stock || 0;
    if (variants && variants.length > 0) {
        stock = variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0);
    }

    let priceByMetal = req.body.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = {}; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : [],
        gemstoneType: req.body.gemstoneType,
        totalWeight: req.body.totalWeight,
        dimensions: req.body.dimensions,
        chainLength: req.body.chainLength,
        claspType: req.body.claspType,
        backingType: req.body.backingType,
        dropLength: req.body.dropLength,
        sizeLength: req.body.sizeLength,
        bailType: req.body.bailType,
        chainIncluded: req.body.chainIncluded
    };

    const seo = {
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.keywords
    };

    const jewelry = await Jewelry.create({ ...req.body, images, variants, stock, priceByMetal, attributes, seo });

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
        images = [...images, ...req.files.map(f => f.path)];
    }

    // Variants and stock for Jewelry update
    let variants = req.body.variants || jewelry.variants;
    if (typeof variants === 'string') {
        try { variants = JSON.parse(variants); } catch (e) { variants = jewelry.variants; }
    }

    let stock = req.body.stock || jewelry.stock;
    if (req.body.variants) {
        stock = variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0);
    }

    let priceByMetal = req.body.priceByMetal || jewelry.priceByMetal;
    if (typeof priceByMetal === 'string') {
        try { priceByMetal = JSON.parse(priceByMetal); } catch (e) { priceByMetal = jewelry.priceByMetal; }
    }

    const attributes = {
        metals: req.body.metals ? (Array.isArray(req.body.metals) ? req.body.metals : [req.body.metals]) : (jewelry.attributes ? jewelry.attributes.metals : []),
        gemstoneType: req.body.gemstoneType || (jewelry.attributes ? jewelry.attributes.gemstoneType : undefined),
        totalWeight: req.body.totalWeight || (jewelry.attributes ? jewelry.attributes.totalWeight : undefined),
        dimensions: req.body.dimensions || (jewelry.attributes ? jewelry.attributes.dimensions : undefined),
        chainLength: req.body.chainLength || (jewelry.attributes ? jewelry.attributes.chainLength : undefined),
        claspType: req.body.claspType || (jewelry.attributes ? jewelry.attributes.claspType : undefined),
        backingType: req.body.backingType || (jewelry.attributes ? jewelry.attributes.backingType : undefined),
        dropLength: req.body.dropLength || (jewelry.attributes ? jewelry.attributes.dropLength : undefined),
        sizeLength: req.body.sizeLength || (jewelry.attributes ? jewelry.attributes.sizeLength : undefined),
        bailType: req.body.bailType || (jewelry.attributes ? jewelry.attributes.bailType : undefined),
        chainIncluded: req.body.chainIncluded || (jewelry.attributes ? jewelry.attributes.chainIncluded : undefined)
    };

    const seo = {
        metaTitle: req.body.metaTitle || (jewelry.seo ? jewelry.seo.metaTitle : undefined),
        metaDescription: req.body.metaDescription || (jewelry.seo ? jewelry.seo.metaDescription : undefined),
        metaKeywords: req.body.keywords || (jewelry.seo ? jewelry.seo.metaKeywords : undefined)
    };

    jewelry = await Jewelry.findByIdAndUpdate(
        req.params.id,
        { ...req.body, images, variants, stock, priceByMetal, attributes, seo },
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
        .select('name slug analytics.viewCount price')
        .sort({ 'analytics.viewCount': -1 })
        .limit(10);

    // Get top selling products
    const topSelling = await Model.find({ isActive: true })
        .select('name slug analytics.salesCount price')
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

/**
 * @desc    Global search across all product models
 * @route   GET /api/v1/admin/products/search/global
 * @access  Admin
 */
export const globalSearch = asyncHandler(async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.json({ success: true, count: 0, data: [] });
    }

    const regex = { $regex: search, $options: 'i' };
    const query = {
        $or: [
            { name: regex },
            { sku: regex },
            { 'seo.metaTitle': regex }
        ]
    };

    // Parallel search across all models
    const [rings, diamonds, gemstones, jewelry] = await Promise.all([
        Ring.find(query).limit(5).populate('category', 'name'),
        Diamond.find({ $or: [{ certNumber: regex }, { shape: regex }] }).limit(5),
        Gemstone.find(query).limit(5),
        Jewelry.find(query).limit(5)
    ]);

    const results = [
        ...rings.map(r => ({ ...r._doc, type: 'ring' })),
        ...diamonds.map(d => ({ ...d._doc, type: 'diamond' })),
        ...gemstones.map(g => ({ ...g._doc, type: 'gemstone' })),
        ...jewelry.map(j => ({ ...j._doc, type: 'jewelry' }))
    ];

    res.json({
        success: true,
        count: results.length,
        data: results
    });
});

import mongoose from 'mongoose';

const ringSchema = new mongoose.Schema({
    // ========== BASIC INFO ==========
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    description: {
        type: String,
        trim: true
    },
    longDescription: {
        type: String,
        trim: true
    },

    // ========== CLASSIFICATION ==========
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        index: true
    },
    gender: {
        type: String,
        enum: ['Women', 'Men', 'Unisex'],
        default: 'Women',
        index: true
    },
    collection: {
        type: String,
        default: 'Signature',
        index: true
    },

    // ========== PRICING ==========
    price: {
        type: Number,
        required: true,
        min: 0,
        index: true
    },
    salePrice: {
        type: Number,
        min: 0
    },
    // Price variations by metal
    priceByMetal: {
        type: Map,
        of: Number,
        default: {}
    },

    // ========== ATTRIBUTES (For Filtering) ==========
    attributes: {
        // Metal options
        metals: {
            type: [String],
            default: [],
            index: true
        },

        // Shape/Cut - Reference to Shape model
        shape: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shape',
            index: true
        },

        // Style
        style: {
            type: String,
            index: true
        },

        // Setting type
        setting: {
            type: String
        },

        // Prong style
        prongStyle: {
            type: String
        },

        // Band width
        bandWidth: {
            type: String
        },

        // Stone type (for gemstone rings)
        stoneType: {
            type: String,
            index: true
        },

        // Carat weight (if applicable)
        caratWeight: {
            type: Number,
            min: 0
        },

        // Additional custom attributes
        customAttributes: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },

    // ========== INVENTORY ==========
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    stockStatus: {
        type: String,
        enum: ['in-stock', 'low-stock', 'out-of-stock', 'pre-order'],
        default: 'in-stock',
        index: true
    },
    sizes: {
        type: [String],
        default: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9']
    },
    variants: [{
        size: String,
        stock: { type: Number, default: 0 },
        price: Number, // Optional override price for specific size
        sku: String
    }],

    // ========== IMAGES ==========
    images: {
        type: [String],
        default: []
    },
    imagesByMetal: {
        type: Map,
        of: [String],
        default: {}
    },
    defaultImage: {
        type: String
    },

    // ========== FEATURES & TAGS ==========
    isBestSeller: {
        type: Boolean,
        default: false,
        index: true
    },
    isNewArrival: {
        type: Boolean,
        default: false,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },
    isSustainable: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        default: [],
        index: true
    },

    // ========== SPECIFICATIONS ==========
    specifications: {
        metalPurity: String,
        totalCaratWeight: Number,
        numberOfStones: Number,
        stoneOrigin: String,
        certification: String,
        warranty: String,
        returnPolicy: String
    },

    // ========== SEO (Comprehensive) ==========
    seo: {
        metaTitle: {
            type: String,
            trim: true
        },
        metaDescription: {
            type: String,
            trim: true,
            maxlength: 160
        },
        metaKeywords: {
            type: String,
            trim: true
        },
        canonicalUrl: {
            type: String,
            trim: true
        },
        ogTitle: { type: String },
        ogDescription: { type: String },
        ogImage: { type: String },
        twitterTitle: { type: String },
        twitterDescription: { type: String },
        twitterImage: { type: String },
        structuredData: {
            type: mongoose.Schema.Types.Mixed
        },
        robots: {
            type: String,
            default: 'index, follow'
        },
        focusKeyword: { type: String }
    },

    // ========== REVIEWS & RATINGS ==========
    rating: {
        type: Number,
        default: 5.0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0,
        min: 0
    },

    // ========== ANALYTICS ==========
    analytics: {
        viewCount: { type: Number, default: 0 },
        salesCount: { type: Number, default: 0 },
        wishlistCount: { type: Number, default: 0 },
        cartAddCount: { type: Number, default: 0 },
        conversionRate: { type: Number, default: 0 }
    },

    // ========== STATUS ==========
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    publishedAt: {
        type: Date
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
ringSchema.index({ slug: 1 });
ringSchema.index({ category: 1, subcategory: 1 });
ringSchema.index({ 'attributes.metals': 1 });
ringSchema.index({ 'attributes.shape': 1 });
ringSchema.index({ 'attributes.style': 1 });
ringSchema.index({ 'attributes.stoneType': 1 });
ringSchema.index({ price: 1 });
ringSchema.index({ isActive: 1, stockStatus: 1 });
ringSchema.index({ isBestSeller: 1, isFeatured: 1 });
ringSchema.index({ createdAt: -1 });

// Compound indexes for common queries
ringSchema.index({ category: 1, isActive: 1, stockStatus: 1 });
ringSchema.index({ category: 1, 'attributes.metals': 1, price: 1 });

// ========== VIRTUALS ==========
// Get current price (sale price if available, otherwise base price)
ringSchema.virtual('currentPrice').get(function () {
    return this.salePrice || this.price;
});

// Get discount percentage
ringSchema.virtual('discountPercentage').get(function () {
    if (this.salePrice && this.salePrice < this.price) {
        return Math.round(((this.price - this.salePrice) / this.price) * 100);
    }
    return 0;
});

// Check if on sale
ringSchema.virtual('isOnSale').get(function () {
    return this.salePrice && this.salePrice < this.price;
});

// Get availability status
ringSchema.virtual('isAvailable').get(function () {
    return this.isActive && this.stockStatus !== 'out-of-stock';
});

// ========== METHODS ==========
// Generate SEO-friendly slug
ringSchema.methods.generateSlug = function () {
    return this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Get price for specific metal
ringSchema.methods.getPriceByMetal = function (metal) {
    return this.priceByMetal.get(metal) || this.price;
};

// Update stock status based on quantity
ringSchema.methods.updateStockStatus = function () {
    if (this.stock === 0) {
        this.stockStatus = 'out-of-stock';
    } else if (this.stock <= 5) {
        this.stockStatus = 'low-stock';
    } else {
        this.stockStatus = 'in-stock';
    }
};

// Increment view count
ringSchema.methods.incrementViews = async function () {
    this.analytics.viewCount += 1;
    await this.save();
};

// ========== STATIC METHODS ==========
// Get products with filters
ringSchema.statics.getFiltered = function (filters = {}) {
    const query = { isActive: true };

    if (filters.category) query.category = filters.category;
    if (filters.subcategory) query.subcategory = filters.subcategory;
    if (filters.metal) query['attributes.metals'] = filters.metal;
    if (filters.shape) query['attributes.shape'] = filters.shape;
    if (filters.style) query['attributes.style'] = filters.style;
    if (filters.stoneType) query['attributes.stoneType'] = filters.stoneType;

    if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    return this.find(query);
};

// ========== MIDDLEWARE ==========
// Auto-generate slug and SKU before save
ringSchema.pre('save', async function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = this.generateSlug();

        // Ensure unique slug
        const existingRing = await mongoose.model('Ring').findOne({
            slug: this.slug,
            _id: { $ne: this._id }
        });

        if (existingRing) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }

    // Auto-generate SKU if not provided
    if (!this.sku) {
        this.sku = `RING-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Update stock status
    this.updateStockStatus();

    // Auto-populate SEO fields if empty
    if (!this.seo.metaTitle) {
        this.seo.metaTitle = this.name;
    }

    if (!this.seo.ogTitle) {
        this.seo.ogTitle = this.seo.metaTitle;
    }

    if (!this.seo.twitterTitle) {
        this.seo.twitterTitle = this.seo.metaTitle;
    }

    // Set default image
    if (!this.defaultImage && this.images.length > 0) {
        this.defaultImage = this.images[0];
    }

    next();
});

const Ring = mongoose.model('Ring', ringSchema);
export default Ring;

import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    // ========== BASIC INFO ==========
    pageType: {
        type: String,
        enum: ['category', 'subcategory', 'metal', 'stone', 'style', 'custom'],
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullPath: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    }, // e.g., "/wedding-rings/women/platinum"

    description: {
        type: String,
        trim: true
    },

    // ========== ASSOCIATIONS ==========
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        index: true
    },
    filterIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Filter'
    }],

    // ========== PRODUCT QUERY RULES ==========
    // These rules define which products to show on this page
    productQuery: {
        categorySlug: { type: String },
        subcategorySlug: { type: String },
        filters: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {}
        }, // { metal: 'platinum', shape: 'round' }
        sort: {
            type: String,
            default: 'featured'
        },
        limit: {
            type: Number,
            default: 20
        }
    },

    // ========== PAGE CONTENT ==========
    content: {
        // Hero Section
        hero: {
            image: String,
            title: String,
            subtitle: String,
            description: String,
            ctaText: String,
            ctaLink: String
        },

        // Banner
        banner: {
            image: String,
            text: String,
            backgroundColor: String
        },

        // Introduction
        introText: String,

        // Features
        features: [{
            icon: String,
            title: String,
            description: String
        }],

        // Bottom content (rich text)
        bottomContent: String,

        // Custom sections
        customSections: [{
            type: { type: String },
            title: String,
            content: String,
            image: String,
            order: Number
        }]
    },

    // ========== LAYOUT & DISPLAY ==========
    layout: {
        type: String,
        enum: ['grid', 'list', 'masonry', 'custom'],
        default: 'grid'
    },
    showFilters: {
        type: Boolean,
        default: true
    },
    showSorting: {
        type: Boolean,
        default: true
    },
    showBreadcrumbs: {
        type: Boolean,
        default: true
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
        focusKeyword: { type: String },
        breadcrumbSchema: {
            type: mongoose.Schema.Types.Mixed
        }
    },

    // ========== STATUS & VISIBILITY ==========
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    publishedAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },

    // ========== ANALYTICS ==========
    analytics: {
        viewCount: { type: Number, default: 0 },
        uniqueVisitors: { type: Number, default: 0 },
        avgTimeOnPage: { type: Number, default: 0 },
        bounceRate: { type: Number, default: 0 },
        conversionRate: { type: Number, default: 0 }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
pageSchema.index({ fullPath: 1 }, { unique: true });
pageSchema.index({ slug: 1 });
pageSchema.index({ pageType: 1, isActive: 1 });
pageSchema.index({ categoryId: 1, subcategoryId: 1 });
pageSchema.index({ 'productQuery.categorySlug': 1 });

// ========== VIRTUALS ==========
// Get breadcrumb trail
pageSchema.virtual('breadcrumbs').get(function () {
    const parts = this.fullPath.split('/').filter(Boolean);
    return parts.map((part, index) => ({
        name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: '/' + parts.slice(0, index + 1).join('/')
    }));
});

// ========== METHODS ==========
// Generate full path from components
pageSchema.methods.generateFullPath = function () {
    const parts = [];

    if (this.productQuery.categorySlug) {
        parts.push(this.productQuery.categorySlug);
    }

    if (this.productQuery.subcategorySlug) {
        parts.push(this.productQuery.subcategorySlug);
    }

    if (this.slug && !parts.includes(this.slug)) {
        parts.push(this.slug);
    }

    return '/' + parts.join('/');
};

// Get products for this page
pageSchema.methods.getProducts = async function () {
    const Ring = mongoose.model('Ring');
    const query = { isActive: true };

    // Build query from productQuery rules
    if (this.productQuery.categorySlug) {
        const Category = mongoose.model('Category');
        const category = await Category.findOne({ slug: this.productQuery.categorySlug });
        if (category) {
            query.category = category._id;
        }
    }

    if (this.productQuery.subcategorySlug) {
        const Subcategory = mongoose.model('Subcategory');
        const subcategory = await Subcategory.findOne({ slug: this.productQuery.subcategorySlug });
        if (subcategory) {
            query.subcategory = subcategory._id;
        }
    }

    // Apply filters
    if (this.productQuery.filters) {
        for (const [key, value] of this.productQuery.filters.entries()) {
            if (key === 'metal') {
                query['attributes.metals'] = value;
            } else if (key === 'shape') {
                query['attributes.shape'] = value;
            } else if (key === 'style') {
                query['attributes.style'] = value;
            } else if (key === 'stoneType') {
                query['attributes.stoneType'] = value;
            }
        }
    }

    // Execute query
    let productsQuery = Ring.find(query);

    // Apply sorting
    if (this.productQuery.sort === 'price-asc') {
        productsQuery = productsQuery.sort({ price: 1 });
    } else if (this.productQuery.sort === 'price-desc') {
        productsQuery = productsQuery.sort({ price: -1 });
    } else if (this.productQuery.sort === 'newest') {
        productsQuery = productsQuery.sort({ createdAt: -1 });
    } else if (this.productQuery.sort === 'popular') {
        productsQuery = productsQuery.sort({ 'analytics.salesCount': -1 });
    } else {
        productsQuery = productsQuery.sort({ isFeatured: -1, displayOrder: 1 });
    }

    // Apply limit
    if (this.productQuery.limit) {
        productsQuery = productsQuery.limit(this.productQuery.limit);
    }

    return await productsQuery.exec();
};

// Increment view count
pageSchema.methods.incrementViews = async function () {
    this.analytics.viewCount += 1;
    await this.save();
};

// ========== STATIC METHODS ==========
// Find page by path
pageSchema.statics.findByPath = function (path) {
    return this.findOne({ fullPath: path, isActive: true });
};

// ========== MIDDLEWARE ==========
// Auto-generate fullPath before save
pageSchema.pre('save', async function (next) {
    if (!this.fullPath || this.isModified('productQuery') || this.isModified('slug')) {
        this.fullPath = this.generateFullPath();
    }

    // Auto-populate SEO fields if empty
    if (!this.seo.metaTitle) {
        this.seo.metaTitle = this.title;
    }

    if (!this.seo.canonicalUrl) {
        this.seo.canonicalUrl = this.fullPath;
    }

    if (!this.seo.ogTitle) {
        this.seo.ogTitle = this.seo.metaTitle;
    }

    if (!this.seo.twitterTitle) {
        this.seo.twitterTitle = this.seo.metaTitle;
    }

    // Generate breadcrumb schema for SEO
    if (!this.seo.breadcrumbSchema) {
        const breadcrumbs = this.breadcrumbs;
        this.seo.breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://brilliantearth.com${crumb.path}`
            }))
        };
    }

    next();
});

const Page = mongoose.model('Page', pageSchema);
export default Page;

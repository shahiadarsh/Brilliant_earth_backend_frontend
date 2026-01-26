import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
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
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true
    },

    // ========== RELATIONSHIP ==========
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },

    // ========== DISPLAY & ORDERING ==========
    displayOrder: {
        type: Number,
        default: 0,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },

    // ========== PAGE CONTENT ==========
    title: {
        type: String
    }, // Display title (can be different from name)
    bannerImage: {
        type: String
    },
    bannerText: {
        type: String
    },
    introText: {
        type: String
    },

    // Features/Benefits section
    features: [{
        icon: String,
        title: String,
        description: String
    }],

    // ========== AVAILABLE FILTERS ==========
    // Define which filters are applicable to this subcategory
    availableFilters: {
        metals: {
            type: [String],
            default: ['Platinum', '18K Yellow Gold', '14K White Gold', '14K Rose Gold']
        },
        shapes: {
            type: [String],
            default: ['Round', 'Oval', 'Cushion', 'Pear', 'Princess', 'Emerald']
        },
        styles: {
            type: [String],
            default: []
        },
        stones: {
            type: [String],
            default: []
        },
        priceRange: {
            min: { type: Number, default: 500 },
            max: { type: Number, default: 50000 }
        },
        caratRange: {
            min: { type: Number, default: 0.5 },
            max: { type: Number, default: 15.0 }
        }
    },

    // ========== DEFAULT SORTING ==========
    defaultSort: {
        type: String,
        enum: ['price-asc', 'price-desc', 'newest', 'popular', 'featured'],
        default: 'featured'
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

    // ========== ANALYTICS ==========
    analytics: {
        viewCount: { type: Number, default: 0 },
        productCount: { type: Number, default: 0 },
        conversionRate: { type: Number, default: 0 }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
subcategorySchema.index({ slug: 1, categoryId: 1 }, { unique: true });
subcategorySchema.index({ categoryId: 1, isActive: 1 });
subcategorySchema.index({ displayOrder: 1 });

// ========== VIRTUALS ==========
// Get full path with category
subcategorySchema.virtual('fullPath').get(function () {
    return this.categoryId ? `${this.categoryId.name} > ${this.name}` : this.name;
});

// Get product count
subcategorySchema.virtual('products', {
    ref: 'Ring', // Will need to handle multiple product types
    localField: '_id',
    foreignField: 'subcategory',
    count: true
});

// ========== METHODS ==========
// Generate SEO-friendly slug
subcategorySchema.methods.generateSlug = function () {
    return this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Get breadcrumb trail
subcategorySchema.methods.getBreadcrumbs = async function () {
    const breadcrumbs = [{ name: this.name, slug: this.slug }];

    if (this.categoryId) {
        const category = await mongoose.model('Category').findById(this.categoryId);
        if (category) {
            const categoryCrumbs = await category.getBreadcrumbs();
            breadcrumbs.unshift(...categoryCrumbs);
        }
    }

    return breadcrumbs;
};

// ========== MIDDLEWARE ==========
// Auto-generate slug before save
subcategorySchema.pre('save', async function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = this.generateSlug();

        // Ensure unique slug within category
        const existingSubcategory = await mongoose.model('Subcategory').findOne({
            slug: this.slug,
            categoryId: this.categoryId,
            _id: { $ne: this._id }
        });

        if (existingSubcategory) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }

    // Auto-populate SEO fields if empty
    if (!this.seo.metaTitle) {
        this.seo.metaTitle = this.title || this.name;
    }

    if (!this.seo.ogTitle) {
        this.seo.ogTitle = this.seo.metaTitle;
    }

    if (!this.seo.twitterTitle) {
        this.seo.twitterTitle = this.seo.metaTitle;
    }

    next();
});

// Update category's updatedAt when subcategory is modified
subcategorySchema.post('save', async function (doc) {
    if (doc.categoryId) {
        await mongoose.model('Category').findByIdAndUpdate(
            doc.categoryId,
            { $set: { updatedAt: new Date() } }
        );
    }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;

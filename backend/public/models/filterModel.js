import mongoose from 'mongoose';

const filterSchema = new mongoose.Schema({
    // ========== BASIC INFO ==========
    filterType: {
        type: String,
        enum: ['metal', 'shape', 'stone', 'style', 'color', 'setting', 'band-width', 'prong-style'],
        required: true,
        index: true
    },
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
    isPopular: {
        type: Boolean,
        default: false
    },

    // ========== VISUAL REPRESENTATION ==========
    icon: {
        type: String
    }, // Lucide icon name or custom SVG
    image: {
        type: String
    }, // Thumbnail image URL
    colorCode: {
        type: String
    }, // Hex color code (for color filters)

    // ========== APPLICABILITY ==========
    // Define which categories this filter applies to
    applicableCategories: {
        type: [String],
        default: [],
        index: true
    }, // ['engagement-rings', 'wedding-rings', 'gemstones']

    applicableSubcategories: {
        type: [String],
        default: []
    }, // ['solitaire', 'halo', 'three-stone']

    // ========== PRICING IMPACT ==========
    // Some filters affect pricing (e.g., Platinum vs Gold)
    priceModifier: {
        type: {
            type: String,
            enum: ['percentage', 'fixed', 'none'],
            default: 'none'
        },
        value: {
            type: Number,
            default: 0
        } // +10% or +$500
    },

    // ========== METADATA ==========
    metadata: {
        // Additional info for specific filter types
        // For metals: purity, density, etc.
        // For shapes: ideal proportions, etc.
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    // ========== SEO ==========
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: { type: String },
        focusKeyword: { type: String }
    },

    // ========== ANALYTICS ==========
    analytics: {
        usageCount: { type: Number, default: 0 }, // How many products use this filter
        clickCount: { type: Number, default: 0 }, // How many times users select this
        conversionRate: { type: Number, default: 0 }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
filterSchema.index({ filterType: 1, slug: 1 }, { unique: true });
filterSchema.index({ filterType: 1, isActive: 1 });
filterSchema.index({ applicableCategories: 1 });
filterSchema.index({ displayOrder: 1 });

// ========== VIRTUALS ==========
// Get full display name with type
filterSchema.virtual('fullName').get(function () {
    return `${this.filterType.toUpperCase()}: ${this.name}`;
});

// ========== METHODS ==========
// Generate SEO-friendly slug
filterSchema.methods.generateSlug = function () {
    return this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Check if filter applies to a category
filterSchema.methods.appliesTo = function (categorySlug) {
    return this.applicableCategories.length === 0 ||
        this.applicableCategories.includes(categorySlug);
};

// Get price impact
filterSchema.methods.getPriceImpact = function (basePrice) {
    if (this.priceModifier.type === 'percentage') {
        return basePrice * (this.priceModifier.value / 100);
    } else if (this.priceModifier.type === 'fixed') {
        return this.priceModifier.value;
    }
    return 0;
};

// ========== STATIC METHODS ==========
// Get filters by type
filterSchema.statics.getByType = function (filterType, categorySlug = null) {
    const query = {
        filterType,
        isActive: true
    };

    if (categorySlug) {
        query.$or = [
            { applicableCategories: { $size: 0 } },
            { applicableCategories: categorySlug }
        ];
    }

    return this.find(query).sort({ displayOrder: 1 });
};

// Get all active filters grouped by type
filterSchema.statics.getAllGrouped = async function (categorySlug = null) {
    const filters = await this.find({ isActive: true }).sort({ displayOrder: 1 });

    const grouped = {};
    filters.forEach(filter => {
        if (!categorySlug || filter.appliesTo(categorySlug)) {
            if (!grouped[filter.filterType]) {
                grouped[filter.filterType] = [];
            }
            grouped[filter.filterType].push(filter);
        }
    });

    return grouped;
};

// ========== MIDDLEWARE ==========
// Auto-generate slug before save
filterSchema.pre('save', async function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = this.generateSlug();

        // Ensure unique slug within filter type
        const existingFilter = await mongoose.model('Filter').findOne({
            slug: this.slug,
            filterType: this.filterType,
            _id: { $ne: this._id }
        });

        if (existingFilter) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }

    // Auto-populate SEO fields if empty
    if (!this.seo.metaTitle) {
        this.seo.metaTitle = this.name;
    }

    next();
});

// Update usage count when filter is used
filterSchema.methods.incrementUsage = async function () {
    this.analytics.usageCount += 1;
    await this.save();
};

const Filter = mongoose.model('Filter', filterSchema);
export default Filter;

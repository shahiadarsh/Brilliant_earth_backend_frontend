import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    },

    // ========== HIERARCHY ==========
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: null,
        index: true
    },
    level: {
        type: Number,
        default: 0,
        index: true
    }, // 0 = Main (Engagement Rings), 1 = Sub (Solitaire)

    // ========== DISPLAY & ORDERING ==========
    displayOrder: {
        type: Number,
        default: 0,
        index: true
    },
    isMainCategory: {
        type: Boolean,
        default: false,
        index: true
    }, // Shows in main header navigation
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    showOnHome: {
        type: Boolean,
        default: false
    },
    homePosition: {
        type: String
    }, // 'hero', 'featured', 'popular'

    // ========== HERO SECTION (For Category Landing Pages) ==========
    hero: {
        image: {
            type: String,
            default: '/hero-default.jpg'
        },
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        description: {
            type: String
        },
        quote: {
            type: String
        }, // Inspirational quote for hero
        ctaText: {
            type: String,
            default: 'Explore Collection'
        },
        ctaLink: {
            type: String
        }
    },

    // ========== PAGE CONTENT ==========
    pageContent: {
        bannerImage: { type: String },
        bannerText: { type: String },
        introText: { type: String },
        features: [{
            icon: String,
            title: String,
            description: String
        }],
        bottomContent: { type: String } // Rich text for bottom section
    },

    // ========== MEGA MENU ORGANIZATION ==========
    menuGroup: {
        type: String
    }, // "DESIGN YOUR OWN", "SHOP BY SHAPE", "STYLES"
    menuType: {
        type: String,
        enum: ['list', 'icon-list', 'grid-icons', 'colors', 'promo'],
        default: 'list'
    },
    columnNumber: {
        type: Number,
        default: 1
    },
    menuOrder: {
        type: Number,
        default: 0
    },

    // ========== VISUAL ASSETS ==========
    icon: {
        type: String
    }, // Lucide icon name or SVG path
    image: {
        type: String
    }, // Thumbnail for grid views
    colorCode: {
        type: String
    }, // For color filters (hex code)

    // ========== PROMO SECTION (For Mega Menu) ==========
    promo: {
        isEnabled: {
            type: Boolean,
            default: false
        },
        image: { type: String },
        title: { type: String },
        text: { type: String },
        code: { type: String }, // Promo code
        linkText: {
            type: String,
            default: 'Shop Now'
        },
        link: { type: String }
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
        ogTitle: {
            type: String
        }, // Open Graph title
        ogDescription: {
            type: String
        },
        ogImage: {
            type: String
        },
        twitterTitle: {
            type: String
        },
        twitterDescription: {
            type: String
        },
        twitterImage: {
            type: String
        },
        structuredData: {
            type: mongoose.Schema.Types.Mixed
        }, // JSON-LD schema
        robots: {
            type: String,
            default: 'index, follow'
        }, // 'index, follow' or 'noindex, nofollow'
        focusKeyword: {
            type: String
        } // Primary SEO keyword
    },

    // ========== ANALYTICS & TRACKING ==========
    analytics: {
        viewCount: {
            type: Number,
            default: 0
        },
        clickCount: {
            type: Number,
            default: 0
        },
        conversionRate: {
            type: Number,
            default: 0
        }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
categorySchema.index({ slug: 1 });
categorySchema.index({ isMainCategory: 1, isActive: 1 });
categorySchema.index({ parent: 1, level: 1 });
categorySchema.index({ displayOrder: 1 });

// ========== VIRTUALS ==========
// Get full path (e.g., "Engagement Rings > Solitaire")
categorySchema.virtual('fullPath').get(function () {
    return this.parent ? `${this.parent.name} > ${this.name}` : this.name;
});

// Get subcategories count
categorySchema.virtual('subcategoriesCount', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent',
    count: true
});

// ========== METHODS ==========
// Generate SEO-friendly slug
categorySchema.methods.generateSlug = function () {
    return this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// Get breadcrumb trail
categorySchema.methods.getBreadcrumbs = async function () {
    const breadcrumbs = [{ name: this.name, slug: this.slug }];

    if (this.parent) {
        const parent = await mongoose.model('Category').findById(this.parent);
        if (parent) {
            const parentCrumbs = await parent.getBreadcrumbs();
            breadcrumbs.unshift(...parentCrumbs);
        }
    }

    return breadcrumbs;
};

// ========== MIDDLEWARE ==========
// Auto-generate slug before save
categorySchema.pre('save', async function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = this.generateSlug();

        // Ensure unique slug
        const existingCategory = await mongoose.model('Category').findOne({
            slug: this.slug,
            _id: { $ne: this._id }
        });

        if (existingCategory) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }

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

    next();
});

// Update timestamps on child categories when parent is updated
categorySchema.post('save', async function (doc) {
    if (doc.isModified('name') || doc.isModified('slug')) {
        await mongoose.model('Category').updateMany(
            { parent: doc._id },
            { $set: { updatedAt: new Date() } }
        );
    }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

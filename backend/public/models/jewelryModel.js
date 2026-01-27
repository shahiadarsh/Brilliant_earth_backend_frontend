import mongoose from 'mongoose';

const jewelrySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    collectionName: { type: String },
    priceByMetal: {
        type: Map,
        of: Number,
        default: {}
    },

    // Consolidated attributes for filtering and options
    attributes: {
        metals: {
            type: [String],
            default: [],
            index: true
        },
        // Shape/Cut - Reference to Shape model (for pendants, earrings with stones)
        shape: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shape',
            index: true
        },
        gemstoneType: { type: String },
        totalWeight: { type: String },
        dimensions: { type: String },

        // Necklace Specific
        chainLength: { type: String },
        claspType: { type: String },

        // Earring Specific
        backingType: { type: String },
        dropLength: { type: String },

        // Bracelet Specific
        sizeLength: { type: String },

        // Pendant Specific
        bailType: { type: String },
        chainIncluded: { type: String }
    },

    variants: [{
        size: String,
        stock: { type: Number, default: 0 },
        price: Number,
        sku: String
    }],

    // General Description & Media
    description: { type: String },
    images: [{ type: String }], // Cloudinary URLs

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },

    rating: { type: Number, default: 5.0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    stockStatus: { type: String, enum: ['in-stock', 'out-of-stock', 'backorder'], default: 'in-stock' }

}, { timestamps: true });

const Jewelry = mongoose.model('Jewelry', jewelrySchema);
export default Jewelry;

import mongoose from 'mongoose';

const gemstoneSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Variety (Sapphire, Emerald, etc.)
    color: { type: String, required: true },
    intensity: { type: String },
    shape: { type: String, required: true },
    carat: { type: Number, required: true },
    origin: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    },

    // Technical
    treatment: { type: String },
    hardness: { type: String },
    clarity: { type: String },
    dimensions: { type: String },

    priceByMetal: {
        type: Map,
        of: Number,
        default: {}
    },
    attributes: {
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
        }
    },

    images: [{ type: String }],
    slug: { type: String, required: true, unique: true },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String }
}, { timestamps: true });

const Gemstone = mongoose.model('Gemstone', gemstoneSchema);
export default Gemstone;

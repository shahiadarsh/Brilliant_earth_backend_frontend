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

    // Material Specs
    metalType: { type: String },
    gemstoneType: { type: String },
    totalWeight: { type: String },
    dimensions: { type: String },

    description: { type: String },
    images: [{ type: String }],

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },

    rating: { type: Number, default: 5.0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Jewelry = mongoose.model('Jewelry', jewelrySchema);
export default Jewelry;

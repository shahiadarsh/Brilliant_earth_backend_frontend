import mongoose from 'mongoose';

const diamondSchema = new mongoose.Schema({
    shape: { type: String, required: true },
    carat: { type: Number, required: true },
    cut: { type: String, required: true },
    color: { type: String, required: true },
    clarity: { type: String, required: true },
    origin: { type: String, enum: ['Natural', 'Lab'], required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },

    // Technical Specs
    depth: { type: Number },
    table: { type: Number },
    symmetry: { type: String },
    polish: { type: String },
    fluorescence: { type: String },
    lwRatio: { type: Number },
    certification: { type: String },
    certNumber: { type: String },
    eyeClean: { type: Boolean, default: true },

    images: [{ type: String }],
    slug: { type: String, required: true, unique: true },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String }
}, { timestamps: true });

const Diamond = mongoose.model('Diamond', diamondSchema);
export default Diamond;

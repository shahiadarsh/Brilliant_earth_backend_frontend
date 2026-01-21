import mongoose from 'mongoose';

const ringSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: {
        type: String,
        enum: ['Engagement', 'Wedding'],
        default: 'Engagement'
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex'],
        default: 'Women'
    },
    style: {
        type: String,
        enum: [
            'Solitaire', 'Halo', 'Vintage', 'Hidden Halo', 'Sidestone', 'Three Stone',
            'Classic Band', 'Diamond Band', 'Matte Band', 'Hammered Band', 'Stackable', 'Eternity'
        ],
        required: true
    },
    collection: { type: String, default: 'Signature' },
    metals: [{ type: String }],
    prongStyle: { type: String },
    bandWidth: { type: String },
    description: { type: String },
    images: [{ type: String }],
    isSustainable: { type: Boolean, default: true },

    // SEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },

    rating: { type: Number, default: 5.0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true });

const Ring = mongoose.model('Ring', ringSchema);
export default Ring;

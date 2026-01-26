import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desktopImage: { type: String, required: true },
    mobileImage: { type: String, required: true },
    link: { type: String, required: true },
    buttonText: { type: String, default: 'Shop Now' },
    secondaryLink: { type: String },
    secondaryButtonText: { type: String },
    altText: { type: String },
    description: { type: String },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    position: { type: String, required: true, index: true }, // e.g., 'new-year-left', 'new-year-right'
    status: { type: String, enum: ['Active', 'Paused', 'Scheduled'], default: 'Active' },
    priority: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });

const Promo = mongoose.model('Promo', promoSchema);
export default Promo;

import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    siteName: { type: String, default: 'Ritzin' },
    siteLogo: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },

    // Social Links
    socialLinks: {
        instagram: String,
        facebook: String,
        twitter: String,
        pinterest: String
    },

    // SEO Defaults
    defaultMetaTitle: { type: String },
    defaultMetaDescription: { type: String },

    // Config
    currency: { type: String, default: 'USD' },
    freeShippingThreshold: { type: Number, default: 500 }
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;

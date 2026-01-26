import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        enum: ['Ring', 'Jewelry', 'Diamond', 'Gemstone', 'Pairing']
    },
    // For single products (Ring, Jewelry, Diamond, Gemstone)
    product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'items.productType'
    },
    // For "Save Design" (Pairing of Ring + Stone)
    pairing: {
        ring: { type: mongoose.Schema.Types.ObjectId, ref: 'Ring' },
        stone: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.pairing.stoneType' },
        stoneType: { type: String, enum: ['Diamond', 'Gemstone'] }
    },
    selectedMetal: { type: String },
    selectedSize: { type: String },
    note: { type: String } // User can add a custom note like "Birthday wish"
}, { timestamps: true });

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [wishlistItemSchema]
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;

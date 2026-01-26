import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        enum: ['Ring', 'Jewelry', 'Diamond', 'Gemstone', 'Pairing']
    },
    // For single products
    product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'items.productType'
    },
    // For Builder Pairings
    pairing: {
        ring: { type: mongoose.Schema.Types.ObjectId, ref: 'Ring' },
        stone: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.pairing.stoneType' },
        stoneType: { type: String, enum: ['Diamond', 'Gemstone'] }
    },
    quantity: { type: Number, default: 1 },
    selectedMetal: { type: String },
    selectedSize: { type: String },
    priceAtAddition: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

// Pre-save to calculate total price
cartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((acc, item) => acc + (item.priceAtAddition * item.quantity), 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;

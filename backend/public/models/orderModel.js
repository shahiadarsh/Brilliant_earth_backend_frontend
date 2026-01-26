import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true,
        enum: ['Ring', 'Jewelry', 'Diamond', 'Gemstone', 'Pairing']
    },
    // For single products
    product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'orderItems.productType'
    },
    // For Builder Pairings
    pairing: {
        ring: { type: mongoose.Schema.Types.ObjectId, ref: 'Ring' },
        stone: { type: mongoose.Schema.Types.ObjectId, refPath: 'orderItems.pairing.stoneType' },
        stoneType: { type: String, enum: ['Diamond', 'Gemstone'] }
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    selectedMetal: { type: String },
    selectedSize: { type: String },
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user']
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'Stripe'
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: {
        type: String,
        required: true,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;

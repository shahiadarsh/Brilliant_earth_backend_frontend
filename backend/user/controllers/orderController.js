import asyncHandler from 'express-async-handler';
import Order from '../../public/models/orderModel.js';

// @desc    Get logged in user orders (Order History)
// @route   GET /api/v1/user/orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json({
        success: true,
        results: orders.length,
        data: orders
    });
});

// @desc    Get specific order details for user (Tracking & Detail)
// @route   GET /api/v1/user/orders/:id
// @access  Private
export const getOrderDetails = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('orderItems.product')
        .populate('orderItems.pairing.ring')
        .populate('orderItems.pairing.stone');

    if (order && order.user.toString() === req.user._id.toString()) {
        res.json({
            success: true,
            data: order
        });
    } else {
        res.status(404);
        throw new Error('Order not found or you are not authorized');
    }
});

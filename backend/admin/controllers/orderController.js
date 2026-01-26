import asyncHandler from 'express-async-handler';
import Order from '../../public/models/orderModel.js';

// @desc    Get all orders for management
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'id name email')
        .sort('-createdAt');

    res.json({
        success: true,
        results: orders.length,
        data: orders
    });
});

// @desc    Update order status (Tracking Update)
// @route   PATCH /api/v1/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json({
            success: true,
            data: updatedOrder
        });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PATCH /api/v1/admin/orders/:id/pay
// @access  Private/Admin
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json({ success: true, data: updatedOrder });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

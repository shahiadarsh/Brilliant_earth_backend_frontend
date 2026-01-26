import asyncHandler from 'express-async-handler';
import Ring from '../../public/models/ringModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Order from '../../public/models/orderModel.js';
import User from '../../public/models/userModel.js';

// @desc    Get dashboard stats
// @route   GET /api/v1/admin/dashboard/stats
export const getStats = asyncHandler(async (req, res) => {
    const ringCount = await Ring.countDocuments();
    const diamondCount = await Diamond.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    const orders = await Order.find().sort('-createdAt').limit(5).populate('user', 'name');

    res.json({
        success: true,
        data: {
            counts: { rings: ringCount, diamonds: diamondCount, orders: orderCount, users: userCount },
            recentOrders: orders
        }
    });
});

import asyncHandler from 'express-async-handler';
import Ring from '../../public/models/ringModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Order from '../../public/models/orderModel.js';
import User from '../../public/models/userModel.js';

// @desc    Get dashboard stats
// @route   GET /api/v1/admin/dashboard/stats
export const getStats = asyncHandler(async (req, res) => {
    // 1. Basic Counts
    const ringCount = await Ring.countDocuments();
    const diamondCount = await Diamond.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    // 2. Revenue Calculation
    const revenueData = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // 3. Low Stock Alerts (Across all products)
    const lowStockRings = await Ring.find({ stock: { $gt: 0, $lte: 5 } }).select('name stock').limit(5);
    // You could expand this to other models if needed

    // 4. Recent Data
    const recentOrders = await Order.find().sort('-createdAt').limit(5).populate('user', 'firstName lastName email');
    const recentUsers = await User.find().sort('-createdAt').limit(5).select('-password');

    res.json({
        success: true,
        data: {
            counts: {
                rings: ringCount,
                diamonds: diamondCount,
                orders: orderCount,
                users: userCount,
                revenue: totalRevenue
            },
            alerts: {
                lowStock: lowStockRings
            },
            recentOrders,
            recentUsers
        }
    });
});

import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Ring from '../models/ringModel.js';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';
import Jewelry from '../models/jewelryModel.js';

export const getDashboardStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalPrice' },
                    orderCount: { $sum: 1 }
                }
            }
        ]);

        const userCount = await User.countDocuments();
        const activeOrders = await Order.countDocuments({ isDelivered: false });

        res.status(200).json({
            status: 'success',
            data: {
                totalSales: stats[0]?.totalSales || 0,
                orderCount: stats[0]?.orderCount || 0,
                userCount,
                activeOrders
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getInventoryAlerts = async (req, res) => {
    try {
        const lowStockRings = await Ring.find({ stock: { $lt: 5 } }).limit(5);
        const lowStockDiamonds = await Diamond.find({ stock: { $lt: 5 } }).limit(5);
        const lowStockGemstones = await Gemstone.find({ stock: { $lt: 5 } }).limit(5);
        const lowStockJewelry = await Jewelry.find({ stock: { $lt: 5 } }).limit(5);

        res.status(200).json({
            status: 'success',
            data: {
                alerts: [
                    ...lowStockRings.map(i => ({ name: i.name, type: 'Ring', stock: i.stock })),
                    ...lowStockDiamonds.map(i => ({ name: `${i.carat}ct ${i.shape}`, type: 'Diamond', stock: i.stock })),
                    ...lowStockGemstones.map(i => ({ name: i.type, type: 'Gemstone', stock: i.stock })),
                    ...lowStockJewelry.map(i => ({ name: i.title, type: 'Jewelry', stock: i.stock }))
                ]
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getRecentTransactions = async (req, res) => {
    try {
        const recentOrders = await Order.find()
            .sort('-createdAt')
            .limit(5)
            .populate('user', 'firstName lastName email');

        res.status(200).json({
            status: 'success',
            data: { recentOrders }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

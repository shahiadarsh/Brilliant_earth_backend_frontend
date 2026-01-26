import Promo from '../models/promoModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get active promos for homepage
// @route   GET /api/promos
// @access  Public
export const getActivePromos = asyncHandler(async (req, res) => {
    const promos = await Promo.find({ status: 'Active' }).sort('priority');
    res.json({ success: true, count: promos.length, data: promos });
});

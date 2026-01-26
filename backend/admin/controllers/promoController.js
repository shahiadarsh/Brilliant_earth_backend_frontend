import Promo from '../../public/models/promoModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all promos
// @route   GET /api/admin/management/promos
// @access  Private/Admin
export const getPromos = asyncHandler(async (req, res) => {
    const promos = await Promo.find({}).sort('-createdAt');
    res.json({ success: true, count: promos.length, data: promos });
});

// @desc    Create a promo
// @route   POST /api/admin/management/promos
// @access  Private/Admin
export const createPromo = asyncHandler(async (req, res) => {
    const promo = await Promo.create(req.body);
    res.status(201).json({ success: true, data: promo });
});

// @desc    Update a promo
// @route   PUT /api/admin/management/promos/:id
// @access  Private/Admin
export const updatePromo = asyncHandler(async (req, res) => {
    const promo = await Promo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!promo) {
        res.status(404);
        throw new Error('Promo not found');
    }

    res.json({ success: true, data: promo });
});

// @desc    Delete a promo
// @route   DELETE /api/admin/management/promos/:id
// @access  Private/Admin
export const deletePromo = asyncHandler(async (req, res) => {
    const promo = await Promo.findById(req.params.id);

    if (!promo) {
        res.status(404);
        throw new Error('Promo not found');
    }

    await promo.deleteOne();
    res.json({ success: true, message: 'Promo removed' });
});

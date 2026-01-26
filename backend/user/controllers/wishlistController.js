import asyncHandler from 'express-async-handler';
import Wishlist from '../../public/models/wishlistModel.js';
import Ring from '../../public/models/ringModel.js';
import Jewelry from '../../public/models/jewelryModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Gemstone from '../../public/models/gemstoneModel.js';

// @desc    Get user wishlist
// @route   GET /api/v1/user/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
        .populate('items.product')
        .populate('items.pairing.ring')
        .populate('items.pairing.stone');

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    res.json({ success: true, data: wishlist });
});

// @desc    Add item to wishlist (Includes "Save Design")
// @route   POST /api/v1/user/wishlist
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
    const {
        productType,
        productId,
        pairing,
        selectedMetal,
        selectedSize,
        note
    } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
        wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    // Prevent duplicates
    let isDuplicate = false;
    if (productType === 'Pairing') {
        isDuplicate = wishlist.items.some(item =>
            item.productType === 'Pairing' &&
            item.pairing.ring.toString() === pairing.ringId &&
            item.pairing.stone.toString() === pairing.stoneId
        );
    } else {
        isDuplicate = wishlist.items.some(item =>
            item.product?.toString() === productId &&
            item.productType === productType
        );
    }

    if (isDuplicate) {
        res.status(400);
        throw new Error('Item already in wishlist');
    }

    // Add item
    const newItem = {
        productType,
        selectedMetal,
        selectedSize,
        note
    };

    if (productType === 'Pairing') {
        newItem.pairing = {
            ring: pairing.ringId,
            stone: pairing.stoneId,
            stoneType: pairing.stoneType
        };
    } else {
        newItem.product = productId;
    }

    wishlist.items.push(newItem);
    await wishlist.save();

    res.status(201).json({ success: true, data: wishlist });
});

// @desc    Remove item from wishlist
// @route   DELETE /api/v1/user/wishlist/:itemId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        res.status(404);
        throw new Error('Wishlist not found');
    }

    wishlist.items = wishlist.items.filter(item => item._id.toString() !== req.params.itemId);
    await wishlist.save();

    res.json({ success: true, data: wishlist });
});

// @desc    Clear wishlist
// @route   DELETE /api/v1/user/wishlist
// @access  Private
export const clearWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
        wishlist.items = [];
        await wishlist.save();
    }
    res.json({ success: true, message: 'Wishlist cleared' });
});

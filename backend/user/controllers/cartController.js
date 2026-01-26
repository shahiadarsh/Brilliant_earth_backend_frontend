import asyncHandler from 'express-async-handler';
import Cart from '../../public/models/cartModel.js';
import Ring from '../../public/models/ringModel.js';
import Jewelry from '../../public/models/jewelryModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Gemstone from '../../public/models/gemstoneModel.js';

// @desc    Get user cart
// @route   GET /api/v1/user/cart
export const getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product')
        .populate('items.pairing.ring')
        .populate('items.pairing.stone');

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({ success: true, data: cart });
});

// @desc    Add item to cart
// @route   POST /api/v1/user/cart
export const addToCart = asyncHandler(async (req, res) => {
    const { productType, productId, pairing, quantity = 1, selectedMetal, selectedSize } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    if (productType === 'Pairing') {
        const ring = await Ring.findById(pairing.ringId);
        const stoneModel = pairing.stoneType === 'Gemstone' ? Gemstone : Diamond;
        const stone = await stoneModel.findById(pairing.stoneId);

        cart.items.push({
            productType: 'Pairing',
            pairing: { ring: ring._id, stone: stone._id, stoneType: pairing.stoneType },
            quantity, selectedMetal, selectedSize,
            priceAtAddition: ring.price + stone.price
        });
    } else {
        const itemModels = { Ring, Jewelry, Diamond, Gemstone };
        const product = await itemModels[productType].findById(productId);

        const existingItem = cart.items.find(item =>
            item.product?.toString() === productId &&
            item.selectedMetal === selectedMetal &&
            item.selectedSize === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productType, product: productId, quantity, selectedMetal, selectedSize,
                priceAtAddition: product.price
            });
        }
    }

    await cart.save();
    res.json({ success: true, data: cart });
});

// @desc    Remove from cart
// @route   DELETE /api/v1/user/cart/:itemId
export const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    res.json({ success: true, data: cart });
});

import asyncHandler from 'express-async-handler';
import Ring from '../models/ringModel.js';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';

// @desc    Get compatible stones for a ring
// @route   GET /api/v1/public/builder/compatible-stones/:ringSlug
export const getCompatibleStones = asyncHandler(async (req, res) => {
    const { ringSlug } = req.params;
    const { type = 'diamond', page = 1, limit = 12 } = req.query;

    const ring = await Ring.findOne({ slug: ringSlug });
    if (!ring) {
        res.status(404);
        throw new Error('Ring setting not found');
    }

    let query = {};
    const shapes = ['Round', 'Oval', 'Emerald', 'Cushion', 'Princess', 'Pear', 'Marquise', 'Asscher'];
    const detectedShape = shapes.find(s => ring.name.includes(s));

    if (detectedShape) query.shape = detectedShape;

    const model = type === 'gemstone' ? Gemstone : Diamond;
    const skip = (Number(page) - 1) * Number(limit);
    const stones = await model.find(query).sort('-createdAt').limit(Number(limit)).skip(skip);
    const total = await model.countDocuments(query);

    res.json({
        success: true,
        ringData: { name: ring.name, price: ring.price, image: ring.images[0] },
        data: stones,
        pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
    });
});

// @desc    Get compatible settings for a stone
// @route   GET /api/v1/public/builder/compatible-settings/:stoneSlug
export const getCompatibleSettings = asyncHandler(async (req, res) => {
    const { stoneSlug } = req.params;
    const { type = 'diamond' } = req.query;

    const stoneModel = type === 'gemstone' ? Gemstone : Diamond;
    const stone = await stoneModel.findOne({ slug: stoneSlug });

    if (!stone) {
        res.status(404);
        throw new Error('Stone not found');
    }

    const rings = await Ring.find({
        $or: [
            { name: new RegExp(stone.shape, 'i') },
            { description: new RegExp(stone.shape, 'i') }
        ]
    }).limit(12);

    res.json({
        success: true,
        stoneData: { shape: stone.shape, carat: stone.carat, price: stone.price, image: stone.images[0] },
        data: rings
    });
});

// @desc    Validate pairing
// @route   POST /api/v1/public/builder/validate
export const validatePairing = asyncHandler(async (req, res) => {
    const { ringId, stoneId, stoneType } = req.body;

    const ring = await Ring.findById(ringId);
    const stoneModel = stoneType === 'gemstone' ? Gemstone : Diamond;
    const stone = await stoneModel.findById(stoneId);

    if (!ring || !stone) {
        res.status(404);
        throw new Error('Invalid selection');
    }

    res.json({
        success: true,
        isCompatible: true,
        totalPrice: ring.price + stone.price,
        summary: {
            ring: ring.name,
            stone: `${stone.carat}ct ${stone.shape}`,
            components: [
                { id: ring._id, name: ring.name, price: ring.price, type: 'setting' },
                { id: stone._id, name: 'Center Stone', price: stone.price, type: 'stone' }
            ]
        }
    });
});

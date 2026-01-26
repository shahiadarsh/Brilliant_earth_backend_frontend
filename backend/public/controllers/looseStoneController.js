import asyncHandler from 'express-async-handler';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';

// @desc    Get filter metadata for diamonds/gemstones
// @route   GET /api/v1/public/loose-stones/filters
export const getLooseStoneFilters = asyncHandler(async (req, res) => {
    const { type } = req.query;
    const model = type === 'gemstone' ? Gemstone : Diamond;

    const stats = await model.aggregate([
        {
            $group: {
                _id: null,
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
                minCarat: { $min: "$carat" },
                maxCarat: { $max: "$carat" },
                shapes: { $addToSet: "$shape" },
                colors: { $addToSet: "$color" },
                clarities: { $addToSet: "$clarity" },
                cuts: { $addToSet: "$cut" },
                origins: { $addToSet: "$origin" },
                varieties: { $addToSet: "$type" }
            }
        }
    ]);

    res.json({
        success: true,
        data: stats.length > 0 ? stats[0] : {
            minPrice: 0, maxPrice: 100000, minCarat: 0, maxCarat: 10,
            shapes: [], colors: [], clarities: [], cuts: [], origins: [], varieties: []
        }
    });
});

// @desc    Advanced search for loose stones
// @route   GET /api/v1/public/loose-stones
export const searchLooseStones = asyncHandler(async (req, res) => {
    const {
        type = 'diamond', shape, minCarat, maxCarat, minPrice, maxPrice,
        color, clarity, cut, origin, variety, sort, page = 1, limit = 12
    } = req.query;

    const model = type === 'gemstone' ? Gemstone : Diamond;
    let query = {};

    if (shape) query.shape = { $in: shape.split(',') };
    if (color) query.color = { $in: color.split(',') };
    if (clarity) query.clarity = { $in: clarity.split(',') };
    if (cut) query.cut = { $in: cut.split(',') };
    if (variety) query.type = { $in: variety.split(',') };

    if (minCarat || maxCarat) {
        query.carat = {};
        if (minCarat) query.carat.$gte = Number(minCarat);
        if (maxCarat) query.carat.$lte = Number(maxCarat);
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (origin) query.origin = origin;

    let sortQuery = {};
    switch (sort) {
        case 'price-asc': sortQuery.price = 1; break;
        case 'price-desc': sortQuery.price = -1; break;
        case 'carat-asc': sortQuery.carat = 1; break;
        case 'carat-desc': sortQuery.carat = -1; break;
        default: sortQuery.createdAt = -1;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const stones = await model.find(query).sort(sortQuery).limit(Number(limit)).skip(skip);
    const total = await model.countDocuments(query);

    res.json({
        success: true,
        results: stones.length,
        total,
        data: stones,
        pagination: { page: Number(page), pages: Math.ceil(total / Number(limit)) }
    });
});

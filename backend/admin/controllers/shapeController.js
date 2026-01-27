import asyncHandler from 'express-async-handler';
import Shape from '../../public/models/shapeModel.js';

/**
 * @desc    Get all shapes
 * @route   GET /api/v1/shapes
 * @access  Public
 */
export const getShapes = asyncHandler(async (req, res) => {
    const { applicableTo } = req.query;

    const filter = { isActive: true };

    // Filter by product type if specified
    if (applicableTo) {
        filter.applicableTo = applicableTo;
    }

    const shapes = await Shape.find(filter).sort({ displayOrder: 1, name: 1 });

    res.json({
        success: true,
        count: shapes.length,
        data: shapes
    });
});

/**
 * @desc    Get single shape
 * @route   GET /api/v1/shapes/:id
 * @access  Public
 */
export const getShape = asyncHandler(async (req, res) => {
    const shape = await Shape.findById(req.params.id);

    if (!shape) {
        res.status(404);
        throw new Error('Shape not found');
    }

    res.json({
        success: true,
        data: shape
    });
});

/**
 * @desc    Create shape
 * @route   POST /api/v1/admin/shapes
 * @access  Private/Admin
 */
export const createShape = asyncHandler(async (req, res) => {
    const shape = await Shape.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Shape created successfully',
        data: shape
    });
});

/**
 * @desc    Update shape
 * @route   PUT /api/v1/admin/shapes/:id
 * @access  Private/Admin
 */
export const updateShape = asyncHandler(async (req, res) => {
    let shape = await Shape.findById(req.params.id);

    if (!shape) {
        res.status(404);
        throw new Error('Shape not found');
    }

    shape = await Shape.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Shape updated successfully',
        data: shape
    });
});

/**
 * @desc    Delete shape
 * @route   DELETE /api/v1/admin/shapes/:id
 * @access  Private/Admin
 */
export const deleteShape = asyncHandler(async (req, res) => {
    const shape = await Shape.findById(req.params.id);

    if (!shape) {
        res.status(404);
        throw new Error('Shape not found');
    }

    await shape.deleteOne();

    res.json({
        success: true,
        message: 'Shape deleted successfully'
    });
});

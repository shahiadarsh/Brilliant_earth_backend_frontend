import Ring from '../models/ringModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllRings = async (req, res) => {
    try {
        const totalCount = await Ring.countDocuments();

        const features = new APIFeatures(Ring.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const rings = await features.query;

        res.status(200).json({
            status: 'success',
            results: rings.length,
            totalCount,
            data: { rings }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getRing = async (req, res) => {
    try {
        const ring = await Ring.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { ring }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Ring not found'
        });
    }
};

export const createRing = async (req, res) => {
    try {
        // Handle images if uploaded
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }

        const newRing = await Ring.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { ring: newRing }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const updateRing = async (req, res) => {
    try {
        // Handle images if uploaded
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }

        const ring = await Ring.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { ring }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const deleteRing = async (req, res) => {
    try {
        await Ring.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

import Diamond from '../models/diamondModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllDiamonds = async (req, res) => {
    try {
        const totalCount = await Diamond.countDocuments();

        const features = new APIFeatures(Diamond.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const diamonds = await features.query;

        res.status(200).json({
            status: 'success',
            results: diamonds.length,
            totalCount,
            data: { diamonds }
        });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const getDiamond = async (req, res) => {
    try {
        const diamond = await Diamond.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { diamond } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: 'Diamond not found' });
    }
};

export const createDiamond = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const newDiamond = await Diamond.create(req.body);
        res.status(201).json({ status: 'success', data: { diamond: newDiamond } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateDiamond = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const diamond = await Diamond.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { diamond } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const deleteDiamond = async (req, res) => {
    try {
        await Diamond.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

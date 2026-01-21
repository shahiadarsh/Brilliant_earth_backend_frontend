import Gemstone from '../models/gemstoneModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllGemstones = async (req, res) => {
    try {
        const totalCount = await Gemstone.countDocuments();

        const features = new APIFeatures(Gemstone.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const gemstones = await features.query;

        res.status(200).json({ status: 'success', results: gemstones.length, totalCount, data: { gemstones } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const getGemstone = async (req, res) => {
    try {
        const gemstone = await Gemstone.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { gemstone } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: 'Gemstone not found' });
    }
};

export const createGemstone = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const newGem = await Gemstone.create(req.body);
        res.status(201).json({ status: 'success', data: { gemstone: newGem } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateGemstone = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const gemstone = await Gemstone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { gemstone } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const deleteGemstone = async (req, res) => {
    try {
        await Gemstone.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

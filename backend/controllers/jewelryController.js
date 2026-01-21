import Jewelry from '../models/jewelryModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllJewelry = async (req, res) => {
    try {
        const totalCount = await Jewelry.countDocuments();

        const features = new APIFeatures(Jewelry.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const jewelry = await features.query;

        res.status(200).json({ status: 'success', results: jewelry.length, totalCount, data: { jewelry } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const getJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findById(req.params.id);
        res.status(200).json({ status: 'success', data: { jewelry } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: 'Jewelry not found' });
    }
};

export const createJewelry = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const newJewelry = await Jewelry.create(req.body);
        res.status(201).json({ status: 'success', data: { jewelry: newJewelry } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateJewelry = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            req.body.images = req.files.map(file => file.location);
        }
        const jewelry = await Jewelry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ status: 'success', data: { jewelry } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const deleteJewelry = async (req, res) => {
    try {
        await Jewelry.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

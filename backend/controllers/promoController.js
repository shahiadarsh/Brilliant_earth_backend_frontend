import Promo from '../models/promoModel.js';

export const getAllPromos = async (req, res) => {
    try {
        const promos = await Promo.find().sort('priority');
        res.status(200).json({
            status: 'success',
            results: promos.length,
            data: { promos }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const createPromo = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.location;
        }
        const newPromo = await Promo.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { promo: newPromo }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getPromo = async (req, res) => {
    try {
        const promo = await Promo.findById(req.params.id);
        if (!promo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No promo found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { promo }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const updatePromo = async (req, res) => {
    try {
        const promo = await Promo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!promo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No promo found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { promo }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const deletePromo = async (req, res) => {
    try {
        const promo = await Promo.findByIdAndDelete(req.params.id);
        if (!promo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No promo found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

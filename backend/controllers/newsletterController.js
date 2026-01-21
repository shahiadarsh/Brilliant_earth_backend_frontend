import Newsletter from '../models/newsletterModel.js';

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = await Newsletter.create({ email });
        res.status(201).json({ status: 'success', data: { subscriber } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: 'Email already exists or invalid' });
    }
};

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort('-subscribedAt');
        res.status(200).json({ status: 'success', data: { subscribers } });
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error.message });
    }
};

export const unsubscribe = async (req, res) => {
    try {
        await Newsletter.findOneAndUpdate({ email: req.params.email }, { status: 'Unsubscribed' });
        res.status(200).json({ status: 'success', message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

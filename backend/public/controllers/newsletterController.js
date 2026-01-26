import asyncHandler from 'express-async-handler';
import Newsletter from '../models/newsletterModel.js';

export const subscribeNewsletter = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const exists = await Newsletter.findOne({ email });
    if (exists) { res.status(400); throw new Error('Already subscribed'); }
    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
});

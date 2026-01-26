import asyncHandler from 'express-async-handler';
import Setting from '../../public/models/settingModel.js';

export const getSettings = asyncHandler(async (req, res) => {
    const settings = await Setting.findOne({});
    res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
    let settings = await Setting.findOne({});
    if (!settings) settings = new Setting(req.body);
    else Object.assign(settings, req.body);
    await settings.save();
    res.json({ success: true, data: settings });
});

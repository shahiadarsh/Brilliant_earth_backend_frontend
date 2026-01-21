import Setting from '../models/settingModel.js';

export const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({
                siteName: 'Ritzin',
                contactEmail: 'admin@ritzin.com'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { settings }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const settings = await Setting.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { settings }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

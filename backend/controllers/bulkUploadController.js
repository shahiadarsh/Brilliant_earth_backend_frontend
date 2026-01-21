import fs from 'fs';
import csv from 'csv-parser';
import Ring from '../models/ringModel.js';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';
import Jewelry from '../models/jewelryModel.js';

export const bulkUploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'fail', message: 'Please upload a CSV file' });
        }

        const { type } = req.body; // 'ring', 'diamond', 'gemstone', 'jewelry'
        const results = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    let createdCount = 0;

                    if (type === 'ring') {
                        const rings = await Ring.insertMany(results);
                        createdCount = rings.length;
                    } else if (type === 'diamond') {
                        const diamonds = await Diamond.insertMany(results);
                        createdCount = diamonds.length;
                    } else if (type === 'gemstone') {
                        const gemstones = await Gemstone.insertMany(results);
                        createdCount = gemstones.length;
                    } else if (type === 'jewelry') {
                        const jewelry = await Jewelry.insertMany(results);
                        createdCount = jewelry.length;
                    } else {
                        return res.status(400).json({ status: 'fail', message: 'Invalid product type' });
                    }

                    // Delete the temp file
                    fs.unlinkSync(req.file.path);

                    res.status(201).json({
                        status: 'success',
                        message: `${createdCount} products imported successfully`,
                        count: createdCount
                    });
                } catch (err) {
                    res.status(400).json({ status: 'fail', message: `Import error: ${err.message}` });
                }
            });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ring from './models/ringModel.js';
import Jewelry from './models/jewelryModel.js';
import Diamond from './models/diamondModel.js';
import fs from 'fs';

dotenv.config();

const checkCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const ringCount = await Ring.countDocuments();
        const jewelryCount = await Jewelry.countDocuments();
        const diamondCount = await Diamond.countDocuments();

        const stats = `Rings: ${ringCount}, Jewelry: ${jewelryCount}, Diamonds: ${diamondCount}`;
        fs.writeFileSync('db_stats.txt', stats);
        console.log(stats);

        process.exit();
    } catch (err) {
        fs.writeFileSync('db_stats.txt', 'Error: ' + err.message);
        process.exit(1);
    }
};

checkCounts();

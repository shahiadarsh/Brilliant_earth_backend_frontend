import mongoose from 'mongoose';
import Ring from './models/ringModel.js';
import Jewelry from './models/jewelryModel.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const rCount = await Ring.countDocuments();
        const jCount = await Jewelry.countDocuments();
        const output = `Rings: ${rCount}\nJewelry: ${jCount}`;
        fs.writeFileSync('db_verify.txt', output);
        console.log(output);
        process.exit();
    } catch (err) {
        fs.writeFileSync('db_verify.txt', err.message);
        process.exit(1);
    }
};

check();

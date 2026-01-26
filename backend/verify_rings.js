import mongoose from 'mongoose';
import Ring from './public/models/ringModel.js';
import dotenv from 'dotenv';

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Ring.countDocuments();
        console.log(`Verification: Found ${count} rings in the database.`);
        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verify();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

const logFile = 'debug_log.txt';
if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};

dotenv.config();

log('Connecting to: ' + (process.env.MONGODB_URI ? 'URI PRESENT' : 'URI MISSING'));

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        log('Connected!');
        const collections = await mongoose.connection.db.listCollections().toArray();
        log('Collections: ' + collections.map(c => c.name).join(', '));
        process.exit(0);
    } catch (err) {
        log('Error: ' + err.message);
        process.exit(1);
    }
};

test();

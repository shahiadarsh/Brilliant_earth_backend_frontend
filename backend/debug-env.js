import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading from default location
const result = dotenv.config();

console.log('--- ENV DEBUG START ---');
console.log('Current Directory:', process.cwd());
console.log('__dirname:', __dirname);

if (result.error) {
    console.log('Error loading .env file:', result.error);
} else {
    console.log('.env file parsed successfully');
}

const key = process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_SECRET_ACCESS_KEY;

console.log('AWS_ACCESS_KEY_ID type:', typeof key);
console.log('AWS_ACCESS_KEY_ID value:', key ? key.substring(0, 5) + '...' : 'UNDEFINED or EMPTY');
console.log('AWS_SECRET_ACCESS_KEY type:', typeof secret);
console.log('AWS_SECRET_ACCESS_KEY length:', secret ? secret.length : 0);

console.log('--- ENV DEBUG END ---');

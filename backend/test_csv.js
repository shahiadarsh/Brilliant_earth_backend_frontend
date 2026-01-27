
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const filePath = '../rings_catalog_50.csv'; // Adjust path to project root
const resolvedPath = path.resolve(filePath);

console.log('Testing CSV Parsing...');
console.log('Reading file from:', resolvedPath);

const results = [];

if (!fs.existsSync(resolvedPath)) {
    console.error('File does NOT exist at:', resolvedPath);
    process.exit(1);
}

fs.createReadStream(resolvedPath)
    .pipe(csv())
    .on('data', (data) => {
        // console.log('Row:', data); 
        results.push(data);
    })
    .on('end', () => {
        console.log('Parsing complete.');
        console.log('Total rows parsed:', results.length);
        if (results.length > 0) {
            console.log('First row headers:', Object.keys(results[0]));
            console.log('First row sample:', results[0]);
        }
    })
    .on('error', (err) => {
        console.error('Error parsing:', err);
    });

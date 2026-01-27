
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env
dotenv.config({ path: './frontend/.env.local' }); // Try frontend env first
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: './backend/.env' });
}

console.log('Connecting to DB:', process.env.MONGODB_URI);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MOCK CONSTANTS
const CSV_FILE = 'valid_necklaces_upload.csv';

// DB MODELS
const jewelrySchema = new mongoose.Schema({ title: String, slug: String, category: mongoose.Schema.Types.ObjectId, price: Number, stock: Number }, { strict: false });
const Jewelry = mongoose.model('Jewelry', jewelrySchema);

const categorySchema = new mongoose.Schema({ name: String, slug: String, level: Number }, { strict: false });
const Category = mongoose.model('Category', categorySchema);

async function findCategoryId(name) {
    console.log(`[DEBUG] Finding Category: '${name}'`);
    if (!name) return null;

    // 1. Try finding by Name
    let category = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (category) console.log(`[DEBUG] Found by name: ${category._id}`);

    // 2. Fallback: Try finding by Slug
    if (!category) {
        const slugAttempt = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        console.log(`[DEBUG] Looking for slug: ${slugAttempt}`);
        category = await Category.findOne({ slug: slugAttempt });
        if (category) console.log(`[DEBUG] Found by slug: ${category._id}`);
    }

    // 4. Auto-create
    if (!category) {
        console.log(`[DEBUG] Creating new category: ${name}`);
        try {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
            category = await Category.create({
                name: name,
                slug: slug,
                description: `Collection of ${name}`,
                level: 0,
                isActive: true
            });
            console.log(`[DEBUG] Auto-created: ${category._id}`);
        } catch (error) {
            console.error(`[DEBUG] Create failed:`, error.message);
        }
    }

    return category ? category._id : null;
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://shahiadarsh44:7S7C3y#L%40p7z@cluster0.4pzsx.mongodb.net/brilliant-earth?retryWrites=true&w=majority&appName=Cluster0");
        console.log('DB Connected');

        const results = [];
        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                console.log(`Parsed ${results.length} rows`);

                for (const row of results) {
                    console.log('\n--- Processing Row ---');
                    console.log(JSON.stringify(row));

                    const productData = { ...row };
                    // Header Norm
                    if (!productData.categoryName && productData.Category) productData.categoryName = productData.Category;
                    if (!productData.name && productData.Name) productData.name = productData.Name;

                    console.log(`CategoryName from CSV: '${productData.categoryName}'`);

                    if (productData.categoryName) {
                        const catId = await findCategoryId(productData.categoryName);
                        console.log(`Resolved CatID: ${catId}`);
                        if (!catId) console.error('!!! FAILED TO RESOLVE CATEGORY !!!');
                    } else {
                        console.error('!!! NO CATEGORY NAME !!!');
                    }
                }
                process.exit(0);
            });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();

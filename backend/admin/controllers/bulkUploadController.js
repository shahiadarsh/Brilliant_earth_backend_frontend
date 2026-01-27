import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Ring from '../../public/models/ringModel.js';
import Diamond from '../../public/models/diamondModel.js';
import Gemstone from '../../public/models/gemstoneModel.js';
import Jewelry from '../../public/models/jewelryModel.js';
import Category from '../../public/models/categoryModel.js';

// Helper to find category ID by name or create it if missing
const findCategoryId = async (name) => {
    if (!name) return null;

    // 1. Try finding by Name (Regex for case-insensitivity)
    let category = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    // 2. Fallback: Try finding by Slug
    if (!category) {
        const slugAttempt = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        category = await Category.findOne({ slug: slugAttempt });
    }

    // 3. Fallback for known CSV mismatch (Rings & Settings -> Ring)
    if (!category && (name === 'Rings & Settings' || name.includes('Ring'))) {
        category = await Category.findOne({ name: { $regex: new RegExp('Ring', 'i') } });
    }

    // 4. Auto-create if it creates a new one
    if (!category) {
        try {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            category = await Category.create({
                name: name,
                slug: slug,
                description: `Collection of ${name}`,
                level: 0,
                isActive: true
            });
            console.log(`Auto-created category: ${name}`);
        } catch (error) {
            console.error(`Failed to auto-create category ${name}:`, error);
            // If create failed (likely uniq slug), try finding by slug one last time
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            category = await Category.findOne({ slug: slug });
        }
    }

    return category ? category._id : null;
};

// Helper to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + Date.now();
};

export const bulkUploadProducts = asyncHandler(async (req, res) => {
    const logFile = 'debug_log.txt';
    const log = (msg) => fs.appendFileSync(logFile, msg + '\n');

    log('--- New Request ---');
    log(`File: ${JSON.stringify(req.file)}`);
    log(`Body: ${JSON.stringify(req.body)}`);

    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a CSV file');
    }

    if (fs.existsSync(req.file.path)) {
        log(`File size: ${fs.statSync(req.file.path).size}`);
    } else {
        log('File does not exist on disk!');
    }

    const results = [];
    const productType = req.body.productType || 'jewelry';
    console.log('Processing for Product Type:', productType);

    // Ensure absolute path
    const filePath = path.resolve(req.file.path);
    log(`Reading from: ${filePath}`);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('error', (err) => {
            console.error('CSV Parse Error:', err);
            log(`CSV Parse Error: ${err.message}`);
            res.status(500).json({ success: false, message: 'CSV Parse Error', error: err.message });
        })
        .on('end', async () => {
            log(`CSV Parsing Complete. Rows found: ${results.length}`);
            console.log('CSV Parsing Complete. Rows found:', results.length);
            try {
                let Model;
                switch (productType) {
                    case 'ring': Model = Ring; break;
                    case 'diamond': Model = Diamond; break;
                    case 'gemstone': Model = Gemstone; break;
                    case 'jewelry': Model = Jewelry; break;
                    default: Model = Jewelry;
                }

                const ops = [];
                log(`Processing ${results.length} rows for insertion/update...`);

                for (const row of results) {
                    let productData = { ...row };

                    // Normalize headers
                    if (!productData.sku && productData.SKU) productData.sku = productData.SKU;
                    if (!productData.name && (productData.Name || productData.Title || productData.title)) {
                        productData.name = productData.Name || productData.Title || productData.title;
                    }
                    if (!productData.price && productData.Price) productData.price = productData.Price;
                    if (!productData.stock && productData.Stock) productData.stock = productData.Stock;

                    let effectiveProductType = productType;
                    // Infer type if needed
                    if (productType === 'jewelry' && req.file?.originalname) {
                        const fname = req.file.originalname.toLowerCase();
                        if (fname.includes('ring')) effectiveProductType = 'ring';
                    }

                    // --- Advanced Parsing ---

                    // 1. priceByMetal (Format: "Metal:Price|Metal:Price")
                    if (productData.priceByMetal && typeof productData.priceByMetal === 'string') {
                        const metalMap = {};
                        productData.priceByMetal.split('|').forEach(pair => {
                            const [metal, price] = pair.split(':');
                            if (metal && price) metalMap[metal.trim()] = parseFloat(price.trim());
                        });
                        productData.priceByMetal = metalMap;
                    }

                    // 2. variants (Format: "Size:Stock:Price:SKU|...")
                    if (productData.variants && typeof productData.variants === 'string') {
                        productData.variants = productData.variants.split('|').map(v => {
                            const [size, vStock, vPrice, vSku] = v.split(':');
                            return {
                                size: size?.trim(),
                                stock: parseInt(vStock) || 0,
                                price: vPrice ? parseFloat(vPrice) : undefined,
                                sku: vSku?.trim()
                            };
                        });
                        // Recalculate total stock from variants if missing
                        if (productData.variants.length > 0 && !productData.stock) {
                            productData.stock = productData.variants.reduce((acc, v) => acc + v.stock, 0);
                        }
                    }

                    // 3. metals list (Format: "Metal1|Metal2")
                    if (productData.metals && typeof productData.metals === 'string') {
                        const metalsList = productData.metals.split('|').map(m => m.trim());
                        // Place in attributes if model supports it
                        if (!productData.attributes) productData.attributes = {};
                        productData.attributes.metals = metalsList;
                    }

                    // 4. images (Format: "url1|url2")
                    if (productData.images && typeof productData.images === 'string') {
                        productData.images = productData.images.split('|').map(img => img.trim());
                    }

                    // 5. Basic cleaning
                    if (productData.price) productData.price = parseFloat(productData.price);
                    if (productData.stock) productData.stock = parseInt(productData.stock) || 0;
                    if (!productData.slug && productData.name) productData.slug = generateSlug(productData.name);

                    // Resolve Category
                    const catName = productData.categoryName || productData.Category || (['ring', 'diamond', 'gemstone'].includes(effectiveProductType) ? effectiveProductType + 's' : 'Jewelry');
                    if (!productData.category) {
                        const catId = await findCategoryId(catName);
                        if (catId) productData.category = catId;
                    }

                    // Prepare Upsert Operation
                    if (productData.sku || productData.name) {
                        const filter = productData.sku ? { sku: productData.sku } : { name: productData.name };
                        ops.push({
                            updateOne: {
                                filter,
                                update: { $set: productData },
                                upsert: true
                            }
                        });
                    }
                }

                log(`Ready to process ${ops.length} upsert operations.`);

                if (ops.length > 0) {
                    const result = await Model.bulkWrite(ops);
                    log(`Bulk write complete: ${JSON.stringify(result)}`);
                    res.json({
                        success: true,
                        count: (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0),
                        upserted: result.upsertedCount,
                        modified: result.modifiedCount,
                        message: `Processed ${ops.length} products successfully.`
                    });
                } else {
                    res.json({ success: false, message: 'No valid products found' });
                }

            } catch (error) {
                console.error(error);
                log(`Error processing CSV: ${error.message}`);
                res.status(500).json({
                    success: false,
                    message: 'Error processing CSV',
                    error: error.message
                });
            }
        });
});

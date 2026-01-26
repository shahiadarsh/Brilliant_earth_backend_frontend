import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../public/models/categoryModel.js';
import Subcategory from '../public/models/subcategoryModel.js';
import Filter from '../public/models/filterModel.js';
import Page from '../public/models/pageModel.js';
import Ring from '../public/models/ringModel.js';
import Diamond from '../public/models/diamondModel.js';
import Gemstone from '../public/models/gemstoneModel.js';
import Jewelry from '../public/models/jewelryModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// CLEAR DATABASE
// ========================================

const clearDatabase = async () => {
    try {
        console.log('🗑️  Starting database cleanup...\n');

        // Connect to database
        await connectDB();

        // Delete all data
        const results = await Promise.all([
            Category.deleteMany({}),
            Subcategory.deleteMany({}),
            Filter.deleteMany({}),
            Page.deleteMany({}),
            Ring.deleteMany({}),
            Diamond.deleteMany({}),
            Gemstone.deleteMany({}),
            Jewelry.deleteMany({})
        ]);

        console.log('✅ Database cleared successfully!\n');
        console.log('📊 Deleted Records:');
        console.log(`   - Categories: ${results[0].deletedCount}`);
        console.log(`   - Subcategories: ${results[1].deletedCount}`);
        console.log(`   - Filters: ${results[2].deletedCount}`);
        console.log(`   - Pages: ${results[3].deletedCount}`);
        console.log(`   - Rings: ${results[4].deletedCount}`);
        console.log(`   - Diamonds: ${results[5].deletedCount}`);
        console.log(`   - Gemstones: ${results[6].deletedCount}`);
        console.log(`   - Jewelry: ${results[7].deletedCount}`);
        console.log(`\n   Total: ${results.reduce((sum, r) => sum + r.deletedCount, 0)} records deleted\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    clearDatabase();
}

export default clearDatabase;

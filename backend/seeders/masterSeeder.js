import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../public/config/db.js';
import clearDatabase from './clearDatabase.js';
import seedCategories from './1_categorySeeder.js';
import seedSubcategories from './2_subcategorySeeder.js';
import seedFilters from './3_filterSeeder.js';
import seedPages from './4_pageSeeder.js';

dotenv.config();

// ========================================
// MASTER SEEDER - RUN ALL SEEDERS
// ========================================

const masterSeeder = async () => {
    try {
        console.log('\n🌱 ========================================');
        console.log('   MASTER SEEDER - STARTING');
        console.log('========================================\n');

        const startTime = Date.now();

        // Connect to database
        await connectDB();
        console.log('✅ Connected to database\n');

        // Ask user if they want to clear existing data
        const shouldClear = process.argv.includes('--clear');

        if (shouldClear) {
            console.log('🗑️  Clearing existing data...\n');
            await clearDatabase();
        }

        // Run seeders in order
        console.log('📊 Running seeders in sequence...\n');

        // 1. Categories (no dependencies)
        console.log('1️⃣  Seeding Categories...');
        await seedCategories();

        // 2. Subcategories (depends on Categories)
        console.log('\n2️⃣  Seeding Subcategories...');
        await seedSubcategories();

        // 3. Filters (no dependencies)
        console.log('\n3️⃣  Seeding Filters...');
        await seedFilters();

        // 4. Pages (depends on Categories, Subcategories, Filters)
        console.log('\n4️⃣  Seeding Pages...');
        await seedPages();

        // 5. Products (optional - to be implemented later)
        // console.log('\n5️⃣  Seeding Products...');
        // await seedProducts();

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log('\n========================================');
        console.log('   ✅ MASTER SEEDER COMPLETED!');
        console.log('========================================');
        console.log(`⏱️  Total time: ${duration}s\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Master Seeder Error:', error);
        process.exit(1);
    }
};

// Run master seeder
masterSeeder();

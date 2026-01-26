import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ring from '../models/ringModel.js';
import Jewelry from '../models/jewelryModel.js';
import Category from '../models/categoryModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Ring.deleteMany();
        await Jewelry.deleteMany();

        console.log('Fetching dynamic categories...');
        const engagementCat = await Category.findOne({ slug: 'engagement-rings' });
        const weddingCat = await Category.findOne({ slug: 'wedding-rings' });
        const jewelryCat = await Category.findOne({ slug: 'jewelry' });

        const solitaireCat = await Category.findOne({ slug: 'solitaire' });
        const haloCat = await Category.findOne({ slug: 'halo' });
        const earringCat = await Category.findOne({ slug: 'jewelry-earrings' });

        if (!engagementCat || !earringCat) {
            console.error('Core categories not found! Please run categorySeeder first.');
            process.exit(1);
        }

        console.log('Seeding Dynamic Rings...');
        await Ring.create([
            {
                name: "The Reverie Ring",
                slug: "the-reverie-ring",
                price: 1250,
                category: engagementCat._id,
                subcategory: solitaireCat?._id,
                metals: ["18K Yellow Gold", "18K White Gold", "Platinum"],
                sizes: ["4", "5", "6", "7", "8"],
                description: "A classic and timeless solitaire setting that highlights the center diamond. Each ring is handcrafted to order using ethically sourced materials.",
                images: ["https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6"],
                rating: 4.8
            },
            {
                name: "The Aria Ring",
                slug: "the-aria-ring",
                price: 1450,
                category: engagementCat._id,
                subcategory: haloCat?._id,
                metals: ["Platinum", "14K Rose Gold"],
                description: "Features a delicate halo of diamonds.",
                images: ["https://images.unsplash.com/photo-1543508282-5c1f427f023f"],
                rating: 5.0
            }
        ]);

        console.log('Seeding Dynamic Jewelry...');
        await Jewelry.create([
            {
                title: "Diamond Stud Earrings",
                slug: "diamond-stud-earrings",
                price: 850,
                category: jewelryCat._id,
                subcategory: earringCat._id,
                metalType: "18K White Gold",
                description: "Minimalist yet brilliant earrings.",
                images: ["https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6"],
                rating: 4.9
            }
        ]);

        console.log('Dynamic Products Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error.message);
        process.exit(1);
    }
};

seedProducts();

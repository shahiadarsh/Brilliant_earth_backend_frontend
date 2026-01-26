import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Diamond from '../models/diamondModel.js';
import Gemstone from '../models/gemstoneModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedLooseStones = async () => {
    try {
        await connectDB();

        // Clear existing
        await Diamond.deleteMany();
        await Gemstone.deleteMany();

        console.log('Seeding Diamonds...');
        await Diamond.create([
            {
                shape: "Round",
                carat: 1.25,
                cut: "Super Ideal",
                color: "F",
                clarity: "VS1",
                origin: "Natural",
                price: 8500,
                slug: "1-25-round-f-vs1-natural",
                images: ["https://images.unsplash.com/photo-1598560912005-794762bc3854"]
            },
            {
                shape: "Oval",
                carat: 2.01,
                cut: "Ideal",
                color: "G",
                clarity: "VVS2",
                origin: "Lab",
                price: 4200,
                slug: "2-01-oval-g-vvs2-lab",
                images: ["https://images.unsplash.com/photo-1598560912005-794762bc3854"]
            },
            {
                shape: "Emerald",
                carat: 0.95,
                cut: "Very Good",
                color: "E",
                clarity: "IF",
                origin: "Natural",
                price: 7200,
                slug: "0-95-emerald-e-if-natural",
                images: ["https://images.unsplash.com/photo-1598560912005-794762bc3854"]
            },
            {
                shape: "Cushion",
                carat: 1.50,
                cut: "Ideal",
                color: "D",
                clarity: "VS2",
                origin: "Lab",
                price: 3100,
                slug: "1-50-cushion-d-vs2-lab",
                images: ["https://images.unsplash.com/photo-1598560912005-794762bc3854"]
            }
        ]);

        console.log('Seeding Gemstones...');
        await Gemstone.create([
            {
                type: "Sapphire",
                color: "Royal Blue",
                shape: "Oval",
                carat: 1.85,
                origin: "Madagascar",
                price: 2400,
                slug: "1-85-oval-blue-sapphire",
                clarity: "Eye Clean",
                images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0"]
            },
            {
                type: "Emerald",
                color: "Deep Green",
                shape: "Emerald",
                carat: 2.30,
                origin: "Colombia",
                price: 5800,
                slug: "2-30-emerald-green-colombian",
                clarity: "Slightly Included",
                images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0"]
            }
        ]);

        console.log('Loose Stones Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding loose stones:', error.message);
        process.exit(1);
    }
};

seedLooseStones();

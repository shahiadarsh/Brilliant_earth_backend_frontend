import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shape from '../public/models/shapeModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// SHAPE DATA
// ========================================

const shapes = [
    {
        name: "Round",
        slug: "round",
        description: "Classic round brilliant cut - the most popular diamond shape",
        image: "/images/shapes/round.svg",
        applicableTo: ['ring', 'diamond', 'gemstone', 'jewelry'],
        displayOrder: 1,
        isActive: true
    },
    {
        name: "Princess",
        slug: "princess",
        description: "Square shape with brilliant faceting",
        image: "/images/shapes/princess.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 2,
        isActive: true
    },
    {
        name: "Cushion",
        slug: "cushion",
        description: "Square or rectangular with rounded corners",
        image: "/images/shapes/cushion.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 3,
        isActive: true
    },
    {
        name: "Oval",
        slug: "oval",
        description: "Elongated round brilliant cut",
        image: "/images/shapes/oval.svg",
        applicableTo: ['ring', 'diamond', 'gemstone', 'jewelry'],
        displayOrder: 4,
        isActive: true
    },
    {
        name: "Emerald",
        slug: "emerald",
        description: "Rectangular step cut with cropped corners",
        image: "/images/shapes/emerald.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 5,
        isActive: true
    },
    {
        name: "Pear",
        slug: "pear",
        description: "Teardrop shape combining round and marquise",
        image: "/images/shapes/pear.svg",
        applicableTo: ['ring', 'diamond', 'gemstone', 'jewelry'],
        displayOrder: 6,
        isActive: true
    },
    {
        name: "Marquise",
        slug: "marquise",
        description: "Elongated shape with pointed ends",
        image: "/images/shapes/marquise.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 7,
        isActive: true
    },
    {
        name: "Radiant",
        slug: "radiant",
        description: "Rectangular or square with brilliant faceting",
        image: "/images/shapes/radiant.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 8,
        isActive: true
    },
    {
        name: "Asscher",
        slug: "asscher",
        description: "Square step cut with cropped corners",
        image: "/images/shapes/asscher.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 9,
        isActive: true
    },
    {
        name: "Heart",
        slug: "heart",
        description: "Romantic heart-shaped cut",
        image: "/images/shapes/heart.svg",
        applicableTo: ['ring', 'diamond', 'gemstone', 'jewelry'],
        displayOrder: 10,
        isActive: true
    },
    {
        name: "Trillion",
        slug: "trillion",
        description: "Triangular brilliant cut",
        image: "/images/shapes/trillion.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 11,
        isActive: true
    },
    {
        name: "Baguette",
        slug: "baguette",
        description: "Long rectangular step cut",
        image: "/images/shapes/baguette.svg",
        applicableTo: ['ring', 'diamond', 'gemstone'],
        displayOrder: 12,
        isActive: true
    }
];

// ========================================
// SEED FUNCTION
// ========================================

const seedShapes = async () => {
    try {
        console.log('🌱 Starting Shape Seeder...\n');

        // Connect to database
        await connectDB();

        // Clear existing shapes
        await Shape.deleteMany({});
        console.log('🗑️  Cleared existing shapes\n');

        // Insert shapes
        const createdShapes = await Shape.insertMany(shapes);

        console.log('✅ Shapes seeded successfully!\n');
        console.log('📊 Created Shapes:');
        createdShapes.forEach((shape, index) => {
            console.log(`   ${index + 1}. ${shape.name} (${shape.slug}) - Applies to: ${shape.applicableTo.join(', ')}`);
        });
        console.log(`\n   Total: ${createdShapes.length} shapes\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding shapes:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    seedShapes();
}

export default seedShapes;

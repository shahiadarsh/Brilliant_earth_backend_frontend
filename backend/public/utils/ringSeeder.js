import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ring from '../models/ringModel.js';
import Category from '../models/categoryModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedRings = async () => {
    try {
        const threeStoneCat = await Category.findOne({ name: 'Three Stone' });
        const haloCat = await Category.findOne({ name: 'Halo' });
        // Fallback if specific cats not found, default to Solitaire or similar for seeding safety
        const safeCat = solitaireCat || natureCat;

        const rings = [
            // 1. Solitaire
            {
                name: "Petite Twisted Vine Ring",
                slug: "petite-twisted-vine-ring",
                price: 1200,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: natureCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring2.jfif",
                    "18K Yellow Gold": "/home/ring3.jfif",
                    "14K Rose Gold": "/home/ring4.jfif",
                    "Platinum": "/home/ring5.jfif"
                },
                images: ["/home/ring2.jfif"],
                rating: 5,
                numReviews: 120
            },
            // 2. Nature
            {
                name: "Secret Garden Ring",
                slug: "secret-garden-ring",
                price: 1550,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: natureCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring3.jfif",
                    "18K Yellow Gold": "/home/ring4.jfif",
                    "14K Rose Gold": "/home/ring5.jfif",
                    "Platinum": "/home/ring6.jfif"
                },
                images: ["/home/ring3.jfif"],
                rating: 4.8,
                numReviews: 85
            },
            // 3. Solitaire
            {
                name: "Waverly Ring",
                slug: "waverly-ring",
                price: 1800,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: solitaireCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring4.jfif",
                    "18K Yellow Gold": "/home/ring5.jfif",
                    "14K Rose Gold": "/home/ring6.jfif",
                    "Platinum": "/home/ring7.jfif"
                },
                images: ["/home/ring4.jfif"],
                rating: 4.9,
                numReviews: 210
            },
            // 4. Solitaire
            {
                name: "Luxe Ballad Ring",
                slug: "luxe-ballad-ring",
                price: 2100,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: solitaireCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring5.jfif",
                    "18K Yellow Gold": "/home/ring6.jfif",
                    "14K Rose Gold": "/home/ring7.jfif",
                    "Platinum": "/home/ring2.jfif"
                },
                images: ["/home/ring5.jfif"],
                rating: 5,
                numReviews: 45
            },
            // 5. Three Stone
            {
                name: "Aria Diamond Ring",
                slug: "aria-diamond-ring",
                price: 2400,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: threeStoneCat?._id || safeCat._id,
                metals: ["18K White Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring6.jfif",
                    "Platinum": "/home/ring3.jfif"
                },
                images: ["/home/ring6.jfif"],
                rating: 4.7,
                numReviews: 32
            },
            // 6. Halo
            {
                name: "Valencia Halo Ring",
                slug: "valencia-halo-ring",
                price: 2900,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: haloCat?._id || safeCat._id,
                metals: ["18K White Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring7.jfif",
                    "14K Rose Gold": "/home/ring2.jfif",
                    "Platinum": "/home/ring4.jfif"
                },
                images: ["/home/ring7.jfif"],
                rating: 4.9,
                numReviews: 156
            },
            // 7. Nature
            {
                name: "Willow Diamond Ring",
                slug: "willow-diamond-ring",
                price: 1350,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: natureCat?._id || safeCat._id,
                metals: ["18K Yellow Gold", "14K Rose Gold"],
                imagesByMetal: {
                    "18K Yellow Gold": "/home/ring2.jfif",
                    "14K Rose Gold": "/home/ring3.jfif"
                },
                images: ["/home/ring2.jfif"],
                rating: 4.6,
                numReviews: 67
            },
            // 8. Solitaire
            {
                name: "Elodie Ring",
                slug: "elodie-ring",
                price: 950,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: solitaireCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring3.jfif",
                    "18K Yellow Gold": "/home/ring4.jfif",
                    "14K Rose Gold": "/home/ring5.jfif",
                    "Platinum": "/home/ring6.jfif"
                },
                images: ["/home/ring3.jfif"],
                rating: 4.8,
                numReviews: 89
            },
            // 9. Halo
            {
                name: "Lotus Flower Ring",
                slug: "lotus-flower-ring",
                price: 3200,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: haloCat?._id || safeCat._id,
                metals: ["Platinum"],
                imagesByMetal: {
                    "Platinum": "/home/ring4.jfif"
                },
                images: ["/home/ring4.jfif"],
                rating: 5,
                numReviews: 12
            },
            // 10. Three Stone
            {
                name: "Opera Diamond Ring",
                slug: "opera-diamond-ring",
                price: 2650,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: threeStoneCat?._id || safeCat._id,
                metals: ["18K White Gold", "18K Yellow Gold"],
                imagesByMetal: {
                    "18K White Gold": "/home/ring5.jfif",
                    "18K Yellow Gold": "/home/ring6.jfif"
                },
                images: ["/home/ring5.jfif"],
                rating: 4.7,
                numReviews: 44
            },
            // 11. Solitaire (Gold)
            {
                name: "Comfort Fit Solitaire",
                slug: "comfort-fit-solitaire",
                price: 800,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: solitaireCat?._id || safeCat._id,
                metals: ["18K Yellow Gold", "14K Rose Gold"],
                imagesByMetal: {
                    "18K Yellow Gold": "/home/ring6.jfif",
                    "14K Rose Gold": "/home/ring7.jfif"
                },
                images: ["/home/ring6.jfif"],
                rating: 4.5,
                numReviews: 102
            },
            // 12. Nature
            {
                name: "Wildflower Ring",
                slug: "wildflower-ring",
                price: 1600,
                category: solitaireCat?.parent || safeCat.parent,
                subcategory: natureCat?._id || safeCat._id,
                metals: ["14K Rose Gold", "Platinum"],
                imagesByMetal: {
                    "14K Rose Gold": "/home/ring7.jfif",
                    "Platinum": "/home/ring2.jfif"
                },
                images: ["/home/ring7.jfif"],
                rating: 4.9,
                numReviews: 53
            }
        ];

        await Ring.insertMany(rings);
        console.log('Rings seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding rings:', error);
        process.exit(1);
    }
};

seedRings();

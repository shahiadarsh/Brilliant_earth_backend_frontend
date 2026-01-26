import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../public/models/categoryModel.js';
import Subcategory from '../public/models/subcategoryModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// SUBCATEGORY DATA
// ========================================

const getSubcategories = async () => {
    // Get category IDs
    const engagementRings = await Category.findOne({ slug: 'engagement-rings' });
    const weddingRings = await Category.findOne({ slug: 'wedding-rings' });
    const gemstones = await Category.findOne({ slug: 'gemstones' });
    const jewelry = await Category.findOne({ slug: 'jewelry' });

    return [
        // ========== ENGAGEMENT RINGS SUBCATEGORIES ==========
        {
            name: "Solitaire",
            slug: "solitaire",
            title: "Solitaire Engagement Rings",
            description: "Timeless elegance with a single diamond that captures all the light and attention.",
            categoryId: engagementRings._id,
            displayOrder: 1,
            isActive: true,
            isFeatured: true,
            bannerImage: "/images/subcategories/solitaire.jpg",
            introText: "The solitaire setting is the epitome of classic elegance, featuring a single diamond that takes center stage.",
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion", "Pear", "Princess", "Emerald"],
                styles: ["Classic", "Modern", "Vintage"],
                priceRange: { min: 800, max: 50000 }
            },
            seo: {
                metaTitle: "Solitaire Engagement Rings | Classic Diamond Rings | Brilliant Earth",
                metaDescription: "Shop our collection of timeless solitaire engagement rings featuring ethically sourced diamonds in various shapes and metals.",
                focusKeyword: "solitaire engagement rings"
            }
        },

        {
            name: "Halo",
            slug: "halo",
            title: "Halo Engagement Rings",
            description: "Amplify your center stone's brilliance with a stunning halo of diamonds.",
            categoryId: engagementRings._id,
            displayOrder: 2,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion", "Pear", "Princess"],
                styles: ["Classic", "Modern", "Vintage"],
                priceRange: { min: 1200, max: 60000 }
            },
            seo: {
                metaTitle: "Halo Engagement Rings | Diamond Halo Rings | Brilliant Earth",
                metaDescription: "Discover our halo engagement rings that amplify your center stone with a brilliant circle of diamonds.",
                focusKeyword: "halo engagement rings"
            }
        },

        {
            name: "Three Stone",
            slug: "three-stone",
            title: "Three Stone Engagement Rings",
            description: "Symbolize your past, present, and future with three stunning stones.",
            categoryId: engagementRings._id,
            displayOrder: 3,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold"],
                shapes: ["Round", "Oval", "Cushion", "Emerald"],
                priceRange: { min: 1500, max: 70000 }
            },
            seo: {
                metaTitle: "Three Stone Engagement Rings | Past Present Future Rings",
                metaDescription: "Shop three stone engagement rings symbolizing your past, present, and future together.",
                focusKeyword: "three stone rings"
            }
        },

        {
            name: "Vintage",
            slug: "vintage",
            title: "Vintage Engagement Rings",
            description: "Romantic designs inspired by the elegance of bygone eras.",
            categoryId: engagementRings._id,
            displayOrder: 4,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion", "Pear", "Asscher"],
                priceRange: { min: 1000, max: 55000 }
            },
            seo: {
                metaTitle: "Vintage Engagement Rings | Antique-Inspired Rings",
                metaDescription: "Explore our vintage-inspired engagement rings with intricate details and romantic designs.",
                focusKeyword: "vintage engagement rings"
            }
        },

        {
            name: "Pavé",
            slug: "pave",
            title: "Pavé Engagement Rings",
            description: "Delicate bands adorned with shimmering diamonds for extra sparkle.",
            categoryId: engagementRings._id,
            displayOrder: 5,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion"],
                priceRange: { min: 900, max: 45000 }
            },
            seo: {
                metaTitle: "Pavé Engagement Rings | Diamond Pavé Rings",
                metaDescription: "Shop pavé engagement rings featuring delicate bands adorned with shimmering diamonds.",
                focusKeyword: "pave engagement rings"
            }
        },

        // ========== WEDDING RINGS SUBCATEGORIES ==========
        {
            name: "Women's Bands",
            slug: "women",
            title: "Women's Wedding Bands",
            description: "Elegant wedding bands designed for women in various metals and styles.",
            categoryId: weddingRings._id,
            displayOrder: 1,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                styles: ["Classic", "Diamond", "Eternity", "Stackable"],
                priceRange: { min: 300, max: 15000 }
            },
            seo: {
                metaTitle: "Women's Wedding Bands | Wedding Rings for Women",
                metaDescription: "Shop our collection of women's wedding bands in platinum, gold, and more.",
                focusKeyword: "women's wedding bands"
            }
        },

        {
            name: "Men's Bands",
            slug: "men",
            title: "Men's Wedding Bands",
            description: "Durable and stylish wedding bands crafted for men.",
            categoryId: weddingRings._id,
            displayOrder: 2,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "Tungsten", "Titanium"],
                styles: ["Classic", "Modern", "Textured", "Two-Tone"],
                priceRange: { min: 250, max: 10000 }
            },
            seo: {
                metaTitle: "Men's Wedding Bands | Wedding Rings for Men",
                metaDescription: "Discover durable and stylish men's wedding bands in various metals and designs.",
                focusKeyword: "men's wedding bands"
            }
        },

        {
            name: "Matching Sets",
            slug: "matching-sets",
            title: "Matching Wedding Band Sets",
            description: "Coordinating wedding bands for couples.",
            categoryId: weddingRings._id,
            displayOrder: 3,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold"],
                priceRange: { min: 600, max: 20000 }
            },
            seo: {
                metaTitle: "Matching Wedding Band Sets | Couples Wedding Rings",
                metaDescription: "Find coordinating wedding bands for couples in matching designs.",
                focusKeyword: "matching wedding bands"
            }
        },

        {
            name: "Eternity Bands",
            slug: "eternity",
            title: "Eternity Wedding Bands",
            description: "Bands featuring diamonds all around for endless sparkle.",
            categoryId: weddingRings._id,
            displayOrder: 4,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                priceRange: { min: 800, max: 25000 }
            },
            seo: {
                metaTitle: "Eternity Wedding Bands | Diamond Eternity Rings",
                metaDescription: "Shop eternity bands featuring diamonds all around for endless sparkle.",
                focusKeyword: "eternity bands"
            }
        },

        // ========== GEMSTONES SUBCATEGORIES ==========
        {
            name: "Moissanite Rings",
            slug: "moissanite",
            title: "Moissanite Engagement Rings",
            description: "Brilliant and affordable moissanite engagement rings.",
            categoryId: gemstones._id,
            displayOrder: 1,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion", "Pear"],
                priceRange: { min: 500, max: 5000 }
            },
            seo: {
                metaTitle: "Moissanite Engagement Rings | Brilliant Moissanite Rings",
                metaDescription: "Shop our collection of brilliant moissanite engagement rings - affordable and stunning.",
                focusKeyword: "moissanite engagement rings"
            }
        },

        {
            name: "Sapphire Rings",
            slug: "sapphire",
            title: "Sapphire Engagement Rings",
            description: "Stunning sapphire rings in blue, pink, and other vibrant colors.",
            categoryId: gemstones._id,
            displayOrder: 2,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                shapes: ["Round", "Oval", "Cushion", "Pear"],
                stones: ["Blue Sapphire", "Pink Sapphire", "Yellow Sapphire"],
                priceRange: { min: 800, max: 15000 }
            },
            seo: {
                metaTitle: "Sapphire Engagement Rings | Blue Sapphire Rings",
                metaDescription: "Discover our sapphire engagement rings in blue, pink, and other stunning colors.",
                focusKeyword: "sapphire engagement rings"
            }
        },

        {
            name: "Emerald Rings",
            slug: "emerald",
            title: "Emerald Engagement Rings",
            description: "Lush green emerald rings for a unique and vibrant look.",
            categoryId: gemstones._id,
            displayOrder: 3,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold"],
                shapes: ["Emerald", "Oval", "Cushion"],
                priceRange: { min: 1200, max: 20000 }
            },
            seo: {
                metaTitle: "Emerald Engagement Rings | Green Emerald Rings",
                metaDescription: "Shop our collection of lush green emerald engagement rings.",
                focusKeyword: "emerald engagement rings"
            }
        },

        {
            name: "Morganite Rings",
            slug: "morganite",
            title: "Morganite Engagement Rings",
            description: "Romantic pink morganite rings perfect for a feminine touch.",
            categoryId: gemstones._id,
            displayOrder: 4,
            isActive: true,
            availableFilters: {
                metals: ["14K Rose Gold", "18K Yellow Gold", "14K White Gold"],
                shapes: ["Oval", "Cushion", "Pear"],
                priceRange: { min: 600, max: 8000 }
            },
            seo: {
                metaTitle: "Morganite Engagement Rings | Pink Morganite Rings",
                metaDescription: "Discover romantic pink morganite engagement rings.",
                focusKeyword: "morganite engagement rings"
            }
        },

        // ========== JEWELRY SUBCATEGORIES ==========
        {
            name: "Necklaces",
            slug: "necklaces",
            title: "Diamond & Gemstone Necklaces",
            description: "Elegant necklaces featuring diamonds and gemstones.",
            categoryId: jewelry._id,
            displayOrder: 1,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                stones: ["Diamond", "Sapphire", "Emerald", "Pearl"],
                priceRange: { min: 200, max: 10000 }
            },
            seo: {
                metaTitle: "Diamond Necklaces | Gemstone Necklaces",
                metaDescription: "Shop our collection of elegant diamond and gemstone necklaces.",
                focusKeyword: "diamond necklaces"
            }
        },

        {
            name: "Earrings",
            slug: "earrings",
            title: "Diamond & Gemstone Earrings",
            description: "Stunning earrings from studs to drops.",
            categoryId: jewelry._id,
            displayOrder: 2,
            isActive: true,
            isFeatured: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                stones: ["Diamond", "Sapphire", "Emerald", "Pearl"],
                styles: ["Studs", "Drops", "Hoops"],
                priceRange: { min: 150, max: 8000 }
            },
            seo: {
                metaTitle: "Diamond Earrings | Gemstone Earrings",
                metaDescription: "Discover our collection of diamond and gemstone earrings.",
                focusKeyword: "diamond earrings"
            }
        },

        {
            name: "Bracelets",
            slug: "bracelets",
            title: "Diamond & Gemstone Bracelets",
            description: "Beautiful bracelets and bangles.",
            categoryId: jewelry._id,
            displayOrder: 3,
            isActive: true,
            availableFilters: {
                metals: ["Platinum", "18K Yellow Gold", "14K White Gold", "14K Rose Gold"],
                stones: ["Diamond", "Sapphire", "Emerald"],
                styles: ["Tennis", "Bangle", "Chain"],
                priceRange: { min: 300, max: 15000 }
            },
            seo: {
                metaTitle: "Diamond Bracelets | Gemstone Bracelets",
                metaDescription: "Shop our collection of diamond and gemstone bracelets.",
                focusKeyword: "diamond bracelets"
            }
        }
    ];
};

// ========================================
// SEED FUNCTION
// ========================================

const seedSubcategories = async () => {
    try {
        console.log('🌱 Starting Subcategory Seeder...\n');

        // Connect to database
        await connectDB();

        // Get subcategories data
        const subcategories = await getSubcategories();

        // Clear existing subcategories
        await Subcategory.deleteMany({});
        console.log('🗑️  Cleared existing subcategories\n');

        // Insert subcategories
        const createdSubcategories = await Subcategory.insertMany(subcategories);

        console.log('✅ Subcategories seeded successfully!\n');
        console.log('📊 Created Subcategories:');
        createdSubcategories.forEach((subcat, index) => {
            console.log(`   ${index + 1}. ${subcat.name} (${subcat.slug})`);
        });
        console.log(`\n   Total: ${createdSubcategories.length} subcategories\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding subcategories:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    seedSubcategories();
}

export default seedSubcategories;

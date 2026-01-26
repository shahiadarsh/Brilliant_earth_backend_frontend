import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Filter from '../public/models/filterModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// FILTER DATA
// ========================================

const filters = [
    // ========== METALS ==========
    {
        filterType: "metal",
        name: "Platinum",
        slug: "platinum",
        description: "The most durable and pure precious metal",
        displayOrder: 1,
        isActive: true,
        isPopular: true,
        icon: "Circle",
        colorCode: "#E5E4E2",
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: 20 },
        seo: {
            metaTitle: "Platinum Rings | Platinum Jewelry",
            metaDescription: "Shop our collection of platinum rings and jewelry",
            focusKeyword: "platinum rings"
        }
    },
    {
        filterType: "metal",
        name: "18K Yellow Gold",
        slug: "18k-yellow-gold",
        description: "Classic warm yellow gold",
        displayOrder: 2,
        isActive: true,
        isPopular: true,
        icon: "Circle",
        colorCode: "#FFD700",
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: 10 },
        seo: {
            metaTitle: "18K Yellow Gold Rings",
            focusKeyword: "yellow gold rings"
        }
    },
    {
        filterType: "metal",
        name: "14K White Gold",
        slug: "14k-white-gold",
        description: "Bright white gold with rhodium plating",
        displayOrder: 3,
        isActive: true,
        isPopular: true,
        icon: "Circle",
        colorCode: "#F5F5F5",
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: 0 },
        seo: {
            metaTitle: "14K White Gold Rings",
            focusKeyword: "white gold rings"
        }
    },
    {
        filterType: "metal",
        name: "14K Rose Gold",
        slug: "14k-rose-gold",
        description: "Romantic pink-tinted gold",
        displayOrder: 4,
        isActive: true,
        isPopular: true,
        icon: "Circle",
        colorCode: "#B76E79",
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: 0 },
        seo: {
            metaTitle: "14K Rose Gold Rings",
            focusKeyword: "rose gold rings"
        }
    },
    {
        filterType: "metal",
        name: "14K Yellow Gold",
        slug: "14k-yellow-gold",
        description: "Classic yellow gold",
        displayOrder: 5,
        isActive: true,
        icon: "Circle",
        colorCode: "#FFD700",
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: 0 }
    },
    {
        filterType: "metal",
        name: "Tungsten",
        slug: "tungsten",
        description: "Extremely durable and scratch-resistant",
        displayOrder: 6,
        isActive: true,
        icon: "Circle",
        colorCode: "#3C3C3C",
        applicableCategories: ["wedding-rings"],
        priceModifier: { type: "percentage", value: -30 }
    },
    {
        filterType: "metal",
        name: "Titanium",
        slug: "titanium",
        description: "Lightweight and hypoallergenic",
        displayOrder: 7,
        isActive: true,
        icon: "Circle",
        colorCode: "#878681",
        applicableCategories: ["wedding-rings"],
        priceModifier: { type: "percentage", value: -25 }
    },

    // ========== SHAPES ==========
    {
        filterType: "shape",
        name: "Round",
        slug: "round",
        description: "The most brilliant and popular diamond shape",
        displayOrder: 1,
        isActive: true,
        isPopular: true,
        icon: "Circle",
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"],
        seo: {
            metaTitle: "Round Diamond Rings",
            focusKeyword: "round diamond"
        }
    },
    {
        filterType: "shape",
        name: "Oval",
        slug: "oval",
        description: "Elongated shape that makes fingers look longer",
        displayOrder: 2,
        isActive: true,
        isPopular: true,
        icon: "Ellipsis",
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"],
        seo: {
            metaTitle: "Oval Diamond Rings",
            focusKeyword: "oval diamond"
        }
    },
    {
        filterType: "shape",
        name: "Cushion",
        slug: "cushion",
        description: "Vintage-inspired with rounded corners",
        displayOrder: 3,
        isActive: true,
        isPopular: true,
        icon: "Square",
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"],
        seo: {
            metaTitle: "Cushion Cut Diamond Rings",
            focusKeyword: "cushion cut diamond"
        }
    },
    {
        filterType: "shape",
        name: "Pear",
        slug: "pear",
        description: "Teardrop shape combining round and marquise",
        displayOrder: 4,
        isActive: true,
        icon: "Droplet",
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"],
        seo: {
            metaTitle: "Pear Shaped Diamond Rings",
            focusKeyword: "pear diamond"
        }
    },
    {
        filterType: "shape",
        name: "Princess",
        slug: "princess",
        description: "Square shape with brilliant faceting",
        displayOrder: 5,
        isActive: true,
        icon: "Square",
        applicableCategories: ["engagement-rings", "gemstones"],
        seo: {
            metaTitle: "Princess Cut Diamond Rings",
            focusKeyword: "princess cut diamond"
        }
    },
    {
        filterType: "shape",
        name: "Emerald",
        slug: "emerald",
        description: "Rectangular with step-cut facets",
        displayOrder: 6,
        isActive: true,
        icon: "Rectangle",
        applicableCategories: ["engagement-rings", "gemstones"],
        seo: {
            metaTitle: "Emerald Cut Diamond Rings",
            focusKeyword: "emerald cut diamond"
        }
    },
    {
        filterType: "shape",
        name: "Asscher",
        slug: "asscher",
        description: "Square emerald cut with cropped corners",
        displayOrder: 7,
        isActive: true,
        icon: "Square",
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "shape",
        name: "Radiant",
        slug: "radiant",
        description: "Rectangular with brilliant faceting",
        displayOrder: 8,
        isActive: true,
        icon: "Rectangle",
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "shape",
        name: "Marquise",
        slug: "marquise",
        description: "Elongated with pointed ends",
        displayOrder: 9,
        isActive: true,
        icon: "Ellipsis",
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "shape",
        name: "Heart",
        slug: "heart",
        description: "Romantic heart-shaped diamond",
        displayOrder: 10,
        isActive: true,
        icon: "Heart",
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"]
    },

    // ========== STONES ==========
    {
        filterType: "stone",
        name: "Lab Diamond",
        slug: "lab-diamond",
        description: "Ethically created diamonds",
        displayOrder: 1,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "jewelry"],
        seo: {
            metaTitle: "Lab Grown Diamond Rings",
            focusKeyword: "lab grown diamond"
        }
    },
    {
        filterType: "stone",
        name: "Natural Diamond",
        slug: "natural-diamond",
        description: "Ethically sourced natural diamonds",
        displayOrder: 2,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "jewelry"],
        seo: {
            metaTitle: "Natural Diamond Rings",
            focusKeyword: "natural diamond"
        }
    },
    {
        filterType: "stone",
        name: "Moissanite",
        slug: "moissanite",
        description: "Brilliant and affordable alternative",
        displayOrder: 3,
        isActive: true,
        isPopular: true,
        applicableCategories: ["gemstones", "jewelry"],
        priceModifier: { type: "percentage", value: -60 },
        seo: {
            metaTitle: "Moissanite Rings",
            focusKeyword: "moissanite"
        }
    },
    {
        filterType: "stone",
        name: "Sapphire",
        slug: "sapphire",
        description: "Vibrant blue and colored sapphires",
        displayOrder: 4,
        isActive: true,
        isPopular: true,
        applicableCategories: ["gemstones", "jewelry"],
        seo: {
            metaTitle: "Sapphire Rings",
            focusKeyword: "sapphire"
        }
    },
    {
        filterType: "stone",
        name: "Emerald",
        slug: "emerald-stone",
        description: "Lush green emeralds",
        displayOrder: 5,
        isActive: true,
        applicableCategories: ["gemstones", "jewelry"],
        seo: {
            metaTitle: "Emerald Rings",
            focusKeyword: "emerald"
        }
    },
    {
        filterType: "stone",
        name: "Ruby",
        slug: "ruby",
        description: "Deep red rubies",
        displayOrder: 6,
        isActive: true,
        applicableCategories: ["gemstones", "jewelry"]
    },
    {
        filterType: "stone",
        name: "Morganite",
        slug: "morganite",
        description: "Romantic pink gemstone",
        displayOrder: 7,
        isActive: true,
        applicableCategories: ["gemstones", "jewelry"]
    },
    {
        filterType: "stone",
        name: "Aquamarine",
        slug: "aquamarine",
        description: "Serene blue gemstone",
        displayOrder: 8,
        isActive: true,
        applicableCategories: ["gemstones", "jewelry"]
    },
    {
        filterType: "stone",
        name: "Pearl",
        slug: "pearl",
        description: "Classic cultured pearls",
        displayOrder: 9,
        isActive: true,
        applicableCategories: ["jewelry"]
    },

    // ========== STYLES ==========
    {
        filterType: "style",
        name: "Solitaire",
        slug: "solitaire-style",
        description: "Single stone setting",
        displayOrder: 1,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "style",
        name: "Halo",
        slug: "halo-style",
        description: "Center stone surrounded by smaller diamonds",
        displayOrder: 2,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "style",
        name: "Three Stone",
        slug: "three-stone-style",
        description: "Three stones representing past, present, future",
        displayOrder: 3,
        isActive: true,
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "style",
        name: "Vintage",
        slug: "vintage-style",
        description: "Antique-inspired designs",
        displayOrder: 4,
        isActive: true,
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"]
    },
    {
        filterType: "style",
        name: "Modern",
        slug: "modern-style",
        description: "Contemporary and sleek designs",
        displayOrder: 5,
        isActive: true,
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"]
    },
    {
        filterType: "style",
        name: "Classic",
        slug: "classic-style",
        description: "Timeless traditional designs",
        displayOrder: 6,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "wedding-rings", "gemstones", "jewelry"]
    },
    {
        filterType: "style",
        name: "Pavé",
        slug: "pave-style",
        description: "Small diamonds set closely together",
        displayOrder: 7,
        isActive: true,
        applicableCategories: ["engagement-rings", "wedding-rings", "jewelry"]
    },
    {
        filterType: "style",
        name: "Side Stone",
        slug: "side-stone-style",
        description: "Accent stones on the sides",
        displayOrder: 8,
        isActive: true,
        applicableCategories: ["engagement-rings", "gemstones"]
    },

    // ========== SETTINGS ==========
    {
        filterType: "setting",
        name: "Prong",
        slug: "prong",
        description: "Metal claws holding the stone",
        displayOrder: 1,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "gemstones"]
    },
    {
        filterType: "setting",
        name: "Bezel",
        slug: "bezel",
        description: "Metal rim surrounding the stone",
        displayOrder: 2,
        isActive: true,
        applicableCategories: ["engagement-rings", "gemstones", "jewelry"]
    },
    {
        filterType: "setting",
        name: "Pavé",
        slug: "pave-setting",
        description: "Small stones set closely together",
        displayOrder: 3,
        isActive: true,
        applicableCategories: ["engagement-rings", "wedding-rings"]
    },
    {
        filterType: "setting",
        name: "Channel",
        slug: "channel",
        description: "Stones set in a channel",
        displayOrder: 4,
        isActive: true,
        applicableCategories: ["wedding-rings"]
    },
    {
        filterType: "setting",
        name: "Tension",
        slug: "tension",
        description: "Stone held by tension of the band",
        displayOrder: 5,
        isActive: true,
        applicableCategories: ["engagement-rings"]
    },

    // ========== BAND WIDTHS ==========
    {
        filterType: "band-width",
        name: "2mm",
        slug: "2mm",
        description: "Delicate thin band",
        displayOrder: 1,
        isActive: true,
        applicableCategories: ["engagement-rings", "wedding-rings"]
    },
    {
        filterType: "band-width",
        name: "2.5mm",
        slug: "2-5mm",
        description: "Slim band",
        displayOrder: 2,
        isActive: true,
        applicableCategories: ["engagement-rings", "wedding-rings"]
    },
    {
        filterType: "band-width",
        name: "3mm",
        slug: "3mm",
        description: "Medium band",
        displayOrder: 3,
        isActive: true,
        isPopular: true,
        applicableCategories: ["engagement-rings", "wedding-rings"]
    },
    {
        filterType: "band-width",
        name: "4mm",
        slug: "4mm",
        description: "Wide band",
        displayOrder: 4,
        isActive: true,
        applicableCategories: ["wedding-rings"]
    },
    {
        filterType: "band-width",
        name: "5mm",
        slug: "5mm",
        description: "Extra wide band",
        displayOrder: 5,
        isActive: true,
        applicableCategories: ["wedding-rings"]
    },
    {
        filterType: "band-width",
        name: "6mm",
        slug: "6mm",
        description: "Very wide band",
        displayOrder: 6,
        isActive: true,
        applicableCategories: ["wedding-rings"]
    }
];

// ========================================
// SEED FUNCTION
// ========================================

const seedFilters = async () => {
    try {
        console.log('🌱 Starting Filter Seeder...\n');

        // Connect to database
        await connectDB();

        // Clear existing filters
        await Filter.deleteMany({});
        console.log('🗑️  Cleared existing filters\n');

        // Insert filters
        const createdFilters = await Filter.insertMany(filters);

        console.log('✅ Filters seeded successfully!\n');

        // Group by type for display
        const grouped = createdFilters.reduce((acc, filter) => {
            if (!acc[filter.filterType]) {
                acc[filter.filterType] = [];
            }
            acc[filter.filterType].push(filter.name);
            return acc;
        }, {});

        console.log('📊 Created Filters by Type:');
        Object.entries(grouped).forEach(([type, names]) => {
            console.log(`\n   ${type.toUpperCase()}:`);
            names.forEach((name, index) => {
                console.log(`      ${index + 1}. ${name}`);
            });
        });

        console.log(`\n   Total: ${createdFilters.length} filters\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding filters:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    seedFilters();
}

export default seedFilters;

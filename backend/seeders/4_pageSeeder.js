import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Page from '../public/models/pageModel.js';
import Category from '../public/models/categoryModel.js';
import Subcategory from '../public/models/subcategoryModel.js';
import Filter from '../public/models/filterModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// PAGE DATA GENERATOR
// ========================================

const getPages = async () => {
    // Get necessary IDs
    const weddingRings = await Category.findOne({ slug: 'wedding-rings' });
    const gemstones = await Category.findOne({ slug: 'gemstones' });
    const jewelry = await Category.findOne({ slug: 'jewelry' });

    const womenBands = await Subcategory.findOne({ slug: 'women' });
    const menBands = await Subcategory.findOne({ slug: 'men' });

    const platinum = await Filter.findOne({ slug: 'platinum', filterType: 'metal' });
    const yellowGold = await Filter.findOne({ slug: '18k-yellow-gold', filterType: 'metal' });
    const whiteGold = await Filter.findOne({ slug: '14k-white-gold', filterType: 'metal' });
    const roseGold = await Filter.findOne({ slug: '14k-rose-gold', filterType: 'metal' });
    const tungsten = await Filter.findOne({ slug: 'tungsten', filterType: 'metal' });

    const moissanite = await Filter.findOne({ slug: 'moissanite', filterType: 'stone' });
    const sapphire = await Filter.findOne({ slug: 'sapphire', filterType: 'stone' });
    const emeraldStone = await Filter.findOne({ slug: 'emerald-stone', filterType: 'stone' });

    const pages = [];

    // ========== WEDDING RINGS - WOMEN'S BY METAL ==========
    if (weddingRings && womenBands && platinum) {
        pages.push({
            pageType: "metal",
            title: "Platinum Wedding Rings for Women",
            slug: "platinum",
            fullPath: "/wedding-rings/women/platinum",
            description: "Discover our collection of platinum wedding bands for women - durable, pure, and timeless.",
            categoryId: weddingRings._id,
            subcategoryId: womenBands._id,
            filterIds: [platinum._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "women",
                filters: new Map([['metal', 'Platinum']]),
                sort: "featured",
                limit: 20
            },
            content: {
                hero: {
                    image: "/images/pages/platinum-women.jpg",
                    title: "Platinum Wedding Rings for Women",
                    description: "Timeless and durable platinum bands"
                },
                introText: "Platinum is the most durable and pure precious metal, perfect for your wedding band."
            },
            isActive: true,
            seo: {
                metaTitle: "Platinum Wedding Rings for Women | Brilliant Earth",
                metaDescription: "Shop our collection of platinum wedding bands for women. Durable, pure, and timeless designs.",
                focusKeyword: "platinum wedding rings women"
            }
        });
    }

    if (weddingRings && womenBands && yellowGold) {
        pages.push({
            pageType: "metal",
            title: "Yellow Gold Wedding Rings for Women",
            slug: "yellow-gold",
            fullPath: "/wedding-rings/women/yellow-gold",
            categoryId: weddingRings._id,
            subcategoryId: womenBands._id,
            filterIds: [yellowGold._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "women",
                filters: new Map([['metal', '18K Yellow Gold']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Yellow Gold Wedding Rings for Women | Brilliant Earth",
                metaDescription: "Shop classic yellow gold wedding bands for women.",
                focusKeyword: "yellow gold wedding rings"
            }
        });
    }

    if (weddingRings && womenBands && whiteGold) {
        pages.push({
            pageType: "metal",
            title: "White Gold Wedding Rings for Women",
            slug: "white-gold",
            fullPath: "/wedding-rings/women/white-gold",
            categoryId: weddingRings._id,
            subcategoryId: womenBands._id,
            filterIds: [whiteGold._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "women",
                filters: new Map([['metal', '14K White Gold']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "White Gold Wedding Rings for Women | Brilliant Earth",
                metaDescription: "Shop white gold wedding bands for women.",
                focusKeyword: "white gold wedding rings"
            }
        });
    }

    if (weddingRings && womenBands && roseGold) {
        pages.push({
            pageType: "metal",
            title: "Rose Gold Wedding Rings for Women",
            slug: "rose-gold",
            fullPath: "/wedding-rings/women/rose-gold",
            categoryId: weddingRings._id,
            subcategoryId: womenBands._id,
            filterIds: [roseGold._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "women",
                filters: new Map([['metal', '14K Rose Gold']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Rose Gold Wedding Rings for Women | Brilliant Earth",
                metaDescription: "Shop romantic rose gold wedding bands for women.",
                focusKeyword: "rose gold wedding rings"
            }
        });
    }

    // ========== WEDDING RINGS - MEN'S BY METAL ==========
    if (weddingRings && menBands && platinum) {
        pages.push({
            pageType: "metal",
            title: "Platinum Wedding Rings for Men",
            slug: "platinum",
            fullPath: "/wedding-rings/men/platinum",
            categoryId: weddingRings._id,
            subcategoryId: menBands._id,
            filterIds: [platinum._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "men",
                filters: new Map([['metal', 'Platinum']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Platinum Wedding Rings for Men | Brilliant Earth",
                metaDescription: "Shop durable platinum wedding bands for men.",
                focusKeyword: "platinum wedding rings men"
            }
        });
    }

    if (weddingRings && menBands && tungsten) {
        pages.push({
            pageType: "metal",
            title: "Tungsten Wedding Rings for Men",
            slug: "tungsten",
            fullPath: "/wedding-rings/men/tungsten",
            categoryId: weddingRings._id,
            subcategoryId: menBands._id,
            filterIds: [tungsten._id],
            productQuery: {
                categorySlug: "wedding-rings",
                subcategorySlug: "men",
                filters: new Map([['metal', 'Tungsten']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Tungsten Wedding Rings for Men | Brilliant Earth",
                metaDescription: "Shop scratch-resistant tungsten wedding bands for men.",
                focusKeyword: "tungsten wedding rings"
            }
        });
    }

    // ========== GEMSTONES - PRESET RINGS BY STONE ==========
    const moissaniteSubcat = await Subcategory.findOne({ slug: 'moissanite' });
    const sapphireSubcat = await Subcategory.findOne({ slug: 'sapphire' });
    const emeraldSubcat = await Subcategory.findOne({ slug: 'emerald' });

    if (gemstones && moissaniteSubcat && moissanite) {
        pages.push({
            pageType: "stone",
            title: "Moissanite Engagement Rings",
            slug: "moissanite",
            fullPath: "/gemstones/preset-rings/moissanite",
            categoryId: gemstones._id,
            subcategoryId: moissaniteSubcat._id,
            filterIds: [moissanite._id],
            productQuery: {
                categorySlug: "gemstones",
                subcategorySlug: "moissanite",
                filters: new Map([['stoneType', 'Moissanite']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Moissanite Engagement Rings | Brilliant Earth",
                metaDescription: "Shop brilliant and affordable moissanite engagement rings.",
                focusKeyword: "moissanite engagement rings"
            }
        });
    }

    if (gemstones && sapphireSubcat && sapphire) {
        pages.push({
            pageType: "stone",
            title: "Sapphire Engagement Rings",
            slug: "sapphire",
            fullPath: "/gemstones/preset-rings/sapphire",
            categoryId: gemstones._id,
            subcategoryId: sapphireSubcat._id,
            filterIds: [sapphire._id],
            productQuery: {
                categorySlug: "gemstones",
                subcategorySlug: "sapphire",
                filters: new Map([['stoneType', 'Sapphire']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Sapphire Engagement Rings | Brilliant Earth",
                metaDescription: "Shop stunning sapphire engagement rings in blue and other colors.",
                focusKeyword: "sapphire engagement rings"
            }
        });
    }

    if (gemstones && emeraldSubcat && emeraldStone) {
        pages.push({
            pageType: "stone",
            title: "Emerald Engagement Rings",
            slug: "emerald",
            fullPath: "/gemstones/preset-rings/emerald",
            categoryId: gemstones._id,
            subcategoryId: emeraldSubcat._id,
            filterIds: [emeraldStone._id],
            productQuery: {
                categorySlug: "gemstones",
                subcategorySlug: "emerald",
                filters: new Map([['stoneType', 'Emerald']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Emerald Engagement Rings | Brilliant Earth",
                metaDescription: "Shop lush green emerald engagement rings.",
                focusKeyword: "emerald engagement rings"
            }
        });
    }

    // ========== GEMSTONES - PRESET RINGS BY METAL ==========
    if (gemstones && platinum) {
        pages.push({
            pageType: "metal",
            title: "Platinum Gemstone Rings",
            slug: "platinum",
            fullPath: "/gemstones/preset-rings/platinum",
            categoryId: gemstones._id,
            filterIds: [platinum._id],
            productQuery: {
                categorySlug: "gemstones",
                filters: new Map([['metal', 'Platinum']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Platinum Gemstone Rings | Brilliant Earth",
                metaDescription: "Shop platinum gemstone engagement rings.",
                focusKeyword: "platinum gemstone rings"
            }
        });
    }

    if (gemstones && yellowGold) {
        pages.push({
            pageType: "metal",
            title: "Yellow Gold Gemstone Rings",
            slug: "yellow-gold",
            fullPath: "/gemstones/preset-rings/yellow-gold",
            categoryId: gemstones._id,
            filterIds: [yellowGold._id],
            productQuery: {
                categorySlug: "gemstones",
                filters: new Map([['metal', '18K Yellow Gold']]),
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Yellow Gold Gemstone Rings | Brilliant Earth",
                metaDescription: "Shop yellow gold gemstone engagement rings.",
                focusKeyword: "yellow gold gemstone rings"
            }
        });
    }

    // ========== JEWELRY PAGES ==========
    const necklaces = await Subcategory.findOne({ slug: 'necklaces' });
    const earrings = await Subcategory.findOne({ slug: 'earrings' });
    const bracelets = await Subcategory.findOne({ slug: 'bracelets' });

    if (jewelry && necklaces) {
        pages.push({
            pageType: "subcategory",
            title: "Gemstone Necklaces",
            slug: "gemstone-necklaces",
            fullPath: "/jewelry/gemstone-necklaces",
            categoryId: jewelry._id,
            subcategoryId: necklaces._id,
            productQuery: {
                categorySlug: "jewelry",
                subcategorySlug: "necklaces",
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Gemstone Necklaces | Diamond Necklaces | Brilliant Earth",
                metaDescription: "Shop our collection of gemstone and diamond necklaces.",
                focusKeyword: "gemstone necklaces"
            }
        });
    }

    if (jewelry && earrings) {
        pages.push({
            pageType: "subcategory",
            title: "Gemstone Earrings",
            slug: "gemstone-earrings",
            fullPath: "/jewelry/gemstone-earrings",
            categoryId: jewelry._id,
            subcategoryId: earrings._id,
            productQuery: {
                categorySlug: "jewelry",
                subcategorySlug: "earrings",
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Gemstone Earrings | Diamond Earrings | Brilliant Earth",
                metaDescription: "Shop our collection of gemstone and diamond earrings.",
                focusKeyword: "gemstone earrings"
            }
        });
    }

    if (jewelry && bracelets) {
        pages.push({
            pageType: "subcategory",
            title: "Gemstone Bracelets",
            slug: "gemstone-bracelets",
            fullPath: "/jewelry/gemstone-bracelets",
            categoryId: jewelry._id,
            subcategoryId: bracelets._id,
            productQuery: {
                categorySlug: "jewelry",
                subcategorySlug: "bracelets",
                sort: "featured",
                limit: 20
            },
            isActive: true,
            seo: {
                metaTitle: "Gemstone Bracelets | Diamond Bracelets | Brilliant Earth",
                metaDescription: "Shop our collection of gemstone and diamond bracelets.",
                focusKeyword: "gemstone bracelets"
            }
        });
    }

    return pages;
};

// ========================================
// SEED FUNCTION
// ========================================

const seedPages = async () => {
    try {
        console.log('🌱 Starting Page Seeder...\n');

        // Connect to database
        await connectDB();

        // Get pages data
        const pages = await getPages();

        // Clear existing pages
        await Page.deleteMany({});
        console.log('🗑️  Cleared existing pages\n');

        // Insert pages
        const createdPages = await Page.insertMany(pages);

        console.log('✅ Pages seeded successfully!\n');
        console.log('📊 Created Pages:');
        createdPages.forEach((page, index) => {
            console.log(`   ${index + 1}. ${page.fullPath}`);
        });
        console.log(`\n   Total: ${createdPages.length} pages\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding pages:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    seedPages();
}

export default seedPages;

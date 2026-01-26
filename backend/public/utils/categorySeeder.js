import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/categoryModel.js';
import connectDB from '../config/db.js';
import fs from 'fs';

const logFile = 'seeder_debug.txt';
if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};

dotenv.config();

const seedNavigation = async () => {
    try {
        log('Starting comprehensive seeder...');
        await connectDB();
        log('DB Connected');
        await Category.deleteMany();
        log('Categories cleared...');

        log('Seeding Engagement Rings...');

        // --- 1. ENGAGEMENT RINGS ---
        const engagementCat = await Category.create({
            name: "Engagement Rings",
            slug: "engagement-rings",
            level: 0,
            order: 1,
            showOnHome: true,
            homePosition: 'jewelry-category',
            image: "/home/shop1.jfif"
        });

        // Column 1: Design Your Own
        const designItems = [
            { name: "Start with a Setting", icon: "Diamond", slug: "design" },
            { name: "Start with a Natural Diamond", icon: "Gem", slug: "design-natural" },
            { name: "Start with a Lab Diamond", icon: "Sparkles", slug: "design-lab" },
            { name: "Start with a Gemstone", icon: "Gem", slug: "design-gemstone-start" },
            { name: "Start with a Bridal Set", icon: "Sparkles", slug: "design-bridal" }
        ];
        for (const item of designItems) {
            await Category.create({
                name: item.name,
                slug: item.slug,
                parent: engagementCat._id,
                menuGroup: "DESIGN YOUR OWN ENGAGEMENT RING",
                menuType: "icon-list",
                columnNumber: 1,
                icon: item.icon,
            });
        }

        // Column 2: Styles
        const engagementStyles = [
            { name: "Solitaire", image: "/home/ring3.jfif" },
            { name: "Three Stone", image: "/home/ring4.jfif" },
            { name: "Halo" },
            { name: "Hidden Halo" },
            { name: "Nature-Inspired", image: "/home/ring2.jfif" },
            { name: "Antique & Vintage" },
            { name: "Bezel", image: "/home/ring6.jfif" }
        ];
        for (const style of engagementStyles) {
            await Category.create({
                name: style.name,
                slug: style.name.toLowerCase().replace(/ /g, '-').replace('&', 'and'),
                parent: engagementCat._id,
                menuGroup: "ENGAGEMENT RING STYLES",
                menuType: "list",
                columnNumber: 2,
                showOnHome: !!style.image,
                homePosition: style.image ? 'popular-engagement' : undefined,
                image: style.image
            });
        }

        // Column 3: Shop By Shape
        const shapes = [
            { name: "Round", image: "/home/diamond2.webp", order: 1 },
            { name: "Oval", image: "/home/diamond1.webp", order: 2 },
            { name: "Emerald", image: "/home/diamond3.webp", order: 3 },
            { name: "Cushion", image: "/home/diamond8.webp", order: 4 },
            { name: "Princess", image: "/home/diamond9.webp", order: 5 },
            { name: "Pear", image: "/home/diamond6.webp", order: 6 },
            { name: "Marquise", image: "/home/diamond4.webp", order: 7 },
            { name: "Asscher", image: "/home/diamond10.webp", order: 8 },
            { name: "Radiant", image: "/home/diamond5.webp", order: 9 },
            { name: "Heart", image: "/home/diamond7.webp", order: 10 }
        ];
        for (const shape of shapes) {
            await Category.create({
                name: shape.name,
                slug: shape.name.toLowerCase().replace(/ /g, '-'),
                parent: engagementCat._id,
                menuGroup: "SHOP BY SHAPE",
                menuType: "list",
                columnNumber: 3,
                order: shape.order,
                showOnHome: true,
                homePosition: 'diamond-shape',
                image: shape.image
            });
        }

        // Column 4: Featured
        const engagementFeatured = [
            { name: "Ready to Ship Engagement Rings", image: "/home/ring7.jfif" },
            { name: "Top 20 Engagement Rings" },
            { name: "Signature Collections" },
            { name: "Custom Engagement Rings" },
            { name: "Bridal Sets", image: "/home/ring5.jfif" }
        ];
        for (const item of engagementFeatured) {
            await Category.create({
                name: item.name,
                slug: item.name.toLowerCase().replace(/ /g, '-'),
                parent: engagementCat._id,
                menuGroup: "FEATURED",
                menuType: "list",
                columnNumber: 4,
                showOnHome: !!item.image,
                homePosition: item.image ? 'popular-engagement' : undefined,
                image: item.image
            });
        }

        // Promo 1
        await Category.create({
            name: "Engagement Promo",
            slug: "engagement-promo",
            parent: engagementCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6",
            promoData: {
                title: "ENDS SOON!",
                text: "1/4 CARAT LAB DIAMOND STUDS WITH PURCHASE OVER $1,000.",
                code: "USE CODE STUDS IN CART.*",
                linkText: "Shop Now",
                link: "/engagement-rings"
            }
        });

        log('Seeding Wedding Rings...');
        // --- 2. WEDDING RINGS ---
        const weddingCat = await Category.create({
            name: "Wedding Rings",
            slug: "wedding-rings",
            level: 0,
            order: 2,
            showOnHome: true,
            homePosition: 'jewelry-category',
            image: "/home/shop2.jfif"
        });

        const womensWedding = [
            { name: "Women's Wedding Rings", src: "/home/shop2.jfif", showOnHome: true, homePosition: 'jewelry-category' },
            { name: "Design Your Own Ring Stack" },
            { name: "Find My Matching Wedding Ring" },
            { name: "Diamond Rings" },
            { name: "Wedding Ring Sets" },
            { name: "Eternity Rings" }
        ];
        for (const item of womensWedding) {
            await Category.create({
                name: item.name,
                slug: `womens-${item.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}`,
                parent: weddingCat._id,
                menuGroup: "WOMEN",
                menuType: "list",
                columnNumber: 1,
                showOnHome: item.showOnHome || false,
                image: item.src
            });
        }

        const mensWedding = [
            { name: "Men's Wedding Bands", src: "/home/shop3.jfif", showOnHome: true, homePosition: 'jewelry-category' },
            { name: "Classic Bands" },
            { name: "Customize Your Own Ring" },
            { name: "Diamond Bands" },
            { name: "Matte Bands" },
            { name: "Hammered Bands" }
        ];
        for (const item of mensWedding) {
            await Category.create({
                name: item.name,
                slug: `mens-${item.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}`,
                parent: weddingCat._id,
                menuGroup: "MEN",
                menuType: "list",
                columnNumber: 2,
                showOnHome: item.showOnHome || false,
                image: item.src
            });
        }

        const womensMetals = ["Platinum", "Yellow Gold", "White Gold", "Rose Gold"];
        for (const metal of womensMetals) {
            await Category.create({
                name: metal,
                slug: `wedding-women-${metal.toLowerCase().replace(/ /g, '-')}`,
                parent: weddingCat._id,
                menuGroup: "WOMEN'S BY METAL",
                menuType: "list",
                columnNumber: 3
            });
        }

        const mensMetals = ["Platinum", "Yellow Gold", "Tungsten", "Meteorite", "Tantalum"];
        for (const metal of mensMetals) {
            await Category.create({
                name: metal,
                slug: `wedding-men-${metal.toLowerCase().replace(/ /g, '-')}`,
                parent: weddingCat._id,
                menuGroup: "MEN'S BY METAL",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "Wedding Promo",
            slug: "wedding-promo",
            parent: weddingCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
            promoData: {
                title: "MATCHING SETS",
                text: "FIND THE PERFECT COMPLEMENT TO YOUR ENGAGEMENT RING.",
                linkText: "Explore Now",
                link: "/wedding-rings"
            }
        });

        log('Seeding Diamonds...');
        // --- 3. DIAMONDS ---
        const diamondCat = await Category.create({
            name: "Diamonds",
            slug: "diamonds",
            level: 0,
            order: 3
        });

        const diamondShop = ["Natural Diamonds", "Lab Grown Diamonds", "Colored Diamonds", "Ready to Ship"];
        for (const item of diamondShop) {
            await Category.create({
                name: item,
                slug: item.toLowerCase().replace(/ /g, '-'),
                parent: diamondCat._id,
                menuGroup: "SHOP DIAMONDS",
                menuType: "list",
                columnNumber: 1,
            });
        }

        for (const shape of shapes.slice(0, 6)) {
            await Category.create({
                name: shape.name,
                slug: `diamond-shape-${shape.name.toLowerCase()}`,
                parent: diamondCat._id,
                menuGroup: "SHOP BY SHAPE",
                menuType: "list",
                columnNumber: 2,
                icon: shape.name
            });
        }

        const diamondJewelry = ["Diamond Earrings", "Diamond Necklaces", "Diamond Bracelets", "All Diamond Jewelry"];
        for (const item of diamondJewelry) {
            await Category.create({
                name: item,
                slug: item.toLowerCase().replace(/ /g, '-'),
                parent: diamondCat._id,
                menuGroup: "DIAMOND JEWELRY",
                menuType: "list",
                columnNumber: 3
            });
        }

        const diamondGuides = ["Diamond Cut Guide", "Diamond Color Guide", "Diamond Clarity Guide", "Lab vs. Natural"];
        for (const item of diamondGuides) {
            await Category.create({
                name: item,
                slug: `guide-${item.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}`,
                parent: diamondCat._id,
                menuGroup: "DIAMOND GUIDES",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "Diamond Promo",
            slug: "diamond-promo",
            parent: diamondCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1598560912005-794762bc3854",
            promoData: {
                title: "PACIFIC GREEN",
                text: "INTRODUCING SUSTAINABLE LAB GROWN DIAMONDS.",
                linkText: "Explore Collection",
                link: "/diamonds"
            }
        });

        log('Seeding Gemstones...');
        // --- 4. GEMSTONES ---
        const gemstoneCat = await Category.create({
            name: "Gemstones",
            slug: "gemstones",
            level: 0,
            order: 4
        });

        const gemstoneDesign = [
            { name: "Start with a Gemstone" },
            { name: "Start with a Setting" },
            { name: "Sapphire" },
            { name: "Emerald" },
            { name: "Moissanite" },
            { name: "Gemstone Rings", src: "/home/shop4.jfif", showOnHome: true, homePosition: 'jewelry-category' }
        ];
        for (const item of gemstoneDesign) {
            await Category.create({
                name: item.name,
                slug: `gemstone-type-${item.name.toLowerCase().replace(/ /g, '-')}`,
                parent: gemstoneCat._id,
                menuGroup: "DESIGN YOUR OWN GEMSTONE RING",
                menuType: "list",
                columnNumber: 1,
                showOnHome: item.showOnHome || false,
                image: item.src
            });
        }

        const gemstoneColors = ["Blue", "Green", "Pink", "Purple", "Bi-color"];
        for (const color of gemstoneColors) {
            await Category.create({
                name: color,
                slug: `gemstone-${color.toLowerCase()}`,
                parent: gemstoneCat._id,
                menuGroup: "SHOP BY COLOR",
                menuType: "list",
                columnNumber: 2
            });
        }

        const gemstoneShapes = ["Emerald", "Oval", "Cushion", "Round", "Radiant"];
        for (const shape of gemstoneShapes) {
            await Category.create({
                name: shape,
                slug: `gemstone-shape-${shape.toLowerCase()}`,
                parent: gemstoneCat._id,
                menuGroup: "SHOP BY SHAPE",
                menuType: "list",
                columnNumber: 3
            });
        }

        const presetGemstone = ["Moissanite Engagement Rings", "Sapphire Engagement Rings", "Emerald Engagement Rings", "All Gemstone Jewelry"];
        for (const item of presetGemstone) {
            await Category.create({
                name: item,
                slug: item.toLowerCase().replace(/ /g, '-'),
                parent: gemstoneCat._id,
                menuGroup: "PRESET GEMSTONE RINGS",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "Gemstone Promo",
            slug: "gemstone-promo",
            parent: gemstoneCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0",
            promoData: {
                title: "BI-COLOR GEMS",
                text: "UNIQUE AND EXOTIC GEMSTONES FOR YOUR UNIQUE RING.",
                linkText: "Explore Now",
                link: "/gemstones"
            }
        });

        log('Seeding Jewelry...');
        // --- 5. JEWELRY ---
        const jewelryCat = await Category.create({
            name: "Jewelry",
            slug: "jewelry",
            level: 0,
            order: 5,
            showOnHome: true,
            image: "/home/shop5.jfif"
        });

        const jewelryMain = [
            { name: "Earrings" },
            { name: "Necklaces" },
            { name: "Rings" },
            { name: "Bracelets" },
            { name: "Men's Jewelry" },
            { name: "Lab Diamond Jewelry" },
            { name: "Fine Jewelry", src: "/home/shop5.jfif", showOnHome: true, homePosition: 'jewelry-category' },
            { name: "Best Sellers", src: "/home/shop6.jfif", showOnHome: true, homePosition: 'jewelry-category' }
        ];
        for (const item of jewelryMain) {
            await Category.create({
                name: item.name,
                slug: `jewelry-${item.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}`,
                parent: jewelryCat._id,
                menuGroup: "JEWELRY",
                menuType: "list",
                columnNumber: 1,
                showOnHome: item.showOnHome || false,
                image: item.src
            });
        }

        const jewelryStyles = ["Tennis Bracelets", "Diamond Stud Earrings", "Stacking Rings", "Fashion Rings", "Cocktail Rings", "Promise Rings"];
        for (const item of jewelryStyles) {
            await Category.create({
                name: item,
                slug: `jewelry-style-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: jewelryCat._id,
                menuGroup: "SHOP BY STYLE",
                menuType: "list",
                columnNumber: 2
            });
        }

        const jewelryDesignItems = ["Diamond Earrings", "Diamond Necklace", "Gemstone Necklace", "Gemstone Ring", "Diamond Ring"];
        for (const item of jewelryDesignItems) {
            await Category.create({
                name: item,
                slug: `jewelry-design-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: jewelryCat._id,
                menuGroup: "DESIGN YOUR OWN",
                menuType: "list",
                columnNumber: 3
            });
        }

        const jewelryCollections = ["Jane Goodall Collection", "Love Decoded Collection", "Zodiac Jewelry", "Sol Collection", "Pacific Green Jewelry"];
        for (const item of jewelryCollections) {
            await Category.create({
                name: item,
                slug: `collection-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: jewelryCat._id,
                menuGroup: "JEWELRY COLLECTIONS",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "Jewelry Promo",
            slug: "jewelry-promo",
            parent: jewelryCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1515562141207-7a18b5ce7142",
            promoData: {
                title: "MEANINGFUL GIFTS",
                text: "MEDALLIONS WITH MEANING AND PURPOSE.",
                linkText: "Shop Gems",
                link: "/jewelry"
            }
        });

        log('Seeding Gifts...');
        // --- 6. GIFTS ---
        const giftCat = await Category.create({
            name: "Gifts",
            slug: "gifts",
            level: 0,
            order: 6
        });

        const giftTop = ["Gifts Under $250", "Gifts Under $500", "Stacking Rings", "Best Selling Gifts", "Birthstone Jewelry"];
        for (const item of giftTop) {
            await Category.create({
                name: item,
                slug: `gift-${item.toLowerCase().replace(/ /g, '-').replace('$', '')}`,
                parent: giftCat._id,
                menuGroup: "TOP GIFTS",
                menuType: "list",
                columnNumber: 1
            });
        }

        const giftRecipients = ["Gifts For Her", "Gifts For Him", "Unisex Gifts"];
        for (const item of giftRecipients) {
            await Category.create({
                name: item,
                slug: `gift-to-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: giftCat._id,
                menuGroup: "GIFTS BY RECIPIENT",
                menuType: "list",
                columnNumber: 2
            });
        }

        const giftOccasions = ["Valentine's Day Gifts", "Anniversary Gifts", "Birthday Gifts", "Bridal Party Gifts", "Milestone Gifts"];
        for (const item of giftOccasions) {
            await Category.create({
                name: item,
                slug: `gift-for-${item.toLowerCase().replace(/ /g, '-').replace(/'/g, '')}`,
                parent: giftCat._id,
                menuGroup: "GIFTS BY OCCASION",
                menuType: "list",
                columnNumber: 3
            });
        }

        const birthstonesList = ["January - Garnet", "February - Amethyst", "March - Aquamarine", "April - Diamond", "May - Emerald"];
        for (const item of birthstonesList) {
            await Category.create({
                name: item,
                slug: `birthstone-${item.toLowerCase().split(' - ')[0]}`,
                parent: giftCat._id,
                menuGroup: "BIRTHSTONES BY MONTH",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "Gift Promo",
            slug: "gift-promo",
            parent: giftCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f",
            promoData: {
                title: "CELEBRATE US",
                text: "FIND THE PERFECT BIRTHDAY OR ANNIVERSARY GIFT.",
                linkText: "Shop Gifts",
                link: "/gifts"
            }
        });

        log('Seeding About...');
        // --- 7. ABOUT ---
        const aboutCat = await Category.create({
            name: "About",
            slug: "about",
            level: 0,
            order: 7
        });

        const aboutLinks = ["Our Story", "Our Mission", "Responsible Sourcing", "Repurposed Gold", "2024 Mission Report"];
        for (const item of aboutLinks) {
            await Category.create({
                name: item,
                slug: `about-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: aboutCat._id,
                menuGroup: "ABOUT US",
                menuType: "list",
                columnNumber: 1
            });
        }

        const careerLinks = ["Open Jobs", "Inclusivity"];
        for (const item of careerLinks) {
            await Category.create({
                name: item,
                slug: `careers-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: aboutCat._id,
                menuGroup: "CAREERS",
                menuType: "list",
                columnNumber: 2
            });
        }

        const storeLinks = ["Store Locations", "Virtual Appointment"];
        for (const item of storeLinks) {
            await Category.create({
                name: item,
                slug: `store-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: aboutCat._id,
                menuGroup: "OUR STORES",
                menuType: "list",
                columnNumber: 3
            });
        }

        const featureGuides = ["Engagement Ring Styles", "How Much to Spend", "Ring Engraving Ideas", "Jewelry Trends 2026"];
        for (const item of featureGuides) {
            await Category.create({
                name: item,
                slug: `guide-${item.toLowerCase().replace(/ /g, '-')}`,
                parent: aboutCat._id,
                menuGroup: "FEATURED GUIDES",
                menuType: "list",
                columnNumber: 4
            });
        }

        await Category.create({
            name: "About Promo",
            slug: "about-promo",
            parent: aboutCat._id,
            menuType: "promo",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
            promoData: {
                title: "REDEFINED",
                text: "JEWELRY WITH A CONSCIENCE.",
                linkText: "Read More",
                link: "/about"
            }
        });


        log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        log('Error seeding database: ' + error.message);
        process.exit(1);
    }
};

seedNavigation();

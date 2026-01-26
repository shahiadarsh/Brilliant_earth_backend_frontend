import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../public/models/categoryModel.js';
import connectDB from '../public/config/db.js';

dotenv.config();

// ========================================
// CATEGORY DATA
// ========================================

const categories = [
    {
        name: "Engagement Rings",
        slug: "engagement-rings",
        description: "Find your perfect engagement ring from our stunning collection of ethically sourced diamonds and gemstones.",
        isMainCategory: true,
        level: 0,
        displayOrder: 1,
        isActive: true,
        showOnHome: true,
        homePosition: "hero",

        hero: {
            image: "/images/hero/engagement-rings.jpg",
            title: "Find Your Perfect Ring",
            subtitle: "Ethically Sourced, Brilliantly Crafted",
            description: "Explore our collection of stunning engagement rings, each one crafted with ethically sourced diamonds and gemstones.",
            quote: "Love is the greatest adventure of all",
            ctaText: "Explore Collection",
            ctaLink: "/engagement-rings"
        },

        pageContent: {
            bannerImage: "/images/banners/engagement-banner.jpg",
            bannerText: "Free Shipping & 30-Day Returns",
            introText: "Our engagement rings are designed to celebrate your unique love story. Each piece is crafted with care using ethically sourced materials.",
            features: [
                {
                    icon: "Shield",
                    title: "Lifetime Warranty",
                    description: "Every ring comes with our comprehensive lifetime warranty"
                },
                {
                    icon: "Truck",
                    title: "Free Shipping",
                    description: "Complimentary shipping on all orders"
                },
                {
                    icon: "RefreshCw",
                    title: "30-Day Returns",
                    description: "Easy returns within 30 days of purchase"
                }
            ]
        },

        promo: {
            isEnabled: true,
            image: "/images/promos/engagement-promo.jpg",
            title: "New Arrivals",
            text: "Discover our latest collection of engagement rings",
            linkText: "Shop New Arrivals",
            link: "/engagement-rings?filter=new-arrivals"
        },

        seo: {
            metaTitle: "Engagement Rings | Ethically Sourced Diamond Rings | Brilliant Earth",
            metaDescription: "Shop our stunning collection of ethically sourced engagement rings. Find the perfect diamond or gemstone ring to celebrate your love story.",
            metaKeywords: "engagement rings, diamond rings, ethical diamonds, lab grown diamonds, wedding rings",
            canonicalUrl: "/engagement-rings",
            ogTitle: "Engagement Rings | Brilliant Earth",
            ogDescription: "Find your perfect engagement ring from our ethically sourced collection",
            ogImage: "/images/og/engagement-rings.jpg",
            twitterTitle: "Engagement Rings | Brilliant Earth",
            twitterDescription: "Shop ethically sourced engagement rings",
            twitterImage: "/images/twitter/engagement-rings.jpg",
            robots: "index, follow",
            focusKeyword: "engagement rings"
        }
    },

    {
        name: "Wedding Rings",
        slug: "wedding-rings",
        description: "Discover timeless wedding bands for every style, from classic to contemporary designs.",
        isMainCategory: true,
        level: 0,
        displayOrder: 2,
        isActive: true,
        showOnHome: true,
        homePosition: "featured",

        hero: {
            image: "/images/hero/wedding-rings.jpg",
            title: "Wedding Bands for Every Love Story",
            subtitle: "Timeless Designs, Ethical Craftsmanship",
            description: "Find the perfect wedding band to symbolize your eternal commitment.",
            quote: "Two hearts, one promise",
            ctaText: "Shop Wedding Bands",
            ctaLink: "/wedding-rings"
        },

        pageContent: {
            bannerImage: "/images/banners/wedding-banner.jpg",
            bannerText: "Complimentary Engraving on All Bands",
            introText: "Our wedding bands are crafted to last a lifetime, just like your love. Choose from classic, modern, and vintage-inspired designs.",
            features: [
                {
                    icon: "Heart",
                    title: "Free Engraving",
                    description: "Personalize your band with a special message"
                },
                {
                    icon: "Award",
                    title: "Premium Materials",
                    description: "Platinum, gold, and ethically sourced metals"
                },
                {
                    icon: "Users",
                    title: "Matching Sets",
                    description: "Find coordinating bands for couples"
                }
            ]
        },

        promo: {
            isEnabled: true,
            image: "/images/promos/wedding-promo.jpg",
            title: "Matching Sets",
            text: "Save 15% on coordinating wedding bands",
            code: "MATCH15",
            linkText: "Shop Matching Sets",
            link: "/wedding-rings/matching-sets"
        },

        seo: {
            metaTitle: "Wedding Rings & Bands | Men's & Women's | Brilliant Earth",
            metaDescription: "Shop our collection of ethically crafted wedding bands for men and women. Find classic, modern, and vintage-inspired designs.",
            metaKeywords: "wedding rings, wedding bands, men's wedding bands, women's wedding bands, platinum bands",
            canonicalUrl: "/wedding-rings",
            ogTitle: "Wedding Rings | Brilliant Earth",
            ogDescription: "Discover timeless wedding bands for every style",
            ogImage: "/images/og/wedding-rings.jpg",
            robots: "index, follow",
            focusKeyword: "wedding rings"
        }
    },

    {
        name: "Diamonds",
        slug: "diamonds",
        description: "Browse our selection of ethically sourced lab-grown and natural diamonds.",
        isMainCategory: true,
        level: 0,
        displayOrder: 3,
        isActive: true,
        showOnHome: true,

        hero: {
            image: "/images/hero/diamonds.jpg",
            title: "Ethically Sourced Diamonds",
            subtitle: "Lab-Grown & Natural Diamonds",
            description: "Every diamond in our collection is ethically sourced and conflict-free.",
            quote: "Brilliance with a conscience",
            ctaText: "Shop Diamonds",
            ctaLink: "/diamonds"
        },

        seo: {
            metaTitle: "Ethically Sourced Diamonds | Lab-Grown & Natural | Brilliant Earth",
            metaDescription: "Shop our collection of ethically sourced lab-grown and natural diamonds. Conflict-free and certified.",
            metaKeywords: "diamonds, lab grown diamonds, natural diamonds, ethical diamonds, conflict free diamonds",
            canonicalUrl: "/diamonds",
            robots: "index, follow",
            focusKeyword: "ethical diamonds"
        }
    },

    {
        name: "Gemstones",
        slug: "gemstones",
        description: "Explore our vibrant collection of sapphires, emeralds, moissanites, and more.",
        isMainCategory: true,
        level: 0,
        displayOrder: 4,
        isActive: true,
        showOnHome: true,

        hero: {
            image: "/images/hero/gemstones.jpg",
            title: "Colorful Gemstone Rings",
            subtitle: "Sapphires, Emeralds, Moissanites & More",
            description: "Add a pop of color with our stunning gemstone engagement rings and jewelry.",
            quote: "Express your unique style",
            ctaText: "Explore Gemstones",
            ctaLink: "/gemstones"
        },

        seo: {
            metaTitle: "Gemstone Rings | Sapphire, Emerald, Moissanite | Brilliant Earth",
            metaDescription: "Shop our collection of gemstone engagement rings featuring sapphires, emeralds, moissanites, and more.",
            metaKeywords: "gemstone rings, sapphire rings, emerald rings, moissanite rings, ruby rings",
            canonicalUrl: "/gemstones",
            robots: "index, follow",
            focusKeyword: "gemstone rings"
        }
    },

    {
        name: "Jewelry",
        slug: "jewelry",
        description: "Complete your look with our fine jewelry collection including necklaces, earrings, and bracelets.",
        isMainCategory: true,
        level: 0,
        displayOrder: 5,
        isActive: true,
        showOnHome: true,

        hero: {
            image: "/images/hero/jewelry.jpg",
            title: "Fine Jewelry Collection",
            subtitle: "Necklaces, Earrings, Bracelets & More",
            description: "Discover timeless pieces to complement your engagement ring or wear every day.",
            quote: "Elegance for every occasion",
            ctaText: "Shop Jewelry",
            ctaLink: "/jewelry"
        },

        seo: {
            metaTitle: "Fine Jewelry | Necklaces, Earrings, Bracelets | Brilliant Earth",
            metaDescription: "Shop our collection of fine jewelry including diamond necklaces, earrings, bracelets, and more.",
            metaKeywords: "fine jewelry, diamond necklaces, diamond earrings, bracelets, jewelry",
            canonicalUrl: "/jewelry",
            robots: "index, follow",
            focusKeyword: "fine jewelry"
        }
    },

    {
        name: "Education",
        slug: "education",
        description: "Learn about diamonds, gemstones, and how to choose the perfect ring.",
        isMainCategory: true,
        level: 0,
        displayOrder: 6,
        isActive: true,

        seo: {
            metaTitle: "Jewelry Education | Diamond & Gemstone Guides | Brilliant Earth",
            metaDescription: "Learn about the 4Cs of diamonds, gemstone properties, and how to choose the perfect engagement ring.",
            metaKeywords: "diamond education, 4Cs, gemstone guide, ring buying guide",
            canonicalUrl: "/education",
            robots: "index, follow",
            focusKeyword: "diamond education"
        }
    }
];

// ========================================
// SEED FUNCTION
// ========================================

const seedCategories = async () => {
    try {
        console.log('🌱 Starting Category Seeder...\n');

        // Connect to database
        await connectDB();

        // Clear existing categories
        await Category.deleteMany({});
        console.log('🗑️  Cleared existing categories\n');

        // Insert categories
        const createdCategories = await Category.insertMany(categories);

        console.log('✅ Categories seeded successfully!\n');
        console.log('📊 Created Categories:');
        createdCategories.forEach((cat, index) => {
            console.log(`   ${index + 1}. ${cat.name} (${cat.slug})`);
        });
        console.log(`\n   Total: ${createdCategories.length} categories\n`);

        // Disconnect
        await mongoose.connection.close();
        console.log('✅ Database connection closed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
        process.exit(1);
    }
};

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    seedCategories();
}

export default seedCategories;

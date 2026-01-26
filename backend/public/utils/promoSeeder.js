import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promo from '../models/promoModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const promos = [
    {
        title: "Ring in the New Year",
        desktopImage: "/home/ring3.jfif",
        mobileImage: "/home/ring3.jfif",
        link: "/engagement-rings",
        buttonText: "Shop Engagement Rings",
        position: "new-year-left",
        status: "Active",
        priority: 1
    },
    {
        title: "Best-Selling Styles",
        desktopImage: "/home/promo1.webp",
        mobileImage: "/home/promo1.webp",
        link: "/jewelry/best-sellers",
        buttonText: "Shop Now",
        position: "new-year-right",
        status: "Active",
        priority: 2
    },
    {
        title: "The Solitaire Collection",
        desktopImage: "/home/featured/solitaire.webp",
        mobileImage: "/home/featured/solitaire.webp",
        link: "/engagement-rings/solitaire",
        buttonText: "Shop Solitaires",
        position: "featured-1",
        status: "Active",
        priority: 3
    },
    {
        title: "Receive a Natural Diamond Necklace",
        desktopImage: "/home/ring1.webp",
        mobileImage: "/home/ring1.webp",
        link: "/terms",
        buttonText: "See Terms",
        altText: "Natural Diamond Necklace promo",
        position: "popular-rings-promo",
        status: "Active",
        priority: 4
    },
    {
        title: "Fine Jewelry",
        description: "From vibrant gemstones to styles with architectural precision, fine jewelry is the ultimate style statement.",
        desktopImage: "/home/trend1.webp",
        mobileImage: "/home/trend1.webp",
        link: "/jewelry",
        theme: "light",
        position: "trend-report",
        status: "Active",
        priority: 5
    },
    {
        title: "Engagement Rings",
        description: "Discover sculptural settings, vintage-inspired details, and fancy shapes redefining the moment.",
        desktopImage: "/home/trend2.webp",
        mobileImage: "/home/trend2.webp",
        link: "/engagement-rings",
        theme: "dark",
        position: "trend-report",
        status: "Active",
        priority: 6
    },
    {
        title: "Wedding Bands",
        description: "Fancy-cut diamonds, bold styles, and vintage-inspired designs take centerstage in the stacks of 2026.",
        desktopImage: "/home/trend3.webp",
        mobileImage: "/home/trend3.webp",
        link: "/wedding-rings",
        theme: "light",
        position: "trend-report",
        status: "Active",
        priority: 7
    },
    {
        title: "Medallions with Meaning",
        altText: "Just Dropped",
        description: "New limited edition medallions are here — meticulously designed and handcrafted.",
        desktopImage: "/home/featured1.jfif",
        mobileImage: "/home/featured1.jfif",
        link: "/jewelry/medallions",
        buttonText: "Shop Now",
        position: "featured-top",
        status: "Active",
        priority: 8
    },
    {
        title: "We're Here for You, In Person and Online",
        description: "Whether it's at a store near you or online, we curate your appointment just for you.",
        desktopImage: "/home/featured2.avif",
        mobileImage: "/home/featured2.avif",
        link: "/stores",
        buttonText: "Visit a Showroom",
        secondaryLink: "/virtual-appointment",
        secondaryButtonText: "Book a Virtual Appointment",
        position: "featured-bottom",
        status: "Active",
        priority: 9
    },
    {
        title: "Three stone emerald cut engagement ring",
        desktopImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "image",
        position: "insta-post",
        status: "Active",
        priority: 10
    },
    {
        title: "5 Unique Diamond Cuts 2026 Brides Need To Know",
        desktopImage: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "image", // Using altText to store type for simplicity or adding a new field
        position: "insta-post",
        status: "Active",
        priority: 11
    },
    {
        title: "Hand wearing oval engagement ring in snow",
        desktopImage: "https://images.unsplash.com/photo-1626027988355-6b83f4cb27f0?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1626027988355-6b83f4cb27f0?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "video",
        position: "insta-post",
        status: "Active",
        priority: 12
    },
    {
        title: "Sparkling pear shaped diamond ring close up",
        desktopImage: "https://images.unsplash.com/photo-1598556851364-3850b4a8b696?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1598556851364-3850b4a8b696?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "video",
        position: "insta-post",
        status: "Active",
        priority: 13
    },
    {
        title: "5 Engagement Ring Predictions for 2026",
        desktopImage: "https://images.unsplash.com/photo-1603561596112-0a132b722353?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1603561596112-0a132b722353?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "image",
        position: "insta-post",
        status: "Active",
        priority: 14
    },
    {
        title: "Gold necklaces gift box unboxing",
        desktopImage: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "video",
        position: "insta-post",
        status: "Active",
        priority: 15
    },
    {
        title: "Lifestyle jewelry shot",
        desktopImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
        mobileImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
        link: "https://instagram.com",
        altText: "image",
        position: "insta-post",
        status: "Active",
        priority: 16
    },
    {
        title: "20th Anniversary Collection",
        desktopImage: "/home/promo2.webp",
        mobileImage: "/home/promo2.webp",
        link: "/collections/anniversary",
        position: "about-mission",
        status: "Active",
        priority: 17
    },
    {
        title: "Jane Goodall Collection",
        desktopImage: "/home/promo3.webp",
        mobileImage: "/home/promo3.webp",
        link: "/collections/jane-goodall",
        position: "about-mission",
        status: "Active",
        priority: 18
    },
    {
        title: "Signature Collections",
        desktopImage: "/home/promo4.webp",
        mobileImage: "/home/promo4.webp",
        link: "/collections/signature",
        position: "about-mission",
        status: "Active",
        priority: 19
    },
    {
        title: "Recycled Gold Collection",
        desktopImage: "/home/promo1.webp",
        mobileImage: "/home/promo1.webp",
        link: "/collections/recycled-gold",
        position: "about-mission",
        status: "Active",
        priority: 20
    }
];

const seedPromos = async () => {
    console.log('Starting promo seeding...');
    try {
        await Promo.deleteMany({ position: { $in: ['new-year-left', 'new-year-right', 'featured-1', 'popular-rings-promo', 'trend-report', 'featured-top', 'featured-bottom', 'insta-post', 'about-mission'] } });
        console.log('Old promos deleted');
        await Promo.insertMany(promos);
        console.log('Promos seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding promos:', error);
        process.exit(1);
    }
};

seedPromos();

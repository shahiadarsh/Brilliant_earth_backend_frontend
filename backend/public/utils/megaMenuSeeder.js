import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MegaMenu from '../models/megaMenuModel.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const seedMegaMenus = async () => {
    try {
        await MegaMenu.deleteMany();

        const menus = [
            {
                name: "ENGAGEMENT RINGS",
                slug: "engagement-rings",
                order: 1,
                columns: [
                    {
                        groups: [
                            {
                                title: "DESIGN YOUR OWN",
                                type: "icon-list",
                                items: [
                                    { label: "Start with a Setting", icon: "Ring", href: "/design/setting" },
                                    { label: "Start with a Natural Diamond", icon: "Diamond", href: "/design/diamond/natural" },
                                    { label: "Start with a Lab Diamond", icon: "Sparkles", href: "/design/diamond/lab" },
                                    { label: "Start with a Gemstone", icon: "Gem", href: "/design/gemstone" }
                                ]
                            }
                        ]
                    },
                    {
                        groups: [
                            {
                                title: "SHOP BY SHAPE",
                                type: "grid-icons",
                                items: [
                                    { label: "Round", icon: "Round", href: "/engagement-rings/round" },
                                    { label: "Oval", icon: "Oval", href: "/engagement-rings/oval" },
                                    { label: "Cushion", icon: "Cushion", href: "/engagement-rings/cushion" },
                                    { label: "Emerald", icon: "Emerald", href: "/engagement-rings/emerald" },
                                    { label: "Pear", icon: "Pear", href: "/engagement-rings/pear" }
                                ]
                            }
                        ]
                    },
                    {
                        groups: [
                            {
                                title: "SHOP BY STYLE",
                                type: "list",
                                items: [
                                    { label: "Solitaire", href: "/engagement-rings/solitaire" },
                                    { label: "Halo", href: "/engagement-rings/halo" },
                                    { label: "Three-Stone", href: "/engagement-rings/three-stone" },
                                    { label: "Vintage", href: "/engagement-rings/vintage" },
                                    { label: "Nature Inspired", href: "/engagement-rings/nature-inspired" }
                                ]
                            }
                        ]
                    }
                ],
                promo: {
                    title: "NEW YEAR PROMO",
                    text: "Receive a Natural Diamond Necklace With Purchase Over $1,000.",
                    code: "DIAMOND",
                    linkText: "Shop Engagement Rings",
                    link: "/engagement-rings",
                    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop"
                }
            },
            {
                name: "DIAMONDS",
                slug: "diamonds",
                order: 2,
                columns: [
                    {
                        groups: [
                            {
                                title: "SHOP DIAMONDS",
                                type: "list",
                                items: [
                                    { label: "Natural Diamonds", href: "/diamonds/natural" },
                                    { label: "Lab Grown Diamonds", href: "/diamonds/lab" },
                                    { label: "Colored Diamonds", href: "/diamonds/colored" },
                                    { label: "Recycled Diamonds", href: "/diamonds/recycled" }
                                ]
                            }
                        ]
                    }
                ],
                promo: {
                    title: "DIAMOND EXPERTS",
                    text: "Schedule a virtual appointment to find your perfect match.",
                    linkText: "Book Now",
                    link: "/appointment",
                    image: "https://images.unsplash.com/photo-1573408302354-9418af8d8a70?q=80&w=2070&auto=format&fit=crop"
                }
            }
        ];

        await MegaMenu.insertMany(menus);
        console.log('✅ Mega Menu Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('❌ Error Seeding Mega Menu:', error);
        process.exit(1);
    }
};

seedMegaMenus();

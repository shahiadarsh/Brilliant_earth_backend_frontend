"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MissionContent } from "@/components/info/MissionContent"
import { SourcingContent } from "@/components/info/SourcingContent"
import { SustainabilityContent } from "@/components/info/SustainabilityContent"
import { GiveBackContent } from "@/components/info/GiveBackContent"
import { PeopleContent } from "@/components/info/PeopleContent"
import { ReviewsContent } from "@/components/info/ReviewsContent"
import { ReturnsContent } from "@/components/info/ReturnsContent"
import { ShippingContent } from "@/components/info/ShippingContent"
import { WarrantyContent } from "@/components/info/WarrantyContent"
import { FinancingContent } from "@/components/info/FinancingContent"
import { FAQContent } from "@/components/info/FAQContent"
import { RepurposedGoldContent } from "@/components/info/RepurposedGoldContent"
import { MissionReportContent } from "@/components/info/MissionReportContent"
import { InclusivityContent } from "@/components/info/InclusivityContent"
import { DiamondTransparencyContent } from "@/components/info/DiamondTransparencyContent"

const infoContent: Record<string, { title: string; content: React.ReactNode; fullWidth?: boolean }> = {
    "our-mission": {
        title: "Our Mission",
        content: <MissionContent />,
        fullWidth: true
    },
    "responsible-sourcing": {
        title: "Responsible Sourcing",
        content: <SourcingContent />,
        fullWidth: true
    },
    "sustainability": {
        title: "Sustainability Goals",
        content: <SustainabilityContent />,
        fullWidth: true
    },
    "give-back": {
        title: "How We Give Back",
        content: <GiveBackContent />,
        fullWidth: true
    },
    "people": {
        title: "Our People",
        content: <PeopleContent />,
        fullWidth: true
    },
    "reviews": {
        title: "Ritzin Reviews",
        content: <ReviewsContent />,
        fullWidth: true
    },
    "returns": {
        title: "Free 30 Day Returns",
        content: <ReturnsContent />,
        fullWidth: true
    },
    "shipping": {
        title: "Free Shipping BOTH Ways",
        content: <ShippingContent />,
        fullWidth: true
    },
    "warranty": {
        title: "Free Lifetime Warranty",
        content: <WarrantyContent />,
        fullWidth: true
    },
    "financing": {
        title: "Financing Options",
        content: <FinancingContent />,
        fullWidth: true
    },
    "faqs": {
        title: "Frequently Asked Questions",
        content: <FAQContent />,
        fullWidth: true
    },
    "repurposed-gold": {
        title: "Repurposed Gold",
        content: <RepurposedGoldContent />,
        fullWidth: true
    },
    "mission-report-2024": {
        title: "2024 Mission Report",
        content: <MissionReportContent />,
        fullWidth: true
    },
    "inclusivity": {
        title: "Inclusivity & Diversity",
        content: <InclusivityContent />,
        fullWidth: true
    },
    "diamond-transparency": {
        title: "Diamond Transparency",
        content: <DiamondTransparencyContent />,
        fullWidth: true
    },
    "privacy-policy": {
        title: "Privacy Policy",
        content: (
            <div className="space-y-6 text-gray-700">
                <p>Last Updated: January 2026</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Introduction</h2>
                <p>At Ritzin, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Information We Collect</h2>
                <p>We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our customer service team. This may include your name, email address, shipping address, and payment information.</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>To process and fulfill your orders</li>
                    <li>To communicate with you about your orders and provide customer support</li>
                    <li>To personalize your experience on our website</li>
                    <li>To send you promotional offers and updates (with your consent)</li>
                </ul>
            </div>
        ),
    },
    "terms-conditions": {
        title: "Terms & Conditions",
        content: (
            <div className="space-y-6 text-gray-700">
                <p>Last Updated: January 2026</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Acceptance of Terms</h2>
                <p>By accessing or using the Ritzin website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our site.</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Intellectual Property</h2>
                <p>All content on this website, including text, graphics, logos, and images, is the property of Ritzin and is protected by copyright and other intellectual property laws.</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Product Information</h2>
                <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content are error-free. Prices and availability are subject to change without notice.</p>
            </div>
        ),
    },
    "accessibility": {
        title: "Accessibility Statement",
        content: (
            <div className="space-y-6 text-gray-700">
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Our Commitment</h2>
                <p>Ritzin is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the accessibility and usability of our website.</p>
                <h2 className="text-xl font-serif text-gray-900 border-b pb-2">Standards</h2>
                <p>We aim to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines 2.1. These guidelines explain how to make web content more accessible for people with disabilities.</p>
            </div>
        ),
    },
    "site-map": {
        title: "Site Map",
        content: (
            <div className="grid md:grid-cols-3 gap-12 text-gray-700">
                <div className="space-y-4">
                    <h3 className="font-bold text-[#163E3E] uppercase tracking-widest text-xs">Shop</h3>
                    <ul className="space-y-2 text-sm italic">
                        <li><Link href="/engagement-rings" className="hover:underline">Engagement Rings</Link></li>
                        <li><Link href="/wedding-rings" className="hover:underline">Wedding Rings</Link></li>
                        <li><Link href="/diamonds" className="hover:underline">Diamonds</Link></li>
                        <li><Link href="/jewelry" className="hover:underline">Fine Jewelry</Link></li>
                        <li><Link href="/gemstones" className="hover:underline">Gemstones</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-[#163E3E] uppercase tracking-widest text-xs">About Ritzin</h3>
                    <ul className="space-y-2 text-sm italic">
                        <li><Link href="/about" className="hover:underline">Our Story</Link></li>
                        <li><Link href="/info/our-mission" className="hover:underline">Our Mission</Link></li>
                        <li><Link href="/info/responsible-sourcing" className="hover:underline">Responsible Sourcing</Link></li>
                        <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                        <li><Link href="/investor-relations" className="hover:underline">Investor Relations</Link></li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-[#163E3E] uppercase tracking-widest text-xs">Service</h3>
                    <ul className="space-y-2 text-sm italic">
                        <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="/stores" className="hover:underline">Find a Showroom</Link></li>
                        <li><Link href="/appointment" className="hover:underline">Book an Appointment</Link></li>
                        <li><Link href="/info/faqs" className="hover:underline">FAQs</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default function InfoPage() {
    const { slug } = useParams()
    const content = infoContent[slug as string] || {
        title: "Information Page",
        content: <p>Information coming soon.</p>,
        fullWidth: false
    }

    return (
        <main className="bg-white min-h-screen pb-20 overflow-x-hidden">
            {/* Dynamic Header */}
            <div className="bg-[#F9F9F9] py-16 md:py-24 border-b border-gray-100 mb-12">
                <div className={`${content.fullWidth ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-6`}>
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
                        <Link href="/" className="hover:text-[#163E3E]">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900">Information</span>
                    </nav>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-gray-900 transition-all duration-700 transform translate-y-0 opacity-100">
                        {content.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className={`${content.fullWidth ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-6`}>
                <div className={content.fullWidth ? "" : "prose prose-lg prose-serif max-w-none"}>
                    {content.content}
                </div>
            </div>
        </main>
    )
}

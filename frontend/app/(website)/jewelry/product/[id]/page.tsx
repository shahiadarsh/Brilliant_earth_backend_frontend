"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronDown, ChevronUp, Share2, Sparkles } from "lucide-react"

// Sample product data for Jewelry
const PRODUCT_DATA = {
    id: 401,
    name: "Diamond Stud Earrings in 18K White Gold",
    price: 790,
    totalCaratWeight: "1/2 ct. tw.",
    images: [
        "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=800",
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800",
        "https://images.unsplash.com/photo-1596944210341-6031382b3d83?w=800",
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800"
    ],
    metals: [
        { id: "18k-yellow", label: "18K Yellow Gold", available: true },
        { id: "18k-white", label: "18K White Gold", available: true, selected: true },
        { id: "18k-rose", label: "18K Rose Gold", available: true },
        { id: "platinum", label: "Platinum", available: true }
    ],
    diamondOrigins: [
        { id: "natural", label: "Natural", available: true },
        { id: "lab-grown", label: "Lab-Grown", available: true, selected: true }
    ],
    // Some jewelry might have sizes, some might not.
    sizes: ["Standard", "Large"],
    features: [
        "Free Shipping & Returns",
        "Free Lifetime Warranty",
        "Conflict-Free Diamonds"
    ],
    description: "These classic diamond stud earrings are the perfect addition to any jewelry collection, offering timeless elegance and brilliance.",
    specifications: {
        "Total Carat Weight": "1/2 ct. tw.",
        "Diamond Shape": "Round",
        "Diamond Origin": "Lab-Grown",
        "Metal": "18K White Gold",
        "Backing": "Push Back",
        "Setting Type": "Four-Prong"
    }
}

export default function JewelryDetailPage({ params }: { params: { id: string } }) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedMetal, setSelectedMetal] = useState("18k-white")
    const [selectedDiamond, setSelectedDiamond] = useState("lab-grown")
    const [selectedSize, setSelectedSize] = useState("")
    const [expandedSection, setExpandedSection] = useState<string | null>("jewelry-details")

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-[13px] text-gray-600">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/jewelry" className="hover:text-gray-900">Jewelry</Link>
                        <span>/</span>
                        <span className="text-gray-900">Detail</span>
                        <span>/</span>
                        <span className="text-gray-900">{PRODUCT_DATA.name.split('in')[0].trim()}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden">
                            <Image
                                src={PRODUCT_DATA.images[selectedImage]}
                                alt={PRODUCT_DATA.name}
                                fill
                                className="object-cover"
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                <Heart className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-3">
                            {PRODUCT_DATA.images.map((image, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative aspect-square bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-[#163E3E]' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`View ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        {/* Title & Price */}
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h1 className="text-[24px] font-medium text-gray-900 leading-tight pr-4">
                                    {PRODUCT_DATA.name}
                                </h1>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <p className="text-[28px] font-semibold text-gray-900">${PRODUCT_DATA.price.toLocaleString()}</p>
                        </div>

                        {/* Total Carat Weight */}
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-[13px] text-gray-600 mb-1">Total Carat Weight: <span className="font-semibold text-gray-900">{PRODUCT_DATA.totalCaratWeight}</span></p>
                        </div>

                        {/* Metal Selection */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-semibold text-gray-900 block">Metal: 18K White Gold</label>
                            <div className="grid grid-cols-2 gap-3">
                                {PRODUCT_DATA.metals.map((metal) => (
                                    <button
                                        key={metal.id}
                                        onClick={() => setSelectedMetal(metal.id)}
                                        disabled={!metal.available}
                                        className={`py-3 px-4 text-[13px] font-medium border rounded-sm transition-all ${selectedMetal === metal.id
                                            ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                            : metal.available
                                                ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {metal.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Diamond Origin */}
                        <div className="space-y-3">
                            <label className="text-[13px] font-semibold text-gray-900 block">Diamond Origin: Lab-Grown</label>
                            <div className="grid grid-cols-2 gap-3">
                                {PRODUCT_DATA.diamondOrigins.map((origin) => (
                                    <button
                                        key={origin.id}
                                        onClick={() => setSelectedDiamond(origin.id)}
                                        className={`py-3 px-4 text-[13px] font-medium border rounded-sm transition-all ${selectedDiamond === origin.id
                                            ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        {origin.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Bag Button */}
                        <button
                            className={`w-full py-4 text-[15px] font-bold uppercase tracking-wider rounded-sm transition-all bg-[#163E3E] text-white hover:bg-[#0f2a2a]`}
                        >
                            Add to Bag
                        </button>

                        {/* Features */}
                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            {PRODUCT_DATA.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[13px] text-gray-700">
                                    <Sparkles className="w-4 h-4 text-[#163E3E]" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Accordion Sections */}
                        <div className="space-y-3 pt-6 border-t border-gray-200">
                            {/* Jewelry Details */}
                            <div className="border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => toggleSection('jewelry-details')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[14px] font-semibold text-gray-900">Jewelry Details</span>
                                    {expandedSection === 'jewelry-details' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                                {expandedSection === 'jewelry-details' && (
                                    <div className="px-4 pb-4 space-y-2">
                                        {Object.entries(PRODUCT_DATA.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-[13px]">
                                                <span className="text-gray-600">{key}:</span>
                                                <span className="font-medium text-gray-900">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronDown, ChevronUp, Share2, Sparkles } from "lucide-react"

// Sample product data
const PRODUCT_DATA = {
    id: 1,
    name: "Nathalie Emerald Cut Lab Diamond Ring (7/8 ct. tw) in 18K Yellow Gold",
    price: 1790,
    totalCaratWeight: "7/8 ct. tw.",
    images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
    ],
    metals: [
        { id: "18k-yellow", label: "18K Yellow Gold", available: true },
        { id: "18k-white", label: "18K White Gold", available: true },
        { id: "18k-rose", label: "18K Rose Gold", available: true },
        { id: "platinum", label: "Platinum", available: true }
    ],
    diamondOrigins: [
        { id: "natural", label: "Natural", available: true },
        { id: "lab-grown", label: "Lab-Grown", available: true, selected: true }
    ],
    sizes: ["3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    features: [
        "Free Shipping & Returns",
        "Free Lifetime Warranty",
        "Free Ring Resizing"
    ],
    description: "Featuring emerald-cut lab diamonds set in a classic band, this ring offers timeless elegance with modern sustainability.",
    specifications: {
        "Total Carat Weight": "7/8 ct. tw.",
        "Diamond Shape": "Emerald",
        "Diamond Origin": "Lab-Grown",
        "Metal": "18K Yellow Gold",
        "Band Width": "2.5mm",
        "Setting Type": "Shared Prong"
    }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedMetal, setSelectedMetal] = useState("18k-yellow")
    const [selectedDiamond, setSelectedDiamond] = useState("lab-grown")
    const [selectedSize, setSelectedSize] = useState("")
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const [expandedSection, setExpandedSection] = useState<string | null>("ring-details")

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
                        <Link href="/wedding-rings" className="hover:text-gray-900">Wedding Rings</Link>
                        <span>/</span>
                        <Link href="/wedding-rings/women" className="hover:text-gray-900">Women's</Link>
                        <span>/</span>
                        <span className="text-gray-900">Modern</span>
                        <span>/</span>
                        <span className="text-gray-900">{PRODUCT_DATA.name.split('(')[0].trim()}</span>
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
                            <label className="text-[13px] font-semibold text-gray-900 block">Metal: 18K Yellow Gold</label>
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

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[13px] font-semibold text-gray-900">Select Size</label>
                                <button
                                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                                    className="text-[13px] text-[#163E3E] hover:underline"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full py-3 px-4 text-[14px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#163E3E] bg-white"
                            >
                                <option value="">Select a size</option>
                                {PRODUCT_DATA.sizes.map((size) => (
                                    <option key={size} value={size}>Size {size}</option>
                                ))}
                            </select>
                        </div>

                        {/* Add to Bag Button */}
                        <button
                            disabled={!selectedSize}
                            className={`w-full py-4 text-[15px] font-bold uppercase tracking-wider rounded-sm transition-all ${selectedSize
                                    ? 'bg-[#163E3E] text-white hover:bg-[#0f2a2a]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
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
                            {/* Ring Details */}
                            <div className="border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => toggleSection('ring-details')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[14px] font-semibold text-gray-900">Ring Details</span>
                                    {expandedSection === 'ring-details' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                                {expandedSection === 'ring-details' && (
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

                            {/* Financing & Payment Options */}
                            <div className="border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => toggleSection('financing')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[14px] font-semibold text-gray-900">Financing & Payment Options</span>
                                    {expandedSection === 'financing' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                                {expandedSection === 'financing' && (
                                    <div className="px-4 pb-4">
                                        <p className="text-[13px] text-gray-700">
                                            Order now and pay over time with 0% APR financing. As low as $149/month with Affirm.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Get a Brilliant Earth Specialist */}
                            <div className="border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => toggleSection('specialist')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[14px] font-semibold text-gray-900">Get a Brilliant Earth Specialist</span>
                                    {expandedSection === 'specialist' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                                {expandedSection === 'specialist' && (
                                    <div className="px-4 pb-4 space-y-3">
                                        <p className="text-[13px] text-gray-700">
                                            Schedule a virtual or in-person appointment with one of our jewelry specialists.
                                        </p>
                                        <button className="text-[13px] font-semibold text-[#163E3E] hover:underline">
                                            Book Appointment →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* You May Also Like */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-[24px] font-serif text-gray-900 mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <Link key={item} href={`/wedding-rings/women/${item}`} className="group">
                                <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden mb-3">
                                    <Image
                                        src={`https://images.unsplash.com/photo-${1605100804763 + item}?w=400`}
                                        alt={`Similar Ring ${item}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-[13px] text-gray-900 mb-1">Similar Diamond Ring</h3>
                                <p className="text-[14px] font-semibold text-gray-900">$1,590</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

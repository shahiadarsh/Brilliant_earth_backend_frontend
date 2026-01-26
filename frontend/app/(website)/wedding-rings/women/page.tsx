"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronDown } from "lucide-react"

// Sample wedding band data
const WEDDING_BANDS = [
    {
        id: 1,
        name: "Nathalie Emerald Cut Lab Diamond Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Yellow Gold",
        type: "Lab Diamond",
        shape: "Emerald"
    },
    {
        id: 2,
        name: "Lunetta Lab Diamond Ring",
        price: 1190,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "White Gold",
        type: "Lab Diamond",
        shape: "Round"
    },
    {
        id: 3,
        name: "Versailles Half Carat Lab Diamond Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Yellow Gold",
        type: "Lab Diamond",
        shape: "Round"
    },
    {
        id: 4,
        name: "Soleil Half Carat Lab Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "Platinum",
        type: "Lab Diamond",
        shape: "Round"
    },
    {
        id: 5,
        name: "Juno Comfort Fit Ring",
        price: 890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Yellow Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 6,
        name: "Verbena Engraved Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Yellow Gold",
        type: "Engraved",
        shape: "Round"
    },
    {
        id: 7,
        name: "Tulipe Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "Platinum",
        type: "Natural Diamond",
        shape: "Round"
    },
    {
        id: 8,
        name: "Sienna Three-Stone Lab Diamond Ring",
        price: 3290,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "Rose Gold",
        type: "Lab Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Yellow Gold",
    "Platinum",
    "White Gold",
    "Eternity",
    "Pave Metal",
    "Curved",
    "Natural Diamond",
    "Lab Diamond",
    "Rose"
]

export default function WomenWeddingRingsPage() {
    const [activeFilter, setActiveFilter] = useState("Yellow Gold")
    const [sortBy, setSortBy] = useState("Best Sellers")

    const filteredBands = WEDDING_BANDS.filter(band =>
        band.category === activeFilter || band.type === activeFilter
    )

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
                        <span className="text-gray-900">Women's</span>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
                <h1 className="text-[32px] font-serif text-gray-900 mb-4">Wedding Bands for Women</h1>
                <p className="text-[15px] text-gray-600 max-w-2xl mx-auto">
                    From eternity rings to curved bands, our stunning bands for women feature premium metals and responsibly sourced gemstones.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="border-y border-gray-200 bg-white sticky top-0 z-30">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-4">
                        {FILTER_TABS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium rounded-full transition-all whitespace-nowrap
                  ${activeFilter === filter
                                        ? 'bg-[#163E3E] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Bar */}
            <div className="max-w-[1400px] mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-semibold text-gray-900">
                            {filteredBands.length} Results
                        </span>
                        <button className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900">
                            <Heart className="w-4 h-4" />
                            Showing by Valentine's Day
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-gray-600">Sort By:</span>
                        <button className="flex items-center gap-2 text-[13px] font-medium text-gray-900 hover:text-[#163E3E]">
                            {sortBy}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-[1400px] mx-auto px-6 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBands.map((band) => (
                        <Link
                            key={band.id}
                            href={`/wedding-rings/women/${band.id}`}
                            className="group"
                        >
                            <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden mb-4">
                                <Image
                                    src={band.image}
                                    alt={band.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                    <Heart className="w-4 h-4 text-gray-600" />
                                </button>
                                {band.type === "Lab Diamond" && (
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#163E3E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Best Seller
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-[14px] font-medium text-gray-900 group-hover:text-[#163E3E] transition-colors line-clamp-2">
                                    {band.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {band.metalColors.map((color) => (
                                        <div
                                            key={color}
                                            className={`w-4 h-4 rounded-full border border-gray-300 ${color === 'yellow' ? 'bg-yellow-400' :
                                                    color === 'white' ? 'bg-gray-200' :
                                                        'bg-rose-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-[15px] font-semibold text-gray-900">
                                    ${band.price.toLocaleString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

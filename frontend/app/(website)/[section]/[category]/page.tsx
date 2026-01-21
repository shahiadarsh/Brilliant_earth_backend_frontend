"use client"

import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Heart, Filter, SlidersHorizontal } from "lucide-react"

// Mock Products - Expanded for various categories
const mockProducts: Record<string, any[]> = {
    "earrings": [
        { id: "e1", name: "Diamond Stud Earrings", price: 850, image: "https://images.unsplash.com/photo-1535633302703-b0703af6c3da?auto=format&fit=crop&q=80&w=400" },
        { id: "e2", name: "Silver Hoop Earrings", price: 120, image: "https://images.unsplash.com/photo-1630019051930-47382db95c2e?auto=format&fit=crop&q=80&w=400" },
        { id: "e3", name: "Pearl Drop Earrings", price: 450, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=400" },
    ],
    "necklaces": [
        { id: "n1", name: "Solitaire Diamond Necklace", price: 1200, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=400" },
        { id: "n2", name: "Gold Chain Necklace", price: 350, image: "https://images.unsplash.com/photo-1611085583191-a3b13b24424a?auto=format&fit=crop&q=80&w=400" },
    ],
    "women": [
        { id: "w1", name: "Petite Shared Prong Band", price: 990, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400" },
        { id: "w2", name: "Eternity Diamond Band", price: 2450, image: "https://images.unsplash.com/photo-1603561596112-0a132b7223e8?auto=format&fit=crop&q=80&w=400" },
    ],
    "men": [
        { id: "m1", name: "Classic Gold Wedding Band", price: 750, image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=400" },
        { id: "m2", name: "Matte Platinum Band", price: 1150, image: "https://images.unsplash.com/photo-1576158187530-98633e8b858c?auto=format&fit=crop&q=80&w=400" },
    ]
}

export default function CategoryListingPage() {
    const { section, category } = useParams()
    const searchParams = useSearchParams()
    const [view, setView] = useState<"grid" | "list">("grid")

    const products = mockProducts[category as string] || mockProducts["earrings"] // Fallback
    const title = (category as string)?.replace("-", " ") || (section as string)?.replace("-", " ")

    return (
        <main className="bg-white min-h-screen">
            {/* Category Header */}
            <div className="bg-[#F9F9F9] border-b border-gray-100 py-12 md:py-20">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
                        <Link href="/" className="hover:text-[#163E3E]">Home</Link>
                        <span className="mx-1">/</span>
                        <Link href={`/${section}`} className="hover:text-[#163E3E] capitalize">{section}</Link>
                        <span className="mx-1">/</span>
                        <span className="text-gray-900 capitalize font-bold">{title}</span>
                    </nav>
                    <div className="max-w-3xl">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 capitalize">{title}</h1>
                        <p className="text-gray-500 text-lg font-light leading-relaxed">
                            Explore our stunning collection of ethically sourced {title}. Each piece is handcrafted to perfection, ensuring a lifetime of brilliance and beauty.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-8 border-b border-gray-100 gap-6">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold border border-gray-200 px-6 py-2.5 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <span className="text-gray-400 text-sm">{products.length} Products</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Sort By:</span>
                            <button className="flex items-center gap-2 text-sm font-medium hover:text-[#163E3E]">
                                Best Sellers <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex border border-gray-100 rounded-sm">
                            <button
                                onClick={() => setView("grid")}
                                className={`p-2 transition-colors ${view === "grid" ? "bg-gray-100 text-[#163E3E]" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="relative aspect-square overflow-hidden mb-6 bg-[#F7F7F7] rounded-sm">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                />
                                <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-sm text-gray-400 hover:text-red-500">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-serif text-xl text-gray-900 group-hover:text-[#163E3E] transition-colors leading-tight">
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-[#163E3E] font-bold text-lg">${product.price.toLocaleString()}</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-white ring-1 ring-gray-100"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5C100] border border-white ring-1 ring-gray-100"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FA9A85] border border-white ring-1 ring-gray-100"></div>
                                    <span className="text-[10px] text-gray-400 ml-1">+2 Metals</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SEO Content Section */}
                <div className="mt-32 pt-20 border-t border-gray-100">
                    <h2 className="font-serif text-3xl mb-8">About Our {title}</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-gray-600 font-light leading-relaxed">
                        <p>
                            Every piece in our {title} collection is designed with precision and care. We use only the finest ethically sourced diamonds and recycled metals to create jewelry that not only looks beautiful but also reflects our commitment to sustainability and ethical practices.
                        </p>
                        <p>
                            Whether you're looking for a classic piece or a modern design, our curated selection offers something for every style and occasion. From timeless solitaire designs to intricate nature-inspired patterns, discover the perfect expression of your unique personality.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, SlidersHorizontal, ChevronDown, Sparkles, ShieldCheck, Heart, X, Check, Search } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { ProductCard } from "@/components/shared/ProductCard"
import { useCart } from "@/context/CartContext"

// Types for filtering
type FilterState = {
    metal: string[];
    price: string | null;
    shape: string[];
    style: string[];
    carat: string | null;
}

const METALS = ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"]
const SHAPES = ["Round", "Oval", "Cushion", "Pear", "Princess", "Emerald", "Marquise", "Radiant"]
const STYLES = ["Solitaire", "Halo", "Three-Stone", "Vintage", "Nature-Inspired"]
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"]

export default function CategoryDetailPage() {
    const params = useParams()
    const pathname = usePathname()
    const dropdownRef = useRef<HTMLDivElement>(null)

    // State
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState("Featured")
    const { wishlist, toggleWishlist } = useCart()
    const [filters, setFilters] = useState<FilterState>({
        metal: [],
        price: null,
        shape: [],
        style: [],
        carat: null
    })

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Extract category and subcategory from pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    const category = pathSegments[0] || "engagement-rings"
    const subcategory = pathSegments[1] || "all-designs"

    // Capitalize and format for display
    const formatTitle = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const displayCategory = formatTitle(category)
    const displayTitle = formatTitle(subcategory)

    // Mock Products Data with stable images
    const products = useMemo(() => {
        const imageList = [
            "/ring1.jfif",
            "/ring2.jfif",
            "/ring3.jfif",
            "/ring4.jfif",
            "/ring5.jfif",
            "/ring6.jfif",
            "/sign1.jfif",
            "/sign2.jfif",
            "/sign3.jfif",
            "/sign4.jfif",
            "/sign5.jfif",
            "/sign6.jfif",
        ]

        return Array.from({ length: 12 }).map((_, i) => ({
            id: i + 1,
            name: `${displayTitle} ${i % 2 === 0 ? 'Signature' : 'Classic'} Design`,
            metal: METALS[i % METALS.length],
            shape: SHAPES[i % SHAPES.length],
            style: STYLES[i % STYLES.length],
            price: 2100 + (i * 450),
            carat: (0.7 + (i * 0.15)).toFixed(2),
            imagesByMetal: {
                "18K White Gold": imageList[i % imageList.length],
                "18K Yellow Gold": imageList[(i + 1) % imageList.length],
                "14K Rose Gold": imageList[(i + 2) % imageList.length],
                "Platinum": imageList[(i + 3) % imageList.length],
            }
        }))
    }, [displayTitle])

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = [...products]

        if (filters.metal.length > 0) {
            result = result.filter(p => filters.metal.includes(p.metal))
        }
        if (filters.shape.length > 0) {
            result = result.filter(p => filters.shape.includes(p.shape))
        }
        if (filters.style.length > 0) {
            result = result.filter(p => filters.style.includes(p.style))
        }

        if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price)
        if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price)
        if (sortBy === "Newest") result.sort((a, b) => b.id - a.id)

        return result
    }, [products, filters, sortBy])

    const toggleFilters = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = (prev[type] || []) as string[]
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value]
            return { ...prev, [type]: next }
        })
    }

    const clearFilters = () => setFilters({ metal: [], price: null, shape: [], style: [], carat: null })

    const handleLoadMore = () => {
        alert("Loading more stunning designs for you...")
    }

    // Category-specific high-fidelity assets
    const categoryData: Record<string, { hero: string; desc: string; quote: string }> = {
        "engagement-rings": {
            hero: "/hero-engagement.jpg",
            desc: "A promise of forever begins here. Discover our collection of ethically sourced engagement rings, each designed to capture a unique love story.",
            quote: "Crafted for a lifetime of brilliance."
        },
        "wedding-rings": {
            hero: "/wedding-rings.jpg",
            desc: "Symbolize your eternal bond with our curated collection of wedding bands. From classic platinum to intricate diamond designs.",
            quote: "Purely yours, eternally bound."
        },
        "jewelry": {
            hero: "/jewelry.jpg",
            desc: "Elevate every moment with Ritzin fine jewelry. Exquisite necklaces, earrings, and bracelets crafted with the finest materials.",
            quote: "Artistry in every facet."
        },
        "gemstones": {
            hero: "/gemstones.jpg",
            desc: "A rainbow of ethical brilliance. Explore our curated selection of lab-grown and natural gemstones in every hue.",
            quote: "Nature's finest colors, ethically sourced."
        }
    }

    const currentData = categoryData[category] || categoryData["engagement-rings"]

    return (
        <main className="bg-white min-h-screen">
            {/* Split Hero Section */}
            <div className="flex flex-col lg:flex-row h-[70vh] border-b border-gray-100">
                <div className="lg:w-1/2 bg-[#163E3E] text-white p-12 md:p-24 lg:p-32 flex flex-col justify-center space-y-10 relative overflow-hidden">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white">{displayCategory}</span>
                    </nav>
                    <div className="space-y-6">
                        <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] font-light">{displayTitle}</h1>
                        <p className="text-xl opacity-60 font-light max-w-md leading-relaxed">
                            {currentData.desc}
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 relative overflow-hidden group">
                    <Image
                        src={currentData.hero}
                        alt={displayTitle}
                        fill
                        className="object-cover transition-all duration-[5000ms] group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-x-12 bottom-12">
                        <div className="bg-white/95 backdrop-blur-md p-10 max-w-sm shadow-2xl relative">
                            <Sparkles className="w-8 h-8 text-[#163E3E] mb-4" />
                            <p className="font-serif text-2xl italic text-gray-900 leading-relaxed">"{currentData.quote}"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Interaction Bar */}
            <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-[60]" ref={dropdownRef}>
                <div className="max-w-[1700px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] border-r pr-10 border-gray-100 text-gray-900 group"
                        >
                            <SlidersHorizontal className="w-4 h-4 group-hover:rotate-180 transition-transform" /> Filters
                        </button>

                        <div className="hidden lg:flex items-center gap-10">
                            {[
                                { name: "Metal", type: "metal", options: METALS },
                                { name: "Stone Shape", type: "shape", options: SHAPES },
                                { name: "Style", type: "style", options: STYLES }
                            ].map((filter) => (
                                <div key={filter.name} className="relative">
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === filter.name ? null : filter.name)}
                                        className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${openDropdown === filter.name ? 'text-[#163E3E]' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        {filter.name}
                                        {(filters[filter.type as keyof FilterState] as string[]).length > 0 && (
                                            <span className="ml-1 w-4 h-4 bg-[#163E3E] text-white rounded-full flex items-center justify-center text-[8px]">
                                                {(filters[filter.type as keyof FilterState] as string[]).length}
                                            </span>
                                        )}
                                        <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === filter.name ? 'rotate-180' : ''}`} />
                                    </button>

                                    {openDropdown === filter.name && (
                                        <div className="absolute top-full left-0 mt-4 w-72 bg-white shadow-2xl border border-gray-100 p-8 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E]">{filter.name}</span>
                                                <button onClick={() => setOpenDropdown(null)} className="text-gray-400 hover:text-black"><X className="w-4 h-4" /></button>
                                            </div>
                                            <div className="space-y-3">
                                                {filter.options.map(opt => (
                                                    <label key={opt} className="flex items-center gap-4 cursor-pointer group">
                                                        <div
                                                            onClick={() => toggleFilters(filter.type as any, opt)}
                                                            className={`w-5 h-5 border flex items-center justify-center transition-all ${filters[filter.type as keyof FilterState]?.includes(opt) ? 'bg-[#163E3E] border-[#163E3E]' : 'border-gray-200 group-hover:border-[#163E3E]'}`}
                                                        >
                                                            {filters[filter.type as keyof FilterState]?.includes(opt) && <Check className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                        <span className={`text-[11px] uppercase tracking-widest transition-colors ${filters[filter.type as keyof FilterState]?.includes(opt) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                        <span className="text-gray-400">Sort:</span>
                        <div className="relative">
                            <button
                                onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                                className={`flex items-center gap-1 transition-colors ${openDropdown === 'sort' ? 'text-[#163E3E]' : 'hover:text-[#163E3E]'}`}
                            >
                                {sortBy} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
                            </button>

                            {openDropdown === 'sort' && (
                                <div className="absolute top-full right-0 mt-4 w-64 bg-white shadow-2xl border border-gray-100 p-4 z-[70] animate-in fade-in slide-in-from-top-2 duration-300">
                                    {SORT_OPTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { setSortBy(s); setOpenDropdown(null); }}
                                            className={`w-full text-left px-5 py-4 text-[10px] uppercase tracking-[0.15em] transition-colors ${sortBy === s ? 'bg-[#163E3E]/5 text-[#163E3E] font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Results Count */}
            <div className="max-w-[1700px] mx-auto px-6 lg:px-12 pt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Showing {filteredProducts.length} Results</p>
            </div>

            {/* Results Grid */}
            <div className="max-w-[1700px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imagesByMetal={product.imagesByMetal}
                            defaultMetal={product.metal}
                            metals={METALS}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center animate-in fade-in duration-500">
                        <div className="mb-8 flex justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                        </div>
                        <p className="font-serif text-3xl text-gray-400 mb-6 font-light">We couldn't find any designs <br /> matching your current filters.</p>
                        <button
                            onClick={clearFilters}
                            className="bg-[#163E3E] text-white px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}

                {filteredProducts.length > 0 && (
                    <div className="mt-40 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-white border border-gray-200 text-[#163E3E] px-24 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-[#163E3E] hover:text-white transition-all shadow-xl"
                        >
                            Load More Designs
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Educational Banner */}
            <div className="bg-[#163E3E] py-40 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center relative z-10">
                    <div className="space-y-14">
                        <div className="space-y-6">
                            <h2 className="font-serif text-6xl md:text-8xl italic leading-tight">Designing <br /> Your Legacy.</h2>
                            <p className="text-2xl opacity-70 font-light leading-relaxed max-w-lg">Whether you're choosing a timeless solitaire or a modern halo, our experts are here to ensure every detail is perfection.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-12">
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <ShieldCheck className="w-8 h-8 opacity-80" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] uppercase tracking-widest mb-1">Lifetime Warranty</h4>
                                    <p className="text-xs opacity-60 leading-relaxed">Free repairs, resizing, and professional cleaning for life.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Sparkles className="w-8 h-8 opacity-80" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] uppercase tracking-widest mb-1">Ethical Stones</h4>
                                    <p className="text-xs opacity-60 leading-relaxed">100% Beyond Conflict Free™ gems and recycled metals.</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/appointment"
                            className="inline-block bg-white text-[#163E3E] px-16 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black hover:text-white transition-all text-center"
                        >
                            Book an Appointment
                        </Link>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 border border-white/20 rotate-6 group-hover:rotate-0 transition-transform duration-1000"></div>
                        <div className="aspect-[4/5] bg-white p-5 rotate-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 group-hover:rotate-0 transition-transform duration-1000">
                            <Image
                                src="/showroom.jfif"
                                alt="Craftsmanship"
                                fill
                                className="object-cover opacity-90 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-[#163E3E]/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

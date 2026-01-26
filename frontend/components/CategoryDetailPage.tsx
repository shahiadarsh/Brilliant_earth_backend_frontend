"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, SlidersHorizontal, ChevronDown, Sparkles, ShieldCheck, Heart, X, Check, Search } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { ProductCard } from "@/components/shared/ProductCard"
import { useCart } from "@/context/CartContext"
import { useGetProductsQuery } from "@/lib/redux/slices/productsApiSlice"

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
    // const { wishlist, toggleWishlist } = useCart()
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<FilterState>({
        metal: [],
        price: null,
        shape: [],
        style: [],
        carat: null
    })

    // Extract category and subcategory from pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    const categorySegment = pathSegments[0] || "engagement-rings"
    const subcategorySegment = pathSegments[1] || ""
    const thirdSegment = pathSegments[2] || ""

    // Prepare query params for backend
    const queryParams = useMemo(() => {
        const query: any = {
            page,
            limit: 8, // Set a reasonable limit
        };

        query.categorySlug = categorySegment;

        if (subcategorySegment) {
            query.styleSlug = subcategorySegment;
        }

        // Handle specific gemstone/wedding metal flows
        if (thirdSegment) {
            const metals = ["platinum", "yellow-gold", "white-gold", "rose-gold"];
            if (metals.includes(thirdSegment)) {
                query.metal = thirdSegment;
            } else {
                // Assume it's a stone type or specific style
                query.styleSlug = thirdSegment;
            }
        }

        if (filters.metal.length > 0) query.metal = filters.metal[0];
        if (filters.shape.length > 0) query.shape = filters.shape[0];

        // Sorting
        if (sortBy === "Price: Low to High") query.sort = 'price-asc';
        if (sortBy === "Price: High to Low") query.sort = 'price-desc';
        if (sortBy === "Newest") query.sort = 'newest';

        return query;

    }, [categorySegment, subcategorySegment, thirdSegment, filters, sortBy, page])

    // Fetch Data
    const { data, isLoading, isFetching } = useGetProductsQuery(queryParams);

    // Local state for accumulated products
    const [allProducts, setAllProducts] = useState<any[]>([]);

    // Effect to append or reset products
    useEffect(() => {
        if (data?.data) {
            if (page === 1) {
                setAllProducts(data.data);
            } else {
                setAllProducts(prev => {
                    // Check for duplicates to be safe, though not strictly necessary if pagination is stable
                    const newProducts = data.data.filter((newP: any) => !prev.some(p => p._id === newP._id));
                    return [...prev, ...newProducts];
                });
            }
        }
    }, [data, page]);

    const products = allProducts;
    const totalResults = data?.pagination?.total || 0;
    const totalPages = data?.pagination?.pages || 1;

    // Reset pagination when filters change (handled by setPage(1) in toggleFilters)
    // We also need to clear products immediately to avoid showing stale data while loading new filter results? 
    // Actually, setting page to 1 will trigger new fetch, and when that comes back, page===1 block runs.

    // Explicitly reset products when completely changing context key if needed, but page dependency handles it.

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

    // Capitalize and format for display
    const formatTitle = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const displayCategory = formatTitle(categorySegment)
    const displayTitle = thirdSegment ? formatTitle(thirdSegment) : (subcategorySegment ? formatTitle(subcategorySegment) : displayCategory);


    const toggleFilters = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = (prev[type] || []) as string[]
            // Single select for now if backend only supports string
            // But let's keep multi-select UI logic and just grab first for query if needed
            // Actually let's assume single select for simplicity in backend mapping or update backend later

            // Toggle Logic
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [value] // Change to [...current, value] if multi-select supported

            return { ...prev, [type]: next }
        })
        setPage(1); // Reset page on filter change
        setAllProducts([]); // Clear current list so we don't mix results
    }

    const clearFilters = () => {
        setFilters({ metal: [], price: null, shape: [], style: [], carat: null });
        setPage(1);
        setAllProducts([]);
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
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

    const currentData = categoryData[categorySegment] || categoryData["engagement-rings"]

    return (
        <main className="bg-white min-h-screen">
            {/* Split Hero Section */}
            <div className="flex flex-col lg:flex-row h-[70vh] border-b border-gray-100">
                <div className="lg:w-1/2 bg-[#163E3E] text-white p-12 md:p-24 lg:p-32 flex flex-col justify-center space-y-10 relative overflow-hidden">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/${categorySegment}`} className="hover:text-white">{displayCategory}</Link>
                        {subcategorySegment && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white">{displayTitle}</span>
                            </>
                        )}
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
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Showing {totalResults} Results</p>
            </div>

            {/* Results Grid */}
            <div className="max-w-[1700px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
                {isLoading && page === 1 ? (
                    <div className="flex justify-center py-40">
                        <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-[#163E3E] rounded-full"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                            {products.map((product: any) => {
                                // Map backend product structure to ProductCard props
                                // Handle images: backend might return imagesByMetal (Map) or plain images array
                                let imagesByMetal = product.imagesByMetal || {};

                                // Determine available metals
                                // Ring has 'metals' (array), Jewelry has 'metalType' (string)
                                const availableMetals = product.metals && product.metals.length > 0
                                    ? product.metals
                                    : (product.metalType ? [product.metalType] : METALS);

                                if (product.images && product.images.length > 0 && Object.keys(imagesByMetal).length === 0) {
                                    // Fallback: use first image for all available metals
                                    availableMetals.forEach((metal: string) => {
                                        imagesByMetal[metal] = product.images[0];
                                    });
                                }

                                // Ensure we have at least defaults for the standard METALS if nothing else matches (failsafe)
                                // or just rely on what we have.
                                // If imagesByMetal is still empty (no images at all), ProductCard handles it with placeholder.

                                return (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        name={product.name || product.title}
                                        price={product.price}
                                        imagesByMetal={imagesByMetal}
                                        defaultMetal={availableMetals[0]}
                                        metals={availableMetals}
                                    />
                                )
                            })}
                        </div>

                        {!isLoading && products.length === 0 && (
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

                        {/* Load More Button - Logic for pagination check */}
                        {data?.pagination && page < data.pagination.pages && (
                            <div className="mt-40 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isFetching}
                                    className="bg-white border border-gray-200 text-[#163E3E] px-24 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-[#163E3E] hover:text-white transition-all shadow-xl disabled:opacity-50"
                                >
                                    {isFetching ? "Loading..." : "Load More Designs"}
                                </button>
                            </div>
                        )}
                    </>
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

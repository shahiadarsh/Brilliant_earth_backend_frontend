"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const stones = [
    {
        id: 1,
        name: "Oval Sapphire Ring",
        price: "$2,450",
        image: "/sign1.jfif",
        badge: "TOP RATED"
    },
    {
        id: 2,
        name: "Emerald Cut Emerald Ring",
        price: "$3,800",
        image: "/sign2.jfif"
    },
    {
        id: 3,
        name: "Round Ruby Solitaire",
        price: "$2,100",
        image: "/sign3.jfif"
    },
    {
        id: 4,
        name: "Pear Aquamarine Ring",
        price: "$1,650",
        image: "/sign4.jfif",
        badge: "NEW ARRIVAL"
    },
    {
        id: 5,
        name: "Cushion Morganite Ring",
        price: "$1,850",
        image: "/sign5.jfif"
    },
    {
        id: 6,
        name: "Princess Topaz Ring",
        price: "$1,200",
        image: "/sign6.jfif"
    }
]

function ProductCard({ product }: { product: any }) {
    return (
        <div className="min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex flex-col group cursor-pointer">
            <div className="relative aspect-square bg-gray-50 mb-4 rounded-sm overflow-hidden">
                {product.badge && (
                    <span className="absolute top-2 left-2 bg-[#163E3E] text-white px-2 py-1 text-[9px] font-bold tracking-widest uppercase z-10 rounded-[2px] shadow-sm">
                        {product.badge}
                    </span>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>
            <div className="text-center px-1">
                <h3 className="text-[13px] text-gray-900 font-medium leading-snug tracking-wide mb-1.5 font-sans">
                    {product.name}
                </h3>
                <p className="text-[13px] text-gray-700">
                    {product.price}
                </p>
            </div>
        </div>
    )
}

export function PopularGemstones() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 280 : 340
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <section className="py-12 md:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
                <div className="text-center sm:text-left">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-2">
                        Trending Gemstone Rings
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">Experience the vibrant colors and exceptional quality of our gemstone collection.</p>
                </div>
                <Link
                    href="/gemstones"
                    className="hidden sm:inline-block text-[11px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E]/20 hover:border-[#163E3E] transition-all pb-1"
                >
                    View All Gemstones
                </Link>
            </div>

            <div className="relative group/slider">
                <button
                    onClick={() => scroll("left")}
                    className="hidden md:flex absolute left-0 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-[#163E3E] transition-all opacity-0 group-hover/slider:opacity-100 -ml-6 border border-gray-100"
                >
                    <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {stones.map((stone) => (
                        <div key={stone.id} className="snap-start">
                            <ProductCard product={stone} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="hidden md:flex absolute right-0 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-[#163E3E] transition-all opacity-0 group-hover/slider:opacity-100 -mr-6 border border-gray-100"
                >
                    <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>
        </section>
    )
}

"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const jewelryList = [
    {
        id: 1,
        name: "Diamond Stud Earrings",
        price: "$850",
        image: "/featured1.webp",
        badge: "BEST SELLER"
    },
    {
        id: 2,
        name: "Classic Tennis Bracelet",
        price: "$2,200",
        image: "/featured2.webp",
        badge: "LUXE"
    },
    {
        id: 3,
        name: "Pearl Strand Necklace",
        price: "$450",
        image: "/featured3.webp",
        badge: null
    },
    {
        id: 4,
        name: "Diamond Solitaire Pendant",
        price: "$1,100",
        image: "/sign1.jfif",
        badge: "TOP GIFT"
    },
    {
        id: 5,
        name: "Sapphire Floral Pendant",
        price: "$1,350",
        image: "/sign3.jfif",
        badge: "NEW"
    },
    {
        id: 6,
        name: "Eternity Diamond Band",
        price: "$3,250",
        image: "/ring3.jfif",
        badge: null
    }
]

function ProductCard({ product }: { product: any }) {
    return (
        <div className="min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex flex-col group cursor-pointer">
            <div className="relative aspect-square bg-gray-50 mb-4 rounded-sm">
                {product.badge && (
                    <span className="absolute top-2 left-2 bg-white/95 px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-gray-800 z-10 rounded-[2px] shadow-sm">
                        {product.badge}
                    </span>
                )}

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            <div className="text-center px-1">
                <h3 className="text-[14px] text-gray-900 font-medium tracking-wide mb-1 font-sans">
                    {product.name}
                </h3>
                <p className="text-[14px] text-gray-900 font-bold">
                    {product.price}
                </p>
            </div>
        </div>
    )
}

export function PopularRings() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 280 : 340
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <section className="py-12 md:py-20 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative bg-white overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
                <div className="text-center sm:text-left">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-2">
                        Most-Loved Jewelry
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">Discover the pieces that our customers are currently obsessed with.</p>
                </div>
                <Link href="/jewelry" className="hidden sm:inline-block text-[11px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E]/20 hover:border-[#163E3E] transition-all pb-1">
                    View All Jewelry
                </Link>
            </div>

            <div className="relative group/slider">
                <button onClick={() => scroll("left")} className="hidden md:flex absolute left-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 items-center justify-center text-gray-600 hover:text-[#163E3E] transition-all opacity-0 group-hover/slider:opacity-100 -ml-5">
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <div ref={scrollRef} className="flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {jewelryList.map((item) => (
                        <div key={item.id} className="snap-start"><ProductCard product={item} /></div>
                    ))}
                </div>
                <button onClick={() => scroll("right")} className="hidden md:flex absolute right-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 items-center justify-center text-gray-600 hover:text-[#163E3E] transition-all opacity-0 group-hover/slider:opacity-100 -mr-5">
                    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
            </div>
        </section>
    )
}

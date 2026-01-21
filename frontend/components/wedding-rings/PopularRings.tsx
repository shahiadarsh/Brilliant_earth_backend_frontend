"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const rings = [
    {
        id: 1,
        name: "Classic Wedding Band",
        price: "$550",
        image: "/ring1.jfif",
        badge: null,
        defaultColor: "Yellow Gold"
    },
    {
        id: 2,
        name: "Starlight Diamond Ring",
        price: "$950",
        image: "/ring2.jfif",
        badge: null,
        defaultColor: "White Gold"
    },
    {
        id: 3,
        name: "Eternity Diamond Band",
        price: "$3,250",
        image: "/ring3.jfif",
        badge: null,
        defaultColor: "Platinum"
    },
    {
        id: 4,
        name: "Petite Comfort Fit Ring",
        price: "$650",
        image: "/ring4.jfif",
        badge: "MOST LOVED",
        badgePosition: "left",
        defaultColor: "Yellow Gold"
    },
    {
        id: 5,
        name: "Amaryllis Diamond Ring",
        price: "$1,150",
        image: "/ring5.jfif",
        badge: null,
        defaultColor: "Rose Gold"
    },
    {
        id: 6,
        name: "Nature Inspired Band",
        price: "$1,390",
        image: "/ring6.jfif",
        badge: "NEW",
        badgePosition: "right",
        defaultColor: "Yellow Gold"
    }
]

const metals = [
    { name: "White Gold", color: "#E8E8E8" },
    { name: "Yellow Gold", color: "#E4C987" },
    { name: "Rose Gold", color: "#EABBA2" },
    { name: "Platinum", color: "#D4D4D4" }
]

function ProductCard({ product }: { product: any }) {
    const [selectedMetal, setSelectedMetal] = useState(product.defaultColor)

    return (
        <div className="min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex flex-col group cursor-pointer">
            <div className="relative aspect-square bg-white mb-4">
                {product.badge && (
                    <span
                        className={`absolute top-2 bg-white/95 px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-gray-800 z-10 rounded-[2px] shadow-sm
            ${product.badgePosition === "right" ? "right-2" : "left-2"}`}
                    >
                        {product.badge}
                    </span>
                )}

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </div>

            <div className="flex justify-center gap-2 mb-3">
                {metals.map((metal) => (
                    <button
                        key={metal.name}
                        onClick={(e) => {
                            e.preventDefault()
                            setSelectedMetal(metal.name)
                        }}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-200 relative
              ${selectedMetal === metal.name
                                ? "ring-1 ring-offset-2 ring-gray-400"
                                : "hover:scale-110"
                            }`}
                        style={{
                            backgroundColor: metal.color,
                            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                        }}
                        aria-label={metal.name}
                    />
                ))}
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

export function PopularRings() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 200 : 300
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
                        Most-Loved Wedding Rings
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">Our bestselling bands, designed for a lifetime of love.</p>
                </div>
                <Link
                    href="/wedding-rings"
                    className="hidden sm:inline-block text-[11px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E]/20 hover:border-[#163E3E] transition-all pb-1"
                >
                    View All Bands
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
                    {rings.map((ring) => (
                        <div key={ring.id} className="snap-start">
                            <ProductCard product={ring} />
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

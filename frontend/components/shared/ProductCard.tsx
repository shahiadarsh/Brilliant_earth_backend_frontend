"use client"

import { useState } from "react"
import { Heart, Search } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { QuickViewModal } from "./QuickViewModal"
import Image from "next/image"

interface ProductCardProps {
    id: number | string;
    name: string;
    price: number;
    imagesByMetal: Record<string, string>;
    defaultMetal: string;
    metals: string[];
}

export function ProductCard({ id, name, price, imagesByMetal, defaultMetal, metals }: ProductCardProps) {
    const [selectedMetal, setSelectedMetal] = useState(defaultMetal)
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const { toggleWishlist, wishlist, addToCart } = useCart()
    const isWishlisted = wishlist.includes(id)

    const metalColors: Record<string, string> = {
        "18K White Gold": "#E5E5E5",
        "18K Yellow Gold": "#D4AF37",
        "14K Rose Gold": "#E6C1B1",
        "Platinum": "#D9D9D9",
    }

    return (
        <div className="group cursor-pointer space-y-8 animate-in fade-in duration-700">
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-[#FAFAFA] overflow-hidden group">
                <Image
                    src={imagesByMetal[selectedMetal] || imagesByMetal[defaultMetal]}
                    alt={name}
                    fill
                    unoptimized
                    className="object-cover transition-all duration-[2000ms] group-hover:scale-105"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                    }}
                />

                {/* Wishlist Button */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleWishlist(id)
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted
                            ? "bg-red-50 text-red-500 shadow-md"
                            : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500"
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-all duration-500 z-10 flex gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setIsQuickViewOpen(true)
                        }}
                        className="flex-1 bg-white/90 backdrop-blur-md py-4 text-[10px] font-bold uppercase tracking-widest text-[#163E3E] hover:bg-[#163E3E] hover:text-white transition-colors shadow-2xl"
                    >
                        Quick View
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart({
                                id: `${id}-${selectedMetal}`,
                                name,
                                price,
                                image: imagesByMetal[selectedMetal] || imagesByMetal[defaultMetal],
                                metal: selectedMetal
                            })
                            setIsAdded(true)
                            setTimeout(() => setIsAdded(false), 2000)
                        }}
                        className={`flex-1 ${isAdded ? 'bg-green-600' : 'bg-[#163E3E]'} text-white py-4 text-[10px] font-bold uppercase tracking-widest transition-all shadow-2xl relative overflow-hidden`}
                    >
                        {isAdded ? (
                            <span className="flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                                <Search className="w-3 h-3 rotate-45" /> Added!
                            </span>
                        ) : (
                            "Add to Bag"
                        )}
                    </button>
                </div>

                {/* Search Icon Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                    <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100" />
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
                {/* Metal Selection Swatches */}
                <div className="flex gap-3">
                    {metals.map((metal) => (
                        <button
                            key={metal}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSelectedMetal(metal)
                            }}
                            className={`w-4 h-4 rounded-full border border-gray-100 transition-all duration-300 hover:scale-110 ${selectedMetal === metal
                                ? "ring-2 ring-offset-2 ring-[#163E3E] scale-110"
                                : "ring-0"
                                }`}
                            style={{ backgroundColor: metalColors[metal] || "#ccc" }}
                            title={metal}
                        />
                    ))}
                </div>

                <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-gray-900 group-hover:text-[#163E3E] transition-colors">{name}</h3>
                    <p className="text-gray-500 font-light italic text-sm">{selectedMetal}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <p className="text-lg font-serif text-[#163E3E]">${price.toLocaleString()}</p>
                    <div className="flex items-center gap-1 opacity-40">
                        {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1 h-1 bg-[#163E3E] rounded-full"></div>)}
                    </div>
                </div>
            </div>

            <QuickViewModal
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
                product={{
                    id,
                    name,
                    price,
                    imagesByMetal,
                    metals,
                    defaultMetal
                }}
            />
        </div>
    )
}

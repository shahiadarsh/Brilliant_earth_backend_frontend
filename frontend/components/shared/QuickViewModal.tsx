"use client"

import { X, Heart, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: number | string;
        name: string;
        price: number;
        imagesByMetal: Record<string, string>;
        metals: string[];
        defaultMetal: string;
        description?: string;
    };
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    const { addToCart, toggleWishlist, wishlist } = useCart()
    const [selectedMetal, setSelectedMetal] = useState(product.defaultMetal)
    const [mounted, setMounted] = useState(false)
    const isWishlisted = wishlist.includes(product.id)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!isOpen || !mounted) return null

    const metalColors: Record<string, string> = {
        "18K White Gold": "#E5E5E5",
        "18K Yellow Gold": "#D4AF37",
        "14K Rose Gold": "#E6C1B1",
        "Platinum": "#D9D9D9",
    }

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white w-full max-w-5xl rounded-sm shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Product Images */}
                <div className="w-full md:w-1/2 bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-12">
                    <Image
                        src={product.imagesByMetal[selectedMetal]}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain mix-blend-multiply"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.jpg";
                        }}
                    />
                    <div className="absolute bottom-8 left-8 flex gap-3">
                        {Object.keys(product.imagesByMetal).map((m, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${m === selectedMetal ? "bg-[#163E3E]" : "bg-gray-200"}`}></div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
                    <div className="space-y-2 mb-8">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Ritzin Signature Collection</p>
                        <h2 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight">{product.name}</h2>
                        <p className="text-2xl font-serif text-[#163E3E] mt-4">${(product.price || 0).toLocaleString()}</p>
                    </div>

                    <div className="space-y-8 mb-12 flex-grow">
                        {/* Metal Selection */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Select Metal: <span className="font-normal text-gray-500 ml-2">{selectedMetal}</span></h4>
                            <div className="flex gap-4">
                                {product.metals.map((metal) => (
                                    <button
                                        key={metal}
                                        onClick={() => setSelectedMetal(metal)}
                                        className={`w-10 h-10 rounded-full border border-gray-100 transition-all ${selectedMetal === metal
                                            ? "ring-2 ring-offset-2 ring-[#163E3E] scale-110 shadow-md"
                                            : "hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: metalColors[metal] || "#ccc" }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description Mock */}
                        <p className="text-gray-500 font-light leading-relaxed text-sm">
                            Handcrafted with exceptional attention to detail, this design features a stunning ethical diamond set in recycled precious metal. A perfect balance of timeless elegance and modern brilliance.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-gray-300" />
                                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Lifetime Warranty</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-gray-300" />
                                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Ethically Sourced</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                addToCart({
                                    id: `${product.id}-${selectedMetal}`,
                                    name: product.name,
                                    price: product.price,
                                    image: product.imagesByMetal[selectedMetal],
                                    metal: selectedMetal
                                })
                            }}
                            className="w-full bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                            <ShoppingBag className="w-4 h-4" /> Add to Bag
                        </button>
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className="w-full border border-gray-900 py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                        >
                            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                            {isWishlisted ? "Saved to Wishlist" : "Save for Later"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

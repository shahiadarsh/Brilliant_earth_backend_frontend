"use client"

import Link from "next/link"
import { Heart, MoveRight, ShoppingBag, Sparkles } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { ProductCard } from "@/components/shared/ProductCard"
import { useMemo } from "react"

// Centralized METALS for consistency
const METALS = ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"]

export default function WishlistPage() {
    const { wishlist, cartCount } = useCart()

    // Mock All Products (matching CategoryDetailPage)
    const allProducts = useMemo(() => {
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
            name: `${i % 2 === 0 ? 'Signature' : 'Classic'} Design ${i + 1}`,
            metal: METALS[i % METALS.length],
            price: 2100 + (i * 450),
            imagesByMetal: {
                "18K White Gold": imageList[i % imageList.length],
                "18K Yellow Gold": imageList[(i + 1) % imageList.length],
                "14K Rose Gold": imageList[(i + 2) % imageList.length],
                "Platinum": imageList[(i + 3) % imageList.length],
            }
        }))
    }, [])

    const wishlistedProducts = useMemo(() => {
        return allProducts.filter(p => wishlist.includes(p.id))
    }, [wishlist, allProducts])

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            <Link href="/" className="hover:text-black">Home</Link>
                            <span className="text-gray-200">/</span>
                            <span className="text-black">Wishlist</span>
                        </nav>
                        <h1 className="text-[48px] font-serif text-gray-900 leading-tight">Saved Designs</h1>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#163E3E]">
                        {wishlist.length} {wishlist.length === 1 ? 'Design' : 'Designs'} Saved
                    </p>
                </div>

                {wishlistedProducts.length === 0 ? (
                    <div className="text-center py-40 bg-[#FAFAFA] border border-dashed border-gray-200 rounded-sm animate-in fade-in duration-700">
                        <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-10">
                            <Heart className="w-8 h-8 text-red-200" />
                        </div>
                        <h2 className="text-2xl font-serif text-gray-400 mb-8 font-light">You haven't saved any designs yet</h2>
                        <Link
                            href="/engagement-rings"
                            className="inline-flex items-center gap-6 bg-[#163E3E] text-white px-12 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black transition-all shadow-xl group"
                        >
                            Explore Collections
                            <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                        {wishlistedProducts.map((product) => (
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
                )}

                {wishlistedProducts.length > 0 && (
                    <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col items-center">
                        <Sparkles className="w-10 h-10 text-[#163E3E] mb-8 opacity-20" />
                        <h3 className="font-serif text-3xl text-gray-900 mb-10">Ready to take the next step?</h3>
                        <div className="flex gap-6">
                            <Link href="/cart" className="bg-[#163E3E] text-white px-12 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black transition-all shadow-xl flex items-center gap-3">
                                <ShoppingBag className="w-4 h-4" /> Go to Bag ({cartCount})
                            </Link>
                            <Link href="/appointment" className="border border-gray-900 px-12 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black hover:text-white transition-all">
                                Book an Appointment
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

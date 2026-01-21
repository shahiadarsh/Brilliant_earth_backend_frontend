"use client"

import React from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { ShieldCheck, Truck, Sparkles, Heart, ArrowLeft, ArrowRight, ShoppingBag, Info } from 'lucide-react'
import Link from 'next/link'

export default function ReviewSelectionPage() {
    const { selectedSetting, selectedDiamond, clearSelection } = useSelection()
    const { addToCart } = useCart()
    const router = useRouter()

    if (!selectedSetting || !selectedDiamond) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <Sparkles className="w-10 h-10 text-gray-200" />
                </div>
                <h1 className="text-3xl font-serif text-gray-900 mb-6 italic">Complete Your Design</h1>
                <p className="text-sm text-gray-500 max-w-md mb-10 font-light leading-relaxed">
                    You're almost there! To see your final masterpiece, please finish selecting both your setting and your diamond.
                </p>
                <Link href="/design/setting" className="bg-[#163E3E] text-white px-12 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black transition-all shadow-xl">
                    Resume Designing
                </Link>
            </div>
        )
    }

    const totalPrice = selectedSetting.price + selectedDiamond.price

    const handleAddToBag = () => {
        addToCart({
            id: `custom-${selectedSetting.id}-${selectedDiamond.id}`,
            name: `${selectedSetting.name} with ${selectedDiamond.name}`,
            price: totalPrice,
            image: selectedSetting.image,
            metal: selectedSetting.metal,
            quantity: 1
        })
        clearSelection()
        router.push('/cart')
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            <main className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left: Component Visuals */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="relative aspect-square bg-[#F9F9F9] rounded-sm overflow-hidden group border border-gray-50 flex items-center justify-center">
                            <Image
                                src={selectedSetting.image}
                                alt="Custom Ring"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 shadow-sm">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#163E3E]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E]">Insured & Certified</span>
                                </div>
                            </div>
                            <div className="absolute bottom-8 right-8">
                                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Heart className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="group relative aspect-[4/5] bg-[#F9F9F9] rounded-sm overflow-hidden border border-gray-50 pt-8">
                                <div className="flex flex-col items-center h-full">
                                    <div className="relative w-40 h-40 mb-4 transition-transform duration-700 group-hover:scale-110">
                                        <Image src={selectedDiamond.image} alt="Diamond" fill className="object-contain" />
                                    </div>
                                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 bg-white/80 px-4 py-1.5 rounded-full border border-gray-50">Selected {selectedDiamond.type === 'gemstone' ? 'Gemstone' : 'Diamond'}</p>
                                </div>
                            </div>
                            <div className="group relative aspect-[4/5] bg-[#F9F9F9] rounded-sm overflow-hidden border border-gray-50">
                                <img src="/home/featured1.jfif" alt="Lifestyle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/5" />
                                <p className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-[0.2em] text-white bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-sm border border-white/20">Handcrafted Detail</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary & Checkout */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.4em] text-[#163E3E]">
                                    <Sparkles className="w-3.5 h-3.5" /> Final Review
                                </div>
                                <h1 className="text-[40px] md:text-[52px] font-serif text-gray-900 leading-tight italic">Your Bespoke <br /> Creation.</h1>
                            </div>
                            <p className="text-[16px] font-light text-gray-500 leading-relaxed max-w-sm italic">
                                "A timeless symbol of love, crafted with precision and ethics at every step."
                            </p>
                        </div>

                        <div className="bg-white border border-gray-100 p-8 md:p-12 space-y-10 shadow-2xl relative rounded-sm">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F9F9] rounded-bl-[100%] z-0" />

                            <div className="space-y-12 relative z-10">
                                <div className="flex justify-between items-start group cursor-pointer" onClick={() => router.push('/design/setting')}>
                                    <div className="space-y-2">
                                        <p className="text-[11px] uppercase font-bold tracking-widest text-[#163E3E] pb-1 border-b border-[#163E3E]/20 inline-block">The Setting</p>
                                        <h3 className="font-serif text-xl text-gray-900 group-hover:underline">{selectedSetting.name}</h3>
                                        <p className="text-[11px] font-medium text-gray-400 capitalize">{selectedSetting.metal}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-serif text-gray-900">${selectedSetting.price.toLocaleString()}</p>
                                        <button className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2 hover:text-black transition-colors">Modify Setting</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start group cursor-pointer" onClick={() => router.push(selectedDiamond.type === 'gemstone' ? '/design/gemstone' : '/design/diamond')}>
                                    <div className="space-y-2">
                                        <p className="text-[11px] uppercase font-bold tracking-widest text-[#163E3E] pb-1 border-b border-[#163E3E]/20 inline-block">The {selectedDiamond.type === 'gemstone' ? 'Gemstone' : 'Diamond'}</p>
                                        <h3 className="font-serif text-xl text-gray-900 group-hover:underline">{selectedDiamond.name}</h3>
                                        <p className="text-[11px] font-medium text-gray-400">{selectedDiamond.shape} · Conflict-Free</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-serif text-gray-900">${selectedDiamond.price.toLocaleString()}</p>
                                        <button className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2 hover:text-black transition-colors">Change Stone</button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-gray-100 space-y-8 relative z-10">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[11px] uppercase font-bold tracking-[0.3em] text-gray-400">Your Creation Total</p>
                                        <p className="text-[42px] font-serif text-[#163E3E] leading-none">${totalPrice.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-help">
                                        <p className="text-[10px] text-gray-400 font-light italic border-b border-gray-200 group-hover:border-gray-400 transition-all">Financing available</p>
                                        <Info className="w-3 h-3 text-gray-300" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToBag}
                                    className="w-full bg-[#163E3E] text-white py-8 uppercase font-bold tracking-[0.4em] text-[12px] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-5 group overflow-hidden relative"
                                >
                                    <div className="absolute inset-y-0 left-0 w-1 bg-white/20 transition-all group-hover:w-full" />
                                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                                    <span className="relative z-10">Add To Your Shopping Bag</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#F9F9F9] p-8 space-y-6 rounded-sm">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#163E3E] flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Complimentary with Order
                            </h4>
                            <ul className="text-[13px] text-gray-500 font-light space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#163E3E] rounded-full" />
                                    Free discrete shipping and returns
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#163E3E] rounded-full" />
                                    Complimentary jewelry cleaning kit
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#163E3E] rounded-full" />
                                    Lifetime warranty and resizing
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

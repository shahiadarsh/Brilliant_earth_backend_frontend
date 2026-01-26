"use client"

import React, { useState } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { ChevronDown, Sparkles, ShieldCheck, Truck, Award, Info, Play } from 'lucide-react'
import Link from 'next/link'

const RING_SIZES = [3, 3.25, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]

export default function BridalSetReviewPage() {
    const { selectedBridalSet, selectedDiamond, addToCart } = useSelection()
    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState(6.5)
    const [view3D, setView3D] = useState(false)

    if (!selectedBridalSet || !selectedDiamond) {
        router.push('/design/bridal-set')
        return null
    }

    const totalPrice = selectedBridalSet.price + selectedDiamond.price

    const handleAddToBag = () => {
        addToCart({
            id: `${selectedBridalSet.id}-${selectedDiamond.id}`,
            type: 'bridal-set',
            name: `${selectedBridalSet.name} with ${selectedDiamond.carat}ct ${selectedDiamond.shape} Diamond`,
            price: totalPrice,
            image: selectedBridalSet.image,
            metal: selectedBridalSet.metal,
            size: selectedSize,
            bridalSet: selectedBridalSet,
            diamond: selectedDiamond
        })
        router.push('/cart')
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-6 py-3">
                    <nav className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900">Engagement Rings</Link>
                        <span>/</span>
                        <Link href="/design/bridal-set" className="hover:text-gray-900">Design Your Own Engagement Ring</Link>
                    </nav>
                </div>
            </div>

            {/* 3-Step Flow */}
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#163E3E] text-white flex items-center justify-center text-[12px] font-bold">✓</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Design Your Bridal Set</p>
                                <p className="text-[12px] font-semibold text-gray-900">Setting</p>
                                <p className="text-[11px] text-gray-500">{selectedBridalSet.engagementRing}</p>
                            </div>
                            <img src={selectedBridalSet.image} alt="Setting" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="w-8 h-px bg-[#163E3E]" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#163E3E] text-white flex items-center justify-center text-[12px] font-bold">✓</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Choose Diamond</p>
                                <p className="text-[12px] font-semibold text-gray-900">Diamond</p>
                                <p className="text-[11px] text-gray-500">{selectedDiamond.carat} ct {selectedDiamond.shape}</p>
                            </div>
                            <img src={selectedDiamond.image} alt="Diamond" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="w-8 h-px bg-gray-200" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#163E3E] text-white flex items-center justify-center text-[12px] font-bold">3</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Complete Ring</p>
                                <p className="text-[12px] font-semibold text-gray-900">Select Ring Size</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left: Images */}
                    <div className="lg:col-span-6">
                        <div className="space-y-6 sticky top-24">
                            {/* Main Composite Image */}
                            <div className="relative aspect-square bg-white border border-gray-100 rounded-sm overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                    {/* Engagement Ring (Base Layer) */}
                                    <div className="relative w-full h-full">
                                        <img
                                            src={selectedBridalSet.image}
                                            alt="Engagement Ring"
                                            className="absolute inset-0 w-full h-full object-contain"
                                        />
                                        {/* Diamond Overlay (Center) */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img
                                                src={selectedDiamond.image}
                                                alt="Diamond"
                                                className="w-[35%] h-[35%] object-contain drop-shadow-lg"
                                                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 3D Toggle */}
                                <button
                                    onClick={() => setView3D(!view3D)}
                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-md text-[11px] font-semibold text-gray-900 hover:bg-white"
                                >
                                    {view3D ? '2D View' : '3D View'}
                                </button>
                            </div>

                            {/* Additional Images Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                {/* Engagement Ring */}
                                <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                                    <img src={selectedBridalSet.image} alt="Engagement Ring" className="w-full h-full object-contain p-4" />
                                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-sm">
                                        <p className="text-[9px] font-medium text-gray-700">Shown with 1 Carat Diamond</p>
                                    </div>
                                </div>

                                {/* Diamond Close-up */}
                                <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                                    <img src={selectedDiamond.image} alt="Diamond" className="w-full h-full object-contain p-6" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <Play className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Wedding Band */}
                                <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                                    <img src={selectedBridalSet.image} alt="Wedding Band" className="w-full h-full object-contain p-4" />
                                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-sm">
                                        <p className="text-[9px] font-medium text-gray-700">Shown with 1 Carat Diamond</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:col-span-6">
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <h1 className="text-[32px] font-serif text-gray-900 leading-tight mb-2">
                                    Your One-of-a-Kind Ring
                                </h1>
                                <p className="text-[15px] text-gray-600">
                                    {selectedBridalSet.engagementRing} with {selectedDiamond.carat} ct {selectedDiamond.shape} Diamond in {selectedBridalSet.metal}
                                </p>
                            </div>

                            {/* Specifications Table */}
                            <div className="grid grid-cols-2 gap-8 py-6 border-t border-b border-gray-200">
                                {/* Left: Engagement Ring */}
                                <div className="space-y-4">
                                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-gray-900">
                                        Engagement Ring
                                    </h3>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-[11px] text-gray-500">Setting</p>
                                            <p className="text-[13px] font-medium text-gray-900">{selectedBridalSet.engagementRing}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-500">Metal</p>
                                            <p className="text-[13px] font-medium text-gray-900">{selectedBridalSet.metal}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-500">Price</p>
                                            <p className="text-[16px] font-serif text-gray-900">${selectedBridalSet.price.toLocaleString()}</p>
                                        </div>
                                        <Link href="/design/bridal-set" className="text-[11px] text-[#163E3E] font-semibold hover:underline">
                                            Modify Setting
                                        </Link>
                                    </div>
                                </div>

                                {/* Right: Diamond */}
                                <div className="space-y-4">
                                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-gray-900">
                                        Diamond
                                    </h3>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-[11px] text-gray-500">Carat Weight</p>
                                            <p className="text-[13px] font-medium text-gray-900">{selectedDiamond.carat} ct</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-500">Shape</p>
                                            <p className="text-[13px] font-medium text-gray-900">{selectedDiamond.shape}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-500">Cut</p>
                                            <p className="text-[13px] font-medium text-gray-900">{selectedDiamond.cut}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-[11px] text-gray-500">Color</p>
                                                <p className="text-[13px] font-medium text-gray-900">{selectedDiamond.color}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-gray-500">Clarity</p>
                                                <p className="text-[13px] font-medium text-gray-900">{selectedDiamond.clarity}</p>
                                            </div>
                                        </div>
                                        <div className="inline-block bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                                            Conflict-Free
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-500">Price</p>
                                            <p className="text-[16px] font-serif text-gray-900">${selectedDiamond.price.toLocaleString()}</p>
                                        </div>
                                        <Link href="/design/diamond" className="text-[11px] text-[#163E3E] font-semibold hover:underline">
                                            Change Stone
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Ring Size Selector */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[13px] font-bold uppercase tracking-wider text-gray-900">
                                        Ring Size: {selectedSize === 3.25 ? '3 1/4' : selectedSize}
                                    </label>
                                    <button className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-[#163E3E]">
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-6 md:grid-cols-7 gap-2">
                                    {RING_SIZES.map(size => {
                                        const displaySize = size === 3.25 ? '3 1/4' : size.toString()
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-2 text-[12px] rounded-sm transition-all border ${selectedSize === size
                                                        ? 'bg-[#163E3E] text-white border-[#163E3E] shadow-md'
                                                        : 'border-gray-100 text-gray-400 hover:border-gray-300'
                                                    }`}
                                            >
                                                {displaySize}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Total Price */}
                            <div className="bg-gray-50 p-6 rounded-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[13px] font-bold uppercase tracking-wider text-gray-600">Total</span>
                                    <span className="text-[36px] font-serif text-[#163E3E]">${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="space-y-2 text-[12px] text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Engagement Ring</span>
                                        <span>${selectedBridalSet.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Diamond ({selectedDiamond.carat} ct)</span>
                                        <span>${selectedDiamond.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Bag Button */}
                            <button
                                onClick={handleAddToBag}
                                className="w-full bg-[#163E3E] text-white py-5 text-[14px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                            >
                                <Sparkles className="w-5 h-5" />
                                ADD TO BAG
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <ShieldCheck className="w-6 h-6 text-[#163E3E] mx-auto mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Free Shipping</p>
                                    <p className="text-[9px] text-gray-500">Free 30 Day Returns</p>
                                </div>
                                <div className="text-center">
                                    <Truck className="w-6 h-6 text-[#163E3E] mx-auto mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Order now</p>
                                    <p className="text-[9px] text-gray-500">Ships by Tue, Feb 17</p>
                                </div>
                                <div className="text-center">
                                    <Award className="w-6 h-6 text-[#163E3E] mx-auto mb-2" />
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Free Sizing</p>
                                    <p className="text-[9px] text-gray-500">For life</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

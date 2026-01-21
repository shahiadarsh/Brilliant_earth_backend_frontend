"use client"

import React, { useState, useMemo, useRef } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Filter, ChevronDown, Sparkles, Gem, Heart, Gift, LayoutGrid, List, ChevronLeft, ChevronRight, X, Info, Calendar } from 'lucide-react'

const GEMSTONE_COLORS = [
    { id: 'sapphire', label: 'Sapphire', color: 'bg-blue-800' },
    { id: 'moissanite', label: 'Moissanite', color: 'bg-gray-100' },
    { id: 'emerald', label: 'Emerald', color: 'bg-emerald-700' },
    { id: 'colored-diamond', label: 'Colored Diamond', color: 'bg-yellow-200' },
    { id: 'aquamarine', label: 'Aquamarine', color: 'bg-cyan-100' },
    { id: 'alexandrite', label: 'Alexandrite', color: 'bg-purple-900' },
    { id: 'morganite', label: 'Morganite', color: 'bg-orange-100' },
    { id: 'ruby', label: 'Ruby', color: 'bg-red-700' },
    { id: 'garnet', label: 'Garnet', color: 'bg-red-900' },
    { id: 'topaz', label: 'Topaz', color: 'bg-blue-400' },
    { id: 'tanzanite', label: 'Tanzanite', color: 'bg-indigo-600' },
    { id: 'tourmaline', label: 'Tourmaline', color: 'bg-emerald-900' },
    { id: 'amethyst', label: 'Amethyst', color: 'bg-purple-600' },
]

const GEMSTONES = [
    { id: 'g1', name: "9x7mm Super Premium Oval Moissanite", price: 1190, color: 'moissanite', shape: 'oval', image: "/home/diamond7.webp", label: 'MOST POPULAR' },
    { id: 'g2', name: "9x7mm Lab Grown Emerald", price: 1790, color: 'emerald', shape: 'emerald', image: "/home/diamond8.webp", label: 'LIMITED EDITION' },
    { id: 'g3', name: "6mm Premium Blue Round Sapphire", price: 1890, color: 'sapphire', shape: 'round', image: "/home/diamond9.webp" },
    { id: 'g4', name: "9x7mm Fine Emerald Aquamarine", price: 1090, color: 'aquamarine', shape: 'emerald', image: "/home/diamond10.webp" },
    { id: 'g5', name: "9x6mm Color Change Pear Lab Grown Alexandrite", price: 1290, color: 'alexandrite', shape: 'pear', image: "/home/diamond1.webp" },
    { id: 'g6', name: "8x8mm Cushion Cut Ruby", price: 2190, color: 'ruby', shape: 'cushion', image: "/home/diamond2.webp" },
]

export default function GemstoneSelectionPage() {
    const { setDiamond, setCurrentStep, selectedSetting, filters, setFilters } = useSelection()
    const router = useRouter()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const colorScrollRef = useRef<HTMLDivElement>(null)

    const filteredGemstones = useMemo(() => {
        return GEMSTONES.filter(g => {
            const colorMatch = filters.gemstone.color.length === 0 || filters.gemstone.color.includes(g.color)
            return colorMatch
        })
    }, [filters.gemstone.color])

    const handleSelect = (gem: any) => {
        setDiamond({
            id: gem.id,
            name: gem.name,
            price: gem.price,
            image: gem.image,
            type: 'gemstone',
            shape: gem.shape
        })

        if (selectedSetting) {
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            setCurrentStep('setting')
            router.push('/design/setting')
        }
    }

    const toggleColor = (colorId: string) => {
        const newColors = filters.gemstone.color.includes(colorId)
            ? filters.gemstone.color.filter(c => c !== colorId)
            : [...filters.gemstone.color, colorId]
        setFilters('gemstone', { color: newColors })
    }

    const scrollColors = (direction: 'left' | 'right') => {
        if (colorScrollRef.current) {
            const amount = 300
            colorScrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-[36px] md:text-[48px] font-serif text-[#163E3E] tracking-tight">Vibrant Gemstones</h1>
                    <p className="text-[15px] text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        From aquamarine to tanzanite, find the perfect pop of color for your handcrafted engagement ring.
                    </p>
                </div>

                {/* Color Selector - Horizontal */}
                <div className="relative mb-20 group">
                    <button
                        onClick={() => scrollColors('left')}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#163E3E]" />
                    </button>

                    <div
                        ref={colorScrollRef}
                        className="flex overflow-x-auto no-scrollbar gap-10 pb-6 snap-x"
                    >
                        {GEMSTONE_COLORS.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => toggleColor(color.id)}
                                className={`flex flex-col items-center gap-4 min-w-[90px] snap-center group/color transition-all duration-300`}
                            >
                                <div className={`w-14 h-14 rounded-full border-2 transition-all duration-300 flex items-center justify-center p-1 ${filters.gemstone.color.includes(color.id)
                                        ? 'border-[#163E3E] scale-110 shadow-md'
                                        : 'border-transparent group-hover/color:border-gray-200'
                                    }`}>
                                    <div className={`w-full h-full rounded-full shadow-inner ${color.color} transition-transform duration-300 group-hover/color:scale-110`} />
                                </div>
                                <span className={`text-[9px] uppercase tracking-[0.2em] font-bold text-center transition-colors ${filters.gemstone.color.includes(color.id) ? 'text-[#163E3E]' : 'text-gray-400 group-hover/color:text-gray-600'
                                    }`}>
                                    {color.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollColors('right')}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    >
                        <ChevronRight className="w-5 h-5 text-[#163E3E]" />
                    </button>
                </div>

                {/* Filter & Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-y border-gray-100 py-8">
                    <div className="flex items-center gap-10">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-3 bg-[#163E3E] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-md active:scale-95"
                        >
                            <Filter className="w-4 h-4" /> Filters
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-[14px] text-gray-900 font-medium">{filteredGemstones.length}</span>
                            <span className="text-[14px] text-gray-400 font-light tracking-wide">Results found</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-6 cursor-pointer group">
                            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">Sort By</span>
                            <div className="flex items-center gap-2 text-[13px] text-gray-900 font-medium border-b border-gray-200 pb-1 group-hover:border-[#163E3E] transition-colors">
                                <span>Best Sellers</span>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#163E3E] transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredGemstones.map((gem) => (
                        <div key={gem.id} className="group flex flex-col pt-12 bg-white border border-gray-50 hover:border-[#163E3E] transition-all hover:shadow-2xl rounded-sm">
                            <div className="relative aspect-square px-12 mb-8">
                                <Image
                                    src={gem.image}
                                    alt={gem.name}
                                    fill
                                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                                />
                                {gem.label && (
                                    <div className="absolute top-0 left-10 bg-[#163E3E] text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest shadow-md">
                                        {gem.label}
                                    </div>
                                )}
                                <div className="absolute top-0 right-10 flex flex-col gap-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                                        <Heart className="w-4 h-4 text-gray-300 hover:text-red-500 transition-colors" />
                                    </button>
                                    <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                                        <Gift className="w-4 h-4 text-[#A68F7A]" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 text-center space-y-4 flex-grow border-t border-gray-50 mt-auto">
                                <h3 className="text-[16px] font-medium text-gray-900 group-hover:text-[#163E3E] transition-colors leading-snug h-[48px] overflow-hidden">{gem.name}</h3>
                                <div className="flex items-center justify-center gap-2 text-[12px] text-gray-400 font-light">
                                    <span className="capitalize">{gem.shape} Cut</span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span className="capitalize">{gem.color}</span>
                                </div>
                                <p className="text-[20px] font-serif text-[#163E3E] mt-6">${gem.price.toLocaleString()}</p>

                                <button
                                    onClick={() => handleSelect(gem)}
                                    className="w-full bg-[#163E3E] text-white py-4 mt-6 text-[11px] font-bold uppercase tracking-[0.25em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                                >
                                    Select Gemstone
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <section className="mt-32 bg-[#F9F7F5] rounded-sm p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 overflow-hidden relative">
                    <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-[#163E3E]/5 rounded-full" />
                    <div className="flex-1 space-y-8 relative z-10">
                        <span className="text-[11px] font-bold uppercase tracking-[.4em] text-[#A68F7A]">Expert Curated</span>
                        <h2 className="text-[36px] md:text-[52px] font-serif text-[#163E3E] leading-[1.1]">The Brilliance of Color</h2>
                        <p className="text-gray-600 font-light max-w-lg text-[16px] leading-relaxed">
                            Discover our curated collection of responsibly sourced gemstones. Each stone is hand-selected for its color, clarity, and exceptional beauty.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <button className="bg-[#163E3E] text-white px-12 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl">
                                <Calendar className="w-4 h-4" /> Book Consultation
                            </button>
                            <button className="text-[#163E3E] font-bold text-[11px] uppercase tracking-[.3em] flex items-center gap-3 group">
                                Explore Gemstone Guide <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
                    <div className="relative w-full max-w-[500px] bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-500">
                        <div className="flex flex-col h-full">
                            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="space-y-1">
                                    <h2 className="text-[24px] font-serif text-[#163E3E]">Gemstone Filters</h2>
                                    <p className="text-[12px] text-gray-400 font-light">Choose your perfect color and shape</p>
                                </div>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 space-y-12">
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Colors</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {GEMSTONE_COLORS.slice(0, 8).map(color => (
                                            <button
                                                key={color.id}
                                                className={`flex items-center gap-3 p-3 border rounded-sm transition-all ${filters.gemstone.color.includes(color.id) ? 'border-[#163E3E] bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                                                    }`}
                                                onClick={() => toggleColor(color.id)}
                                            >
                                                <div className={`w-4 h-4 rounded-full ${color.color}`} />
                                                <span className="text-[12px] font-medium text-gray-700">{color.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Price Range</h4>
                                    <div className="h-1.5 bg-gray-100 relative rounded-full">
                                        <div className="absolute inset-x-0 h-full bg-[#163E3E] rounded-full" />
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                    </div>
                                    <div className="flex justify-between text-[13px] font-serif text-[#163E3E]">
                                        <span>$500</span>
                                        <span>$10,000+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 border-t border-gray-100 bg-gray-50/50">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full bg-[#163E3E] text-white py-5 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-xl active:scale-95"
                                >
                                    Apply {filteredGemstones.length} Results
                                </button>
                                <button onClick={() => setFilters('gemstone', { color: [] })} className="w-full mt-6 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#163E3E] transition-colors">
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

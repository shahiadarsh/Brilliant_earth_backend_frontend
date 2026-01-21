"use client"

import React, { useState, useMemo, useRef } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Filter, ChevronDown, Sparkles, Gem, Heart, LayoutGrid, List, Truck, ChevronLeft, ChevronRight, X, Info, MessageSquare } from 'lucide-react'

const DIAMOND_SHAPES = [
    { id: 'round', label: 'Round', icon: <div className="w-8 h-8 border-2 border-gray-300 rounded-full" /> },
    { id: 'oval', label: 'Oval', icon: <div className="w-7 h-9 border-2 border-gray-300 rounded-[50%]" /> },
    { id: 'emerald', label: 'Emerald', icon: <div className="w-7 h-9 border-2 border-gray-300 rounded-[2px]" /> },
    { id: 'cushion', label: 'Cushion', icon: <div className="w-8 h-8 border-2 border-gray-300 rounded-[8px]" /> },
    { id: 'pear', label: 'Pear', icon: <div className="w-7 h-9 border-2 border-gray-300 rounded-b-full rounded-t-[70%]" /> },
    { id: 'radiant', label: 'Radiant', icon: <div className="w-7 h-9 border-2 border-gray-300 rounded-[4px]" /> },
    { id: 'princess', label: 'Princess', icon: <div className="w-8 h-8 border-2 border-gray-300 rounded-[1px] rotate-45" /> },
    { id: 'marquise', label: 'Marquise', icon: <div className="w-6 h-10 border-2 border-gray-300 rounded-[50%]" /> },
    { id: 'asscher', label: 'Asscher', icon: <div className="w-8 h-8 border-2 border-gray-300 rounded-[4px] rotate-45" /> },
    { id: 'heart', label: 'Heart', icon: <Heart className="w-8 h-8 text-gray-300" /> },
]

const DIAMONDS = [
    { id: 'd1', name: "1.00 ct. Round Diamond", price: 5070, shape: "round", origin: "natural", carat: 1.00, clarity: "VVS1", color: "F", cut: "Super Ideal", image: "/home/diamond1.webp" },
    { id: 'd2', name: "1.21 ct. Round Diamond", price: 4910, shape: "round", origin: "natural", carat: 1.21, clarity: "VS1", color: "H", cut: "Super Ideal", image: "/home/diamond2.webp" },
    { id: 'd3', name: "1.50 ct. Round Diamond", price: 5190, shape: "round", origin: "natural", carat: 1.50, clarity: "VS2", color: "H", cut: "Very Good", image: "/home/diamond3.webp" },
    { id: 'd4', name: "2.02 ct. Oval Lab Grown Diamond", price: 4050, shape: "oval", origin: "lab", carat: 2.02, clarity: "VVS2", color: "E", cut: "Super Ideal", image: "/home/diamond4.webp" },
    { id: 'd5', name: "2.54 ct. Oval Lab Grown Diamond", price: 3480, shape: "oval", origin: "lab", carat: 2.54, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond5.webp" },
    { id: 'd6', name: "2.01 ct. Oval Lab Grown Diamond", price: 2390, shape: "oval", origin: "lab", carat: 2.01, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond6.webp" },
]

export default function DiamondSelectionPage() {
    const { setDiamond, setCurrentStep, selectedSetting, filters, setFilters } = useSelection()
    const router = useRouter()
    const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const shapeScrollRef = useRef<HTMLDivElement>(null)

    const filteredDiamonds = useMemo(() => {
        return DIAMONDS.filter(d => {
            const originMatch = d.origin === filters.diamond.origin
            const shapeMatch = filters.diamond.shape.length === 0 || filters.diamond.shape.includes(d.shape)
            return originMatch && shapeMatch
        })
    }, [filters.diamond.origin, filters.diamond.shape])

    const handleSelect = (diamond: any) => {
        setDiamond({
            id: diamond.id,
            name: diamond.name,
            price: diamond.price,
            image: diamond.image,
            type: diamond.origin as 'natural' | 'lab',
            shape: diamond.shape
        })

        if (selectedSetting) {
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            setCurrentStep('setting')
            router.push('/design/setting')
        }
    }

    const toggleShape = (shapeId: string) => {
        const newShapes = filters.diamond.shape.includes(shapeId)
            ? filters.diamond.shape.filter(s => s !== shapeId)
            : [...filters.diamond.shape, shapeId]
        setFilters('diamond', { shape: newShapes })
    }

    const scrollShapes = (direction: 'left' | 'right') => {
        if (shapeScrollRef.current) {
            const amount = 400
            shapeScrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Header Title */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-[36px] md:text-[48px] font-serif text-[#163E3E] tracking-tight">Design Your Own Engagement Ring</h1>
                    <p className="text-[15px] text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Select a setting and your dream center stone to create a one-of-a-kind handcrafted ring.
                    </p>
                </div>

                {/* Shape Selector - Horizontal Scrollable */}
                <div className="relative mb-20 group">
                    <button
                        onClick={() => scrollShapes('left')}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#163E3E]" />
                    </button>

                    <div
                        ref={shapeScrollRef}
                        className="flex overflow-x-auto no-scrollbar gap-12 pb-6 snap-x"
                    >
                        {DIAMOND_SHAPES.map((shape) => (
                            <button
                                key={shape.id}
                                onClick={() => toggleShape(shape.id)}
                                className={`flex flex-col items-center gap-4 min-w-[80px] snap-center group/shape transition-all duration-300`}
                            >
                                <div className={`w-16 h-16 flex items-center justify-center rounded-sm border transition-all duration-300 ${filters.diamond.shape.includes(shape.id)
                                        ? 'border-[#163E3E] bg-[#F9F9F9] scale-110 shadow-sm'
                                        : 'border-transparent group-hover/shape:border-gray-200'
                                    }`}>
                                    <div className={`transition-transform duration-300 group-hover/shape:scale-110 ${filters.diamond.shape.includes(shape.id) ? 'text-[#163E3E]' : 'text-gray-400'}`}>
                                        {shape.icon}
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${filters.diamond.shape.includes(shape.id) ? 'text-[#163E3E]' : 'text-gray-400 group-hover/shape:text-gray-600'
                                    }`}>
                                    {shape.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scrollShapes('right')}
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

                        <div className="flex flex-col">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68F7A] mb-2">Diamond Origin</h4>
                            <div className="flex bg-gray-50 rounded-full p-1 border border-gray-100 w-[240px]">
                                {['natural', 'lab'].map((origin) => (
                                    <button
                                        key={origin}
                                        onClick={() => setFilters('diamond', { origin: origin as any })}
                                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${filters.diamond.origin === origin ? 'bg-[#163E3E] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {origin === 'natural' ? 'Natural' : 'Lab Grown'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Results</span>
                            <span className="text-[16px] text-[#163E3E] font-serif">{filteredDiamonds.length} Diamonds found</span>
                        </div>
                        <div className="flex rounded-sm border border-gray-200 overflow-hidden shadow-sm">
                            <button onClick={() => setViewMode('visual')} className={`p-3 transition-colors ${viewMode === 'visual' ? 'bg-[#163E3E] text-white' : 'bg-white text-gray-300 hover:text-gray-600'}`}><LayoutGrid className="w-5 h-5" /></button>
                            <button onClick={() => setViewMode('list')} className={`p-3 border-l border-gray-200 transition-colors ${viewMode === 'list' ? 'bg-[#163E3E] text-white' : 'bg-white text-gray-300 hover:text-gray-600'}`}><List className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredDiamonds.map((diamond) => (
                        <div key={diamond.id} className="group flex flex-col pt-12 bg-white border border-gray-50 hover:border-[#163E3E] transition-all hover:shadow-2xl rounded-sm">
                            <div className="relative aspect-square flex items-center justify-center px-12 mb-8">
                                <Image
                                    src={diamond.image}
                                    alt={diamond.name}
                                    fill
                                    className="object-contain p-12 group-hover:scale-110 transition-transform duration-1000"
                                />
                                <button className="absolute top-0 right-10 text-gray-200 hover:text-red-500 transition-all duration-300 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                    <Heart className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-blue-50/80 backdrop-blur-sm text-[#163E3E] text-[9px] font-bold uppercase tracking-[0.2em] px-5 py-2 flex items-center gap-2 rounded-full shadow-sm border border-blue-100">
                                    <Sparkles className="w-3.5 h-3.5" /> GOING FAST
                                </div>
                            </div>

                            <div className="p-10 text-center space-y-4 flex-grow border-t border-gray-50 mt-auto">
                                <h3 className="text-[16px] font-medium text-gray-900 group-hover:text-[#163E3E] transition-colors leading-snug">{diamond.name}</h3>
                                <div className="flex items-center justify-center gap-2 text-[12px] text-gray-400 font-light">
                                    <span>{diamond.cut}</span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span>{diamond.color}</span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span>{diamond.clarity}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 pt-2">
                                    <Truck className="w-4 h-4 text-[#A68F7A]" />
                                    <span className="text-[11px] text-[#A68F7A] font-bold uppercase tracking-widest">Ships Fast</span>
                                </div>
                                <p className="text-[20px] font-serif text-[#163E3E] mt-6">${diamond.price.toLocaleString()}</p>

                                <button
                                    onClick={() => handleSelect(diamond)}
                                    className="w-full bg-[#163E3E] text-white py-4 mt-6 text-[11px] font-bold uppercase tracking-[0.25em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                                >
                                    Select Diamond
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <section className="mt-32 grid md:grid-cols-2 gap-12">
                    <div className="bg-[#163E3E] text-white p-12 md:p-20 flex flex-col justify-center space-y-8 rounded-sm relative overflow-hidden">
                        <Gem className="absolute top-[-20px] right-[-20px] w-64 h-64 text-white/5 rotate-12" />
                        <h2 className="text-[32px] md:text-[42px] font-serif leading-tight relative z-10">Diamond Transparency</h2>
                        <p className="text-white/70 font-light leading-relaxed max-w-md relative z-10">
                            We are committed to providing you with the most detailed and transparent information about every diamond we sell. Trace your diamond back to its origin.
                        </p>
                        <button className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.3em] group relative z-10">
                            Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                    <div className="bg-[#F9F7F5] text-[#163E3E] p-12 md:p-20 flex flex-col justify-center space-y-8 rounded-sm relative">
                        <MessageSquare className="w-12 h-12 text-[#A68F7A]" />
                        <h2 className="text-[32px] md:text-[42px] font-serif leading-tight">Need expert advice?</h2>
                        <p className="text-gray-600 font-light leading-relaxed max-w-md">
                            Our loose diamond experts are available to answer your questions and help you find the perfect stone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-[#163E3E] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                                Chat With An Expert
                            </button>
                            <button className="border border-[#163E3E] text-[#163E3E] px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#163E3E] hover:text-white transition-all">
                                Call 800.691.0952
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
                                    <h2 className="text-[24px] font-serif text-[#163E3E]">Diamond Filters</h2>
                                    <p className="text-[12px] text-gray-400 font-light">Refine your search for the perfect stone</p>
                                </div>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 space-y-12">
                                {/* Price Slider Placeholder */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Price</h4>
                                        <Info className="w-4 h-4 text-gray-300 cursor-help" />
                                    </div>
                                    <div className="h-1.5 bg-gray-100 relative rounded-full">
                                        <div className="absolute inset-x-0 h-full bg-[#163E3E] rounded-full" />
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                    </div>
                                    <div className="flex justify-between text-[13px] font-serif text-[#163E3E]">
                                        <span>$1,000</span>
                                        <span>$50,000+</span>
                                    </div>
                                </div>

                                {/* Carat Slider Placeholder */}
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Carat</h4>
                                    <div className="h-1.5 bg-gray-100 relative rounded-full">
                                        <div className="absolute inset-x-0 h-full bg-[#163E3E] rounded-full" />
                                        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#163E3E] rounded-full shadow-lg cursor-pointer" />
                                    </div>
                                    <div className="flex justify-between text-[13px] font-medium text-gray-500 tracking-wide">
                                        <span>0.50</span>
                                        <span>5.00+</span>
                                    </div>
                                </div>

                                {/* Diamond Type */}
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Beyond Conflict Free</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {['Blockchain Enabled', 'Recycled Diamonds', 'Natural Sourced', 'Climate Neutral'].map(item => (
                                            <label key={item} className="flex items-center gap-4 group cursor-pointer p-4 border border-gray-50 rounded-sm hover:border-[#163E3E] transition-all">
                                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]" />
                                                <span className="text-[14px] text-gray-600 group-hover:text-[#163E3E] transition-colors">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 border-t border-gray-100 bg-gray-50/50">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full bg-[#163E3E] text-white py-5 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-xl active:scale-95"
                                >
                                    Show Results
                                </button>
                                <button className="w-full mt-6 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#163E3E] transition-colors">
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

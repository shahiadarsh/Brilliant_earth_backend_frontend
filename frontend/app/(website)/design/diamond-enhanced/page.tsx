"use client"

import React, { useState, useMemo } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Filter, ChevronDown, Sparkles, Gem, Heart, LayoutGrid, List, Truck, Info, X, ChevronRight } from 'lucide-react'

const DIAMOND_SHAPES = [
    { id: 'round', label: 'Round' },
    { id: 'oval', label: 'Oval' },
    { id: 'emerald', label: 'Emerald' },
    { id: 'cushion', label: 'Cushion' },
    { id: 'pear', label: 'Pear' },
    { id: 'radiant', label: 'Radiant' },
    { id: 'princess', label: 'Princess' },
    { id: 'marquise', label: 'Marquise' },
    { id: 'asscher', label: 'Asscher' },
    { id: 'heart', label: 'Heart' },
]

const DIAMONDS = [
    { id: 'd1', name: "1.00 ct. Round Diamond", price: 5070, shape: "round", origin: "natural", carat: 1.00, clarity: "VVS1", color: "F", cut: "Super Ideal", image: "/home/diamond1.webp" },
    { id: 'd2', name: "1.21 ct. Round Diamond", price: 4910, shape: "round", origin: "natural", carat: 1.21, clarity: "VS1", color: "H", cut: "Super Ideal", image: "/home/diamond2.webp" },
    { id: 'd3', name: "1.50 ct. Round Diamond", price: 5190, shape: "round", origin: "natural", carat: 1.50, clarity: "VS2", color: "H", cut: "Very Good", image: "/home/diamond3.webp" },
    { id: 'd4', name: "2.02 ct. Oval Lab Grown Diamond", price: 4050, shape: "oval", origin: "lab", carat: 2.02, clarity: "VVS2", color: "E", cut: "Super Ideal", image: "/home/diamond4.webp" },
    { id: 'd5', name: "2.54 ct. Oval Lab Grown Diamond", price: 3480, shape: "oval", origin: "lab", carat: 2.54, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond5.webp" },
    { id: 'd6', name: "2.01 ct. Oval Lab Grown Diamond", price: 2390, shape: "oval", origin: "lab", carat: 2.01, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond6.webp" },
    { id: 'd7', name: "1.04 ct. Round Diamond", price: 5240, shape: "round", origin: "natural", carat: 1.04, clarity: "VVS1", color: "F", cut: "Super Ideal", image: "/home/diamond1.webp" },
    { id: 'd8', name: "1.10 ct. Round Diamond", price: 5380, shape: "round", origin: "natural", carat: 1.10, clarity: "VS1", color: "G", cut: "Super Ideal", image: "/home/diamond2.webp" },
]

export default function DiamondSelectionPageEnhanced() {
    const { setDiamond, setCurrentStep, selectedSetting, filters, setFilters } = useSelection()
    const router = useRouter()
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('price-low')

    // Filter states
    const [selectedShapes, setSelectedShapes] = useState<string[]>([])
    const [caratRange, setCaratRange] = useState<[number, number]>([0.5, 5.0])
    const [priceRange, setPriceRange] = useState<[number, number]>([1000, 50000])
    const [selectedCut, setSelectedCut] = useState<string[]>([])
    const [selectedColor, setSelectedColor] = useState<string[]>([])
    const [selectedClarity, setSelectedClarity] = useState<string[]>([])

    const filteredDiamonds = useMemo(() => {
        return DIAMONDS.filter(d => {
            const originMatch = d.origin === filters.diamond.origin
            const shapeMatch = selectedShapes.length === 0 || selectedShapes.includes(d.shape)
            const caratMatch = d.carat >= caratRange[0] && d.carat <= caratRange[1]
            const priceMatch = d.price >= priceRange[0] && d.price <= priceRange[1]
            const cutMatch = selectedCut.length === 0 || selectedCut.includes(d.cut)
            const colorMatch = selectedColor.length === 0 || selectedColor.includes(d.color)
            const clarityMatch = selectedClarity.length === 0 || selectedClarity.includes(d.clarity)

            return originMatch && shapeMatch && caratMatch && priceMatch && cutMatch && colorMatch && clarityMatch
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price
            if (sortBy === 'price-high') return b.price - a.price
            if (sortBy === 'carat-low') return a.carat - b.carat
            if (sortBy === 'carat-high') return b.carat - a.carat
            return 0
        })
    }, [filters.diamond.origin, selectedShapes, caratRange, priceRange, selectedCut, selectedColor, selectedClarity, sortBy])

    const handleSelect = (diamond: any) => {
        setDiamond({
            id: diamond.id,
            name: diamond.name,
            price: diamond.price,
            image: diamond.image,
            type: diamond.origin as 'natural' | 'lab',
            shape: diamond.shape,
            carat: diamond.carat,
            cut: diamond.cut,
            color: diamond.color,
            clarity: diamond.clarity
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
        setSelectedShapes(prev =>
            prev.includes(shapeId) ? prev.filter(s => s !== shapeId) : [...prev, shapeId]
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            <main className="max-w-[1800px] mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-[36px] md:text-[48px] font-serif text-[#163E3E] tracking-tight">
                        Design Your Own Engagement Ring
                    </h1>
                    <p className="text-[15px] text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        {selectedSetting
                            ? `Perfect! Now select your dream diamond to complete your ${selectedSetting.name}`
                            : 'Select a diamond and we\'ll help you find the perfect setting'
                        }
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Left Sidebar - Filters */}
                    <aside className="w-[280px] flex-shrink-0 space-y-8 sticky top-24 h-fit">
                        {/* Origin Toggle */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#163E3E]">Diamond Origin</h3>
                            <div className="flex bg-gray-50 rounded-full p-1 border border-gray-100">
                                {['natural', 'lab'].map((origin) => (
                                    <button
                                        key={origin}
                                        onClick={() => setFilters('diamond', { origin: origin as any })}
                                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${filters.diamond.origin === origin
                                                ? 'bg-[#163E3E] text-white shadow-md'
                                                : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {origin === 'natural' ? 'Natural' : 'Lab Grown'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Diamond Shape */}
                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Diamond Shape</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {DIAMOND_SHAPES.map((shape) => (
                                    <button
                                        key={shape.id}
                                        onClick={() => toggleShape(shape.id)}
                                        className={`py-2 px-3 text-[11px] font-medium border rounded-sm transition-all ${selectedShapes.includes(shape.id)
                                                ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                                : 'border-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        {shape.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Carat Range */}
                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Carat</h3>
                                <span className="text-[11px] text-gray-500">{caratRange[0]} - {caratRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="5.0"
                                step="0.1"
                                value={caratRange[1]}
                                onChange={(e) => setCaratRange([caratRange[0], parseFloat(e.target.value)])}
                                className="w-full accent-[#163E3E]"
                            />
                        </div>

                        {/* Price Range */}
                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Price</h3>
                                <span className="text-[11px] text-gray-500">${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="50000"
                                step="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full accent-[#163E3E]"
                            />
                        </div>

                        {/* Cut */}
                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Cut</h3>
                            {['Super Ideal', 'Ideal', 'Very Good', 'Good'].map(cut => (
                                <label key={cut} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={selectedCut.includes(cut)}
                                        onChange={() => setSelectedCut(prev =>
                                            prev.includes(cut) ? prev.filter(c => c !== cut) : [...prev, cut]
                                        )}
                                        className="w-4 h-4 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                    />
                                    <span className="text-[12px] text-gray-600 group-hover:text-gray-900">{cut}</span>
                                </label>
                            ))}
                        </div>

                        {/* Color */}
                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Color</h3>
                            <div className="flex flex-wrap gap-2">
                                {['D', 'E', 'F', 'G', 'H', 'I', 'J'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(prev =>
                                            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                                        )}
                                        className={`w-8 h-8 text-[11px] font-bold border rounded-sm transition-all ${selectedColor.includes(color)
                                                ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Clarity */}
                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900">Clarity</h3>
                            {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'].map(clarity => (
                                <label key={clarity} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={selectedClarity.includes(clarity)}
                                        onChange={() => setSelectedClarity(prev =>
                                            prev.includes(clarity) ? prev.filter(c => c !== clarity) : [...prev, clarity]
                                        )}
                                        className="w-4 h-4 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                    />
                                    <span className="text-[12px] text-gray-600 group-hover:text-gray-900">{clarity}</span>
                                </label>
                            ))}
                        </div>

                        {/* Reset Filters */}
                        <button
                            onClick={() => {
                                setSelectedShapes([])
                                setCaratRange([0.5, 5.0])
                                setPriceRange([1000, 50000])
                                setSelectedCut([])
                                setSelectedColor([])
                                setSelectedClarity([])
                            }}
                            className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#163E3E] transition-colors py-3 border border-gray-100 rounded-sm"
                        >
                            Reset All Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-6">
                                <span className="text-[14px] text-gray-900 font-medium">{filteredDiamonds.length} Diamonds</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-[12px] border border-gray-200 px-4 py-2 rounded-sm outline-none focus:border-[#163E3E]"
                                >
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="carat-low">Carat: Low to High</option>
                                    <option value="carat-high">Carat: High to Low</option>
                                </select>
                            </div>
                            <div className="flex rounded-sm border border-gray-200 overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#163E3E] text-white' : 'bg-white text-gray-400'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 border-l ${viewMode === 'list' ? 'bg-[#163E3E] text-white' : 'bg-white text-gray-400'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Diamond Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDiamonds.map((diamond) => (
                                <div key={diamond.id} className="group flex flex-col bg-white border border-gray-50 hover:border-[#163E3E] transition-all hover:shadow-xl rounded-sm overflow-hidden">
                                    <div className="relative aspect-square flex items-center justify-center p-12 bg-[#FAFAFA]">
                                        <Image
                                            src={diamond.image}
                                            alt={diamond.name}
                                            fill
                                            className="object-contain p-12 group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <button className="absolute top-4 right-4 text-gray-200 hover:text-red-500 transition-all">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-6 text-center space-y-3 flex-grow border-t border-gray-50">
                                        <h3 className="text-[14px] font-medium text-gray-900">{diamond.carat} ct {diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1)}</h3>
                                        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                                            <span>{diamond.cut}</span>
                                            <span>•</span>
                                            <span>{diamond.color}</span>
                                            <span>•</span>
                                            <span>{diamond.clarity}</span>
                                        </div>
                                        <p className="text-[20px] font-serif text-[#163E3E]">${diamond.price.toLocaleString()}</p>

                                        <button
                                            onClick={() => handleSelect(diamond)}
                                            className="w-full bg-[#163E3E] text-white py-3 mt-4 text-[10px] font-bold uppercase tracking-[0.25em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                                        >
                                            Select Diamond
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

"use client"

import React, { useState, useMemo } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Heart, Info, ChevronDown, ChevronUp, LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

const DIAMOND_SHAPES = [
    { id: 'round', label: 'Round', icon: '○' },
    { id: 'oval', label: 'Oval', icon: '⬭' },
    { id: 'emerald', label: 'Emerald', icon: '▭' },
    { id: 'cushion', label: 'Cushion', icon: '▢' },
    { id: 'pear', label: 'Pear', icon: '◐' },
    { id: 'radiant', label: 'Radiant', icon: '◇' },
    { id: 'princess', label: 'Princess', icon: '◆' },
    { id: 'marquise', label: 'Marquise', icon: '◊' },
    { id: 'asscher', label: 'Asscher', icon: '◈' },
    { id: 'heart', label: 'Heart', icon: '♥' },
]

const DIAMONDS = [
    { id: 'd1', name: "1.00 ct Round Diamond", price: 5070, shape: "round", origin: "natural", carat: 1.00, clarity: "VVS1", color: "F", cut: "Super Ideal", image: "/home/diamond1.webp" },
    { id: 'd2', name: "1.21 ct Round Diamond", price: 4910, shape: "round", origin: "natural", carat: 1.21, clarity: "VS1", color: "H", cut: "Super Ideal", image: "/home/diamond2.webp" },
    { id: 'd3', name: "1.50 ct Round Diamond", price: 5190, shape: "round", origin: "natural", carat: 1.50, clarity: "VS2", color: "H", cut: "Very Good", image: "/home/diamond3.webp" },
    { id: 'd4', name: "2.02 ct Oval Lab Diamond", price: 4050, shape: "oval", origin: "lab", carat: 2.02, clarity: "VVS2", color: "E", cut: "Super Ideal", image: "/home/diamond4.webp" },
    { id: 'd5', name: "2.54 ct Oval Lab Diamond", price: 3480, shape: "oval", origin: "lab", carat: 2.54, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond5.webp" },
    { id: 'd6', name: "2.01 ct Oval Lab Diamond", price: 2390, shape: "oval", origin: "lab", carat: 2.01, clarity: "VS1", color: "F", cut: "Super Ideal", image: "/home/diamond6.webp" },
    { id: 'd7', name: "1.04 ct Round Diamond", price: 5240, shape: "round", origin: "natural", carat: 1.04, clarity: "VVS1", color: "F", cut: "Super Ideal", image: "/home/diamond1.webp" },
    { id: 'd8', name: "1.10 ct Round Diamond", price: 5380, shape: "round", origin: "natural", carat: 1.10, clarity: "VS1", color: "G", cut: "Super Ideal", image: "/home/diamond2.webp" },
    { id: 'd9', name: "1.31 ct Round Diamond", price: 6240, shape: "round", origin: "natural", carat: 1.31, clarity: "VS1", color: "G", cut: "Ideal", image: "/home/diamond3.webp" },
]

export default function DiamondSelectionPageExact() {
    const { setDiamond, setCurrentStep, selectedSetting, selectedBridalSet, filters, setFilters } = useSelection()
    const router = useRouter()

    // Filter states
    const [selectedShapes, setSelectedShapes] = useState<string[]>([])
    const [caratMin, setCaratMin] = useState(0.25)
    const [caratMax, setCaratMax] = useState(20.45)
    const [priceMin, setPriceMin] = useState(180)
    const [priceMax, setPriceMax] = useState(500000)
    const [selectedCut, setSelectedCut] = useState<string[]>([])
    const [selectedColor, setSelectedColor] = useState<string[]>([])
    const [selectedClarity, setSelectedClarity] = useState<string[]>([])

    // UI states
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('price-low')
    const [expandedSections, setExpandedSections] = useState({
        cut: true,
        color: true,
        clarity: true,
        advanced: false
    })

    const filteredItems = useMemo(() => {
        // Filter diamonds (default)
        return DIAMONDS.filter(d => {
            const originMatch = d.origin === filters.diamond.origin;
            const shapeMatch = selectedShapes.length === 0 || selectedShapes.includes(d.shape);
            const caratMatch = d.carat >= caratMin && d.carat <= caratMax;
            const priceMatch = d.price >= priceMin && d.price <= priceMax;
            const cutMatch = selectedCut.length === 0 || selectedCut.includes(d.cut);
            const colorMatch = selectedColor.length === 0 || selectedColor.includes(d.color);
            const clarityMatch = selectedClarity.length === 0 || selectedClarity.includes(d.clarity);

            return originMatch && shapeMatch && caratMatch && priceMatch && cutMatch && colorMatch && clarityMatch;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'carat-low') return a.carat - b.carat;
            if (sortBy === 'carat-high') return b.carat - a.carat;
            return 0;
        });
    }, [filters.diamond.origin, selectedShapes, caratMin, caratMax, priceMin, priceMax, selectedCut, selectedColor, selectedClarity, sortBy])

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

        // Check if bridal set was selected first
        if (selectedBridalSet) {
            setCurrentStep('review')
            router.push('/design/bridal-set/review')
        } else if (selectedSetting) {
            // Regular setting flow
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            // User started with diamond, now go to setting page
            setCurrentStep('setting')
            router.push('/design/setting')
        }
    }

    const toggleShape = (shapeId: string) => {
        setSelectedShapes(prev =>
            prev.includes(shapeId) ? prev.filter(s => s !== shapeId) : [...prev, shapeId]
        )
    }

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    // Determine if we're showing gemstones or diamonds
    const isGemstoneMode = !!(filters.diamond as any).gemstone
    const itemType = isGemstoneMode ? 'Gemstone' : 'Diamond'
    const itemTypePlural = isGemstoneMode ? 'Gemstones' : 'Diamonds'

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
                <div className="max-w-[1800px] mx-auto px-6 py-3">
                    <nav className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900">Engagement Rings</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900">Design Your Ring</Link>
                        <span>/</span>
                        <span className="text-gray-900">Start with a {itemType}</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-[1800px] mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* LEFT SIDEBAR - FILTERS (280px fixed width) */}
                    <aside className="w-[280px] flex-shrink-0 space-y-6">
                        {/* Diamond Origin Toggle - Only show for diamonds */}
                        {!isGemstoneMode && (
                            <div className="bg-white border border-gray-200 rounded-sm p-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 mb-3">Diamond Origin</h3>
                                <div className="flex bg-gray-50 rounded-sm overflow-hidden border border-gray-200">
                                    <button
                                        onClick={() => setFilters('diamond', { origin: 'natural' as any })}
                                        className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide transition-all ${filters.diamond.origin === 'natural'
                                            ? 'bg-[#163E3E] text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Natural
                                    </button>
                                    <button
                                        onClick={() => setFilters('diamond', { origin: 'lab' as any })}
                                        className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide transition-all ${filters.diamond.origin === 'lab'
                                            ? 'bg-[#163E3E] text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Lab-Grown
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Diamond Shape - Only show for diamonds */}
                        {!isGemstoneMode && (
                            <div className="bg-white border border-gray-200 rounded-sm p-4">
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 mb-3">Diamond Shape</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {DIAMOND_SHAPES.map((shape) => (
                                        <button
                                            key={shape.id}
                                            onClick={() => toggleShape(shape.id)}
                                            className={`py-2.5 px-3 text-[11px] font-medium border rounded-sm transition-all ${selectedShapes.includes(shape.id)
                                                ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                                : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            {shape.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Carat Range */}
                        <div className="bg-white border border-gray-200 rounded-sm p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Carat</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Info className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="0.25"
                                        max="20.45"
                                        step="0.01"
                                        value={caratMax}
                                        onChange={(e) => setCaratMax(parseFloat(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#163E3E]"
                                    />
                                </div>
                                <div className="flex justify-between text-[11px] text-gray-600">
                                    <span>{caratMin.toFixed(2)}</span>
                                    <span>{caratMax.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white border border-gray-200 rounded-sm p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Diamond Price</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Info className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="180"
                                        max="500000"
                                        step="100"
                                        value={priceMax}
                                        onChange={(e) => setPriceMax(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#163E3E]"
                                    />
                                </div>
                                <div className="flex justify-between text-[11px] text-gray-600">
                                    <span>${priceMin.toLocaleString()}</span>
                                    <span>${priceMax.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Cut */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('cut')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Cut</h3>
                                {expandedSections.cut ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.cut && (
                                <div className="px-4 pb-4 space-y-2">
                                    {['Super Ideal', 'Ideal', 'Very Good', 'Good'].map(cut => (
                                        <label key={cut} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCut.includes(cut)}
                                                onChange={() => setSelectedCut(prev =>
                                                    prev.includes(cut) ? prev.filter(c => c !== cut) : [...prev, cut]
                                                )}
                                                className="w-4 h-4 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                            />
                                            <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{cut}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Color */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('color')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Color</h3>
                                {expandedSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.color && (
                                <div className="px-4 pb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {['D', 'E', 'F', 'G', 'H', 'I', 'J'].map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(prev =>
                                                    prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                                                )}
                                                className={`w-9 h-9 text-[11px] font-bold border rounded-sm transition-all ${selectedColor.includes(color)
                                                    ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                                    : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Clarity */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('clarity')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Clarity</h3>
                                {expandedSections.clarity ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.clarity && (
                                <div className="px-4 pb-4 space-y-2">
                                    {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'].map(clarity => (
                                        <label key={clarity} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedClarity.includes(clarity)}
                                                onChange={() => setSelectedClarity(prev =>
                                                    prev.includes(clarity) ? prev.filter(c => c !== clarity) : [...prev, clarity]
                                                )}
                                                className="w-4 h-4 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                            />
                                            <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{clarity}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={() => {
                                setSelectedShapes([])
                                setCaratMin(0.25)
                                setCaratMax(20.45)
                                setPriceMin(180)
                                setPriceMax(500000)
                                setSelectedCut([])
                                setSelectedColor([])
                                setSelectedClarity([])
                            }}
                            className="w-full text-[11px] font-semibold uppercase tracking-wide text-gray-600 hover:text-[#163E3E] py-3 border border-gray-200 rounded-sm transition-colors"
                        >
                            Reset All Filters
                        </button>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-4">
                                <span className="text-[13px] font-semibold text-gray-900">
                                    All {itemTypePlural} {filteredItems.length.toLocaleString()}
                                </span>
                                <div className="h-4 w-px bg-gray-200" />
                                <button className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-gray-900">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Compare (0)
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none border border-gray-200 rounded-sm px-4 py-2 pr-8 text-[12px] text-gray-700 focus:outline-none focus:border-gray-400"
                                    >
                                        <option value="price-low">Sort by: Most Popular</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="carat-low">Carat: Low to High</option>
                                        <option value="carat-high">Carat: High to Low</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 border-l border-gray-200 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                                    >
                                        <List className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Diamond Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((diamond: any) => (
                                <div key={diamond.id} className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all">
                                    <div className="relative aspect-square bg-gray-50 p-8">
                                        <Image
                                            src={diamond.image}
                                            alt={diamond.name}
                                            fill
                                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                                            <Heart className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="p-4 space-y-2 border-t border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-[13px] font-semibold text-gray-900">
                                                    {diamond.carat} ct {(diamond.shape || diamond.type || '').charAt(0).toUpperCase() + (diamond.shape || diamond.type || '').slice(1)}
                                                </h3>
                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    {diamond.cut} • {diamond.color} • {diamond.clarity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[18px] font-serif text-gray-900">${diamond.price.toLocaleString()}</p>

                                        <button
                                            onClick={() => handleSelect(diamond)}
                                            className="w-full bg-[#163E3E] text-white py-2.5 text-[11px] font-bold uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
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

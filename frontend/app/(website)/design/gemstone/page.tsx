"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Heart, Info, ChevronDown, ChevronUp, LayoutGrid, List, SlidersHorizontal, Circle } from 'lucide-react'
import Link from 'next/link'

const GEMSTONE_SHAPES = [
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

const GEMSTONE_TYPES = [
    { id: 'sapphire', label: 'Sapphire' },
    { id: 'emerald', label: 'Emerald' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'moissanite', label: 'Moissanite' },
    { id: 'aquamarine', label: 'Aquamarine' },
    { id: 'morganite', label: 'Morganite' },
    { id: 'alexandrite', label: 'Alexandrite' },
]

const GEMSTONE_COLORS = [
    { id: 'blue', label: 'Blue', hex: '#1E40AF' },
    { id: 'green', label: 'Green', hex: '#065F46' },
    { id: 'pink', label: 'Pink', hex: '#DB2777' },
    { id: 'red', label: 'Red', hex: '#991B1B' },
    { id: 'purple', label: 'Purple', hex: '#5B21B6' },
    { id: 'yellow', label: 'Yellow', hex: '#EAB308' },
    { id: 'clear', label: 'Clear', hex: '#E5E7EB' },
    { id: 'peach', label: 'Peach', hex: '#FB923C' },
    { id: 'teal', label: 'Teal', hex: '#0D9488' },
]

const GEMSTONES = [
    { id: 'g1', name: "2.10 ct Round Blue Sapphire", price: 3450, type: "sapphire", shape: "round", carat: 2.10, color: "Blue", clarity: "VVS1", cut: "Excellent", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400" },
    { id: 'g2', name: "1.85 ct Oval Pink Sapphire", price: 2980, type: "sapphire", shape: "oval", carat: 1.85, color: "Pink", clarity: "VS1", cut: "Very Good", image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400" },
    { id: 'g3', name: "2.50 ct Emerald Cut Emerald", price: 5800, type: "emerald", shape: "emerald", carat: 2.50, color: "Green", clarity: "VS1", cut: "Excellent", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400" },
    { id: 'g4', name: "3.20 ct Round Moissanite", price: 1100, type: "moissanite", shape: "round", carat: 3.20, color: "Clear", clarity: "VVS2", cut: "Excellent", image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400" },
    { id: 'g5', name: "2.75 ct Pear Aquamarine", price: 1650, type: "aquamarine", shape: "pear", carat: 2.75, color: "Blue", clarity: "VVS1", cut: "Very Good", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400" },
    { id: 'g6', name: "2.40 ct Cushion Morganite", price: 1850, type: "morganite", shape: "cushion", carat: 2.40, color: "Peach", clarity: "VS1", cut: "Excellent", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
    { id: 'g7', name: "1.50 ct Round Ruby", price: 4200, type: "ruby", shape: "round", carat: 1.50, color: "Red", clarity: "VVS2", cut: "Excellent", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
    { id: 'g8', name: "2.15 ct Oval Alexandrite", price: 3950, type: "alexandrite", shape: "oval", carat: 2.15, color: "Purple", clarity: "VS1", cut: "Excellent", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400" },
    { id: 'g9', name: "2.80 ct Round Yellow Sapphire", price: 2750, type: "sapphire", shape: "round", carat: 2.80, color: "Yellow", clarity: "VS2", cut: "Excellent", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400" },
    { id: 'g10', name: "3.50 ct Emerald Cut Teal Montana Sapphire", price: 4800, type: "sapphire", shape: "emerald", carat: 3.50, color: "Teal", clarity: "VS1", cut: "Excellent", image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400" },
]

export default function GemstoneSelectionPage() {
    const { setDiamond, setCurrentStep, selectedSetting, selectedBridalSet, filters, setFilters } = useSelection()
    const router = useRouter()

    // Filter states
    const [selectedFilters, setSelectedFilters] = useState<string[]>(filters.gemstone.color || [])
    const [selectedShapes, setSelectedShapes] = useState<string[]>(filters.gemstone.shape || [])
    const [caratMin, setCaratMin] = useState(0.5)
    const [caratMax, setCaratMax] = useState(15.0)
    const [priceMin, setPriceMin] = useState(500)
    const [priceMax, setPriceMax] = useState(25000)

    // UI states
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('price-low')
    const [expandedSections, setExpandedSections] = useState({
        type: true,
        color: true,
        shape: true,
        price: true,
        carat: true
    })

    // Sync filters from context on mount
    useEffect(() => {
        if (filters.gemstone.color && filters.gemstone.color.length > 0) {
            setSelectedFilters(filters.gemstone.color)
        }
        if (filters.gemstone.shape && filters.gemstone.shape.length > 0) {
            setSelectedShapes(filters.gemstone.shape)
        }
    }, [filters.gemstone])

    const filteredGemstones = useMemo(() => {
        return GEMSTONES.filter(g => {
            // Match Stone Type OR Color
            const filterMatch = selectedFilters.length === 0 ||
                selectedFilters.some(f =>
                    g.type.toLowerCase() === f.toLowerCase() ||
                    g.color.toLowerCase() === f.toLowerCase()
                );

            const shapeMatch = selectedShapes.length === 0 || selectedShapes.includes(g.shape);
            const caratMatch = g.carat >= caratMin && g.carat <= caratMax;
            const priceMatch = g.price >= priceMin && g.price <= priceMax;

            return filterMatch && shapeMatch && caratMatch && priceMatch;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'carat-low') return a.carat - b.carat;
            if (sortBy === 'carat-high') return b.carat - a.carat;
            return 0;
        });
    }, [selectedFilters, selectedShapes, caratMin, caratMax, priceMin, priceMax, sortBy])

    const handleSelect = (gem: any) => {
        setDiamond({
            id: gem.id,
            name: gem.name,
            price: gem.price,
            image: gem.image,
            type: 'gemstone',
            shape: gem.shape,
            carat: gem.carat,
            color: gem.color,
            clarity: gem.clarity
        })

        if (selectedBridalSet) {
            setCurrentStep('review')
            router.push('/design/bridal-set/review')
        } else if (selectedSetting) {
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            setCurrentStep('setting')
            router.push('/design/setting')
        }
    }

    const toggleShape = (shapeId: string) => {
        const newShapes = selectedShapes.includes(shapeId)
            ? selectedShapes.filter(s => s !== shapeId)
            : [...selectedShapes, shapeId]
        setSelectedShapes(newShapes)
        setFilters('gemstone', { shape: newShapes })
    }

    const toggleFilter = (filterId: string) => {
        const newFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(f => f !== filterId)
            : [...selectedFilters, filterId]
        setSelectedFilters(newFilters)
        setFilters('gemstone', { color: newFilters })
    }

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

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
                        <span className="text-gray-900">Start with a Gemstone</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-[1800px] mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* LEFT SIDEBAR - FILTERS */}
                    <aside className="w-[280px] flex-shrink-0 space-y-6">
                        {/* Gemstone Type */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('type')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Stone Type</h3>
                                {expandedSections.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.type && (
                                <div className="px-4 pb-4 space-y-2">
                                    {GEMSTONE_TYPES.map(type => (
                                        <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.includes(type.id)}
                                                onChange={() => toggleFilter(type.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                            />
                                            <span className="text-[12px] text-gray-700 group-hover:text-gray-900">{type.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Gemstone Color */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('color')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Shop By Color</h3>
                                {expandedSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.color && (
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        {GEMSTONE_COLORS.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => toggleFilter(color.id)}
                                                className={`flex flex-col items-center gap-1.5 p-2 border rounded-sm transition-all ${selectedFilters.includes(color.id)
                                                    ? 'border-[#163E3E] bg-gray-50'
                                                    : 'border-transparent hover:border-gray-200'
                                                    }`}
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full shadow-inner border border-gray-100"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                                <span className="text-[10px] text-gray-600 font-medium">{color.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Shape */}
                        <div className="bg-white border border-gray-200 rounded-sm">
                            <button
                                onClick={() => toggleSection('shape')}
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                            >
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">Shape</h3>
                                {expandedSections.shape ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {expandedSections.shape && (
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        {GEMSTONE_SHAPES.map((shape) => (
                                            <button
                                                key={shape.id}
                                                onClick={() => toggleShape(shape.id)}
                                                className={`py-2 px-3 text-[11px] font-medium border rounded-sm transition-all ${selectedShapes.includes(shape.id)
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
                        </div>

                        {/* Price Range */}
                        <div className="bg-white border border-gray-200 rounded-sm p-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 mb-4">Price</h3>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="500"
                                    max="50000"
                                    step="500"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#163E3E]"
                                />
                                <div className="flex justify-between text-[11px] text-gray-600">
                                    <span>${priceMin.toLocaleString()}</span>
                                    <span>${priceMax.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Reset */}
                        <button
                            onClick={() => {
                                setSelectedShapes([])
                                setSelectedFilters([])
                                setCaratMin(0.5)
                                setCaratMax(15.0)
                                setPriceMin(500)
                                setPriceMax(25000)
                                setFilters('gemstone', { color: [], shape: [] })
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
                                    All Gemstones {filteredGemstones.length.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none border border-gray-200 rounded-sm px-4 py-2 pr-8 text-[12px] text-gray-700 focus:outline-none focus:border-gray-400"
                                    >
                                        <option value="price-low">Sort by: Price Low to High</option>
                                        <option value="price-high">Sort by: Price High to Low</option>
                                        <option value="carat-low">Sort by: Carat Low to High</option>
                                        <option value="carat-high">Sort by: Carat High to Low</option>
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

                        {/* Gemstone Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGemstones.map((gem: any) => (
                                <div key={gem.id} className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all">
                                    <div className="relative aspect-square bg-gray-50 p-6">
                                        <Image
                                            src={gem.image}
                                            alt={gem.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                                            <Heart className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <div className="p-4 space-y-2 border-t border-gray-100 text-center">
                                        <h3 className="text-[14px] font-medium text-gray-900">
                                            {gem.name}
                                        </h3>
                                        <p className="text-[12px] text-gray-500">
                                            {gem.carat} ct • {gem.color} • {gem.clarity}
                                        </p>
                                        <p className="text-[18px] font-serif text-[#163E3E] pt-2">${gem.price.toLocaleString()}</p>

                                        <button
                                            onClick={() => handleSelect(gem)}
                                            className="w-full bg-[#163E3E] text-white py-2.5 mt-2 text-[11px] font-bold uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                        >
                                            Select Gemstone
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

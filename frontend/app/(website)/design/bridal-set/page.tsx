"use client"

import React, { useState, useMemo } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Heart, Filter, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'

const STYLE_FILTERS = [
    { id: 'solitaire', label: 'Solitaire', image: '/home/ring1.webp' },
    { id: 'three-stone', label: 'Three Stone', image: '/home/ring2.jfif' },
    { id: 'accents', label: 'Accents', image: '/home/ring3.jfif' },
    { id: 'hidden-halo', label: 'Hidden Halo', image: '/home/ring1.webp' },
    { id: 'nature-inspired', label: 'Nature Inspired', image: '/home/ring2.jfif' },
    { id: 'yellow-gold', label: 'Yellow Gold', image: '/home/ring3.jfif' },
    { id: 'white-gold', label: 'White Gold', image: '/home/ring1.webp' },
    { id: 'bridal-sets', label: 'Bridal Sets', image: '/home/ring2.jfif', featured: true },
    { id: 'halo', label: 'Halo', image: '/home/ring3.jfif' },
]

const BRIDAL_SETS = [
    {
        id: 'bs1',
        name: 'Nadia Diamond Ring with Aria Contoured Diamond Ring',
        engagementRing: 'Nadia Diamond Ring',
        weddingBand: 'Aria Contoured Diamond Ring',
        price: 2940,
        style: 'solitaire',
        metal: '18K Yellow Gold',
        rating: 4.9,
        reviews: 124,
        image: '/home/ring1.webp',
        weddingBandImage: '/home/ring2.jfif',
        stackedImage: '/home/ring3.jfif',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring1.webp',
            '18K White Gold': '/home/ring1.webp',
            '18K Rose Gold': '/home/ring1.webp',
            'Platinum': '/home/ring1.webp'
        },
        description: 'Two complementary designs create a romantic, classic look in this shimmering bridal set.',
        features: ['Matching engagement and wedding rings', 'Perfectly contoured to fit together', 'Conflict-free diamonds']
    },
    {
        id: 'bs2',
        name: 'Petite Twisted Vine Diamond Bridal Set',
        engagementRing: 'Petite Twisted Vine Diamond Ring',
        weddingBand: 'Petite Twisted Vine Contoured Band',
        price: 2240,
        style: 'nature-inspired',
        metal: '18K White Gold',
        rating: 4.8,
        reviews: 89,
        image: '/home/ring2.jfif',
        weddingBandImage: '/home/ring3.jfif',
        stackedImage: '/home/ring1.webp',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring2.jfif',
            '18K White Gold': '/home/ring2.jfif',
            '18K Rose Gold': '/home/ring2.jfif',
            'Platinum': '/home/ring2.jfif'
        },
        description: 'Delicate vine details wrap around both rings for a cohesive, nature-inspired look.',
        features: ['Nature-inspired design', 'Perfectly matched set', 'Lifetime warranty']
    },
    {
        id: 'bs3',
        name: 'Aria Contoured Diamond Bridal Set',
        engagementRing: 'Aria Diamond Ring',
        weddingBand: 'Aria Contoured Band',
        price: 2640,
        style: 'accents',
        metal: '18K Yellow Gold',
        rating: 5.0,
        reviews: 156,
        image: '/home/ring3.jfif',
        weddingBandImage: '/home/ring1.webp',
        stackedImage: '/home/ring2.jfif',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring3.jfif',
            '18K White Gold': '/home/ring3.jfif',
            '18K Rose Gold': '/home/ring3.jfif',
            'Platinum': '/home/ring3.jfif'
        },
        description: 'Classic elegance meets modern design in this perfectly paired bridal set.',
        features: ['Timeless design', 'Contoured wedding band', 'Free shipping & returns']
    },
    {
        id: 'bs4',
        name: 'Freesia Ring with Set Diamond Crown Ring',
        engagementRing: 'Freesia Hidden Halo Ring',
        weddingBand: 'Set Diamond Crown Ring',
        price: 2080,
        style: 'hidden-halo',
        metal: '18K Yellow Gold',
        rating: 4.7,
        reviews: 98,
        image: '/home/ring1.webp',
        weddingBandImage: '/home/ring2.jfif',
        stackedImage: '/home/ring3.jfif',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring1.webp',
            '18K White Gold': '/home/ring1.webp',
            '18K Rose Gold': '/home/ring1.webp',
            'Platinum': '/home/ring1.webp'
        },
        description: 'Hidden halo adds brilliance while the crown band complements perfectly.',
        features: ['Hidden halo design', 'Crown-style wedding band', 'Complimentary resizing']
    },
    {
        id: 'bs5',
        name: 'Petite Estate Luxe Bridal Diamond Set',
        engagementRing: 'Petite Estate Luxe Ring',
        weddingBand: 'Petite Estate Contoured Band',
        price: 3140,
        style: 'halo',
        metal: '18K Yellow Gold',
        rating: 4.9,
        reviews: 142,
        image: '/home/ring2.jfif',
        weddingBandImage: '/home/ring3.jfif',
        stackedImage: '/home/ring1.webp',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring2.jfif',
            '18K White Gold': '/home/ring2.jfif',
            '18K Rose Gold': '/home/ring2.jfif',
            'Platinum': '/home/ring2.jfif'
        },
        description: 'Vintage-inspired elegance with modern craftsmanship in this luxurious set.',
        features: ['Vintage-inspired', 'Luxe diamond accents', 'Lifetime warranty']
    },
    {
        id: 'bs6',
        name: 'Freesia Ring with Curved Versailles Diamond Ring',
        engagementRing: 'Freesia Ring',
        weddingBand: 'Curved Versailles Diamond Ring',
        price: 3040,
        style: 'accents',
        metal: '18K Yellow Gold',
        rating: 4.8,
        reviews: 87,
        image: '/home/ring3.jfif',
        weddingBandImage: '/home/ring1.webp',
        stackedImage: '/home/ring2.jfif',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring3.jfif',
            '18K White Gold': '/home/ring3.jfif',
            '18K Rose Gold': '/home/ring3.jfif',
            'Platinum': '/home/ring3.jfif'
        },
        description: 'Elegant curves and sparkling accents create a stunning bridal set.',
        features: ['Curved design', 'Versailles-inspired', 'Free shipping']
    },
    {
        id: 'bs7',
        name: 'Luxe Viviana Diamond Bridal Set',
        engagementRing: 'Luxe Viviana Diamond Ring',
        weddingBand: 'Luxe Viviana Contoured Band',
        price: 4740,
        style: 'halo',
        metal: '18K White Gold',
        rating: 5.0,
        reviews: 203,
        image: '/home/ring1.webp',
        weddingBandImage: '/home/ring2.jfif',
        stackedImage: '/home/ring3.jfif',
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring1.webp',
            '18K White Gold': '/home/ring1.webp',
            '18K Rose Gold': '/home/ring1.webp',
            'Platinum': '/home/ring1.webp'
        },
        description: 'Luxurious halo design with perfectly matched contoured wedding band.',
        features: ['Luxe halo design', 'Premium diamonds', 'Certified conflict-free']
    },
]

export default function BridalSetsPage() {
    const { setBridalSet, setCurrentStep, setStartType } = useSelection()
    const router = useRouter()

    const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState('best-sellers')

    const filteredSets = useMemo(() => {
        let filtered = BRIDAL_SETS

        if (selectedStyle) {
            filtered = filtered.filter(set => set.style === selectedStyle)
        }

        return filtered.sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price
            if (sortBy === 'price-high') return b.price - a.price
            return 0
        })
    }, [selectedStyle, sortBy])

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            {/* Hero Section */}
            <div className="border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-6 py-12 text-center">
                    <h1 className="text-[42px] md:text-[52px] font-serif text-gray-900 mb-4">
                        Wedding Ring Sets & Bridal Sets
                    </h1>
                    <p className="text-[15px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Designed to pair perfectly, our wedding ring sets feature expertly coordinated engagement and wedding rings.
                    </p>
                </div>
            </div>

            {/* 3-Step Flow */}
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="max-w-[1600px] mx-auto px-6 py-6">
                    <div className="flex items-center justify-center gap-12">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#163E3E] text-white flex items-center justify-center text-[14px] font-bold">1</div>
                            <div className="text-left">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Design Your Ring</p>
                                <p className="text-[13px] font-semibold text-gray-900">Choose Setting</p>
                            </div>
                        </div>
                        <div className="w-12 h-px bg-gray-200" />
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[14px] font-bold">2</div>
                            <div className="text-left">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Choose Diamond</p>
                                <p className="text-[13px] text-gray-400">Browse Diamonds</p>
                            </div>
                        </div>
                        <div className="w-12 h-px bg-gray-200" />
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[14px] font-bold">3</div>
                            <div className="text-left">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Complete Ring</p>
                                <p className="text-[13px] text-gray-400">Select Ring Size</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Style Filters */}
                <div className="mb-8 overflow-x-auto no-scrollbar">
                    <div className="flex gap-4 min-w-max pb-4">
                        {STYLE_FILTERS.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => setSelectedStyle(selectedStyle === style.id ? null : style.id)}
                                className={`flex flex-col items-center gap-2 group ${style.id === 'bridal-sets' ? 'relative' : ''
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all ${selectedStyle === style.id || style.id === 'bridal-sets'
                                        ? 'border-[#163E3E] scale-110'
                                        : 'border-gray-200 group-hover:border-gray-400'
                                    }`}>
                                    <img src={style.image} alt={style.label} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-[11px] font-medium whitespace-nowrap ${selectedStyle === style.id || style.id === 'bridal-sets'
                                        ? 'text-[#163E3E] font-bold'
                                        : 'text-gray-600'
                                    }`}>
                                    {style.label}
                                </span>
                                {style.id === 'bridal-sets' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#163E3E] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm text-[12px] font-medium hover:border-gray-400">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                        <span className="text-[13px] text-gray-600">{filteredSets.length} Results</span>
                        <button className="text-[11px] text-gray-400 hover:text-gray-600">
                            Reset All ×
                        </button>
                    </div>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none border border-gray-200 rounded-sm px-4 py-2 pr-10 text-[12px] focus:outline-none focus:border-gray-400"
                        >
                            <option value="best-sellers">Sort by: Best Sellers</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Bridal Sets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredSets.map((set) => (
                        <div
                            key={set.id}
                            className="group cursor-pointer"
                            onClick={() => router.push(`/design/bridal-set/${set.id}`)}
                        >
                            <div className="relative aspect-square bg-gray-50 mb-4 overflow-hidden rounded-sm border border-gray-100">
                                <img
                                    src={set.stackedImage}
                                    alt={set.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Heart className="w-4 h-4 text-gray-400" />
                                </button>

                                {/* Metal Swatches */}
                                <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {['#E5D5C5', '#E5E5E5', '#F5D5D5', '#D5D5D5'].map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[14px] font-medium text-gray-900 line-clamp-2 group-hover:underline">
                                    {set.name}
                                </h3>
                                <p className="text-[18px] font-serif text-gray-900">${set.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

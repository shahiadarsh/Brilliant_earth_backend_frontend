"use client"

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter } from 'next/navigation'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Filter, ChevronDown, Sparkles, Heart, ChevronLeft, ChevronRight, X, Star, Calendar } from 'lucide-react'

const SETTING_STYLES = [
    { id: 'solitaire', label: 'Solitaire', image: '/home/ring1.webp' },
    { id: 'three-stone', label: 'Three Stone', image: '/home/ring3.jfif' },
    { id: 'accents', label: 'Accents', image: '/home/ring5.jfif' },
    { id: 'hidden-halo', label: 'Hidden Halo', image: '/home/ring2.jfif' },
    { id: 'nature-inspired', label: 'Nature Inspired', image: '/home/ring1.webp' },
    { id: 'bridal-sets', label: 'Bridal Sets', image: '/home/ring4.jfif' },
    { id: 'halo', label: 'Halo', image: '/home/ring5.jfif' },
    { id: 'classic', label: 'Classic', image: '/home/ring6.jfif' },
    { id: 'vintage', label: 'Vintage', image: '/home/ring7.jfif' },
]

const SETTINGS = [
    { id: 's1', name: "Secret Garden Diamond Ring", price: 2890, style: 'nature-inspired', label: 'AWARD WINNING', image: "/home/ring1.webp", metal: "18K Yellow Gold", rating: 4.9, reviews: 124 },
    { id: 's2', name: "Freesia Hidden Halo Diamond Ring", price: 1290, style: 'hidden-halo', label: 'MOST LOVED', image: "/home/ring2.jfif", metal: "18K White Gold", rating: 4.8, reviews: 89 },
    { id: 's3', name: "Nadia Diamond Ring", price: 1350, style: 'three-stone', label: 'BEST SELLER', image: "/home/ring3.jfif", metal: "Platinum", rating: 5.0, reviews: 56 },
    { id: 's4', name: "Petite Opera Three Stone Diamond Ring", price: 1450, style: 'three-stone', image: "/home/ring4.jfif", metal: "14K Rose Gold", rating: 4.7, reviews: 42 },
    { id: 's5', name: "Luxe Viviana Diamond Ring", price: 1850, style: 'accents', label: 'NEW', image: "/home/ring5.jfif", metal: "18K Yellow Gold", rating: 4.9, reviews: 31 },
    { id: 's6', name: "Adira Diamond Ring", price: 1150, style: 'solitaire', image: "/home/ring6.jfif", metal: "18K White Gold", rating: 4.6, reviews: 112 },
    { id: 's7', name: "Vintage Floral Diamond Ring", price: 2150, style: 'vintage', image: "/home/ring7.jfif", metal: "14K Rose Gold", rating: 4.9, reviews: 28 },
    { id: 's8', name: "Classic Solitaire Ring", price: 950, style: 'solitaire', image: "/home/ring6.jfif", metal: "Platinum", rating: 4.8, reviews: 145 },
]

export default function SettingSelectionPage() {
    const { setSetting, setCurrentStep, selectedDiamond, filters, setFilters } = useSelection()
    const router = useRouter()
    const [selectedMetal, setSelectedMetal] = useState('18K White Gold')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const filteredSettings = useMemo(() => {
        return SETTINGS.filter(s => {
            const styleMatch = filters.setting.style.length === 0 || filters.setting.style.includes(s.style)
            return styleMatch
        })
    }, [filters.setting.style])

    const handleSelect = (setting: any) => {
        setSetting({
            id: setting.id,
            name: setting.name,
            price: setting.price,
            image: setting.image,
            metal: selectedMetal
        })

        if (selectedDiamond) {
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            setCurrentStep('diamond')
            router.push('/design/diamond')
        }
    }

    const toggleStyle = (styleId: string) => {
        const newStyles = filters.setting.style.includes(styleId)
            ? filters.setting.style.filter(s => s !== styleId)
            : [...filters.setting.style, styleId]
        setFilters('setting', { style: newStyles })
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Title Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-[36px] md:text-[48px] font-serif text-[#163E3E] tracking-tight">Engagement Rings</h1>
                    <p className="text-[15px] text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        From solitaires to diamond accents, choose your dream engagement ring and we'll bring it to life.
                    </p>
                </div>

                {/* Style Icons Slider */}
                <div className="relative mb-20 group">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-[-20px] top-10 z-10 p-2 bg-white shadow-lg rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#163E3E]" />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto no-scrollbar gap-10 pb-8 snap-x"
                    >
                        {SETTING_STYLES.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => toggleStyle(style.id)}
                                className={`flex flex-col items-center gap-5 min-w-[120px] snap-start group/style transition-all duration-500`}
                            >
                                <div className={`relative w-24 h-24 rounded-full overflow-hidden border-[1px] transition-all duration-500 p-1 ${filters.setting.style.includes(style.id)
                                        ? 'border-[#163E3E] scale-110 shadow-md'
                                        : 'border-gray-100 group-hover/style:border-gray-300'
                                    }`}>
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-50">
                                        <Image
                                            src={style.image}
                                            alt={style.label}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/style:scale-115"
                                        />
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold text-center transition-colors ${filters.setting.style.includes(style.id) ? 'text-[#163E3E]' : 'text-gray-400 group-hover/style:text-gray-600'
                                    }`}>
                                    {style.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-[-20px] top-10 z-10 p-2 bg-white shadow-lg rounded-full border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                    >
                        <ChevronRight className="w-5 h-5 text-[#163E3E]" />
                    </button>
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-y border-gray-100 py-6">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-3 bg-[#163E3E] text-white px-8 py-3.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-all shadow-sm active:scale-95"
                        >
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-[14px] text-gray-900 font-medium">{filteredSettings.length}</span>
                            <span className="text-[14px] text-gray-400 font-light tracking-wide">Results</span>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="flex items-center gap-6 cursor-pointer">
                            <span className="text-[12px] text-gray-400 uppercase tracking-widest font-bold">Sort By</span>
                            <div className="flex items-center gap-3 text-[13px] text-gray-900 font-medium border-b border-gray-200 pb-1 group-hover:border-[#163E3E] transition-colors">
                                <span>Best Sellers</span>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#163E3E] transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {filteredSettings.map((setting) => (
                        <div key={setting.id} className="group relative flex flex-col">
                            {/* Product Card */}
                            <div className="relative aspect-[4/5] bg-[#F9F9F9] mb-6 overflow-hidden rounded-sm cursor-pointer" onClick={() => handleSelect(setting)}>
                                <Image
                                    src={setting.image}
                                    alt={setting.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {setting.label && (
                                    <div className="absolute top-5 left-5 bg-[#163E3E] text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest shadow-md">
                                        {setting.label}
                                    </div>
                                )}
                                <button className="absolute top-5 right-5 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <Heart className="w-4 h-4 text-gray-300 hover:text-red-500 transition-colors" />
                                </button>

                                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/20 to-transparent">
                                    <button className="w-full bg-white text-[#163E3E] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#163E3E] hover:text-white transition-colors">
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-4 text-center px-4">
                                <div className="flex justify-center gap-3">
                                    {['#E5D5C5', '#E5E5E5', '#F5D5D5', '#D5D5D5'].map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
                                            style={{ backgroundColor: color }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMetal(['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'][idx]);
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif text-[16px] text-gray-900 group-hover:text-[#163E3E] transition-colors leading-snug">{setting.name}</h3>
                                    <div className="flex items-center justify-center gap-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(setting.rating || 0) ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                        <span className="text-[11px] text-gray-400 font-medium">({setting.reviews})</span>
                                    </div>
                                    <p className="text-[15px] text-[#163E3E] font-serif mt-2">${setting.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Expert Section */}
                <section className="mt-32 bg-[#F9F7F5] rounded-sm p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#163E3E]/5 rounded-full -mr-32 -mt-32" />
                    <div className="flex-1 space-y-6 relative z-10">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#A68F7A]">Expert Guidance</span>
                        <h2 className="text-[32px] md:text-[42px] font-serif text-[#163E3E] leading-tight">Can't decide on a setting?</h2>
                        <p className="text-gray-600 font-light max-w-md leading-relaxed">
                            Our jewelry experts are here to help you find the perfect ring that matches your style and budget. Book a complimentary virtual appointment today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-[#163E3E] text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
                                <Calendar className="w-4 h-4" /> Book Appointment
                            </button>
                            <button className="border border-[#163E3E] text-[#163E3E] px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#163E3E] hover:text-white transition-all">
                                Chat with an Expert
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative h-[300px] w-full md:h-[400px]">
                        <Image
                            src="/home/featured1.jfif"
                            alt="Jewelry Expert"
                            fill
                            className="object-cover rounded-sm shadow-2xl"
                        />
                    </div>
                </section>
            </main>

            {/* Filter Drawer Overlay */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
                    <div className="relative w-full max-w-[450px] bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-500">
                        <div className="flex flex-col h-full">
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-[20px] font-serif text-[#163E3E]">Filters</h2>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-10">
                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Metal Type</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'].map(metal => (
                                            <button
                                                key={metal}
                                                className={`py-3 px-4 border text-[12px] font-medium transition-all ${selectedMetal === metal ? 'border-[#163E3E] bg-[#163E3E] text-white' : 'border-gray-100 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setSelectedMetal(metal)}
                                            >
                                                {metal}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Styles</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {SETTING_STYLES.map(style => (
                                            <label key={style.id} className="flex items-center gap-4 group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded border-gray-300 text-[#163E3E] focus:ring-[#163E3E]"
                                                    checked={filters.setting.style.includes(style.id)}
                                                    onChange={() => toggleStyle(style.id)}
                                                />
                                                <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">{style.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full bg-[#163E3E] text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-colors"
                                >
                                    Show {filteredSettings.length} Results
                                </button>
                                <button
                                    onClick={() => setFilters('setting', { style: [] })}
                                    className="w-full mt-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#163E3E] transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

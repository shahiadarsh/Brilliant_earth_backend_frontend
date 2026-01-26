"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelection } from '@/context/SelectionContext'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Heart, Share2, ChevronDown, Star, ShieldCheck, Truck, Package, Award, Info, Play } from 'lucide-react'
import Link from 'next/link'

const BRIDAL_SETS_DATA = [
    {
        id: 'bs1',
        name: 'Nadia Diamond Ring with Aria Contoured Diamond Ring',
        engagementRing: 'Nadia Diamond Ring',
        weddingBand: 'Aria Contoured Diamond Ring in 18K Yellow Gold',
        price: 2940,
        metal: '18K Yellow Gold',
        rating: 4.9,
        reviews: 124,
        sku: 'BE-BS1-18KY',
        description: 'Two complementary designs create a romantic, classic look in this shimmering bridal set. While the engagement ring features a stunning center diamond, the wedding band is perfectly contoured to fit snugly against it.',
        mainImages: [
            { url: '/home/ring1.webp', label: 'Shown with 3/4 Carat Diamond', type: 'engagement' },
            { url: '/home/featured1.jfif', label: 'Shown with 3/4 carat diamond', type: 'hand' },
            { url: '/home/ring2.jfif', label: 'Shown with 3/4 Carat Diamond', type: 'engagement-detail' },
            { url: '/home/ring3.jfif', label: 'Shown with 3/4 Carat Diamond', type: 'side' },
            { url: '/home/ring1.webp', label: 'Shown with 3/4 Carat Diamond', type: 'wedding-band' },
            { url: '/home/featured1.jfif', label: 'Shown with 3/4 carat diamond', type: 'hand-wedding' },
            { url: '/home/ring2.jfif', label: 'Interactive Video—Drag to Rotate', type: 'video', hasVideo: true },
            { url: '/home/ring3.jfif', label: 'Shown with 3/4 Carat Diamond', type: 'stacked' },
        ],
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring1.webp',
            '18K White Gold': '/home/ring1.webp',
            '18K Rose Gold': '/home/ring1.webp',
            'Platinum': '/home/ring1.webp'
        },
        features: [
            'Free Shipping, Free 30 Day Returns',
            'Order now and your order ships by Tue, Feb 10, depending on center diamond',
        ]
    },
]

const DIAMOND_SHAPES = ['Round', 'Oval', 'Cushion', 'Emerald', 'Pear', 'Radiant', 'Princess', 'Marquise']
const METAL_OPTIONS = [
    { value: '18K Yellow Gold', color: '#E5D5C5', label: '18K Yellow Gold' },
    { value: '18K White Gold', color: '#E5E5E5', label: '18K White Gold' },
    { value: '18K Rose Gold', color: '#F5D5D5', label: '18K Rose Gold' },
    { value: 'Platinum', color: '#D5D5D5', label: 'Platinum' }
]

export default function BridalSetDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { setBridalSet, setCurrentStep, setStartType, selectedDiamond } = useSelection()

    const bridalSet = BRIDAL_SETS_DATA[0]

    const [selectedMetal, setSelectedMetal] = useState(bridalSet.metal)
    const [selectedShape, setSelectedShape] = useState('Oval')
    const [diamondOrigin, setDiamondOrigin] = useState<'natural' | 'lab'>('natural')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const handleChooseBridalSet = () => {
        const image = (bridalSet.imagesByMetal as any)?.[selectedMetal] || bridalSet.mainImages[0].url

        setBridalSet({
            id: bridalSet.id,
            name: bridalSet.name,
            engagementRing: bridalSet.engagementRing,
            weddingBand: bridalSet.weddingBand,
            price: bridalSet.price,
            image: image,
            metal: selectedMetal
        })

        setStartType('bridal-set')

        if (selectedDiamond) {
            setCurrentStep('review')
            router.push('/design/bridal-set/review')
        } else {
            setCurrentStep('diamond')
            router.push('/design/diamond')
        }
    }

    const currentImage = bridalSet.mainImages[currentImageIndex]

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
                        <span className="text-gray-900">Bridal Sets</span>
                        <span>/</span>
                        <span className="text-gray-900">{bridalSet.name}</span>
                    </nav>
                </div>
            </div>

            {/* 3-Step Flow */}
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#163E3E] text-white flex items-center justify-center text-[12px] font-bold">1</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Design Your Bridal Set</p>
                                <p className="text-[12px] font-semibold text-gray-900">Setting</p>
                                <p className="text-[11px] text-gray-500">Nadia + Aria</p>
                            </div>
                            <img src="/home/ring1.webp" alt="Setting" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="w-8 h-px bg-gray-200" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[12px] font-bold">2</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Choose Diamond</p>
                                <p className="text-[12px] text-gray-400">Browse Diamonds</p>
                            </div>
                        </div>
                        <div className="w-8 h-px bg-gray-200" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[12px] font-bold">3</div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Complete Ring</p>
                                <p className="text-[12px] text-gray-400">Select Ring Size</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left: Images - 55% */}
                    <div className="lg:col-span-7">
                        {/* Main Image */}
                        <div className="relative bg-white mb-4 sticky top-24">
                            <div className="relative aspect-square bg-white border border-gray-100 rounded-sm overflow-hidden">
                                <img
                                    src={currentImage.url}
                                    alt={currentImage.label}
                                    className="w-full h-full object-cover"
                                />

                                {currentImage.hasVideo && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                            <Play className="w-8 h-8 text-gray-900 ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* Top Right Icons */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                                        <Heart className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
                                        <Share2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>

                                {/* Image Label */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                                    <p className="text-[10px] font-medium text-gray-700">{currentImage.label}</p>
                                </div>
                            </div>

                            {/* Thumbnail Grid - 4 columns */}
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {bridalSet.mainImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative aspect-square border-2 rounded-sm overflow-hidden transition-all ${currentImageIndex === idx
                                            ? 'border-gray-900'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                                        {img.hasVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <Play className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Details - 45% */}
                    <div className="lg:col-span-5">
                        <div className="space-y-6">
                            {/* Title & Rating */}
                            <div>
                                <h1 className="text-[24px] font-serif text-gray-900 leading-tight mb-3">
                                    {bridalSet.name}
                                </h1>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(bridalSet.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[13px] text-gray-600">({bridalSet.reviews})</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-gray-600 leading-relaxed">
                                {bridalSet.description}
                            </p>

                            {/* View with Diamond Shape */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    View with Diamond Shape:
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedShape}
                                        onChange={(e) => setSelectedShape(e.target.value)}
                                        className="w-full appearance-none border border-gray-300 rounded-sm px-4 py-3 pr-10 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900"
                                    >
                                        {DIAMOND_SHAPES.map(shape => (
                                            <option key={shape} value={shape}>{shape}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Metal Selection */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    Metal: {selectedMetal}
                                </label>
                                <div className="space-y-2">
                                    {METAL_OPTIONS.map((metal) => (
                                        <label
                                            key={metal.value}
                                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-sm cursor-pointer hover:border-gray-400 transition-colors"
                                        >
                                            <input
                                                type="radio"
                                                name="metal"
                                                value={metal.value}
                                                checked={selectedMetal === metal.value}
                                                onChange={(e) => setSelectedMetal(e.target.value)}
                                                className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                                            />
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{ backgroundColor: metal.color }}
                                            />
                                            <span className="text-[13px] text-gray-900">{metal.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Diamond Origin */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    Diamond Origin:
                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                        <Info className="w-3.5 h-3.5 inline" />
                                    </button>
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDiamondOrigin('natural')}
                                        className={`flex-1 py-3 px-4 border rounded-sm text-[13px] font-medium transition-all ${diamondOrigin === 'natural'
                                            ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        Natural
                                    </button>
                                    <button
                                        onClick={() => setDiamondOrigin('lab')}
                                        className={`flex-1 py-3 px-4 border rounded-sm text-[13px] font-medium transition-all ${diamondOrigin === 'lab'
                                            ? 'border-[#163E3E] bg-[#163E3E] text-white'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        Lab-Grown
                                    </button>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-gray-200 py-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[28px] font-serif text-gray-900">${bridalSet.price.toLocaleString()}</span>
                                    <span className="text-[13px] text-gray-500">(Setting and Band Only)</span>
                                </div>
                                <button className="text-[11px] text-[#163E3E] font-semibold uppercase tracking-wider mt-2 hover:underline">
                                    ENDS SOON!
                                </button>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleChooseBridalSet}
                                className="w-full bg-[#163E3E] text-white py-4 text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all"
                            >
                                CHOOSE THIS BRIDAL SET
                            </button>

                            {/* Trust Icons */}
                            <div className="flex items-center justify-between text-[11px] text-gray-600 pt-4">
                                <button className="flex items-center gap-2 hover:text-gray-900">
                                    <Package className="w-4 h-4" />
                                    Drop Hint
                                </button>
                                <button className="flex items-center gap-2 hover:text-gray-900">
                                    <Share2 className="w-4 h-4" />
                                    Email
                                </button>
                                <button className="flex items-center gap-2 hover:text-gray-900">
                                    <span>📞</span>
                                    800.691.0952
                                </button>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 pt-4">
                                {bridalSet.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <ShieldCheck className="w-5 h-5 text-[#163E3E] flex-shrink-0 mt-0.5" />
                                        <p className="text-[12px] text-gray-700">{feature}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Collapsible Sections */}
                            <div className="space-y-2 pt-6 border-t border-gray-200">
                                {['Engagement Ring Details', 'Wedding Band Details'].map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                                        className="w-full flex justify-between items-center p-4 border border-gray-200 rounded-sm hover:bg-gray-50"
                                    >
                                        <span className="text-[13px] font-semibold text-gray-900">{section}</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === section ? 'rotate-180' : ''
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

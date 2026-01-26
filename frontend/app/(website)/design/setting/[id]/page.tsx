"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelection } from '@/context/SelectionContext'
import { FlowHeader } from '@/components/shared/FlowHeader'
import Image from 'next/image'
import { Heart, Share2, ChevronDown, Star, ShieldCheck, Truck, Package, Award } from 'lucide-react'
import Link from 'next/link'

const SETTINGS_DATA = [
    {
        id: 's1',
        name: "Secret Garden Diamond Ring",
        price: 2890,
        style: 'nature-inspired',
        metal: "18K Yellow Gold",
        rating: 4.9,
        reviews: 124,
        caratWeight: "1.72",
        sku: "BE1D17-18KY",
        description: "This nature-inspired design features delicate vine details and a secure four-prong setting. The Secret Garden ring showcases exceptional craftsmanship with hand-engraved details along the band.",
        mainImage: "/home/ring1.webp",
        modelImage: "/home/featured1.jfif",
        thumbnails: [
            { image: "/home/ring1.webp", label: "Ring" },
            { image: "/home/featured1.jfif", label: "Hand" },
            { image: "/home/ring1.webp", label: "Side" },
            { image: "/home/ring1.webp", label: "Detail" }
        ],
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring1.webp',
            '18K White Gold': '/home/ring1.webp',
            '18K Rose Gold': '/home/ring1.webp',
            'Platinum': '/home/ring1.webp'
        },
        features: [
            "Conflict-free diamonds",
            "Lifetime warranty",
            "Free shipping & returns",
            "Complimentary resizing"
        ]
    },
    {
        id: 's2',
        name: "Freesia Hidden Halo Diamond Ring",
        price: 1290,
        style: 'hidden-halo',
        metal: "18K White Gold",
        rating: 4.8,
        reviews: 89,
        caratWeight: "1.50",
        sku: "BE2D15-18KW",
        description: "Features a hidden halo of diamonds beneath the center stone for added brilliance. This modern design combines classic elegance with contemporary style.",
        mainImage: "/home/ring2.jfif",
        modelImage: "/home/featured1.jfif",
        thumbnails: [
            { image: "/home/ring2.jfif", label: "Ring" },
            { image: "/home/featured1.jfif", label: "Hand" },
            { image: "/home/ring2.jfif", label: "Side" },
            { image: "/home/ring2.jfif", label: "Detail" }
        ],
        imagesByMetal: {
            '18K Yellow Gold': '/home/ring2.jfif',
            '18K White Gold': '/home/ring2.jfif',
            '18K Rose Gold': '/home/ring2.jfif',
            'Platinum': '/home/ring2.jfif'
        },
        features: [
            "Hidden halo design",
            "Lifetime warranty",
            "Free shipping & returns",
            "Complimentary resizing"
        ]
    },
]

const DIAMOND_SHAPES = [
    'Round', 'Oval', 'Cushion', 'Emerald', 'Pear', 'Radiant', 'Princess', 'Marquise', 'Asscher', 'Heart'
]

const METAL_OPTIONS = [
    { value: '18K Yellow Gold', color: '#E5D5C5', label: '18K Yellow Gold' },
    { value: '18K White Gold', color: '#E5E5E5', label: '18K White Gold' },
    { value: '18K Rose Gold', color: '#F5D5D5', label: '18K Rose Gold' },
    { value: 'Platinum', color: '#D5D5D5', label: 'Platinum' }
]

const CARAT_WEIGHTS = ['1.00 ct tw', '1.25 ct tw', '1.50 ct tw', '1.72 ct tw', '2.00 ct tw', '2.50 ct tw']

export default function SettingDetailPageExact() {
    const params = useParams()
    const router = useRouter()
    const { setSetting, setCurrentStep, setStartType, selectedDiamond } = useSelection()

    const setting = SETTINGS_DATA.find(s => s.id === params.id) || SETTINGS_DATA[0]

    const [selectedMetal, setSelectedMetal] = useState(setting.metal)
    const [selectedShape, setSelectedShape] = useState('Oval')
    const [selectedCarat, setSelectedCarat] = useState(setting.caratWeight + ' ct tw')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showModelView, setShowModelView] = useState(false)

    const handleChooseSetting = () => {
        const image = (setting.imagesByMetal as any)?.[selectedMetal] || setting.mainImage

        setSetting({
            id: setting.id,
            name: setting.name,
            price: setting.price,
            image: image,
            metal: selectedMetal
        })

        setStartType('setting')

        // If user already selected a diamond (started with diamond flow), go to review
        if (selectedDiamond) {
            setCurrentStep('review')
            router.push('/design/review')
        } else {
            // Normal flow: go to diamond page
            setCurrentStep('diamond')
            router.push('/design/diamond')
        }
    }

    const handleQuickStart = () => {
        const image = (setting.imagesByMetal as any)?.[selectedMetal] || setting.mainImage

        setSetting({
            id: setting.id,
            name: setting.name,
            price: setting.price,
            image: image,
            metal: selectedMetal
        })

        setStartType('setting')
        setCurrentStep('review')
        router.push('/design/review')
    }

    const currentImage = showModelView ? setting.modelImage : (setting.thumbnails[currentImageIndex]?.image || setting.mainImage)

    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />

            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <nav className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900 transition-colors">Engagement Rings</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900 transition-colors">Design Your Ring</Link>
                        <span>/</span>
                        <Link href="/design/setting" className="hover:text-gray-900 transition-colors">Start with a Setting</Link>
                        <span>/</span>
                        <span className="text-gray-900">{setting.name}</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left: Images - 60% */}
                    <div className="lg:col-span-7">
                        {/* Main Image */}
                        <div className="relative bg-white mb-6 sticky top-24">
                            <div className="relative aspect-square bg-white border border-gray-100 rounded-sm overflow-hidden">
                                <Image
                                    src={currentImage}
                                    alt={setting.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Top Right Icons */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <Heart className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <Share2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="grid grid-cols-4 gap-3 mt-4">
                                {setting.thumbnails.map((thumb, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setCurrentImageIndex(idx)
                                            setShowModelView(thumb.label === 'Hand')
                                        }}
                                        className={`relative aspect-square border-2 rounded-sm overflow-hidden transition-all ${currentImageIndex === idx && !showModelView
                                            ? 'border-gray-900'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={thumb.image}
                                            alt={thumb.label}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm py-1">
                                            <p className="text-[9px] text-center font-medium text-gray-700 uppercase tracking-wider">
                                                {thumb.label}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Details - 40% */}
                    <div className="lg:col-span-5">
                        <div className="space-y-6">
                            {/* Title & Rating */}
                            <div>
                                <h1 className="text-[28px] font-serif text-gray-900 leading-tight mb-3">
                                    {setting.name} ({setting.caratWeight} ct tw) in {selectedMetal}
                                </h1>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(setting.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[13px] text-gray-600">({setting.reviews})</span>
                                </div>
                                <p className="text-[11px] text-gray-500">SKU: {setting.sku}</p>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-gray-200 py-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[32px] font-serif text-gray-900">${setting.price.toLocaleString()}</span>
                                    <span className="text-[13px] text-gray-500">(Setting Only)</span>
                                </div>
                            </div>

                            {/* View with Diamond Shape */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    View with Diamond Shape:
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedShape}
                                        onChange={(e) => setSelectedShape(e.target.value)}
                                        className="w-full appearance-none border border-gray-300 rounded-sm px-4 py-3 pr-10 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
                                    >
                                        {DIAMOND_SHAPES.map(shape => (
                                            <option key={shape} value={shape}>{shape}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <p className="text-[11px] text-gray-500 mt-2">
                                    See how this setting looks with different diamond shapes
                                </p>
                            </div>

                            {/* Metal Selection */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    Metal:
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

                            {/* Setting Carat Weight */}
                            <div>
                                <label className="block text-[12px] font-semibold text-gray-900 mb-3">
                                    Setting Carat Weight:
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCarat}
                                        onChange={(e) => setSelectedCarat(e.target.value)}
                                        className="w-full appearance-none border border-gray-300 rounded-sm px-4 py-3 pr-10 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
                                    >
                                        {CARAT_WEIGHTS.map(carat => (
                                            <option key={carat} value={carat}>{carat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3 pt-4">
                                <button
                                    onClick={handleChooseSetting}
                                    className="w-full bg-[#163E3E] text-white py-4 text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all"
                                >
                                    CHOOSE THIS SETTING
                                </button>
                                <button
                                    onClick={handleQuickStart}
                                    className="w-full border-2 border-gray-300 text-gray-900 py-4 text-[13px] font-bold uppercase tracking-[0.15em] hover:border-gray-900 transition-all"
                                >
                                    QUICK START
                                </button>
                                <p className="text-[11px] text-gray-500 text-center">
                                    Quick Start pairs this setting with a 1.0ct Round Diamond
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#163E3E] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-semibold text-gray-900">Free Lifetime Warranty</p>
                                        <p className="text-[11px] text-gray-500">Includes resizing</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Truck className="w-5 h-5 text-[#163E3E] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-semibold text-gray-900">Free Shipping</p>
                                        <p className="text-[11px] text-gray-500">& Returns</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Package className="w-5 h-5 text-[#163E3E] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-semibold text-gray-900">Free Ring Sizing</p>
                                        <p className="text-[11px] text-gray-500">For life</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-[#163E3E] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-semibold text-gray-900">Certified Diamonds</p>
                                        <p className="text-[11px] text-gray-500">Conflict-free</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Product Details</h3>
                                <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                                    {setting.description}
                                </p>
                                <ul className="space-y-2">
                                    {setting.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-[13px] text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#163E3E]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

"use client"

import React, { useState } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Gem,
    X,
    Activity,
    Shield,
    Globe,
    FileSpreadsheet,
    Upload
} from 'lucide-react'

const initialGemstones = [
    { id: 1, type: "Sapphire", color: "Ceylon Blue", shape: "Round", carat: 1.5, origin: "Sri Lanka", price: 1800, stock: 4 },
    { id: 2, type: "Emerald", color: "Vivid Green", shape: "Pear", carat: 1.2, origin: "Zambia", price: 2100, stock: 2 },
    { id: 3, type: "Ruby", color: "Pigeon Blood", shape: "Oval", carat: 1.8, origin: "Burma", price: 3500, stock: 1 },
    { id: 4, type: "Moissanite", color: "Colorless", shape: "Emerald", carat: 2.5, origin: "Lab", price: 450, stock: 12 },
]

import {
    useGetGemstonesQuery,
    useCreateGemstoneMutation,
    useDeleteGemstoneMutation
} from '@/lib/redux/slices/gemstonesApiSlice'
import { toast } from 'sonner'

export default function GemstonesCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("All Types")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'specs' | 'technical' | 'seo'>('specs')
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: gemstonesData, isLoading } = useGetGemstonesQuery({
        variety: searchTerm || undefined,
        type: filterType === 'All Types' ? undefined : filterType,
        sort: '-createdAt'
    })
    const [createGemstone] = useCreateGemstoneMutation()
    const [deleteGemstone] = useDeleteGemstoneMutation()

    const [newGem, setNewGem] = useState({
        type: "Sapphire",
        variety: "",
        color: "",
        intensity: "Vivid",
        shape: "Round",
        carat: "",
        origin: "",
        price: "",
        stock: "",
        treatment: "Heat Treated",
        hardness: "9.0",
        clarity: "VS1",
        dimensions: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    })
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const gemstones = gemstonesData?.data?.gemstones || []

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedImages(prev => [...prev, ...files])

            const newPreviews = files.map(file => URL.createObjectURL(file))
            setImagePreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    const handleDelete = async (id: string) => {
        if (confirm("Delete this gemstone?")) {
            try {
                await deleteGemstone(id).unwrap()
                toast.success("Gemstone deleted")
            } catch (err) {
                toast.error("Failed to delete gemstone")
            }
        }
    }

    const handleAddGem = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            const slug = newGem.slug || `${newGem.carat}-${newGem.color}-${newGem.type}-${newGem.shape}`.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('type', newGem.type)
            formData.append('variety', newGem.variety)
            formData.append('color', newGem.color)
            formData.append('intensity', newGem.intensity)
            formData.append('shape', newGem.shape)
            formData.append('carat', newGem.carat)
            formData.append('origin', newGem.origin)
            formData.append('price', newGem.price)
            formData.append('stock', newGem.stock)
            formData.append('treatment', newGem.treatment)
            formData.append('hardness', newGem.hardness)
            formData.append('clarity', newGem.clarity)
            formData.append('dimensions', newGem.dimensions)
            formData.append('slug', slug)
            formData.append('metaTitle', newGem.metaTitle)
            formData.append('metaDescription', newGem.metaDescription)
            formData.append('keywords', newGem.keywords)

            selectedImages.forEach(image => formData.append('images', image))

            await createGemstone(formData).unwrap()

            toast.success("Gemstone created successfully")
            setIsModalOpen(false)
            setNewGem({
                type: "Sapphire", variety: "", color: "", intensity: "Vivid", shape: "Round", carat: "", origin: "", price: "", stock: "",
                treatment: "Heat Treated", hardness: "9.0", clarity: "VS1", dimensions: "", slug: "", metaTitle: "",
                metaDescription: "", keywords: ""
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('specs')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to create gemstone")
        }
    }

    const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            toast.info(`Bulk import simulation: Reading ${file.name}...`)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Gemstone Inventory</h1>
                    <p className="text-slate-500 mt-1 text-sm">Manage your vibrant natural and lab gemstones collection.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleCsvUpload}
                        accept=".csv"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-[#163E3E]" /> Bulk Import
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Gemstone
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search by variety, color, or origin..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/20 transition-all"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option>All Types</option>
                    <option>Sapphire</option>
                    <option>Emerald</option>
                    <option>Ruby</option>
                    <option>Moissanite</option>
                    <option>Aquamarine</option>
                    <option>Morganite</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 italic">Loading gemstones catalog...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Gemstone</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Details</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Price</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {gemstones.map((gem: any) => (
                                    <tr key={gem._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-[#163E3E]">
                                                    <Gem className="w-5 h-5 flex-shrink-0" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight">{gem.color} {gem.type}</p>
                                                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">SKU: GEM-{gem._id.substring(gem._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <p className="text-sm text-slate-700 font-medium">{gem.carat}ct • {gem.shape}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{gem.origin}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-900">${gem.price.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${gem.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                <span className="text-sm font-medium text-slate-700">{gem.stock} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-slate-400 hover:text-[#163E3E] hover:bg-[#163E3E]/5 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                                                <button
                                                    onClick={() => handleDelete(gem._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {gemstones.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm italic">No gemstones found matching your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Configure Gemstone</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Precious Inventory</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: 'specs', label: 'Primary Specs', icon: Gem },
                                { id: 'technical', label: 'Technical Data', icon: Activity },
                                { id: 'seo', label: 'SEO & Meta', icon: Globe }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-6 py-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all relative
                                        ${modalTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                    {modalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#163E3E]"></div>}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddGem} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === 'specs' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-3 gap-6">
                                            {/* Media Upload Area */}
                                            <div className="md:col-span-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Product Media</label>
                                                <div
                                                    onClick={() => document.getElementById('gem-images')?.click()}
                                                    className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-[#163E3E]/30 transition-all cursor-pointer relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="gem-images"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <Gem className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E] transition-colors" />
                                                    <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500 transition-colors uppercase tracking-widest text-center px-4">Upload Images (Max 5)</p>
                                                </div>

                                                {/* Previews */}
                                                <div className="grid grid-cols-2 gap-2 mt-4">
                                                    {imagePreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-100 group">
                                                            <img src={src} className="w-full h-full object-cover" alt="preview" />
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                                className="absolute top-1 right-1 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3 text-red-500" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 space-y-6">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Variety (Stone Type)</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newGem.type} onChange={(e) => setNewGem({ ...newGem, type: e.target.value })}>
                                                            <option>Sapphire</option><option>Emerald</option><option>Ruby</option><option>Morganite</option><option>Aquamarine</option><option>Moissanite</option><option>Tanzanite</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color Shade</label>
                                                        <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Ceylon Blue" value={newGem.color} onChange={(e) => setNewGem({ ...newGem, color: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intensity</label>
                                                <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none" value={newGem.intensity} onChange={(e) => setNewGem({ ...newGem, intensity: e.target.value })}>
                                                    <option>Vivid</option><option>Intense</option><option>Deep</option><option>Light</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shape</label>
                                                <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none" value={newGem.shape} onChange={(e) => setNewGem({ ...newGem, shape: e.target.value })}>
                                                    <option>Round</option><option>Oval</option><option>Emerald</option><option>Pear</option><option>Cushion</option><option>Radiant</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Carat</label>
                                                <input required type="number" step="0.01" className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none" placeholder="1.20" value={newGem.carat} onChange={(e) => setNewGem({ ...newGem, carat: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Price ($)</label>
                                                <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="1800" value={newGem.price} onChange={(e) => setNewGem({ ...newGem, price: e.target.value })} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Earth Origin</label>
                                                <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. Sri Lanka" value={newGem.origin} onChange={(e) => setNewGem({ ...newGem, origin: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'technical' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Treatment Disclosure</label>
                                                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" value={newGem.treatment} onChange={(e) => setNewGem({ ...newGem, treatment: e.target.value })}>
                                                        <option>None (No Treatment)</option><option>Heat Treated</option><option>Filled</option><option>Irradiated</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mohs Hardness</label>
                                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="9.0" value={newGem.hardness} onChange={(e) => setNewGem({ ...newGem, hardness: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clarity Grade</label>
                                                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" value={newGem.clarity} onChange={(e) => setNewGem({ ...newGem, clarity: e.target.value })}>
                                                        <option>Loupe Clean</option><option>Eye Clean</option><option>Slightly Included</option><option>Included</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimensions (mm)</label>
                                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. 6.5 x 6.4 x 4.2" value={newGem.dimensions} onChange={(e) => setNewGem({ ...newGem, dimensions: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4">
                                            <Shield className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Authentication Guarantee</p>
                                                <p className="text-[10px] text-blue-700 mt-0.5">All gemstones must include a valid laboratory report (GIA/GRS/IGL) before being listed live on the storefront.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product URL Slug</label>
                                            <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100 px-4">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/gemstones/</span>
                                                <input type="text" className="flex-1 px-2 py-4 bg-transparent border-none text-sm outline-none" placeholder="royal-blue-sapphire-oval" value={newGem.slug} onChange={(e) => setNewGem({ ...newGem, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Title</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="Search engine title..." value={newGem.metaTitle} onChange={(e) => setNewGem({ ...newGem, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Description</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm resize-none" placeholder="Search engine snippet..." value={newGem.metaDescription} onChange={(e) => setNewGem({ ...newGem, metaDescription: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Keywords</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. sapphire stone, ceylon blue, natural gemstone" value={newGem.keywords} onChange={(e) => setNewGem({ ...newGem, keywords: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Save & Publish Live</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

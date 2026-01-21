"use client"

import React, { useState } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Download,
    Star,
    X,
    FileSpreadsheet,
    Upload
} from 'lucide-react'

import {
    useGetRingsQuery,
    useCreateRingMutation,
    useDeleteRingMutation
} from '@/lib/redux/slices/ringsApiSlice'
import { toast } from 'sonner'

const ringStyles = [
    'Solitaire', 'Halo', 'Vintage', 'Hidden Halo', 'Sidestone', 'Three Stone',
    'Classic Band', 'Diamond Band', 'Matte Band', 'Hammered Band', 'Stackable', 'Eternity'
]

export default function RingsCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStyle, setFilterStyle] = useState("All Styles")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'general' | 'specs' | 'seo'>('general')
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: ringsData, isLoading } = useGetRingsQuery({
        name: searchTerm || undefined,
        style: filterStyle === 'All Styles' ? undefined : filterStyle,
        sort: '-createdAt'
    })
    const [createRing] = useCreateRingMutation()
    const [deleteRing] = useDeleteRingMutation()

    const [newRing, setNewRing] = useState({
        name: "",
        slug: "",
        price: "",
        stock: "",
        style: "Solitaire",
        collection: "Signature",
        category: "Engagement",
        gender: "Women",
        metals: ["18K White Gold"] as string[],
        prongStyle: "4-Prong",
        bandWidth: "1.5mm",
        description: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        isSustainable: true
    })
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const rings = ringsData?.data?.rings || []

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
        if (confirm("Are you sure you want to delete this setting?")) {
            try {
                await deleteRing(id).unwrap()
                toast.success("Ring setting deleted")
            } catch (err) {
                toast.error("Failed to delete ring")
            }
        }
    }

    const handleAddRing = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            // Auto-generate slug if empty
            const slug = newRing.slug || newRing.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('name', newRing.name)
            formData.append('slug', slug)
            formData.append('price', newRing.price)
            formData.append('stock', newRing.stock)
            formData.append('style', newRing.style)
            formData.append('collection', newRing.collection)
            formData.append('category', newRing.category)
            formData.append('gender', newRing.gender)
            formData.append('prongStyle', newRing.prongStyle)
            formData.append('bandWidth', newRing.bandWidth)
            formData.append('description', newRing.description)
            formData.append('metaTitle', newRing.metaTitle)
            formData.append('metaDescription', newRing.metaDescription)
            formData.append('keywords', newRing.keywords)
            formData.append('isSustainable', String(newRing.isSustainable))

            newRing.metals.forEach(metal => formData.append('metals[]', metal))
            selectedImages.forEach(image => formData.append('images', image))

            await createRing(formData).unwrap()

            toast.success("New ring setting created")
            setIsModalOpen(false)
            setNewRing({
                name: "", slug: "", price: "", stock: "", style: "Solitaire",
                collection: "Signature", category: "Engagement", gender: "Women",
                metals: ["18K White Gold"], prongStyle: "4-Prong",
                bandWidth: "1.5mm", description: "", metaTitle: "", metaDescription: "",
                keywords: "", isSustainable: true
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('general')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to create ring")
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Rings & Settings</h1>
                    <p className="text-slate-500 mt-1 text-sm">Manage your engagement ring settings and bridal catalog.</p>
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
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <FileSpreadsheet className="w-4 h-4 text-[#163E3E]" /> Bulk Import
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Create New Setting
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, SKU or style..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/20 transition-all"
                        value={filterStyle}
                        onChange={(e) => setFilterStyle(e.target.value)}
                    >
                        <option>All Styles</option>
                        {ringStyles.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 italic">Loading rings catalog...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Product Details</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Style & Collection</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Price</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Rating</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rings.map((ring: any) => (
                                    <tr key={ring._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 relative">
                                                    <img src={ring.images[0] || "https://images.unsplash.com/photo-1605100804763-047af5c52b1a?w=200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={ring.name} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight">{ring.name}</p>
                                                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">SKU: RZ-RING-{ring._id.substring(ring._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-slate-700 font-medium">{ring.style}</p>
                                            <p className="text-xs text-slate-400 mt-1">{ring.collection}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-900">${ring.price.toLocaleString()}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold tracking-tight mt-1">Live Price</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${ring.stock > 10 ? 'bg-emerald-500' : 'bg-orange-400'}`}></div>
                                                <span className="text-sm font-medium text-slate-700">{ring.stock} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" />
                                                <span className="text-sm font-bold text-slate-700">{ring.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-slate-400 hover:text-[#163E3E] hover:bg-[#163E3E]/5 rounded-lg transition-all" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ring._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rings.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 text-sm italic">No rings found matching your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add New Setting Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Create New Setting</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Catalog Management</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: 'general', label: 'General Info' },
                                { id: 'specs', label: 'Detailed Specs' },
                                { id: 'seo', label: 'SEO & Metadata' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative
                                        ${modalTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    {tab.label}
                                    {modalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#163E3E]"></div>}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddRing} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === 'general' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* Image Upload Area */}
                                            <div className="md:col-span-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Product Media</label>
                                                <div
                                                    onClick={() => document.getElementById('ring-images')?.click()}
                                                    className="aspect-[4/5] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-[#163E3E]/30 transition-all cursor-pointer relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="ring-images"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#163E3E] transition-colors">
                                                        <Plus className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500 transition-colors uppercase tracking-widest text-center px-4">Upload Images (Max 5)</p>
                                                </div>

                                                {/* Previews */}
                                                <div className="grid grid-cols-3 gap-2 mt-4">
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

                                            {/* Primary Fields */}
                                            <div className="md:col-span-2 space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
                                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Classic Solitaire Engagement Ring" value={newRing.name} onChange={(e) => setNewRing({ ...newRing, name: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Price ($)</label>
                                                        <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="950" value={newRing.price} onChange={(e) => setNewRing({ ...newRing, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory Stock</label>
                                                        <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="10" value={newRing.stock} onChange={(e) => setNewRing({ ...newRing, stock: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Short Description</label>
                                                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Describe the setting details..." value={newRing.description} onChange={(e) => setNewRing({ ...newRing, description: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'specs' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Setting Style</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newRing.style} onChange={(e) => setNewRing({ ...newRing, style: e.target.value })}>
                                                    <option>Solitaire</option><option>Halo</option><option>Vintage</option><option>Sidestone</option><option>Three Stone</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collection</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newRing.collection} onChange={(e) => setNewRing({ ...newRing, collection: e.target.value })}>
                                                    <option>Signature</option><option>Botanical</option><option>Classic</option><option>Modern</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prong Style</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newRing.prongStyle} onChange={(e) => setNewRing({ ...newRing, prongStyle: e.target.value })}>
                                                    <option>4-Prong</option><option>6-Prong</option><option>Double Prong</option><option>Bezel</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mean Band Width</label>
                                                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. 1.8mm" value={newRing.bandWidth} onChange={(e) => setNewRing({ ...newRing, bandWidth: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Metal Availability</label>
                                            <div className="flex flex-wrap gap-3">
                                                {["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"].map((metal) => (
                                                    <button
                                                        key={metal}
                                                        type="button"
                                                        onClick={() => {
                                                            const exists = newRing.metals.includes(metal)
                                                            setNewRing({
                                                                ...newRing,
                                                                metals: exists ? newRing.metals.filter(m => m !== metal) : [...newRing.metals, metal]
                                                            })
                                                        }}
                                                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all
                                                            ${newRing.metals.includes(metal) ? 'bg-[#163E3E] border-[#163E3E] text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}
                                                        `}
                                                    >
                                                        {metal}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                                            <input
                                                type="checkbox"
                                                id="sustainable"
                                                checked={newRing.isSustainable}
                                                onChange={(e) => setNewRing({ ...newRing, isSustainable: e.target.checked })}
                                                className="w-4 h-4 rounded border-emerald-300 text-[#163E3E] focus:ring-[#163E3E]"
                                            />
                                            <label htmlFor="sustainable" className="text-xs font-bold text-emerald-800 uppercase tracking-widest cursor-pointer">Conflict-Free & Sustainable Origin</label>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL Slug</label>
                                            <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                                                <span className="pl-5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">ritzin.com/settings/</span>
                                                <input type="text" className="flex-1 px-2 py-4 bg-transparent border-none text-sm outline-none" placeholder="classic-solitaire" value={newRing.slug} onChange={(e) => setNewRing({ ...newRing, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Title</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Search engine title..." value={newRing.metaTitle} onChange={(e) => setNewRing({ ...newRing, metaTitle: e.target.value })} />
                                            <p className="text-[9px] text-slate-400 font-medium px-1">Recommended: 50-60 characters</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Description</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Search engine snippet..." value={newRing.metaDescription} onChange={(e) => setNewRing({ ...newRing, metaDescription: e.target.value })} />
                                            <p className="text-[9px] text-slate-400 font-medium px-1">Recommended: 150-160 characters</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Keywords</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. engagement ring, solitaire, diamond" value={newRing.keywords} onChange={(e) => setNewRing({ ...newRing, keywords: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Save Setting & Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

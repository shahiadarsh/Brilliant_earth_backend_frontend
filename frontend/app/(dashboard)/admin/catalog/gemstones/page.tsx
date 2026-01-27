"use client"

import React, { useState, useEffect } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Download,
    Star,
    X,
    Gem,
    Upload,
    FileSpreadsheet,
    ChevronRight,
    Eye,
    Settings2,
    Sparkles,
    ShieldCheck,
    Filter,
    Globe
} from 'lucide-react'

import {
    useGetGemstonesQuery,
    useCreateGemstoneMutation,
    useUpdateGemstoneMutation,
    useDeleteGemstoneMutation
} from '@/lib/redux/slices/gemstonesApiSlice'
import { useGetCategoriesQuery } from '@/lib/redux/slices/categoriesApiSlice'
import { useBulkUploadMutation } from '@/lib/redux/slices/bulkUploadApiSlice'
import { toast } from 'sonner'

export default function GemstonesCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("All Varieties")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingGem, setEditingGem] = useState<any>(null)
    const [viewingGem, setViewingGem] = useState<any>(null)
    const [modalTab, setModalTab] = useState<'specs' | 'technical' | 'seo'>('specs')
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: gemstonesData, isLoading: isGemLoading } = useGetGemstonesQuery({
        search: searchTerm || undefined,
        type: filterType === 'All Varieties' ? undefined : filterType,
        sort: '-createdAt'
    })
    const { data: categoriesData } = useGetCategoriesQuery({})

    const [createGemstone] = useCreateGemstoneMutation()
    const [updateGemstone] = useUpdateGemstoneMutation()
    const [deleteGemstone] = useDeleteGemstoneMutation()
    const [bulkUpload] = useBulkUploadMutation()

    const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('productType', 'gemstone')

            try {
                toast.loading("Authenticating bulk registry...")
                await bulkUpload(formData).unwrap()
                toast.dismiss()
                toast.success("Bulk registry protocol complete")
            } catch (err: any) {
                toast.dismiss()
                toast.error(err.data?.message || "Protocol failed: Invalid CSV structure")
            }
        }
    }

    const allCategories = categoriesData?.data?.categories || []

    // Extract Gemstone Varieties from categories (looking for items under "Gemstones" root)
    const gemstoneVarieties = allCategories
        .filter((c: any) => c.parent?.name?.toLowerCase().includes("gemstone") && c.menuGroup?.includes("DESIGN"))
        .map((c: any) => c.name.replace("Start with a ", ""))

    const [newGem, setNewGem] = useState({
        type: "Sapphire",
        color: "Royal Blue",
        intensity: "Vivid",
        shape: "Oval",
        carat: "",
        origin: "Ceylon",
        price: "",
        stock: "1",
        treatment: "Heat Treated",
        hardness: "9.0",
        clarity: "Eye Clean",
        dimensions: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        priceByMetal: {} as Record<string, string>,
        metals: [] as string[]
    })

    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const gemstones = gemstonesData?.data || []

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
        if (confirm("Are you sure you want to delete this gemstone? This will remove it from all public listings.")) {
            try {
                await deleteGemstone(id).unwrap()
                toast.success("Gemstone removed from registry")
            } catch (err) {
                toast.error("Deletion protocol failed")
            }
        }
    }

    const handleEdit = (gem: any) => {
        setEditingGem(gem)
        setNewGem({
            type: gem.type || "Sapphire",
            color: gem.color || "Royal Blue",
            intensity: gem.intensity || "Vivid",
            shape: gem.shape || "Oval",
            carat: gem.carat?.toString() || "",
            origin: gem.origin || "Ceylon",
            price: gem.price?.toString() || "",
            stock: gem.stock?.toString() || "1",
            treatment: gem.treatment || "Heat Treated",
            hardness: gem.hardness?.toString() || "9.0",
            clarity: gem.clarity || "Eye Clean",
            dimensions: gem.dimensions || "",
            slug: gem.slug || "",
            metaTitle: gem.metaTitle || "",
            metaDescription: gem.metaDescription || "",
            keywords: gem.keywords || "",
            priceByMetal: gem.priceByMetal || {},
            metals: gem.metals || []
        })
        setImagePreviews(gem.images || [])
        setIsModalOpen(true)
    }

    const handleAddGem = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            const slug = newGem.slug || `${newGem.type}-${newGem.shape}-${newGem.carat}-${Date.now()}`.toLowerCase().replace(/ /g, '-')

            Object.entries(newGem).forEach(([key, value]) => {
                if (key === 'slug') formData.append(key, slug)
                else if (key === 'priceByMetal') formData.append(key, JSON.stringify(value))
                else if (key === 'metals') {
                    if (Array.isArray(value)) {
                        value.forEach(v => formData.append('metals', v))
                    }
                }
                else formData.append(key, value as any)
            })

            selectedImages.forEach(image => formData.append('images', image))

            if (editingGem) {
                await updateGemstone({ id: editingGem._id, data: formData }).unwrap()
                toast.success("Gemstone registry updated")
            } else {
                await createGemstone(formData).unwrap()
                toast.success("Gemstone listed successfully")
            }

            setIsModalOpen(false)
            setEditingGem(null)
            setNewGem({
                type: "Sapphire", color: "Royal Blue", intensity: "Vivid", shape: "Oval",
                carat: "", origin: "Ceylon", price: "", stock: "1",
                treatment: "Heat Treated", hardness: "9.0", clarity: "Eye Clean",
                dimensions: "", slug: "", metaTitle: "", metaDescription: "", keywords: "",
                priceByMetal: {}, metals: []
            })
            setSelectedImages([])
            setImagePreviews([])
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Protocol error: Failed to process gemstone")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <Gem className="w-3.5 h-3.5" /> Spectral Vault
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight">Gemstone Inventory</h1>
                    <p className="text-slate-500 mt-2 max-w-xl font-medium">Manage rare colored gems and exotic varieties. Real-time synchronization with the master registry.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleCsvUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:border-[#163E3E] hover:text-[#163E3E] transition-all shadow-sm">
                        <FileSpreadsheet className="w-4 h-4" /> Bulk Import
                    </button>
                    <button
                        onClick={() => {
                            setEditingGem(null)
                            setNewGem({
                                type: "Sapphire", color: "Royal Blue", intensity: "Vivid", shape: "Oval",
                                carat: "", origin: "Ceylon", price: "", stock: "1",
                                treatment: "Heat Treated", hardness: "9.0", clarity: "Eye Clean",
                                dimensions: "", slug: "", metaTitle: "", metaDescription: "", keywords: "",
                                priceByMetal: {}, metals: []
                            })
                            setImagePreviews([])
                            setIsModalOpen(true)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> List Gemstone
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Assets', value: gemstones.length, icon: Gem, color: 'blue' },
                    { label: 'Rare Varieties', value: [...new Set(gemstones.map((g: any) => g.type))].length, icon: Star, color: 'emerald' },
                    { label: 'Stock Value', value: '$' + (gemstones.reduce((acc: number, g: any) => acc + (g.price * g.stock), 0) || 0).toLocaleString(), icon: Sparkles, color: 'emerald' },
                    { label: 'Origin Countries', value: [...new Set(gemstones.map((g: any) => g.origin))].length, icon: Globe, color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <stat.icon className="w-4 h-4 text-[#163E3E] opacity-20" />
                        </div>
                        <p className="text-2xl font-serif text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-[24px] border border-slate-200/60 shadow-sm flex flex-col lg:flex-row items-center gap-5">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by variety, color, or origin..."
                        className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#163E3E]/10 transition-all outline-none placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#163E3E]" />
                        <select
                            className="w-full lg:w-auto pl-10 pr-10 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/10 appearance-none cursor-pointer"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option>All Varieties</option>
                            {gemstoneVarieties.length > 0 ? (gemstoneVarieties as string[]).map((v: string) => <option key={v}>{v}</option>) : (
                                <>
                                    <option>Sapphire</option><option>Emerald</option><option>Ruby</option>
                                    <option>Aquamarine</option><option>Morganite</option><option>Moissanite</option>
                                </>
                            )}
                        </select>
                    </div>
                    <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-[#163E3E] transition-all shadow-sm">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                <div className="overflow-x-auto no-scrollbar">
                    {isGemLoading ? (
                        <div className="p-32 text-center">
                            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#163E3E] rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Scanning Registry...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-center">Identity</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Spectral Profile</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Valuation</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Provenance</th>
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {gemstones.map((gem: any) => (
                                    <tr key={gem._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white border border-slate-100 rounded-[24px] overflow-hidden flex items-center justify-center p-1 shadow-inner group-hover:scale-105 transition-transform duration-700">
                                                    <img src={gem.images?.[0] || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover rounded-[20px]" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-800 tracking-tight leading-none">{gem.type} • {gem.shape}</p>
                                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{gem.intensity} {gem.color}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-900">${gem.price?.toLocaleString()}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight mt-1">{gem.carat} Carats</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                                                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{gem.origin}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-medium pl-3.5">Verified Sourcing</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2.5">
                                                <button onClick={() => setViewingGem(gem)} className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"><Eye className="w-4.5 h-4.5" /></button>
                                                <button
                                                    onClick={() => handleEdit(gem)}
                                                    className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                                                >
                                                    <Edit2 className="w-4.5 h-4.5" />
                                                </button>
                                                <button onClick={() => handleDelete(gem._id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm border border-transparent hover:border-red-100"><Trash2 className="w-4.5 h-4.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {gemstones.length === 0 && !isGemLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center text-slate-400">
                                            <p className="font-serif text-xl text-slate-900">Vault spectrum is empty</p>
                                            <p className="text-[11px] font-bold uppercase tracking-widest mt-2">No gemstones discovered in inventory</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Premium Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-4xl rounded-[56px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
                        <div className="px-12 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
                            <div>
                                <h2 className="text-3xl font-serif text-slate-900 leading-none">Gemstone Registry Protocol</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-3 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Asset Authentication
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-[24px] transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100">
                                <X className="w-7 h-7 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Navigation */}
                        <div className="flex items-center px-12 border-b border-slate-50 bg-white">
                            {[
                                { id: 'specs', label: '1. Identification' },
                                { id: 'technical', label: '2. Scientific Data' },
                                { id: 'seo', label: '3. Market Presence' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative
                                        ${modalTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    {tab.label}
                                    {modalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#163E3E] rounded-full"></div>}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddGem} className="p-12">
                            <div className="max-h-[50vh] overflow-y-auto pr-6 no-scrollbar">
                                {modalTab === 'specs' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                            {/* Media */}
                                            <div className="md:col-span-12 lg:col-span-5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block pl-1">Visual Asset Capture</label>
                                                <div
                                                    onClick={() => document.getElementById('g-images')?.click()}
                                                    className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center gap-5 group hover:border-[#163E3E]/30 hover:bg-[#163E3E]/5 transition-all cursor-pointer relative overflow-hidden shadow-inner"
                                                >
                                                    <input type="file" id="g-images" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                                    <Upload className="w-12 h-12 text-slate-200 group-hover:text-[#163E3E] group-hover:scale-110 transition-all duration-700" />
                                                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Upload Master Media</p>
                                                </div>
                                                <div className="grid grid-cols-4 gap-3 mt-6">
                                                    {imagePreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-[20px] overflow-hidden border border-slate-100 shadow-sm group">
                                                            <img src={src} className="w-full h-full object-cover" alt="" />
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><X className="w-4 h-4 text-white" /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Fields */}
                                            <div className="md:col-span-12 lg:col-span-7 space-y-8">
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Gemstone Variety</label>
                                                        <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newGem.type} onChange={(e) => setNewGem({ ...newGem, type: e.target.value })}>
                                                            {gemstoneVarieties.length > 0 ? (gemstoneVarieties as string[]).map((v: string) => <option key={v}>{v}</option>) : (
                                                                <>
                                                                    <option>Sapphire</option><option>Emerald</option><option>Ruby</option>
                                                                    <option>Aquamarine</option><option>Morganite</option><option>Moissanite</option>
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Carat Weight</label>
                                                        <input required type="number" step="0.01" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-[#163E3E] outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 placeholder:text-slate-300" placeholder="0.00 ct" value={newGem.carat} onChange={(e) => setNewGem({ ...newGem, carat: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Price ($)</label>
                                                        <input required type="number" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-[#163E3E] outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="0.00" value={newGem.price} onChange={(e) => setNewGem({ ...newGem, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Stock Quantity</label>
                                                        <input required type="number" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="0" value={newGem.stock} onChange={(e) => setNewGem({ ...newGem, stock: e.target.value })} />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Available Metals (Pre-set)</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["14K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum", "Sterling Silver"].map((metal) => (
                                                            <button
                                                                key={metal}
                                                                type="button"
                                                                onClick={() => {
                                                                    const exists = newGem.metals.includes(metal)
                                                                    const newMetals = exists ? newGem.metals.filter(m => m !== metal) : [...newGem.metals, metal]
                                                                    const newPriceMap = { ...newGem.priceByMetal }
                                                                    if (!exists && !newPriceMap[metal]) {
                                                                        newPriceMap[metal] = newGem.price;
                                                                    } else if (exists) {
                                                                        delete newPriceMap[metal];
                                                                    }
                                                                    setNewGem({
                                                                        ...newGem,
                                                                        metals: newMetals,
                                                                        priceByMetal: newPriceMap
                                                                    })
                                                                }}
                                                                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all shadow-sm
                                                                     ${newGem.metals.includes(metal) ? 'bg-[#163E3E] border-[#163E3E] text-white' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600'}
                                                                 `}
                                                            >
                                                                {metal}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Metal Price Inputs */}
                                                    {newGem.metals.length > 0 && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                                            {newGem.metals.map((metal) => (
                                                                <div key={metal} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                                                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{metal}</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[10px] font-bold text-slate-300">$</span>
                                                                        <input
                                                                            type="number"
                                                                            className="w-20 px-2 py-1 bg-white border-none rounded-lg text-xs font-bold text-[#163E3E] outline-none shadow-sm"
                                                                            placeholder={newGem.price}
                                                                            value={newGem.priceByMetal[metal] || ""}
                                                                            onChange={(e) => {
                                                                                setNewGem({
                                                                                    ...newGem,
                                                                                    priceByMetal: { ...newGem.priceByMetal, [metal]: e.target.value }
                                                                                })
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'technical' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-2 gap-10">
                                            {[
                                                { label: 'Intensity Profile', key: 'intensity', options: ['Vivid', 'Deep', 'Light', 'Faint', 'Fancy Intense'] },
                                                { label: 'Shape/Cut Protocol', key: 'shape', options: ['Oval', 'Emerald', 'Cushion', 'Round', 'Pear', 'Radiant', 'Asscher'] },
                                                { label: 'Origin/Provenance', key: 'origin', options: ['Ceylon', 'Columbia', 'Mozambique', 'Madagascar', 'Synthetic'] },
                                                { label: 'Clarity Rating', key: 'clarity', options: ['Eye Clean', 'VVS', 'VS', 'Included'] }
                                            ].map((field) => (
                                                <div key={field.key} className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{field.label}</label>
                                                    <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-slate-900 outline-none shadow-sm cursor-pointer" value={(newGem as any)[field.key]} onChange={(e) => setNewGem({ ...newGem, [field.key]: e.target.value })}>
                                                        {field.options.map(o => <option key={o}>{o}</option>)}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Hardness (Mohs)</label>
                                                <input type="text" className="w-full px-6 py-5 bg-slate-50 border-none rounded-[24px] text-xs font-bold text-slate-900 outline-none shadow-sm" placeholder="9.0" value={newGem.hardness} onChange={(e) => setNewGem({ ...newGem, hardness: e.target.value })} />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Treatment Status</label>
                                                <input type="text" className="w-full px-6 py-5 bg-slate-50 border-none rounded-[24px] text-xs font-bold text-slate-900 outline-none shadow-sm" placeholder="e.g. Heat" value={newGem.treatment} onChange={(e) => setNewGem({ ...newGem, treatment: e.target.value })} />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Dimensions (mm)</label>
                                                <input type="text" className="w-full px-6 py-5 bg-slate-50 border-none rounded-[24px] text-xs font-bold text-slate-900 outline-none shadow-sm" placeholder="8 x 6 mm" value={newGem.dimensions} onChange={(e) => setNewGem({ ...newGem, dimensions: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Digital Asset URI (Slug)</label>
                                            <div className="flex items-center bg-slate-50 rounded-[28px] overflow-hidden border border-slate-100 shadow-inner">
                                                <span className="pl-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">ritzin.com/gemstones/</span>
                                                <input type="text" className="flex-1 px-3 py-6 bg-transparent border-none text-sm text-slate-700 font-bold outline-none" placeholder="auto-generated-slug" value={newGem.slug} onChange={(e) => setNewGem({ ...newGem, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">SERP Target Title</label>
                                            <input type="text" className="w-full px-8 py-6 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-slate-900 outline-none shadow-sm" placeholder="Targeted search engine title..." value={newGem.metaTitle} onChange={(e) => setNewGem({ ...newGem, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SERP Meta Description</label>
                                                <span className={`text-[10px] font-bold tracking-widest ${newGem.metaDescription.length > 160 ? 'text-rose-500' : 'text-[#163E3E]'}`}>{newGem.metaDescription.length} / 160</span>
                                            </div>
                                            <textarea rows={5} className="w-full px-8 py-6 bg-slate-50 border-none rounded-[28px] text-sm text-slate-700 leading-relaxed outline-none shadow-sm resize-none" placeholder="Engaging snippet for search results..." value={newGem.metaDescription} onChange={(e) => setNewGem({ ...newGem, metaDescription: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6 pt-12 mt-12 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-5 bg-white border border-slate-200 text-slate-400 rounded-[32px] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-slate-600 hover:bg-slate-50 transition-all active:scale-95">Abandon</button>
                                <button type="submit" className="flex-1 px-12 py-5 bg-[#163E3E] text-white rounded-[32px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-[#163E3E]/30 active:scale-95 transform">Confirm Authentication & Registry</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewingGem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setViewingGem(null)}>
                    <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
                            <div>
                                <h2 className="text-2xl font-serif text-slate-900">{viewingGem.type}</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">{viewingGem.shape} • {viewingGem.carat} Carats</p>
                            </div>
                            <button onClick={() => setViewingGem(null)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-10 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative">
                                        <img src={viewingGem.images?.[0] || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" alt="Gem" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#163E3E] shadow-sm">
                                            {viewingGem.origin}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Gem Details</p>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Color', value: viewingGem.color },
                                                { label: 'Intensity', value: viewingGem.intensity },
                                                { label: 'Clarity', value: viewingGem.clarity },
                                                { label: 'Hardness', value: viewingGem.hardness },
                                                { label: 'Treatment', value: viewingGem.treatment },
                                                { label: 'Dimensions', value: viewingGem.dimensions }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                                    <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                                                    <span className="text-sm font-bold text-slate-900">{item.value || 'N/A'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-[#163E3E] p-6 rounded-3xl text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Valuation</p>
                                        <p className="text-3xl font-serif">${viewingGem.price?.toLocaleString()}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className={`w-2 h-2 rounded-full ${viewingGem.stock > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                                            <span className="text-xs font-bold uppercase tracking-wider">{viewingGem.stock} Units Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

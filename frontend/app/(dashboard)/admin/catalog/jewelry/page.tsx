"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Box,
    X,
    Layers,
    Info,
    Globe,
    Filter,
    Upload,
    FileSpreadsheet,
    Download,
    ChevronRight,
    Eye,
    Settings2,
    Sparkles,
    ShoppingBag,
    Star
} from 'lucide-react'

import {
    useGetJewelryQuery,
    useCreateJewelryMutation,
    useUpdateJewelryMutation,
    useDeleteJewelryMutation
} from '@/lib/redux/slices/jewelryApiSlice'
import { useGetCategoriesQuery } from '@/lib/redux/slices/categoriesApiSlice'
import { toast } from 'sonner'

export default function JewelryCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("All Categories")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [modalTab, setModalTab] = useState<'details' | 'specs' | 'seo'>('details')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: jewelryData, isLoading: isJewelryLoading } = useGetJewelryQuery({
        name: searchTerm || undefined,
        category: filterCategory === 'All Categories' ? undefined : filterCategory,
        sort: '-createdAt'
    })
    const { data: categoriesData } = useGetCategoriesQuery({})

    const [createJewelry] = useCreateJewelryMutation()
    const [updateJewelry] = useUpdateJewelryMutation()
    const [deleteJewelry] = useDeleteJewelryMutation()

    const allCategories = categoriesData?.data?.categories || []

    // Filter for Jewelry root categories
    const jewelryCategories = allCategories.filter((c: any) =>
        c.level === 0 && (c.name.toLowerCase().includes("jewelry") || c.name.toLowerCase().includes("gifts"))
    )

    const [newItem, setNewItem] = useState({
        name: "",
        category: "", // ID
        subcategory: "", // ID (Style/Type)
        collectionName: "Signature",
        metalType: "14K White Gold",
        price: "",
        stock: "",
        description: "",
        gemstoneType: "",
        dimensions: "",
        totalWeight: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    })

    useEffect(() => {
        if (jewelryCategories.length > 0 && !newItem.category) {
            setNewItem(prev => ({ ...prev, category: jewelryCategories[0]._id }))
        }
    }, [jewelryCategories])

    const availableSubcategories = allCategories.filter((c: any) => c.parent?._id === newItem.category)

    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const jewelry = jewelryData?.data || []

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
        if (confirm("Are you sure you want to remove this piece from the jewelry collection?")) {
            try {
                await deleteJewelry(id).unwrap()
                toast.success("Catalog updated: Item removed")
            } catch (err) {
                toast.error("Failed to remove item")
            }
        }
    }

    const handleEdit = (item: any) => {
        setEditingItem(item)
        setNewItem({
            name: item.title || item.name || "",
            category: item.category?._id || item.category || "",
            subcategory: item.subcategory?._id || item.subcategory || "",
            collectionName: item.collectionName || "Signature",
            metalType: item.metalType || "14K White Gold",
            price: item.price?.toString() || "",
            stock: item.stock?.toString() || "",
            description: item.description || "",
            gemstoneType: item.gemstoneType || "",
            dimensions: item.dimensions || "",
            totalWeight: item.totalWeight || "",
            slug: item.slug || "",
            metaTitle: item.metaTitle || "",
            metaDescription: item.metaDescription || "",
            keywords: item.keywords || ""
        })
        setImagePreviews(item.images || [])
        setIsModalOpen(true)
    }

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newItem.category) {
            toast.error("Please select a valid category")
            return
        }
        try {
            const formData = new FormData()

            const slug = newItem.slug || newItem.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('title', newItem.name) // Jewelry model uses 'title'
            formData.append('category', newItem.category)
            if (newItem.subcategory) formData.append('subcategory', newItem.subcategory)
            formData.append('collectionName', newItem.collectionName)
            formData.append('metalType', newItem.metalType)
            formData.append('price', newItem.price)
            formData.append('stock', newItem.stock)
            formData.append('description', newItem.description)
            formData.append('gemstoneType', newItem.gemstoneType)
            formData.append('dimensions', newItem.dimensions)
            formData.append('totalWeight', newItem.totalWeight)
            formData.append('slug', slug)
            formData.append('metaTitle', newItem.metaTitle)
            formData.append('metaDescription', newItem.metaDescription)
            formData.append('keywords', newItem.keywords)

            selectedImages.forEach(image => formData.append('images', image))

            if (editingItem) {
                await updateJewelry({ id: editingItem._id, data: formData }).unwrap()
                toast.success("Jewelry piece updated successfully")
            } else {
                await createJewelry(formData).unwrap()
                toast.success("Jewelry piece added successfully")
            }

            setIsModalOpen(false)
            setEditingItem(null)
            setNewItem({
                name: "", category: jewelryCategories[0]?._id || "", subcategory: "",
                collectionName: "Signature", metalType: "14K White Gold",
                price: "", stock: "", description: "", gemstoneType: "", dimensions: "", totalWeight: "",
                slug: "", metaTitle: "", metaDescription: "", keywords: ""
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('details')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to process product")

        }
    }

    const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            toast.info(`Bulk upload simulation: Reading ${file.name}...`)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <ShoppingBag className="w-3.5 h-3.5" /> High Jewelry
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight">Collection Atelier</h1>
                    <p className="text-slate-500 mt-1 max-w-xl">Curate your fine jewelry pieces. Dynamic category synchronization and institutional inventory control.</p>
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
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:border-[#163E3E] hover:text-[#163E3E] transition-all shadow-sm"
                    >
                        <FileSpreadsheet className="w-4 h-4" /> Bulk Import
                    </button>
                    <button
                        onClick={() => {
                            setEditingItem(null)
                            setNewItem({
                                name: "", category: jewelryCategories[0]?._id || "", subcategory: "",
                                collectionName: "Signature", metalType: "14K White Gold",
                                price: "", stock: "", description: "", gemstoneType: "", dimensions: "", totalWeight: "",
                                slug: "", metaTitle: "", metaDescription: "", keywords: ""
                            })
                            setImagePreviews([])
                            setIsModalOpen(true)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> New Piece
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Curated Assets', value: jewelry.length, unit: 'Items', icon: ShoppingBag },
                    { label: 'Sub-Categories', value: availableSubcategories.length, unit: 'Active', icon: Star },
                    { label: 'Atelier Capacity', value: '1,500', unit: 'Units', icon: Layers },
                    { label: 'Vault Valuation', value: '$' + (jewelry.reduce((acc: number, j: any) => acc + (j.price * j.stock), 0) || 0).toLocaleString(), unit: 'Est. Total', icon: Sparkles },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <stat.icon className="w-3.5 h-3.5 text-[#163E3E] opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                            <p className="text-2xl font-serif text-slate-900">{stat.value}</p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search current atelier by name, collection or SKU..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/10 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#163E3E]" />
                        <select
                            className="w-full lg:w-auto pl-9 pr-10 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/10 appearance-none cursor-pointer"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option>All Categories</option>
                            {allCategories.filter((c: any) => c.level === 0).map((c: any) => <option key={c._id} value={c.slug}>{c.name}</option>)}
                        </select>
                    </div>
                    <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#163E3E] transition-all">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
                <div className="overflow-x-auto no-scrollbar">
                    {isJewelryLoading ? (
                        <div className="p-32 text-center">
                            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#163E3E] rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hydrating Atelier Gallery...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Artisanal Piece</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Registry Info</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Pricing</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Availability</th>
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {jewelry.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[20px] overflow-hidden flex items-center justify-center text-[#163E3E] transition-all duration-700 shadow-inner group-hover:scale-105">
                                                    {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover" alt="" /> : <Box className="w-7 h-7" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#163E3E] transition-colors">{item.title}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">#{item._id.substring(item._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest">{item.category?.name || 'High Jewelry'}</span>
                                                <span className="text-[11px] text-slate-500 font-medium">{item.metalType} • {item.subcategory?.name || 'Classique'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-900">${item.price?.toLocaleString()}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight mt-1">Institutional Rate</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${item.stock > 10 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : item.stock > 0 ? 'bg-orange-400' : 'bg-rose-500'}`}></div>
                                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.stock} in Vault</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100" title="Preview">
                                                    <Eye className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm border border-transparent hover:border-red-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jewelry.length === 0 && !isJewelryLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center text-slate-400">
                                            <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-5" />
                                            <p className="font-serif text-xl text-slate-900">Atelier is currently empty</p>
                                            <p className="text-[11px] font-bold uppercase tracking-widest mt-2">No items discovered in inventory</p>
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
                    <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="px-12 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <h2 className="text-3xl font-serif text-slate-900">Catalog Entry Protocol</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-2 flex items-center gap-2">
                                    <Settings2 className="w-4 h-4" /> High Jewelry Management
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-3xl transition-all shadow-sm active:scale-90 border border-transparent hover:border-slate-100">
                                <X className="w-7 h-7 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Navigation */}
                        <div className="flex items-center px-12 border-b border-slate-50 bg-white shadow-sm">
                            {[
                                { id: 'details', label: '1. Identity & Narrative' },
                                { id: 'specs', label: '2. Composition Data' },
                                { id: 'seo', label: '3. Market SEO' }
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
                                    {modalTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#163E3E] rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddItem} className="p-12">
                            <div className="max-h-[55vh] overflow-y-auto pr-6 no-scrollbar">
                                {modalTab === 'details' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                            {/* Media */}
                                            <div className="md:col-span-4">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Visual Evidence</label>
                                                <div
                                                    onClick={() => document.getElementById('jewel-imgs')?.click()}
                                                    className="aspect-[4/5] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center gap-6 group hover:border-[#163E3E]/30 hover:bg-[#163E3E]/5 transition-all cursor-pointer relative overflow-hidden shadow-inner"
                                                >
                                                    <input
                                                        type="file"
                                                        id="jewel-imgs"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <Upload className="w-12 h-12 text-slate-200 group-hover:text-[#163E3E] group-hover:scale-110 transition-all duration-700" />
                                                    <div className="text-center px-6">
                                                        <p className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Add Piece Photography</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 gap-3 mt-6">
                                                    {imagePreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100 shadow-sm">
                                                            <img src={src} className="w-full h-full object-cover" alt="preview" />
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <X className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="md:col-span-8 space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Master Product Title</label>
                                                    <input required type="text" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Vintage Sapphire Drop Earrings" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Principal Valuation ($)</label>
                                                        <input required type="number" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-[#163E3E] outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="0.00" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Inventory Stock</label>
                                                        <input required type="number" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="0" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Product Description</label>
                                                    <textarea rows={5} className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-medium text-slate-700 leading-relaxed outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="The story of ethical craftsmanship and design intent..." value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'specs' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-2 gap-12">
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Master Category (Synced)</label>
                                                    <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value, subcategory: "" })}>
                                                        {jewelryCategories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Specific Sub-Category</label>
                                                    <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newItem.subcategory} onChange={(e) => setNewItem({ ...newItem, subcategory: e.target.value })}>
                                                        <option value="">Select a Style</option>
                                                        {availableSubcategories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Metal</label>
                                                    <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newItem.metalType} onChange={(e) => setNewItem({ ...newItem, metalType: e.target.value })}>
                                                        <option>14K White Gold</option><option>18K Yellow Gold</option><option>14K Rose Gold</option><option>Platinum</option><option>Sterling Silver</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Design Authority (Collection)</label>
                                                    <select className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newItem.collectionName} onChange={(e) => setNewItem({ ...newItem, collectionName: e.target.value })}>
                                                        {['Signature', 'Classic', 'Botanical', 'Modern Essentials'].map(o => <option key={o}>{o}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Gemstone Component Profile</label>
                                                    <input type="text" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. 1.2ct Sapphires" value={newItem.gemstoneType} onChange={(e) => setNewItem({ ...newItem, gemstoneType: e.target.value })} />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Finished Weight (Grams)</label>
                                                    <input type="text" className="w-full px-7 py-5 bg-slate-50 border-none rounded-[24px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. 5.5g" value={newItem.totalWeight} onChange={(e) => setNewItem({ ...newItem, totalWeight: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-10 bg-[#163E3E] rounded-[40px] text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className="p-4 bg-white/10 rounded-3xl"><Layers className="w-8 h-8 text-emerald-400 shadow-lg" /></div>
                                                <div>
                                                    <p className="text-sm font-bold uppercase tracking-widest">Inventory Intelligence</p>
                                                    <p className="text-xs text-white/60 mt-1 max-w-sm">Synchronizing global stock levels for retail and institutional distribution. Manual overrides are archived.</p>
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 bg-white/10 rounded-full text-emerald-400 border border-white/5 relative z-10">Stock Shield Active</div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Digital Resource Identifier</label>
                                            <div className="flex items-center bg-slate-50 rounded-[28px] overflow-hidden border border-slate-100 shadow-inner">
                                                <span className="pl-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">ritzin.com/jewelry/</span>
                                                <input type="text" className="flex-1 px-3 py-6 bg-transparent border-none text-sm text-slate-700 font-bold outline-none" placeholder="piece-canonical-slug" value={newItem.slug} onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Strategic Indexing Title</label>
                                            <input type="text" className="w-full px-8 py-6 bg-slate-50 border-none rounded-[28px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Targeted search engine title..." value={newItem.metaTitle} onChange={(e) => setNewItem({ ...newItem, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SERP Metadata Narrative</label>
                                                <span className={`text-[10px] font-bold tracking-widest ${newItem.metaDescription.length > 160 ? 'text-rose-500' : 'text-emerald-500'}`}>{newItem.metaDescription.length} / 160</span>
                                            </div>
                                            <textarea rows={5} className="w-full px-8 py-6 bg-slate-50 border-none rounded-[28px] text-sm text-slate-700 leading-relaxed outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Engage users from search results with a compelling excerpt..." value={newItem.metaDescription} onChange={(e) => setNewItem({ ...newItem, metaDescription: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6 pt-12 mt-12 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-5 bg-white border border-slate-200 text-slate-400 rounded-[32px] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-slate-600 hover:bg-slate-50 transition-all active:scale-95">Discard</button>
                                <button type="submit" className="flex-1 px-12 py-5 bg-[#163E3E] text-white rounded-[32px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-[#163E3E]/30 active:scale-95 transform">Confirm & List to Atelier</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

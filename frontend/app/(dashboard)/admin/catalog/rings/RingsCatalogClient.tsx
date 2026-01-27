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
    FileSpreadsheet,
    Upload,
    ChevronRight,
    MapPin,
    Package,
    Settings2,
    Eye,
    Filter,
    Layers,
    Sparkles
} from 'lucide-react'
import {
    useGetRingsQuery,
    useCreateRingMutation,
    useUpdateRingMutation,
    useDeleteRingMutation
} from '@/lib/redux/slices/ringsApiSlice'
import { useBulkUploadMutation } from '@/lib/redux/slices/bulkUploadApiSlice'
import { useGetCategoriesQuery } from '@/lib/redux/slices/categoriesApiSlice'
import { toast } from 'sonner'
export default function RingsCatalogClient() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStyle, setFilterStyle] = useState("All Styles")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingRing, setEditingRing] = useState<any>(null)
    const [viewingRing, setViewingRing] = useState<any>(null)
    const [modalTab, setModalTab] = useState<'general' | 'specs' | 'seo'>('general')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    // API Hooks
    const { data: ringsData, isLoading: isRingsLoading } = useGetRingsQuery({
        search: searchTerm || undefined,
        style: filterStyle === 'All Styles' ? undefined : filterStyle,
        page: currentPage,
        limit: itemsPerPage,
        sort: '-createdAt'
    })
    const { data: categoriesData, isLoading: isCatsLoading } = useGetCategoriesQuery({})
    const [createRing] = useCreateRingMutation()
    const [updateRing] = useUpdateRingMutation()
    const [deleteRing] = useDeleteRingMutation()
    const [bulkUpload] = useBulkUploadMutation()

    const allCategories = categoriesData?.data?.categories || []

    // Debug: Log all categories to see what we're getting
    console.log('All Categories:', allCategories)

    // Filter root categories (level 0) that are relevant to rings
    const ringCategories = allCategories.filter((c: any) => {
        const isRingCategory = c.level === 0 && (
            c.slug === 'engagement-rings' ||
            c.slug === 'wedding-rings' ||
            c.name?.toLowerCase().includes('ring')
        )
        console.log(`Category: ${c.name}, slug: ${c.slug}, level: ${c.level}, isRingCategory: ${isRingCategory}`)
        return isRingCategory
    })

    console.log('Filtered Ring Categories:', ringCategories)

    const [newRing, setNewRing] = useState({
        name: "",
        slug: "",
        price: "",
        stock: "",
        category: "", // ID
        subcategory: "", // ID (Style)
        collection: "Signature",
        gender: "Women",
        metals: ["18K White Gold"] as string[],
        priceByMetal: {} as Record<string, string>,
        prongStyle: "4-Prong",
        bandWidth: "1.5mm",
        description: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        isSustainable: true,
        variants: [] as { size: string, stock: string, price: string, sku: string }[]
    })

    const addVariant = () => {
        setNewRing(prev => ({
            ...prev,
            variants: [...prev.variants, { size: "", stock: "0", price: "", sku: "" }]
        }))
    }

    const removeVariant = (index: number) => {
        setNewRing(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }))
    }

    const updateVariant = (index: number, field: string, value: string) => {
        setNewRing(prev => {
            const updated = [...prev.variants]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, variants: updated }
        })
    }

    // Set default category when categories load
    useEffect(() => {
        if (ringCategories.length > 0 && !newRing.category) {
            setNewRing(prev => ({ ...prev, category: ringCategories[0]._id }))
        }
    }, [ringCategories])

    const availableSubcategories = allCategories.filter((c: any) => c.parent?._id === newRing.category)

    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const rings = ringsData?.data || []
    const totalRings = ringsData?.total || 0
    const totalPages = ringsData?.pagination?.pages || 1

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
                toast.success("Ring setting deleted successfully")
            } catch (err) {
                toast.error("Failed to delete ring")
            }
        }
    }
    const handleEdit = (ring: any) => {
        setEditingRing(ring)
        setNewRing({
            name: ring.name,
            slug: ring.slug,
            price: ring.price?.toString() || "",
            stock: ring.stock.toString(),
            category: ring.category?._id || ring.category || "",
            subcategory: ring.subcategory?._id || ring.subcategory || "",
            collection: ring.collection || "Signature",
            gender: ring.gender || "Women",
            metals: ring.attributes?.metals || ring.metals || ["18K White Gold"],
            prongStyle: ring.attributes?.prongStyle || ring.prongStyle || "4-Prong",
            bandWidth: ring.attributes?.bandWidth || ring.bandWidth || "1.5mm",
            description: ring.description || "",
            metaTitle: ring.seo?.metaTitle || ring.metaTitle || "",
            metaDescription: ring.seo?.metaDescription || ring.metaDescription || "",
            keywords: ring.seo?.metaKeywords || ring.keywords || "",
            isSustainable: ring.isSustainable ?? true,
            variants: ring.variants || [],
            priceByMetal: ring.priceByMetal || {}
        })
        setImagePreviews(ring.images || [])
        setIsModalOpen(true)
    }
    const handleAddRing = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newRing.category) {
            toast.error("Please select a primary category")
            return
        }
        try {
            const formData = new FormData()
            const slug = newRing.slug || newRing.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            formData.append('name', newRing.name)
            formData.append('slug', slug)
            formData.append('price', newRing.price)
            formData.append('stock', newRing.stock)
            formData.append('category', newRing.category)
            if (newRing.subcategory) formData.append('subcategory', newRing.subcategory)
            formData.append('collection', newRing.collection)
            formData.append('gender', newRing.gender)
            formData.append('prongStyle', newRing.prongStyle)
            formData.append('bandWidth', newRing.bandWidth)
            formData.append('description', newRing.description)
            formData.append('metaTitle', newRing.metaTitle)
            formData.append('metaDescription', newRing.metaDescription)
            formData.append('keywords', newRing.keywords)
            formData.append('isSustainable', String(newRing.isSustainable))
            // Send variants and priceByMetal as JSON strings
            formData.append('variants', JSON.stringify(newRing.variants))
            formData.append('priceByMetal', JSON.stringify(newRing.priceByMetal))
            newRing.metals.forEach(metal => formData.append('metals', metal))
            // Fix: Send existing images (non-blob URLs) as JSON string
            const existingImageUrls = imagePreviews.filter(url => !url.startsWith('blob:'))
            formData.append('existingImages', JSON.stringify(existingImageUrls))

            selectedImages.forEach(image => formData.append('images', image))

            if (editingRing) {
                await updateRing({ id: editingRing._id, data: formData }).unwrap()
                toast.success("Ring setting updated successfully")
            } else {
                await createRing(formData).unwrap()
                toast.success("New ring setting created")
            }
            setIsModalOpen(false)
            setEditingRing(null)
            setNewRing({
                name: "", slug: "", price: "", stock: "",
                category: ringCategories[0]?._id || "", subcategory: "",
                collection: "Signature", gender: "Women",
                metals: ["18K White Gold"], prongStyle: "4-Prong",
                bandWidth: "1.5mm", description: "", metaTitle: "", metaDescription: "",
                keywords: "", isSustainable: true, variants: [], priceByMetal: {}
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('general')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to process ring")
        }
    }
    const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('productType', 'ring') // Set product Type to ring for correct model mapping

            try {
                toast.loading("Uploading rings...")
                await bulkUpload(formData).unwrap()
                toast.dismiss()
                toast.success("Bulk import successful! Refreshing vault...")
                // Optionally refetch rings or reload page if needed, but invalidatesTags should handle it
            } catch (err: any) {
                toast.dismiss()
                toast.error(err.data?.message || err.message || "Failed to import CSV")
            }
        }
    }
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <Package className="w-3.5 h-3.5" /> Jewelry Catalog
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight">Rings & Settings</h1>
                    <p className="text-slate-500 mt-1 max-w-xl">Fine-tune your bridal collection. Manage styles, pricing, and inventory with real-time backend synchronization.</p>
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
                            setEditingRing(null)
                            setNewRing({
                                name: "", slug: "", price: "", stock: "",
                                category: ringCategories[0]?._id || "", subcategory: "",
                                collection: "Signature", gender: "Women",
                                metals: ["18K White Gold"], prongStyle: "4-Prong",
                                bandWidth: "1.5mm", description: "", metaTitle: "", metaDescription: "",
                                keywords: "", isSustainable: true, variants: [], priceByMetal: {}
                            })
                            setImagePreviews([])
                            setIsModalOpen(true)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> New Setting
                    </button>
                </div>
            </div>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Live Inventory', value: rings.length, icon: Package },
                    { label: 'Inventory', value: totalRings, icon: Layers },
                    { label: 'Active Styles', value: availableSubcategories.length, icon: Sparkles },
                    { label: 'Valuation', value: '$' + (rings.reduce((acc: number, r: any) => acc + (r.price || 0), 0) || 0).toLocaleString(), icon: Star },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <stat.icon className="w-3.5 h-3.5 text-[#163E3E] opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-2xl font-serif text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, SKU or design style..."
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
                            value={filterStyle}
                            onChange={(e) => setFilterStyle(e.target.value)}
                        >
                            <option>All Styles</option>
                            {allCategories.filter((c: any) => c.parent).map((s: any) => <option key={s._id} value={s.slug}>{s.name}</option>)}
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
                    {isRingsLoading ? (
                        <div className="p-32 text-center">
                            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#163E3E] rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Synchronizing Vault...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Heirloom Piece</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Category & Style</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Valuation</th>
                                    <th className="px-8 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Stock Metrics</th>
                                    <th className="px-10 py-7 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rings.map((ring: any) => (
                                    <tr key={ring._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-20 bg-slate-50 rounded-[20px] overflow-hidden flex-shrink-0 border border-slate-100 relative shadow-inner">
                                                    <img src={ring.images?.[0] || "https://images.unsplash.com/photo-1605100804763-047af5c52b1a?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ring.name} />
                                                    {ring.isSustainable && (
                                                        <div className="absolute top-2 left-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" title="Ethically Sourced"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#163E3E] transition-colors">{ring.name}</p>
                                                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">#{ring._id.substring(ring._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[11px] text-[#163E3E] font-bold uppercase tracking-widest leading-none">{ring.category?.name || 'Uncategorized'}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1.5">{ring.subcategory?.name || 'Classic Setting'}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-900">${ring.price?.toLocaleString()}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight mt-1">Live Exchange</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between w-32">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${ring.stock < 5 ? 'text-rose-500' : 'text-slate-400'}`}>{ring.stock} Units</span>
                                                    <span className="text-[10px] font-bold text-slate-400 opacity-30">100</span>
                                                </div>
                                                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-1000 ${ring.stock < 10 ? 'bg-orange-400' : 'bg-[#163E3E]'}`} style={{ width: `${Math.min(ring.stock, 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setViewingRing(ring)} className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100" title="Inspect">
                                                    <Eye className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(ring)}
                                                    className="p-3 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                                                    title="Modify"
                                                >
                                                    <Edit2 className="w-4.5 h-4.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ring._id)}
                                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-2xl transition-all shadow-sm border border-transparent hover:border-red-100"
                                                    title="Decommission"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rings.length === 0 && !isRingsLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center text-slate-400">
                                            <Package className="w-16 h-16 mx-auto mb-6 opacity-5" />
                                            <p className="font-serif text-xl text-slate-900">Vault is currently empty</p>
                                            <p className="text-[11px] font-bold uppercase tracking-widest mt-2">No settings discovered in inventory</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-10 py-6 border-t border-slate-100">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Page {currentPage} of {totalPages} · {totalRings} Total
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-[#163E3E] hover:text-[#163E3E] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-xl text-[11px] font-bold transition-all ${currentPage === page
                                            ? 'bg-[#163E3E] text-white shadow-lg'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-[#163E3E]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-[#163E3E] hover:text-[#163E3E] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 shrink-0">
                            <div>
                                <h2 className="text-2xl font-serif text-slate-900">Setting Architecture Protocol</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-2 flex items-center gap-2">
                                    <Settings2 className="w-4 h-4" /> Global Registry Management
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-full transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        {/* Modal Navigation */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-white shadow-sm relative z-10 shrink-0 overflow-x-auto no-scrollbar">
                            {[
                                { id: 'general', label: '1. Core Identity' },
                                { id: 'specs', label: '2. Composition' },
                                { id: 'seo', label: '3. Market Presence' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap
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

                        <form onSubmit={handleAddRing} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
                                {modalTab === 'general' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                                            {/* Media Area */}
                                            <div className="md:col-span-4 lg:col-span-5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Visual Capture</label>
                                                <div
                                                    onClick={() => document.getElementById('r-images')?.click()}
                                                    className="aspect-[4/5] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-6 group hover:border-[#163E3E]/30 hover:bg-[#163E3E]/5 transition-all cursor-pointer relative overflow-hidden shadow-inner"
                                                >
                                                    <input
                                                        type="file"
                                                        id="r-images"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <Upload className="w-10 h-10 text-slate-200 group-hover:text-[#163E3E] group-hover:scale-110 transition-all duration-700" />
                                                    <div className="text-center px-6">
                                                        <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Add Master Photos</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 gap-3 mt-6">
                                                    {imagePreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-slate-100">
                                                            <img src={src} className="w-full h-full object-cover" alt="preview" />
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <X className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Fields */}
                                            <div className="md:col-span-8 lg:col-span-7 space-y-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Setting Authority Name</label>
                                                    <input required type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-lg font-serif text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Signature Solitaire in 18K Yellow Gold" value={newRing.name} onChange={(e) => setNewRing({ ...newRing, name: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Valuation ($)</label>
                                                        <input required type="number" className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-bold text-[#163E3E] outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="0.00" value={newRing.price} onChange={(e) => setNewRing({ ...newRing, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Inventory Units</label>
                                                        <input required type="number" className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-bold text-slate-900 outline-none shadow-sm" placeholder="0" value={newRing.stock} onChange={(e) => setNewRing({ ...newRing, stock: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Artisanal Narrative</label>
                                                    <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-medium text-slate-700 leading-relaxed outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="The story of ethical craftsmanship..." value={newRing.description} onChange={(e) => setNewRing({ ...newRing, description: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'specs' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Category (Backend Sync)</label>
                                                    <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newRing.category} onChange={(e) => setNewRing({ ...newRing, category: e.target.value, subcategory: "" })}>
                                                        <option value="">Select Category...</option>
                                                        {ringCategories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Design Style (Sub-Category)</label>
                                                    <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 cursor-pointer" value={newRing.subcategory} onChange={(e) => setNewRing({ ...newRing, subcategory: e.target.value })}>
                                                        <option value="">Select a Style</option>
                                                        {availableSubcategories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"].map((metal) => (
                                                            <button
                                                                key={metal}
                                                                type="button"
                                                                onClick={() => {
                                                                    const exists = newRing.metals.includes(metal)
                                                                    const newMetals = exists ? newRing.metals.filter(m => m !== metal) : [...newRing.metals, metal]
                                                                    const newPriceMap = { ...newRing.priceByMetal }
                                                                    if (!exists && !newPriceMap[metal]) {
                                                                        newPriceMap[metal] = newRing.price; // Default to base price
                                                                    } else if (exists) {
                                                                        delete newPriceMap[metal];
                                                                    }
                                                                    setNewRing({
                                                                        ...newRing,
                                                                        metals: newMetals,
                                                                        priceByMetal: newPriceMap
                                                                    })
                                                                }}
                                                                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all shadow-sm
                                                                    ${newRing.metals.includes(metal) ? 'bg-[#163E3E] border-[#163E3E] text-white' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600'}
                                                                `}
                                                            >
                                                                {metal}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Metal Price Inputs */}
                                                    {newRing.metals.length > 0 && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
                                                            {newRing.metals.map((metal) => (
                                                                <div key={metal} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                                                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{metal}</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[10px] font-bold text-slate-300">$</span>
                                                                        <input
                                                                            type="number"
                                                                            className="w-20 px-2 py-1 bg-white border-none rounded-lg text-xs font-bold text-[#163E3E] outline-none shadow-sm"
                                                                            placeholder={newRing.price}
                                                                            value={newRing.priceByMetal[metal] || ""}
                                                                            onChange={(e) => {
                                                                                setNewRing({
                                                                                    ...newRing,
                                                                                    priceByMetal: { ...newRing.priceByMetal, [metal]: e.target.value }
                                                                                })
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Collection</label>
                                                        <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-xs font-bold text-slate-900 outline-none shadow-sm" value={newRing.collection} onChange={(e) => setNewRing({ ...newRing, collection: e.target.value })}>
                                                            {['Signature', 'Botanical', 'Classic', 'Modern', 'Vintage Bloom'].map(o => <option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Band Width</label>
                                                        <input type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-xs font-bold text-slate-900 outline-none shadow-sm" placeholder="1.5mm" value={newRing.bandWidth} onChange={(e) => setNewRing({ ...newRing, bandWidth: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-[#163E3E] rounded-[32px] text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className="p-3 bg-white/10 rounded-2xl"><Star className="w-6 h-6 text-emerald-400 fill-emerald-400" /></div>
                                                <div>
                                                    <p className="text-sm font-bold uppercase tracking-widest leading-none">Sustainability Verified</p>
                                                    <p className="text-[10px] text-white/60 mt-1 max-w-sm">This setting is flagged for ethical origin and recycled metal usage.</p>
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={newRing.isSustainable}
                                                onChange={(e) => setNewRing({ ...newRing, isSustainable: e.target.checked })}
                                                className="w-6 h-6 rounded-lg bg-white/10 border-white/20 text-emerald-500 focus:ring-emerald-500 cursor-pointer relative z-10"
                                            />
                                        </div>

                                        {/* Variants Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Size & Inventory Variants</label>
                                                <button type="button" onClick={addVariant} className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest border border-[#163E3E]/20 px-3 py-1 rounded-lg hover:bg-[#163E3E]/5 transition-all">
                                                    + Add Size
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {newRing.variants.length === 0 ? (
                                                    <div className="p-8 bg-slate-50 rounded-[20px] text-center border border-dashed border-slate-200">
                                                        <p className="text-xs text-slate-400 font-medium">No custom sizes added. Using global stock/price.</p>
                                                    </div>
                                                ) : (
                                                    newRing.variants.map((variant, idx) => (
                                                        <div key={idx} className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-[20px] items-end animate-in fade-in slide-in-from-top-2">
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Size</label>
                                                                <input type="text" className="w-full px-4 py-2 bg-white border-none rounded-xl text-xs font-bold outline-none shadow-sm" placeholder="e.g. 7" value={variant.size} onChange={(e) => updateVariant(idx, 'size', e.target.value)} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Stock</label>
                                                                <input type="number" className="w-full px-4 py-2 bg-white border-none rounded-xl text-xs font-bold outline-none shadow-sm" placeholder="0" value={variant.stock} onChange={(e) => updateVariant(idx, 'stock', e.target.value)} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Price Override</label>
                                                                <input type="number" className="w-full px-4 py-2 bg-white border-none rounded-xl text-xs font-bold outline-none shadow-sm text-emerald-600" placeholder="Optional" value={variant.price} onChange={(e) => updateVariant(idx, 'price', e.target.value)} />
                                                            </div>
                                                            <button type="button" onClick={() => removeVariant(idx)} className="h-10 text-rose-500 hover:bg-rose-50 rounded-xl flex items-center justify-center transition-all bg-white shadow-sm border border-transparent hover:border-rose-100">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Digital Identity (Slug)</label>
                                            <div className="flex items-center bg-slate-50 rounded-[20px] overflow-hidden border border-slate-100 shadow-inner">
                                                <span className="pl-6 text-[11px] text-slate-400 font-bold uppercase tracking-widest">ritzin.com/settings/</span>
                                                <input type="text" className="flex-1 px-3 py-4 bg-transparent border-none text-sm text-slate-700 font-bold outline-none" placeholder="piece-canonical-slug" value={newRing.slug} onChange={(e) => setNewRing({ ...newRing, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Search Engine Title</label>
                                            <input type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm font-bold text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Targeted search engine title..." value={newRing.metaTitle} onChange={(e) => setNewRing({ ...newRing, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between px-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SERP Meta Excerpt</label>
                                                <span className={`text-[10px] font-bold tracking-widest ${newRing.metaDescription.length > 160 ? 'text-rose-500' : 'text-emerald-500'}`}>{newRing.metaDescription.length} / 160</span>
                                            </div>
                                            <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-sm text-slate-700 leading-relaxed outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Engage users from search results..." value={newRing.metaDescription} onChange={(e) => setNewRing({ ...newRing, metaDescription: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6 p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-[20px] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-slate-700 hover:bg-slate-50 transition-all active:scale-95">Abandon</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-[20px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 active:scale-95 transform">Confirm & List to Catalog</button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }

            {/* View Ring Modal */}
            {
                viewingRing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setViewingRing(null)}>
                        <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
                            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <div>
                                    <h2 className="text-2xl font-serif text-slate-900">{viewingRing.name}</h2>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">#{viewingRing._id.substring(viewingRing._id.length - 6).toUpperCase()}</p>
                                </div>
                                <button onClick={() => setViewingRing(null)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>
                            <div className="p-10 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                                            {viewingRing.images?.[0] ? (
                                                <img src={viewingRing.images[0]} className="w-full h-full object-cover" alt="Ring" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><Package className="w-24 h-24 text-slate-200" /></div>
                                            )}
                                        </div>
                                        {viewingRing.images?.length > 1 && (
                                            <div className="grid grid-cols-4 gap-3">
                                                {viewingRing.images.slice(1, 5).map((img: string, idx: number) => (
                                                    <div key={idx} className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Category & Style</p>
                                            <div className="space-y-2">
                                                <p className="text-sm font-bold text-[#163E3E]">{viewingRing.category?.name || 'Uncategorized'}</p>
                                                <p className="text-xs text-slate-500">{viewingRing.subcategory?.name || 'Classic Setting'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Specifications</p>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Collection', value: viewingRing.collection || 'N/A' },
                                                    { label: 'Gender', value: viewingRing.gender || 'N/A' },
                                                    { label: 'Metals', value: (viewingRing.attributes?.metals || viewingRing.metals || []).join(', ') || 'N/A' },
                                                    { label: 'Prong Style', value: viewingRing.attributes?.prongStyle || viewingRing.prongStyle || 'N/A' },
                                                    { label: 'Band Width', value: viewingRing.attributes?.bandWidth || viewingRing.bandWidth || 'N/A' }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                                        <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                                                        <span className="text-sm font-bold text-slate-900">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {viewingRing.description && (
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Description</p>
                                                <p className="text-sm text-slate-600 leading-relaxed">{viewingRing.description}</p>
                                            </div>
                                        )}
                                        <div className="bg-[#163E3E] p-6 rounded-3xl text-white">
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Valuation</p>
                                            <p className="text-3xl font-serif">${viewingRing.price?.toLocaleString()}</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className={`w-2 h-2 rounded-full ${viewingRing.stock > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                                                <span className="text-xs font-bold uppercase tracking-wider">{viewingRing.stock} Units Available</span>
                                            </div>
                                            {viewingRing.isSustainable && (
                                                <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Sustainably Sourced</span>
                                                </div>
                                            )}
                                        </div>

                                        {viewingRing.variants?.length > 0 && (
                                            <div className="mt-6">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Available Variants (Size-Specific)</p>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {viewingRing.variants.map((v: any, idx: number) => (
                                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-[#163E3E]">
                                                                    {v.size}
                                                                </div>
                                                                <span className="text-xs font-bold text-slate-700">Size {v.size}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] font-bold text-[#163E3E] uppercase">{v.stock} in stock</p>
                                                                {v.price && <p className="text-[10px] text-emerald-600 font-bold mt-0.5">${v.price.toLocaleString()}</p>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

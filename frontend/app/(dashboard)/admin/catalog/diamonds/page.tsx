"use client"

import React, { useState, useEffect } from 'react'
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Download,
    Diamond,
    X,
    Activity,
    FileSpreadsheet,
    Upload,
    ChevronRight,
    Eye,
    Filter,
    ShieldCheck,
    Settings2,
    Sparkles
} from 'lucide-react'

import {
    useGetDiamondsQuery,
    useCreateDiamondMutation,
    useUpdateDiamondMutation,
    useDeleteDiamondMutation
} from '@/lib/redux/slices/diamondsApiSlice'
import { useGetCategoriesQuery } from '@/lib/redux/slices/categoriesApiSlice'
import { toast } from 'sonner'

export default function DiamondsCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterOrigin, setFilterOrigin] = useState("All Origins")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDiamond, setEditingDiamond] = useState<any>(null)
    const [modalTab, setModalTab] = useState<'4cs' | 'technical' | 'seo'>('4cs')
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: diamondsData, isLoading: isDiaLoading } = useGetDiamondsQuery({
        shape: searchTerm || undefined,
        origin: filterOrigin === 'All Origins' ? undefined : filterOrigin,
        sort: '-createdAt'
    })
    const { data: categoriesData } = useGetCategoriesQuery({})

    const [createDiamond] = useCreateDiamondMutation()
    const [updateDiamond] = useUpdateDiamondMutation()
    const [deleteDiamond] = useDeleteDiamondMutation()

    const allCategories = categoriesData?.data?.categories || []

    // Extract Diamond Shapes from categories (looking for items under "Diamonds" root)
    const diamondShapes = allCategories
        .filter((c: any) => c.parent?.name?.toLowerCase().includes("diamond") && c.menuGroup?.includes("SHAPE"))
        .map((c: any) => c.name)

    const [newDiamond, setNewDiamond] = useState({
        shape: "Round",
        carat: "",
        cut: "Ideal",
        color: "F",
        clarity: "VS1",
        origin: "Natural",
        price: "",
        stock: "1",
        depth: "",
        table: "",
        symmetry: "Excellent",
        polish: "Excellent",
        fluorescence: "None",
        lwRatio: "",
        certification: "GIA",
        certNumber: "",
        eyeClean: true,
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    })

    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const diamonds = diamondsData?.data || []

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
        if (confirm("Are you sure you want to remove this diamond from the vault?")) {
            try {
                await deleteDiamond(id).unwrap()
                toast.success("Inventory updated: Diamond removed")
            } catch (err) {
                toast.error("Failed to remove diamond")
            }
        }
    }

    const handleEdit = (dia: any) => {
        setEditingDiamond(dia)
        setNewDiamond({
            shape: dia.shape || "Round",
            carat: dia.carat?.toString() || "",
            cut: dia.cut || "Ideal",
            color: dia.color || "F",
            clarity: dia.clarity || "VS1",
            origin: dia.origin || "Natural",
            price: dia.price?.toString() || "",
            stock: dia.stock?.toString() || "1",
            depth: dia.depth?.toString() || "",
            table: dia.table?.toString() || "",
            symmetry: dia.symmetry || "Excellent",
            polish: dia.polish || "Excellent",
            fluorescence: dia.fluorescence || "None",
            lwRatio: dia.lwRatio?.toString() || "",
            certification: dia.certification || "GIA",
            certNumber: dia.certNumber || "",
            eyeClean: dia.eyeClean ?? true,
            slug: dia.slug || "",
            metaTitle: dia.metaTitle || "",
            metaDescription: dia.metaDescription || "",
            keywords: dia.keywords || ""
        })
        setImagePreviews(dia.images || [])
        setIsModalOpen(true)
    }

    const handleAddDiamond = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            const slug = newDiamond.slug || `${newDiamond.carat}-${newDiamond.shape}-${newDiamond.cut}-${newDiamond.color}-${newDiamond.clarity}-${Date.now()}`.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            Object.entries(newDiamond).forEach(([key, value]) => {
                if (key === 'slug') formData.append(key, slug)
                else formData.append(key, String(value))
            })

            selectedImages.forEach(image => formData.append('images', image))

            if (editingDiamond) {
                await updateDiamond({ id: editingDiamond._id, data: formData }).unwrap()
                toast.success("Diamond details updated")
            } else {
                await createDiamond(formData).unwrap()
                toast.success("Diamond successfully vaulted")
            }

            setIsModalOpen(false)
            setEditingDiamond(null)
            setNewDiamond({
                shape: "Round", carat: "", cut: "Ideal", color: "F", clarity: "VS1", origin: "Natural", price: "", stock: "1",
                depth: "", table: "", symmetry: "Excellent", polish: "Excellent", fluorescence: "None", lwRatio: "",
                certification: "GIA", certNumber: "", eyeClean: true, slug: "", metaTitle: "", metaDescription: "", keywords: ""
            })
            setSelectedImages([])
            setImagePreviews([])
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to process diamond")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <Diamond className="w-3.5 h-3.5" /> Luxury Inventory
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight">Diamond Vault</h1>
                    <p className="text-slate-500 mt-1 max-w-xl">Precision management for natural and laboratory diamonds. Dynamic shape synchronization with master registry.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv" />
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:border-[#163E3E] hover:text-[#163E3E] transition-all shadow-sm">
                        <FileSpreadsheet className="w-4 h-4" /> Bulk Import
                    </button>
                    <button
                        onClick={() => {
                            setEditingDiamond(null)
                            setNewDiamond({
                                shape: "Round", carat: "", cut: "Ideal", color: "F", clarity: "VS1", origin: "Natural", price: "", stock: "1",
                                depth: "", table: "", symmetry: "Excellent", polish: "Excellent", fluorescence: "None", lwRatio: "",
                                certification: "GIA", certNumber: "", eyeClean: true, slug: "", metaTitle: "", metaDescription: "", keywords: ""
                            })
                            setImagePreviews([])
                            setIsModalOpen(true)
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> Add Stone
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Caratage', value: (diamonds.reduce((acc: number, d: any) => acc + Number(d.carat), 0) || 0).toFixed(2), unit: 'ct' },
                    { label: 'Active Shapes', value: diamondShapes.length > 0 ? diamondShapes.length : '10', unit: 'Types' },
                    { label: 'Laboratory Growth', value: diamonds.filter((d: any) => d.origin === 'Lab').length, unit: 'Units' },
                    { label: 'Vault Valuation', value: '$' + (diamonds.reduce((acc: number, d: any) => acc + d.price, 0) || 0).toLocaleString(), unit: 'Total' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">{stat.label}</p>
                        <div className="flex items-baseline gap-2 mt-1 relative z-10">
                            <p className="text-2xl font-serif text-slate-900">{stat.value}</p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.unit}</span>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                            <Diamond className="w-20 h-20" />
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
                        placeholder="Search by shape, carat or certificate serial..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/10 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#163E3E]" />
                        <select
                            className="w-full lg:w-auto pl-9 pr-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/10 appearance-none cursor-pointer"
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                        >
                            <option>All Origins</option>
                            <option>Natural</option>
                            <option>Lab</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative">
                <div className="overflow-x-auto no-scrollbar">
                    {isDiaLoading ? (
                        <div className="p-32 text-center">
                            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#163E3E] rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Accessing Vault Registry...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Stone Identity</th>
                                    <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Provenance & Cert</th>
                                    <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">4Cs Architecture</th>
                                    <th className="px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Valuation</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {diamonds.map((dia: any) => (
                                    <tr key={dia._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-[#163E3E]/5 rounded-xl flex items-center justify-center text-[#163E3E] group-hover:bg-[#163E3E] group-hover:text-white transition-all duration-500 shadow-inner overflow-hidden">
                                                    {dia.images?.[0] ? <img src={dia.images[0]} className="w-full h-full object-cover" alt="" /> : <Diamond className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#163E3E] transition-colors">{dia.carat}ct {dia.shape}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">#{dia._id.substring(dia._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider w-fit
                                                    ${dia.origin === 'Natural' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}
                                                `}>
                                                    {dia.origin} GROWTH
                                                </span>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <ShieldCheck className="w-3 h-3" /> {dia.certification} Certified
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {[
                                                    { label: 'Cut', val: dia.cut },
                                                    { label: 'Color', val: dia.color },
                                                    { label: 'Clarity', val: dia.clarity }
                                                ].map((c, idx) => (
                                                    <div key={idx} className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                        <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter leading-none mb-1">{c.label}</p>
                                                        <p className="text-[11px] font-bold text-slate-700 leading-none">{c.val}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-900">${dia.price?.toLocaleString()}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <div className={`w-2 h-2 rounded-full ${dia.stock > 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-rose-500'}`}></div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dia.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button className="p-2.5 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-100" title="Inspect"><Eye className="w-4 h-4" /></button>
                                                <button
                                                    onClick={() => handleEdit(dia)}
                                                    className="p-2.5 text-slate-400 hover:text-[#163E3E] hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-100"
                                                    title="Modifier"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(dia._id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-red-100" title="Revoke"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Premium Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <h2 className="text-2xl font-serif text-slate-900">Vault Addition Protocol</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                                    <Settings2 className="w-3.5 h-3.5" /> Luxury Asset Management
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95 border border-transparent hover:border-slate-100">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Navigation */}
                        <div className="flex items-center px-10 border-b border-slate-50 bg-white shadow-sm relative z-10">
                            {[
                                { id: '4cs', label: '1. The 4Cs' },
                                { id: 'technical', label: '2. Technical Architecture' },
                                { id: 'seo', label: '3. Market SEO' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all relative
                                        ${modalTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    {tab.label}
                                    {modalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#163E3E] rounded-full"></div>}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleAddDiamond} className="p-10">
                            <div className="max-h-[60vh] overflow-y-auto pr-6 no-scrollbar">
                                {modalTab === '4cs' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                                            <div className="md:col-span-4">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Visual Evidence</label>
                                                <div onClick={() => document.getElementById('dia-imgs')?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-4 group hover:border-[#163E3E]/30 hover:bg-[#163E3E]/5 transition-all cursor-pointer relative overflow-hidden shadow-inner">
                                                    <input type="file" id="dia-imgs" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                                    <Upload className="w-10 h-10 text-slate-200 group-hover:text-[#163E3E] group-hover:scale-110 transition-all duration-500" />
                                                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-widest text-center">Upload Photos</p>
                                                </div>
                                                <div className="grid grid-cols-4 gap-3 mt-4">
                                                    {imagePreviews.map((src, idx) => (
                                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-slate-100">
                                                            <img src={src} className="w-full h-full object-cover" alt="" />
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><X className="w-4 h-4 text-white" /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="md:col-span-8 space-y-8">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Shape (Synced)</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 outline-none shadow-sm cursor-pointer" value={newDiamond.shape} onChange={(e) => setNewDiamond({ ...newDiamond, shape: e.target.value })}>
                                                            {diamondShapes.length > 0 ? (diamondShapes as string[]).map((s: string) => <option key={s}>{s}</option>) : (
                                                                ['Round', 'Oval', 'Emerald', 'Pear', 'Cushion', 'Princess', 'Radiant'].map((s: string) => <option key={s}>{s}</option>)
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Carat Weight (ct)</label>
                                                        <input required type="number" step="0.01" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-[#163E3E] outline-none shadow-sm" placeholder="0.00 ct" value={newDiamond.carat} onChange={(e) => setNewDiamond({ ...newDiamond, carat: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Cut Grade</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 outline-none shadow-sm" value={newDiamond.cut} onChange={(e) => setNewDiamond({ ...newDiamond, cut: e.target.value })}>
                                                            {['Super Ideal', 'Ideal', 'Excellent', 'Very Good', 'Good'].map(o => <option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Color Grade</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 outline-none shadow-sm" value={newDiamond.color} onChange={(e) => setNewDiamond({ ...newDiamond, color: e.target.value })}>
                                                            {['D', 'E', 'F', 'G', 'H', 'I', 'J'].map(o => <option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Clarity Tier</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 outline-none shadow-sm" value={newDiamond.clarity} onChange={(e) => setNewDiamond({ ...newDiamond, clarity: e.target.value })}>
                                                            {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1'].map(o => <option key={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'technical' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-2 gap-10">
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Market Valuation ($)</label>
                                                        <input required type="number" className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-[#163E3E] outline-none shadow-sm" placeholder="0.00" value={newDiamond.price} onChange={(e) => setNewDiamond({ ...newDiamond, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Provenance</label>
                                                        <select className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 outline-none shadow-sm" value={newDiamond.origin} onChange={(e) => setNewDiamond({ ...newDiamond, origin: e.target.value })}>
                                                            <option>Natural</option><option>Lab</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 flex items-center justify-between shadow-sm">
                                                    <div>
                                                        <p className="font-serif text-lg text-emerald-900 leading-none">Eye Clean Verified</p>
                                                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1.5 opacity-70">No Visible Inclusions</p>
                                                    </div>
                                                    <input type="checkbox" checked={newDiamond.eyeClean} onChange={(e) => setNewDiamond({ ...newDiamond, eyeClean: e.target.checked })} className="w-8 h-8 rounded-xl border-emerald-200 text-[#163E3E] focus:ring-[#163E3E] transition-all cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Institution</label>
                                                        <select className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 outline-none shadow-sm" value={newDiamond.certification} onChange={(e) => setNewDiamond({ ...newDiamond, certification: e.target.value })}>
                                                            <option>GIA</option><option>IGI</option><option>GCAL</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Cert Number</label>
                                                        <input type="text" className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-900 outline-none shadow-sm" placeholder="Serial No." value={newDiamond.certNumber} onChange={(e) => setNewDiamond({ ...newDiamond, certNumber: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Market Resource Slug</label>
                                            <input type="text" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none shadow-sm" placeholder="auto-generated-slug" value={newDiamond.slug} onChange={(e) => setNewDiamond({ ...newDiamond, slug: e.target.value })} />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Strategic SEO Description</label>
                                            <textarea rows={4} className="w-full px-8 py-6 bg-slate-50 border-none rounded-2xl text-sm text-slate-700 leading-relaxed outline-none shadow-sm resize-none" placeholder="Targeted market narrative..." value={newDiamond.metaDescription} onChange={(e) => setNewDiamond({ ...newDiamond, metaDescription: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6 pt-10 mt-10 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 bg-white border border-slate-200 text-slate-400 rounded-[24px] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-slate-600 hover:bg-slate-50 transition-all active:scale-95">Abandon</button>
                                <button type="submit" className="flex-1 px-10 py-5 bg-[#163E3E] text-white rounded-[24px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-[#163E3E]/30 active:scale-95 transform">Confirm & Authenticate Entry</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

"use client"

import React, { useState } from 'react'
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
    Upload
} from 'lucide-react'

import {
    useGetDiamondsQuery,
    useCreateDiamondMutation,
    useDeleteDiamondMutation
} from '@/lib/redux/slices/diamondsApiSlice'
import { toast } from 'sonner'

export default function DiamondsCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterOrigin, setFilterOrigin] = useState("All Origins")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'4cs' | 'technical' | 'seo'>('4cs')
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: diamondsData, isLoading } = useGetDiamondsQuery({
        shape: searchTerm || undefined,
        origin: filterOrigin === 'All Origins' ? undefined : filterOrigin,
        sort: '-createdAt'
    })
    const [createDiamond] = useCreateDiamondMutation()
    const [deleteDiamond] = useDeleteDiamondMutation()

    const [newDiamond, setNewDiamond] = useState({
        shape: "Round",
        carat: "",
        cut: "Ideal",
        color: "F",
        clarity: "VS1",
        origin: "Natural",
        price: "",
        stock: "",
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

    const diamonds = diamondsData?.data?.diamonds || []

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
        if (confirm("Delete this diamond from inventory?")) {
            try {
                await deleteDiamond(id).unwrap()
                toast.success("Diamond removed from inventory")
            } catch (err) {
                toast.error("Failed to remove diamond")
            }
        }
    }

    const handleAddDiamond = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            const slug = newDiamond.slug || `${newDiamond.carat}-${newDiamond.shape}-${newDiamond.cut}-${newDiamond.color}-${newDiamond.clarity}`.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('shape', newDiamond.shape)
            formData.append('carat', newDiamond.carat)
            formData.append('cut', newDiamond.cut)
            formData.append('color', newDiamond.color)
            formData.append('clarity', newDiamond.clarity)
            formData.append('origin', newDiamond.origin)
            formData.append('price', newDiamond.price)
            formData.append('stock', newDiamond.stock)
            formData.append('depth', newDiamond.depth)
            formData.append('table', newDiamond.table)
            formData.append('symmetry', newDiamond.symmetry)
            formData.append('polish', newDiamond.polish)
            formData.append('fluorescence', newDiamond.fluorescence)
            formData.append('lwRatio', newDiamond.lwRatio)
            formData.append('certification', newDiamond.certification)
            formData.append('certNumber', newDiamond.certNumber)
            formData.append('eyeClean', String(newDiamond.eyeClean))
            formData.append('slug', slug)
            formData.append('metaTitle', newDiamond.metaTitle)
            formData.append('metaDescription', newDiamond.metaDescription)
            formData.append('keywords', newDiamond.keywords)

            selectedImages.forEach(image => formData.append('images', image))

            await createDiamond(formData).unwrap()

            toast.success("Diamond added to inventory")
            setIsModalOpen(false)
            setNewDiamond({
                shape: "Round", carat: "", cut: "Ideal", color: "F", clarity: "VS1", origin: "Natural", price: "", stock: "",
                depth: "", table: "", symmetry: "Excellent", polish: "Excellent", fluorescence: "None", lwRatio: "",
                certification: "GIA", certNumber: "", eyeClean: true, slug: "", metaTitle: "", metaDescription: "", keywords: ""
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('4cs')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to add diamond")
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
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Diamond Inventory</h1>
                    <p className="text-slate-500 mt-1 text-sm">Track your loose diamond stock across natural and lab-grown categories.</p>
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
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Diamond
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search by shape, carat or certificate..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/20 transition-all"
                    value={filterOrigin}
                    onChange={(e) => setFilterOrigin(e.target.value)}
                >
                    <option>All Origins</option>
                    <option>Natural</option>
                    <option>Lab</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 italic">Loading diamonds inventory...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Details</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Origin</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Cut/Color/Clarity</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Price</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {diamonds.map((dia: any) => (
                                    <tr key={dia._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-[#163E3E]">
                                                    <Diamond className="w-5 h-5 flex-shrink-0" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-tight">{dia.carat}ct {dia.shape}</p>
                                                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">SKU: DIA-{dia._id.substring(dia._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                ${dia.origin === 'Natural' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}
                                            `}>
                                                {dia.origin}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-slate-700 font-medium">{dia.cut} • {dia.color} • {dia.clarity}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-900">${dia.price.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${dia.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                <span className="text-sm font-medium text-slate-700">{dia.stock} available</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-slate-400 hover:text-[#163E3E] hover:bg-[#163E3E]/5 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                                                <button
                                                    onClick={() => handleDelete(dia._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {diamonds.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 text-sm italic">No diamonds found matching your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add New Diamond Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Add New Diamond</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Inventory Management</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: '4cs', label: '4Cs & Pricing' },
                                { id: 'technical', label: 'Technical Specs' },
                                { id: 'seo', label: 'SEO & Content' }
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

                        <form onSubmit={handleAddDiamond} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === '4cs' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* Media Upload Area */}
                                            <div className="md:col-span-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Product Media</label>
                                                <div
                                                    onClick={() => document.getElementById('diamond-images')?.click()}
                                                    className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-[#163E3E]/30 transition-all cursor-pointer relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="diamond-images"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <Diamond className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E] transition-colors" />
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

                                            {/* Primary Info */}
                                            <div className="md:col-span-2 space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shape</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.shape} onChange={(e) => setNewDiamond({ ...newDiamond, shape: e.target.value })}>
                                                            <option>Round</option><option>Oval</option><option>Emerald</option><option>Pear</option><option>Cushion</option><option>Princess</option><option>Radiant</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Carat Weight</label>
                                                        <input required type="number" step="0.01" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="1.20" value={newDiamond.carat} onChange={(e) => setNewDiamond({ ...newDiamond, carat: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cut Grade</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.cut} onChange={(e) => setNewDiamond({ ...newDiamond, cut: e.target.value })}>
                                                            <option>Super Ideal</option><option>Ideal</option><option>Excellent</option><option>Very Good</option><option>Good</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.color} onChange={(e) => setNewDiamond({ ...newDiamond, color: e.target.value })}>
                                                            <option>D</option><option>E</option><option>F</option><option>G</option><option>H</option><option>I</option><option>J</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clarity</label>
                                                        <select className="w-full px-4 py-4 bg-slate-50 border-none rounded-xl text-xs outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.clarity} onChange={(e) => setNewDiamond({ ...newDiamond, clarity: e.target.value })}>
                                                            <option>FL</option><option>IF</option><option>VVS1</option><option>VVS2</option><option>VS1</option><option>VS2</option><option>SI1</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Price ($)</label>
                                                        <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="5400" value={newDiamond.price} onChange={(e) => setNewDiamond({ ...newDiamond, price: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origin</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.origin} onChange={(e) => setNewDiamond({ ...newDiamond, origin: e.target.value })}>
                                                            <option>Natural</option><option>Lab</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'technical' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Depth %</label>
                                                        <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="61.5" value={newDiamond.depth} onChange={(e) => setNewDiamond({ ...newDiamond, depth: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Table %</label>
                                                        <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="57.0" value={newDiamond.table} onChange={(e) => setNewDiamond({ ...newDiamond, table: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Symmetry</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.symmetry} onChange={(e) => setNewDiamond({ ...newDiamond, symmetry: e.target.value })}>
                                                            <option>Excellent</option><option>Very Good</option><option>Good</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Polish</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.polish} onChange={(e) => setNewDiamond({ ...newDiamond, polish: e.target.value })}>
                                                            <option>Excellent</option><option>Very Good</option><option>Good</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fluorescence</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" value={newDiamond.fluorescence} onChange={(e) => setNewDiamond({ ...newDiamond, fluorescence: e.target.value })}>
                                                            <option>None</option><option>Faint</option><option>Medium</option><option>Strong</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">L/W Ratio</label>
                                                        <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="1.01" value={newDiamond.lwRatio} onChange={(e) => setNewDiamond({ ...newDiamond, lwRatio: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eye Clean</label>
                                                        <div className="flex items-center gap-3 h-[52px]">
                                                            <input type="checkbox" id="eye-clean" checked={newDiamond.eyeClean} onChange={(e) => setNewDiamond({ ...newDiamond, eyeClean: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-[#163E3E] focus:ring-[#163E3E]" />
                                                            <label htmlFor="eye-clean" className="text-xs font-bold text-slate-600 uppercase tracking-widest cursor-pointer">Yes, Eye Clean</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Activity className="w-4 h-4 text-[#163E3E]" />
                                                <h3 className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest">Certification Details</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Laboratory</label>
                                                    <select className="w-full px-4 py-3 bg-white border-none rounded-xl text-sm outline-none shadow-sm" value={newDiamond.certification} onChange={(e) => setNewDiamond({ ...newDiamond, certification: e.target.value })}>
                                                        <option>GIA</option><option>IGI</option><option>GCAL</option><option>HRD</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certificate Number</label>
                                                    <input type="text" className="w-full px-4 py-3 bg-white border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. 245609384" value={newDiamond.certNumber} onChange={(e) => setNewDiamond({ ...newDiamond, certNumber: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL Slug</label>
                                            <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                                                <span className="pl-5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">ritzin.com/diamonds/</span>
                                                <input type="text" className="flex-1 px-2 py-4 bg-transparent border-none text-sm outline-none" placeholder="1-20-round-ideal-f-vvs1" value={newDiamond.slug} onChange={(e) => setNewDiamond({ ...newDiamond, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Title</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="Premium Diamond Title..." value={newDiamond.metaTitle} onChange={(e) => setNewDiamond({ ...newDiamond, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta Description</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10 resize-none" placeholder="Search engine snippet..." value={newDiamond.metaDescription} onChange={(e) => setNewDiamond({ ...newDiamond, metaDescription: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Keywords</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. gia diamond, round cut, natural diamond" value={newDiamond.keywords} onChange={(e) => setNewDiamond({ ...newDiamond, keywords: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Confirm & Add to Inventory</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

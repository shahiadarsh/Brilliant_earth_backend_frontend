"use client"

import React, { useState, useRef } from 'react'
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
    Download
} from 'lucide-react'

const initialJewelry = [
    { id: 1, name: "Diamond Tennis Bracelet", category: "Bracelets", metal: "14K White Gold", price: 1200, stock: 5 },
    { id: 2, name: "Sapphire Halo Studs", category: "Earrings", metal: "18K Yellow Gold", price: 850, stock: 8 },
    { id: 3, name: "Solitaire Pearl Necklace", category: "Necklaces", metal: "14K Rose Gold", price: 450, stock: 12 },
]

import {
    useGetJewelryQuery,
    useCreateJewelryMutation,
    useDeleteJewelryMutation
} from '@/lib/redux/slices/jewelryApiSlice'
import { toast } from 'sonner'

export default function JewelryCatalog() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("All Categories")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'details' | 'specs' | 'seo'>('details')
    const fileInputRef = useRef<HTMLInputElement>(null)

    // API Hooks
    const { data: jewelryData, isLoading } = useGetJewelryQuery({
        name: searchTerm || undefined,
        category: filterCategory === 'All Categories' ? undefined : filterCategory,
        sort: '-createdAt'
    })
    const [createJewelry] = useCreateJewelryMutation()
    const [deleteJewelry] = useDeleteJewelryMutation()

    const [newItem, setNewItem] = useState({
        name: "",
        category: "Earrings",
        metal: "14K White Gold",
        collection: "Classic",
        price: "",
        stock: "",
        description: "",
        gemstones: "",
        dimensions: "",
        weight: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    })
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    const jewelry = jewelryData?.data?.jewelry || []

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
        if (confirm("Delete this product from catalog?")) {
            try {
                await deleteJewelry(id).unwrap()
                toast.success("Product removed from catalog")
            } catch (err) {
                toast.error("Failed to remove product")
            }
        }
    }

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            const slug = newItem.slug || newItem.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

            formData.append('name', newItem.name)
            formData.append('category', newItem.category)
            formData.append('metal', newItem.metal)
            formData.append('collection', newItem.collection)
            formData.append('price', newItem.price)
            formData.append('stock', newItem.stock)
            formData.append('description', newItem.description)
            formData.append('gemstones', newItem.gemstones)
            formData.append('dimensions', newItem.dimensions)
            formData.append('weight', newItem.weight)
            formData.append('slug', slug)
            formData.append('metaTitle', newItem.metaTitle)
            formData.append('metaDescription', newItem.metaDescription)
            formData.append('keywords', newItem.keywords)

            selectedImages.forEach(image => formData.append('images', image))

            await createJewelry(formData).unwrap()

            toast.success("Product added successfully")
            setIsModalOpen(false)
            setNewItem({
                name: "", category: "Earrings", metal: "14K White Gold", collection: "Classic",
                price: "", stock: "", description: "", gemstones: "", dimensions: "", weight: "",
                slug: "", metaTitle: "", metaDescription: "", keywords: ""
            })
            setSelectedImages([])
            setImagePreviews([])
            setModalTab('details')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to add product")
        }
    }

    const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            toast.info(`Bulk upload simulation: Reading ${file.name}...`)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Jewelry Catalog</h1>
                    <p className="text-slate-500 mt-1 text-sm">Manage earrings, necklaces, bracelets, and other fine jewelry collections.</p>
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
                        <FileSpreadsheet className="w-4 h-4 text-[#163E3E]" /> Bulk Import (CSV)
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search by product name or SKU..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#163E3E]/20 transition-all"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option>All Categories</option>
                        <option>Earrings</option>
                        <option>Necklaces</option>
                        <option>Bracelets</option>
                        <option>Rings</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 italic">Loading jewelry catalog...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Product</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Catalog & Metal</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Price</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock Status</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {jewelry.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group text-sm">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-[#163E3E]">
                                                    <Box className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                                                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-bold">SKU: JWL-{item._id.substring(item._id.length - 6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-600">{item.category}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">{item.metal}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-bold text-[#163E3E]">${item.price.toLocaleString()}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${item.stock > 10 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : item.stock > 0 ? 'bg-amber-400' : 'bg-red-400'}`}></div>
                                                <span className="font-medium text-slate-700">{item.stock} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-slate-400 hover:text-[#163E3E] hover:bg-slate-100 rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {jewelry.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm italic">No jewelry products found matching your criteria.</td>
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
                                <h2 className="text-xl font-serif text-slate-900">Configure Jewelry Product</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Catalog Entry Form</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: 'details', label: 'Identity & Story', icon: Box },
                                { id: 'specs', label: 'Technical Profile', icon: Info },
                                { id: 'seo', label: 'Market Visibility', icon: Globe }
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

                        <form onSubmit={handleAddItem} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === 'details' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* Media */}
                                            <div className="md:col-span-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Product Media</label>
                                                <div
                                                    onClick={() => document.getElementById('jewelry-images')?.click()}
                                                    className="aspect-[3/4] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#163E3E]/30 transition-all cursor-pointer group relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="jewelry-images"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                    <Upload className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E]/40 transition-colors" />
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">Upload Images (Max 5)</p>
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

                                            {/* Primary Info */}
                                            <div className="md:col-span-2 space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Product Title</label>
                                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Diamond Tennis Bracelet" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jewelry Type (Category)</label>
                                                        <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm cursor-pointer" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                                                            <option>Earrings</option><option>Necklaces</option><option>Bracelets</option><option>Rings</option><option>Pendants</option><option>Anklets</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retail Pricing ($)</label>
                                                        <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm font-bold text-[#163E3E]" placeholder="1200" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Narrative / Story</label>
                                                    <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm resize-none" placeholder="Describe the craftsmanship and inspiration behind this piece..." value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'specs' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Material (Metal)</label>
                                                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" value={newItem.metal} onChange={(e) => setNewItem({ ...newItem, metal: e.target.value })}>
                                                        <option>14K White Gold</option><option>18K Yellow Gold</option><option>14K Rose Gold</option><option>Platinum</option><option>Sterling Silver</option><option>Vermeil</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design Collection</label>
                                                    <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" value={newItem.collection} onChange={(e) => setNewItem({ ...newItem, collection: e.target.value })}>
                                                        <option>Classic</option><option>Botanical</option><option>Vintage</option><option>Modern Essentials</option><option>Signature Series</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Stock Count</label>
                                                    <input required type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="5" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inlaid Gemstones (Full Spec)</label>
                                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. 1.5ctw Round Lab Diamonds, F color, VS1" value={newItem.gemstones} onChange={(e) => setNewItem({ ...newItem, gemstones: e.target.value })} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Item Weight (approx. grams)</label>
                                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. 3.5g" value={newItem.weight} onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Physical Dimensions (length/width)</label>
                                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. 7.5 inches length" value={newItem.dimensions} onChange={(e) => setNewItem({ ...newItem, dimensions: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Inventory Management</p>
                                                <p className="text-[10px] text-emerald-700 mt-0.5">Stock levels are automatically updated upon purchase. Manual adjustments are logged for audit.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'seo' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product URL Alias (Slug)</label>
                                            <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner border border-slate-100 px-4">
                                                <span className="text-[10px] text-slate-400 font-bold tracking-tight">/shop/jewelry/</span>
                                                <input type="text" className="flex-1 px-2 py-4 bg-transparent border-none text-sm outline-none" placeholder="diamond-tennis-bracelet-14k-white" value={newItem.slug} onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Meta Title (Browser Tab)</label>
                                            <div className="relative">
                                                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm pr-12" placeholder="Search engine optimized title..." value={newItem.metaTitle} onChange={(e) => setNewItem({ ...newItem, metaTitle: e.target.value })} />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-300">60 max</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Description (Snippet)</label>
                                            <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm resize-none" placeholder="Provide a compelling summary for search result snippets..." value={newItem.metaDescription} onChange={(e) => setNewItem({ ...newItem, metaDescription: e.target.value })} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contextual Keywords</label>
                                            <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="e.g. fine jewelry, diamond bracelet, sustainable luxury" value={newItem.keywords} onChange={(e) => setNewItem({ ...newItem, keywords: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Publish to Catalog</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

"use client"

import React, { useState } from 'react'
import {
    Plus,
    Search,
    Trash2,
    Image as ImageIcon,
    Clock,
    Edit2,
    X,
    Laptop,
    Smartphone,
    Link as LinkIcon,
    Settings,
    Calendar
} from 'lucide-react'

const initialBanners = [
    { id: 1, name: "Summer Sale 2024", placement: "Homepage Hero", status: "Active", expiry: "Aug 30, 2024", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400&h=200" },
    { id: 2, name: "Engagement Collection", placement: "Sidebar", status: "Inactive", expiry: "Dec 31, 2023", image: "https://images.unsplash.com/photo-1598560944733-ca4cc596798b?auto=format&fit=crop&q=80&w=400&h=200" },
]

import {
    useGetPromosQuery,
    useCreatePromoMutation,
    useDeletePromoMutation
} from '@/lib/redux/slices/promosApiSlice'
import { toast } from 'sonner'

export default function PromosManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'basic' | 'assets' | 'schedule'>('basic')

    // API Hooks
    const { data: promosData, isLoading } = useGetPromosQuery({
        name: searchTerm || undefined,
        sort: '-createdAt'
    })
    const [createPromo] = useCreatePromoMutation()
    const [deletePromo] = useDeletePromoMutation()

    const banners = promosData?.data?.promos || []

    const [newBanner, setNewBanner] = useState({
        name: "",
        placement: "Homepage Hero",
        status: "Active",
        targetUrl: "",
        altText: "",
        buttonText: "Shop Now",
        desktopImage: "",
        mobileImage: "",
        expiryDate: "",
        priority: "1"
    })
    const [selectedDesktop, setSelectedDesktop] = useState<File | null>(null)
    const [desktopPreview, setDesktopPreview] = useState<string>("")
    const [selectedMobile, setSelectedMobile] = useState<File | null>(null)
    const [mobilePreview, setMobilePreview] = useState<string>("")

    const handleDelete = async (id: string) => {
        if (confirm("Delete this banner?")) {
            try {
                await deletePromo(id).unwrap()
                toast.success("Banner deleted")
            } catch (err) {
                toast.error("Failed to delete banner")
            }
        }
    }

    const handleDesktopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedDesktop(file)
            setDesktopPreview(URL.createObjectURL(file))
        }
    }

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setSelectedMobile(file)
            setMobilePreview(URL.createObjectURL(file))
        }
    }

    const handleAddBanner = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', newBanner.name)
            formData.append('placement', newBanner.placement)
            formData.append('status', newBanner.status)
            formData.append('targetUrl', newBanner.targetUrl)
            formData.append('altText', newBanner.altText)
            formData.append('buttonText', newBanner.buttonText)
            formData.append('expiryDate', newBanner.expiryDate)
            formData.append('priority', newBanner.priority)

            // Since our backend promoController currently expects 'image' (singular) for simplicity, 
            // and our model has desktopImage/mobileImage, let's just use the main one or both if available.
            // NOTE: The current backend promoController uses req.file.location for req.body.image.
            // We should probably update the backend to handle both if we want separate fields.
            // For now, I'll send desktop as 'image' to match my previous controller update.
            if (selectedDesktop) {
                formData.append('image', selectedDesktop)
            }

            await createPromo(formData).unwrap()
            toast.success("Promo banner created")
            setIsModalOpen(false)
            setNewBanner({
                name: "", placement: "Homepage Hero", status: "Active", targetUrl: "",
                altText: "", buttonText: "Shop Now", desktopImage: "", mobileImage: "",
                expiryDate: "", priority: "1"
            })
            setSelectedDesktop(null)
            setDesktopPreview("")
            setSelectedMobile(null)
            setMobilePreview("")
            setModalTab('basic')
        } catch (err: any) {
            toast.error(err.data?.message || err.message || "Failed to create banner")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Promo Banners</h1>
                    <p className="text-slate-500 mt-1 text-sm">Control your store marketing and promotional placements.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" /> Add Banner
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search banners by name..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-3 p-20 text-center text-slate-400 italic">Loading banners...</div>
                ) : (
                    banners.map((banner: any) => (
                        <div key={banner._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                            <div className="h-40 overflow-hidden relative">
                                <img src={banner.desktopImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={banner.name} />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-lg
                                        ${banner.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}
                                    `}>
                                        {banner.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-serif text-lg text-slate-900 leading-tight line-clamp-1">{banner.name}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <ImageIcon className="w-3 h-3" />
                                        <span>{banner.placement}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">
                                            Expires: {banner.expiryDate ? new Date(banner.expiryDate).toLocaleDateString() : 'Never'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button
                                            onClick={() => handleDelete(banner._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {banners.length === 0 && !isLoading && (
                    <div className="col-span-3 p-20 text-center text-slate-400 text-sm italic">No banners found.</div>
                )}
            </div>

            {/* Add New Banner Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Configure Banner</h2>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Marketing Placement</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex items-center px-8 border-b border-slate-50 bg-slate-50/30">
                            {[
                                { id: 'basic', label: 'Basic Configuration', icon: Settings },
                                { id: 'assets', label: 'Visual Assets', icon: ImageIcon },
                                { id: 'schedule', label: 'Schedule & Timing', icon: Clock }
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

                        <form onSubmit={handleAddBanner} className="p-8">
                            <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {modalTab === 'basic' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campaign Name</label>
                                                <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10" placeholder="e.g. Winter Sale 2024" value={newBanner.name} onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Link (Target URL)</label>
                                                <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner px-4 border border-slate-100">
                                                    <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                                                    <input required type="text" className="flex-1 px-3 py-4 bg-transparent border-none text-sm outline-none" placeholder="https://..." value={newBanner.targetUrl} onChange={(e) => setNewBanner({ ...newBanner, targetUrl: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placement Zone</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm cursor-pointer" value={newBanner.placement} onChange={(e) => setNewBanner({ ...newBanner, placement: e.target.value })}>
                                                    <option>Homepage Hero</option><option>Homepage Grid</option><option>Product Sidebar</option><option>Checkout Top</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Button Label</label>
                                                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="Shop the Collection" value={newBanner.buttonText} onChange={(e) => setNewBanner({ ...newBanner, buttonText: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alt Text (Accessibility)</label>
                                            <textarea rows={2} className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm resize-none" placeholder="Describe clinical view of banner for screen readers..." value={newBanner.altText} onChange={(e) => setNewBanner({ ...newBanner, altText: e.target.value })} />
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'assets' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Laptop className="w-4 h-4 text-[#163E3E]" />
                                                    <label className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest">Desktop Asset (Widescreen)</label>
                                                </div>
                                                <div
                                                    onClick={() => document.getElementById('desktop-image')?.click()}
                                                    className="aspect-[21/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#163E3E]/30 transition-all cursor-pointer group relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="desktop-image"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleDesktopChange}
                                                    />
                                                    {desktopPreview ? (
                                                        <img src={desktopPreview} className="w-full h-full object-cover" alt="desktop preview" />
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E]/40 transition-colors" />
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">Upload 1920x800 Image</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Smartphone className="w-4 h-4 text-[#163E3E]" />
                                                    <label className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest">Mobile Asset (Portrait)</label>
                                                </div>
                                                <div
                                                    onClick={() => document.getElementById('mobile-image')?.click()}
                                                    className="aspect-[3/4] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#163E3E]/30 transition-all cursor-pointer group relative overflow-hidden"
                                                >
                                                    <input
                                                        type="file"
                                                        id="mobile-image"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleMobileChange}
                                                    />
                                                    {mobilePreview ? (
                                                        <img src={mobilePreview} className="w-full h-full object-cover" alt="mobile preview" />
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="w-8 h-8 text-slate-200 group-hover:text-[#163E3E]/40 transition-colors" />
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">Upload 800x1200 Image</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'schedule' && (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Priority (Weight)</label>
                                                <input type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none shadow-sm" placeholder="1" value={newBanner.priority} onChange={(e) => setNewBanner({ ...newBanner, priority: e.target.value })} />
                                                <p className="text-[9px] text-slate-400 px-1 italic">Higher numbers display first in carousels.</p>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campaign Expiry</label>
                                                <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden shadow-inner px-4 border border-slate-100">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    <input type="date" className="flex-1 px-3 py-4 bg-transparent border-none text-sm outline-none" value={newBanner.expiryDate} onChange={(e) => setNewBanner({ ...newBanner, expiryDate: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-amber-800" />
                                                <h3 className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Publication Notice</h3>
                                            </div>
                                            <p className="text-[11px] text-amber-700 leading-relaxed font-medium">Setting the status to "Active" will immediately push this banner to the selected placement zone across all platforms. Ensure assets are optimized for fast loading.</p>
                                            <div className="flex items-center gap-3 pt-2">
                                                <input type="checkbox" id="active-status" checked={newBanner.status === 'Active'} onChange={(e) => setNewBanner({ ...newBanner, status: e.target.checked ? 'Active' : 'Inactive' })} className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" />
                                                <label htmlFor="active-status" className="text-[10px] font-bold text-amber-800 uppercase tracking-widest cursor-pointer">Enable Campaign Immediately</label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-8 mt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Banner</button>
                                <button type="submit" className="flex-1 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Save & Activate</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

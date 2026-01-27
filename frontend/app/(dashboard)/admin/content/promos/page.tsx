"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Layout, Image as ImageIcon, Link as LinkIcon, Save, X, Calendar, Type, MousePointer2 } from "lucide-react"
import {
    useGetAdminPromosQuery,
    useCreatePromoMutation,
    useUpdatePromoMutation,
    useDeletePromoMutation
} from "@/lib/redux/slices/promosApiSlice"
import { useUploadImageMutation } from "@/lib/redux/apiSlice"
import { toast } from "sonner"
import Image from "next/image"

export default function PromoManager() {
    const { data: promosData, isLoading } = useGetAdminPromosQuery(undefined)
    const [createPromo] = useCreatePromoMutation()
    const [updatePromo] = useUpdatePromoMutation()
    const [deletePromo] = useDeletePromoMutation()
    const [uploadImage] = useUploadImageMutation()
    const [uploading, setUploading] = useState<string | null>(null)

    const [editingPromo, setEditingPromo] = useState<any>(null)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'content' | 'media' | 'actions' | 'settings'>('content')
    const [customPosition, setCustomPosition] = useState("")

    const initialFormState = {
        title: "",
        altText: "",
        desktopImage: "",
        mobileImage: "",
        link: "",
        buttonText: "Shop Now",
        secondaryLink: "",
        secondaryButtonText: "",
        position: "",
        description: "",
        theme: "light",
        priority: 0,
        status: "Active",
        startDate: "",
        endDate: ""
    }

    const [formData, setFormData] = useState(initialFormState)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const handleEdit = (promo: any) => {
        setEditingPromo(promo)
        setFormData({
            title: promo.title || "",
            altText: promo.altText || "",
            desktopImage: promo.desktopImage || "",
            mobileImage: promo.mobileImage || "",
            link: promo.link || "",
            buttonText: promo.buttonText || "Shop Now",
            secondaryLink: promo.secondaryLink || "",
            secondaryButtonText: promo.secondaryButtonText || "",
            position: predefinedPositions.some(p => p.value === promo.position) ? promo.position : 'custom',
            description: promo.description || "",
            theme: promo.theme || "light",
            priority: promo.priority || 0,
            status: promo.status || "Active",
            startDate: promo.startDate ? new Date(promo.startDate).toISOString().split('T')[0] : "",
            endDate: promo.endDate ? new Date(promo.endDate).toISOString().split('T')[0] : ""
        })

        // If the position matches one of the predefined ones, custom is empty, otherwise it's the promo position
        const isPredefined = predefinedPositions.some(p => p.value === promo.position);
        setCustomPosition(isPredefined ? "" : promo.position || "");

        setIsAddModalOpen(true)
        setActiveTab('content')
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to permanently remove this promo?")) {
            try {
                await deletePromo(id).unwrap()
                toast.success("Promo deleted successfully")
            } catch (error) {
                toast.error("Failed to delete promo")
            }
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
        const file = e.target.files?.[0]
        if (!file) return

        const formDataObj = new FormData()
        formDataObj.append('image', file)

        try {
            setUploading(type)
            const res = await uploadImage(formDataObj).unwrap()
            if (res.success) {
                setFormData(prev => ({
                    ...prev,
                    [type === 'desktop' ? 'desktopImage' : 'mobileImage']: res.url
                }))
                toast.success(`${type === 'desktop' ? 'Desktop' : 'Mobile'} asset uploaded`)
            }
        } catch (error) {
            toast.error("Upload failed")
            console.error(error)
        } finally {
            setUploading(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const payload = { ...formData }
            // Handle Position Logic
            if (!payload.position && !customPosition) {
                toast.error("Please select a display zone or enter a custom key");
                return;
            }

            if (payload.position === 'custom' || !payload.position) {
                if (!customPosition) {
                    toast.error("Please enter a custom position key")
                    return
                }
                payload.position = customPosition
            }

            // Remove empty date strings to prevent DB errors if backend expects Date or null
            if (!payload.startDate) delete (payload as any).startDate
            if (!payload.endDate) delete (payload as any).endDate

            if (editingPromo) {
                await updatePromo({ id: editingPromo._id, ...payload }).unwrap()
                toast.success("Promo updated successfully")
            } else {
                await createPromo(payload).unwrap()
                toast.success("Promo created successfully")
            }
            setIsAddModalOpen(false)
            setEditingPromo(null)
            setFormData(initialFormState)
        } catch (error) {
            toast.error("Failed to save promo")
        }
    }

    const predefinedPositions = [
        { value: 'featured-top', label: 'Home: Top Featured (Split)' },
        { value: 'featured-bottom', label: 'Home: Bottom Featured' },
        { value: 'new-year-left', label: 'Home: Dual Grid Left' },
        { value: 'new-year-right', label: 'Home: Dual Grid Right' },
        { value: 'hero-main', label: 'Home: Hero Carousel' },
        { value: 'banner-strip', label: 'Site: Top Banner Strip' },
        { value: 'menu-engagement', label: 'Menu: Engagement Rings' },
        { value: 'menu-wedding', label: 'Menu: Wedding Rings' },
        { value: 'menu-diamonds', label: 'Menu: Diamonds' },
        { value: 'menu-gemstones', label: 'Menu: Gemstones' },
        { value: 'menu-jewelry', label: 'Menu: Jewelry' },
        { value: 'menu-gifts', label: 'Menu: Gifts' },
        { value: 'menu-about', label: 'Menu: About' }
    ]

    if (isLoading) return (
        <div className="p-20 flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-[#163E3E] rounded-full"></div>
        </div>
    )

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <Layout className="w-3.5 h-3.5" /> Content Management
                    </div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Digital Campaigns</h1>
                    <p className="text-slate-500 mt-1 max-w-xl text-sm">Orchestrate promotional narratives across digital touchpoints.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingPromo(null)
                        setFormData(initialFormState)
                        setIsAddModalOpen(true)
                        setActiveTab('content')
                    }}
                    className="flex items-center gap-2 bg-[#163E3E] text-white px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20 group active:scale-95"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Campaign</span>
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {promosData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((promo: any) => (
                    <div key={promo._id} className="group bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col">
                        <div className="relative h-56 bg-slate-50 overflow-hidden">
                            {promo.desktopImage ? (
                                <Image
                                    src={promo.desktopImage}
                                    alt={promo.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <ImageIcon className="w-12 h-12" />
                                </div>
                            )}

                            {/* Overlay Badge */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[9px] font-bold uppercase tracking-wider text-[#163E3E] shadow-sm">
                                    {promo.position}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <button
                                    onClick={() => handleEdit(promo)}
                                    className="p-2.5 bg-white rounded-full text-slate-600 hover:text-[#163E3E] hover:scale-110 shadow-lg transition-all"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(promo._id)}
                                    className="p-2.5 bg-white rounded-full text-slate-600 hover:text-rose-500 hover:scale-110 shadow-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Status Strip */}
                            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent">
                                <div
                                    className={`h-full transition-all duration-500 ${promo.status === 'Active' ? 'bg-emerald-500 w-full' : promo.status === 'Scheduled' ? 'bg-blue-500 w-1/2 mx-auto' : 'bg-slate-300 w-1/3 mx-auto'}`}
                                ></div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start gap-4 mb-3">
                                <h3 className="font-serif text-lg text-slate-900 leading-snug line-clamp-2" title={promo.title}>{promo.title}</h3>
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">{promo.description || "No description provided."}</p>

                            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                <span>{promo.status}</span>
                                <span>Priority: {promo.priority}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {promosData && promosData.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 pt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium text-slate-600">
                        Page {currentPage} of {Math.ceil(promosData.length / itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(Math.ceil(promosData.length / itemsPerPage), p + 1))}
                        disabled={currentPage === Math.ceil(promosData.length / itemsPerPage)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Premium Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="px-6 py-4 md:px-8 md:py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div>
                                <h2 className="text-xl md:text-2xl font-serif text-slate-900">{editingPromo ? 'Edit Campaign' : 'New Campaign'}</h2>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">
                                    {editingPromo ? `ID: ${editingPromo._id.slice(-6)}` : 'Draft Mode'}
                                </p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 md:p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-4 md:px-8 border-b border-slate-100 bg-white sticky top-0 z-10 overflow-x-auto no-scrollbar shrink-0">
                            {[
                                { id: 'content', label: 'Narrative & Info', icon: Type },
                                { id: 'media', label: 'Visual Assets', icon: ImageIcon },
                                { id: 'actions', label: 'Links & Actions', icon: MousePointer2 },
                                { id: 'settings', label: 'Scheduling & Config', icon: Calendar }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 md:px-6 py-4 md:py-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest relative transition-colors whitespace-nowrap
                                        ${activeTab === tab.id ? 'text-[#163E3E]' : 'text-slate-400 hover:text-slate-600'}
                                    `}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#163E3E]" />}
                                </button>
                            ))}
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto min-h-0 p-6 md:p-8 custom-scrollbar bg-white">
                            {/* CONTENT TAB */}
                            {activeTab === 'content' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Campaign Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                placeholder="e.g. Summer Diamond Sale"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Section Subtitle / Alt Text</label>
                                            <input
                                                type="text"
                                                value={formData.altText}
                                                onChange={e => setFormData({ ...formData, altText: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                placeholder="e.g. Just Dropped"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none h-32 resize-none leading-relaxed"
                                            placeholder="Write a compelling description for this campaign..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* MEDIA TAB */}
                            {activeTab === 'media' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Desktop Image */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Desktop Format</label>
                                                {uploading === 'desktop' && <span className="text-[10px] text-[#163E3E] font-bold animate-pulse">Uploading...</span>}
                                            </div>
                                            <div
                                                onClick={() => document.getElementById('desktop-upload')?.click()}
                                                className={`
                                                    aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden group
                                                    ${formData.desktopImage ? 'border-transparent' : 'border-slate-200 hover:border-[#163E3E]/30 bg-slate-50'}
                                                `}
                                            >
                                                {formData.desktopImage ? (
                                                    <>
                                                        <Image src={formData.desktopImage} alt="Desktop preview" fill className="object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-[#163E3E] transition-colors" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Desktop</span>
                                                    </>
                                                )}
                                                <input id="desktop-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'desktop')} disabled={!!uploading} />
                                            </div>
                                        </div>

                                        {/* Mobile Image */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mobile Format</label>
                                                {uploading === 'mobile' && <span className="text-[10px] text-[#163E3E] font-bold animate-pulse">Uploading...</span>}
                                            </div>
                                            <div
                                                onClick={() => document.getElementById('mobile-upload')?.click()}
                                                className={`
                                                    aspect-[3/4] md:aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden group
                                                    ${formData.mobileImage ? 'border-transparent' : 'border-slate-200 hover:border-[#163E3E]/30 bg-slate-50'}
                                                `}
                                            >
                                                {formData.mobileImage ? (
                                                    <>
                                                        <Image src={formData.mobileImage} alt="Mobile preview" fill className="object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-[#163E3E] transition-colors" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Mobile</span>
                                                    </>
                                                )}
                                                <input id="mobile-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'mobile')} disabled={!!uploading} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Image URL Override (Optional)</label>
                                        <input
                                            type="text"
                                            value={formData.desktopImage}
                                            onChange={e => setFormData({ ...formData, desktopImage: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none placeholder:text-slate-300"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* ACTIONS TAB */}
                            {activeTab === 'actions' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-[#163E3E] flex items-center justify-center text-white text-xs font-bold">1</div>
                                            <h3 className="text-sm font-bold text-slate-900">Primary Call-to-Action</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Button Label</label>
                                                <input
                                                    type="text"
                                                    value={formData.buttonText}
                                                    onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                    placeholder="Shop Now"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Destination URL</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.link}
                                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                    placeholder="/shop/new-arrivals"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6 opacity-75 hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-white text-xs font-bold">2</div>
                                            <h3 className="text-sm font-bold text-slate-900">Secondary Action (Optional)</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secondary Label</label>
                                                <input
                                                    type="text"
                                                    value={formData.secondaryButtonText}
                                                    onChange={e => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                    placeholder="Learn More"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secondary URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.secondaryLink}
                                                    onChange={e => setFormData({ ...formData, secondaryLink: e.target.value })}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                                    placeholder="/about-us"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Display Zone</label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={formData.position}
                                                onChange={e => setFormData({ ...formData, position: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none appearance-none"
                                            >
                                                <option value="" disabled>Select a display zone</option>
                                                {predefinedPositions.map(pos => (
                                                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                                                ))}
                                                <option value="custom">Custom Position Key</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <MousePointer2 className="w-4 h-4 text-slate-400" />
                                            </div>
                                        </div>
                                        {formData.position === 'custom' && (
                                            <input
                                                type="text"
                                                placeholder="Enter custom key (e.g. sidebar-ad)"
                                                value={customPosition}
                                                onChange={(e) => setCustomPosition(e.target.value)}
                                                className="w-full px-5 py-3.5 mt-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#163E3E]/10"
                                            />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Start Date</label>
                                            <input
                                                type="date"
                                                value={formData.startDate}
                                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">End Date</label>
                                            <input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none appearance-none"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Paused">Paused</option>
                                                <option value="Scheduled">Scheduled</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Text Content Theme</label>
                                            <select
                                                value={formData.theme}
                                                onChange={e => setFormData({ ...formData, theme: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none appearance-none"
                                            >
                                                <option value="light">Light (White Text)</option>
                                                <option value="dark">Dark (Black Text)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Priority Order</label>
                                            <input
                                                type="number"
                                                value={formData.priority}
                                                onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#163E3E]/10 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-8 py-3.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-10 py-3.5 bg-[#163E3E] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20 active:scale-95 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {editingPromo ? 'Update Campaign' : 'Launch Campaign'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

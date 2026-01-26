"use client"

import React, { useState } from 'react'
import {
    Plus,
    Trash2,
    ChevronRight,
    X,
    Layout,
    List,
    Image as ImageIcon,
    Edit2,
    Save,
    Type,
    Link as LinkIcon,
    Settings2,
    Eye,
    Zap,
    ArrowLeft,
    Monitor,
    MousePointer2,
    Palette
} from 'lucide-react'
import {
    useGetAdminMegaMenusQuery,
    useCreateMegaMenuMutation,
    useUpdateMegaMenuMutation,
    useDeleteMegaMenuMutation
} from '@/lib/redux/slices/categoriesApiSlice'
import { useUploadImageMutation } from '@/lib/redux/apiSlice'
import { toast } from 'sonner'

export default function MegaMenuBuilder() {
    const { data: menusData, isLoading } = useGetAdminMegaMenusQuery(undefined)
    const [createMenu] = useCreateMegaMenuMutation()
    const [updateMenu] = useUpdateMegaMenuMutation()
    const [deleteMenu] = useDeleteMegaMenuMutation()
    const [uploadImage] = useUploadImageMutation()

    const [editingMenu, setEditingMenu] = useState<any>(null)
    const [isBuilderOpen, setIsBuilderOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Form states for adding/editing a new top-level menu
    const [showNewMenuModal, setShowNewMenuModal] = useState(false)
    const [newMenuForm, setNewMenuForm] = useState({ name: "", slug: "", order: 0 })

    const menus = menusData?.data || []

    const handleOpenBuilder = (menu: any) => {
        setEditingMenu(JSON.parse(JSON.stringify(menu)))
        setIsBuilderOpen(true)
    }

    const handleSaveMenu = async () => {
        const loadingToast = toast.loading("Saving navigation structure...")
        try {
            await updateMenu({ id: editingMenu._id, ...editingMenu }).unwrap()
            toast.success(`${editingMenu.name} updated successfully`, { id: loadingToast })
            setIsBuilderOpen(false)
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to save menu", { id: loadingToast })
        }
    }

    const handleCreateMenu = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createMenu({ ...newMenuForm, columns: [], promo: {} }).unwrap()
            toast.success("New menu category created")
            setShowNewMenuModal(false)
            setNewMenuForm({ name: "", slug: "", order: 0 })
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to create menu")
        }
    }

    const handleDeleteMenu = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete the entire ${name} menu?`)) {
            try {
                await deleteMenu(id).unwrap()
                toast.success("Menu deleted")
            } catch (err) {
                toast.error("Failed to delete")
            }
        }
    }

    // Builder Helpers
    const addColumn = () => {
        const updated = { ...editingMenu }
        updated.columns = [...updated.columns, { groups: [] }]
        setEditingMenu(updated)
    }

    const removeColumn = (colIndex: number) => {
        const updated = { ...editingMenu }
        updated.columns.splice(colIndex, 1)
        setEditingMenu(updated)
    }

    const addGroup = (colIndex: number) => {
        const updated = { ...editingMenu }
        updated.columns[colIndex].groups.push({
            title: "New Section",
            type: "list",
            items: []
        })
        setEditingMenu(updated)
    }

    const addListItem = (colIndex: number, groupIndex: number) => {
        const updated = { ...editingMenu }
        updated.columns[colIndex].groups[groupIndex].items.push({
            label: "New Link",
            href: "#",
            icon: ""
        })
        setEditingMenu(updated)
    }

    const removeGroup = (colIndex: number, groupIndex: number) => {
        const updated = { ...editingMenu }
        updated.columns[colIndex].groups.splice(groupIndex, 1)
        setEditingMenu(updated)
    }

    const removeListItem = (colIndex: number, groupIndex: number, itemIndex: number) => {
        const updated = { ...editingMenu }
        updated.columns[colIndex].groups[groupIndex].items.splice(itemIndex, 1)
        setEditingMenu(updated)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formDataObj = new FormData()
        formDataObj.append('image', file)

        try {
            setUploading(true)
            const res = await uploadImage(formDataObj).unwrap()
            if (res.success) {
                const updated = { ...editingMenu }
                updated.promo = { ...updated.promo, image: res.url }
                setEditingMenu(updated)
                toast.success("Promo image uploaded to S3")
            }
        } catch (error) {
            toast.error("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Legend/Info Banner */}
            <div className="bg-gradient-to-r from-[#163E3E] to-[#1a4a4a] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-125"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <h1 className="text-4xl font-serif leading-tight">Master Navigation Builder</h1>
                        <p className="text-white/70 mt-3 text-lg font-light leading-relaxed">
                            A high-fidelity cockpit to orchestrate your website's complex Mega Menu architecture.
                            Seamlessly merge legacy categories with optimized data structures.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNewMenuModal(true)}
                        className="flex items-center gap-3 px-8 py-5 bg-white text-[#163E3E] rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#f0f0f0] transition-all shadow-xl hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" /> Create Master Entry
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-[#163E3E] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-serif italic text-lg">Synchronizing navigation nodes...</p>
                    </div>
                ) : (
                    menus.map((menu: any) => (
                        <div key={menu._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                            <div className="p-10 space-y-8">
                                <div className="flex items-start justify-between">
                                    <div className="w-16 h-16 bg-[#163E3E]/5 rounded-[1.5rem] flex items-center justify-center text-[#163E3E] group-hover:bg-[#163E3E] group-hover:text-white transition-colors duration-500">
                                        <Layout className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenBuilder(menu)}
                                            className="p-3 bg-slate-50 text-slate-400 hover:text-[#163E3E] hover:bg-[#163E3E]/5 rounded-xl transition-all"
                                            title="Edit Structure"
                                        >
                                            <Settings2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMenu(menu._id, menu.name)}
                                            className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete Menu"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#163E3E] transition-colors">{menu.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold rounded-lg uppercase tracking-widest">{menu.slug}</span>
                                        <span className="w-1.5 h-1.5 bg-[#163E3E] rounded-full"></span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{menu.columns.length} Active Columns</span>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-50">
                                    <button
                                        onClick={() => handleOpenBuilder(menu)}
                                        className="w-full py-4 bg-slate-50 text-[#163E3E] rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#163E3E] hover:text-white transition-all group-hover:shadow-lg translate-y-2 opacity-50 group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        Launch Builder <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* New Menu Modal */}
            {showNewMenuModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div>
                                <h2 className="text-2xl font-serif text-slate-900 italic">Create Master Entry</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Foundation for Mega Menu</p>
                            </div>
                            <button onClick={() => setShowNewMenuModal(false)} className="p-2 hover:bg-white rounded-full transition-shadow"><X className="w-6 h-6 text-slate-300" /></button>
                        </div>
                        <form onSubmit={handleCreateMenu} className="p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Menu Label</label>
                                    <input required className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-[#163E3E]/20 focus:bg-white rounded-2xl outline-none text-sm transition-all" placeholder="e.g. ENGAGEMENT RINGS" value={newMenuForm.name} onChange={e => setNewMenuForm({ ...newMenuForm, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Identity Slug</label>
                                    <input required className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-[#163E3E]/20 focus:bg-white rounded-2xl outline-none text-sm transition-all" placeholder="e.g. engagement-rings" value={newMenuForm.slug} onChange={e => setNewMenuForm({ ...newMenuForm, slug: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-5 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Initialize Entry</button>
                        </form>
                    </div>
                </div>
            )}

            {/* FULL SCREEN BUILDER - IMMERSIVE UI */}
            {isBuilderOpen && editingMenu && (
                <div className="fixed inset-0 z-[2000] bg-[#FAFBFC] flex flex-col animate-in slide-in-from-bottom-12 duration-700">
                    {/* Immersive Header */}
                    <div className="h-24 bg-white border-b border-slate-100 px-12 flex items-center justify-between flex-shrink-0 shadow-sm relative z-10">
                        <div className="flex items-center gap-10">
                            <button
                                onClick={() => setIsBuilderOpen(false)}
                                className="flex items-center gap-2 text-slate-400 hover:text-[#163E3E] transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Exit Builder</span>
                            </button>
                            <div className="h-8 w-px bg-slate-100"></div>
                            <div>
                                <h2 className="text-3xl font-serif text-slate-900 flex items-center gap-3">
                                    {editingMenu.name}
                                    <span className="px-3 py-1 bg-[#163E3E]/5 text-[#163E3E] rounded-lg text-[9px] font-bold uppercase tracking-widest font-sans italic">Haut-Couture Navigation</span>
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
                                <button className="p-2 text-slate-400 hover:bg-white hover:text-[#163E3E] rounded-xl transition-all" title="Desktop View"><Monitor className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-400 hover:bg-white hover:text-[#163E3E] rounded-xl transition-all" title="Interaction Map"><MousePointer2 className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-400 hover:bg-white hover:text-[#163E3E] rounded-xl transition-all" title="Color Palette"><Palette className="w-4 h-4" /></button>
                            </div>
                            <button
                                onClick={addColumn}
                                className="flex items-center gap-3 px-6 py-3.5 bg-white text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#163E3E]/30 border border-slate-200 shadow-sm transition-all"
                            >
                                <Plus className="w-4 h-4" /> Add Column
                            </button>
                            <button
                                onClick={handleSaveMenu}
                                className="flex items-center gap-3 px-8 py-3.5 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-2xl shadow-[#163E3E]/30 hover:-translate-y-0.5"
                            >
                                <Save className="w-4 h-4" /> Commit Changes
                            </button>
                        </div>
                    </div>

                    {/* Immersive Canvas */}
                    <div className="flex-1 overflow-x-auto p-20 custom-scrollbar relative">
                        {/* Background Grids */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50"></div>

                        <div className="flex items-start gap-12 min-w-max relative z-10 pb-20">
                            {editingMenu.columns.map((column: any, colIdx: number) => (
                                <div key={colIdx} className="w-96 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-slate-200/50 shadow-2xl flex flex-col group/col hover:border-[#163E3E]/20 transition-all duration-500">
                                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[#163E3E] text-white rounded-2xl flex items-center justify-center text-xs font-serif italic shadow-lg shadow-[#163E3E]/20">
                                                {colIdx + 1}
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Column Partition</span>
                                                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest">Section List</h4>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeColumn(colIdx)}
                                            className="p-2.5 bg-red-50 text-red-300 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover/col:opacity-100 scale-90"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-10 min-h-[500px]">
                                        {column.groups.map((group: any, gIdx: number) => (
                                            <div key={gIdx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group/group hover:shadow-xl transition-all duration-500">
                                                <button
                                                    onClick={() => removeGroup(colIdx, gIdx)}
                                                    className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 transition-all opacity-0 group-group:hover:opacity-100 z-10"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between gap-4 border-b border-slate-50 pb-5">
                                                        <input
                                                            className="bg-transparent flex-1 text-base font-bold text-slate-900 outline-none placeholder:text-slate-200 font-serif italic"
                                                            placeholder="Group Title (e.g. SHOP BY STYLE)"
                                                            value={group.title}
                                                            onChange={(e) => {
                                                                const updated = { ...editingMenu };
                                                                updated.columns[colIdx].groups[gIdx].title = e.target.value;
                                                                setEditingMenu(updated);
                                                            }}
                                                        />
                                                        <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                                            <select
                                                                className="bg-transparent text-[9px] font-bold text-[#163E3E] uppercase tracking-widest outline-none cursor-pointer"
                                                                value={group.type}
                                                                onChange={(e) => {
                                                                    const updated = { ...editingMenu };
                                                                    updated.columns[colIdx].groups[gIdx].type = e.target.value;
                                                                    setEditingMenu(updated);
                                                                }}
                                                            >
                                                                <option value="list">List</option>
                                                                <option value="icon-list">Icons</option>
                                                                <option value="grid-icons">Shape-Grid</option>
                                                                <option value="colors">Gem-Colors</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 pt-2">
                                                        {group.items.map((item: any, iIdx: number) => (
                                                            <div key={iIdx} className="flex items-center gap-3 group/item">
                                                                <div className="flex-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 flex flex-col gap-3 group-item:hover:bg-white group-item:hover:shadow-md transition-all">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 bg-white rounded-lg shadow-sm"><Type className="w-3 h-3 text-slate-400" /></div>
                                                                        <input
                                                                            className="bg-transparent flex-1 text-[11px] font-bold text-slate-700 outline-none"
                                                                            placeholder="Link Label"
                                                                            value={item.label}
                                                                            onChange={(e) => {
                                                                                const updated = { ...editingMenu };
                                                                                updated.columns[colIdx].groups[gIdx].items[iIdx].label = e.target.value;
                                                                                setEditingMenu(updated);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col gap-2 pl-10 border-l border-slate-100">
                                                                        <div className="flex items-center gap-2">
                                                                            <LinkIcon className="w-3 h-3 text-slate-300" />
                                                                            <input
                                                                                className="bg-transparent flex-1 text-[9px] font-mono text-slate-400 outline-none"
                                                                                placeholder="Route (e.g. /diamonds)"
                                                                                value={item.href}
                                                                                onChange={(e) => {
                                                                                    const updated = { ...editingMenu };
                                                                                    updated.columns[colIdx].groups[gIdx].items[iIdx].href = e.target.value;
                                                                                    setEditingMenu(updated);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {group.type === 'icon-list' && (
                                                                            <div className="flex items-center gap-2">
                                                                                <Zap className="w-3 h-3 text-amber-400" />
                                                                                <input
                                                                                    className="bg-transparent flex-1 text-[9px] font-bold text-slate-400 outline-none uppercase tracking-widest"
                                                                                    placeholder="Icon Name (e.g. Diamond)"
                                                                                    value={item.icon}
                                                                                    onChange={(e) => {
                                                                                        const updated = { ...editingMenu };
                                                                                        updated.columns[colIdx].groups[gIdx].items[iIdx].icon = e.target.value;
                                                                                        setEditingMenu(updated);
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => removeListItem(colIdx, gIdx, iIdx)}
                                                                    className="p-2 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-item:hover:opacity-100"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => addListItem(colIdx, gIdx)}
                                                            className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] hover:bg-slate-50 hover:border-[#163E3E]/20 hover:text-[#163E3E] transition-all"
                                                        >
                                                            + Append Entry
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addGroup(colIdx)}
                                            className="w-full py-6 bg-[#163E3E]/5 border border-[#163E3E]/10 rounded-[2.5rem] text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.3em] hover:bg-[#163E3E] hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl flex items-center justify-center gap-3 group"
                                        >
                                            <Plus className="w-4 h-4" /> New Menu Section
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* PROMO ENGINE - ALWAYS VISIBLE SIDEBAR */}
                            <div className="w-[28rem] space-y-8 sticky top-0">
                                <div className="bg-[#163E3E] rounded-[3.5rem] p-10 text-white shadow-[0_35px_60px_-15px_rgba(22,62,62,0.3)] relative overflow-hidden">
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                                    <h4 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] mb-10 border-b border-white/10 pb-6 italic font-serif">
                                        <ImageIcon className="w-5 h-5 text-white/50" /> Campaign Visuals
                                    </h4>

                                    <div className="space-y-8 relative z-10">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Campaign Backdrop</label>
                                                <button
                                                    onClick={() => document.getElementById('promo-upload')?.click()}
                                                    className="text-[9px] font-bold text-amber-400 hover:text-white transition-colors flex items-center gap-1"
                                                >
                                                    {uploading ? 'UPLOADING...' : 'UPLOAD NEW'}
                                                </button>
                                                <input
                                                    type="file"
                                                    id="promo-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white/10 transition-all font-mono"
                                                placeholder="https://images.unsplash.com/..."
                                                value={editingMenu.promo?.image || ""}
                                                onChange={e => {
                                                    const updated = { ...editingMenu };
                                                    updated.promo = { ...updated.promo, image: e.target.value };
                                                    setEditingMenu(updated);
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] px-1">Headline Text</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white/10 transition-all font-serif italic text-lg"
                                                placeholder="LIMITED TIME OFFER"
                                                value={editingMenu.promo?.title || ""}
                                                onChange={e => {
                                                    const updated = { ...editingMenu };
                                                    updated.promo = { ...updated.promo, title: e.target.value };
                                                    setEditingMenu(updated);
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] px-1">Engagement Message</label>
                                            <textarea
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white/10 transition-all resize-none leading-relaxed font-light italic"
                                                placeholder="Crafted with brilliance, designed for forever..."
                                                value={editingMenu.promo?.text || ""}
                                                onChange={e => {
                                                    const updated = { ...editingMenu };
                                                    updated.promo = { ...updated.promo, text: e.target.value };
                                                    setEditingMenu(updated);
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] px-1">Redeem Code</label>
                                                <input
                                                    className="w-full bg-amber-400 text-[#163E3E] border-none rounded-2xl px-6 py-4 text-[10px] font-bold outline-none text-center tracking-[0.2em]"
                                                    placeholder="DIAMOND"
                                                    value={editingMenu.promo?.code || ""}
                                                    onChange={e => {
                                                        const updated = { ...editingMenu };
                                                        updated.promo = { ...updated.promo, code: e.target.value };
                                                        setEditingMenu(updated);
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] px-1">Action Destination</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:bg-white/10 transition-all font-mono"
                                                    placeholder="/seasonal-sale"
                                                    value={editingMenu.promo?.link || ""}
                                                    onChange={e => {
                                                        const updated = { ...editingMenu };
                                                        updated.promo = { ...updated.promo, link: e.target.value };
                                                        setEditingMenu(updated);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center gap-3">
                                        <Eye className="w-5 h-5 opacity-40" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 italic">Live Meta-Sync Active</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-6">
                                    <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-500" /> Professional Insight
                                    </h5>
                                    <p className="text-[11px] text-slate-500 leading-relaxed font-light italic">
                                        This optimized Mega Menu model bypasses traditional category nesting for faster performance and easier admin agility. All changes are reflected instantly in the store globally.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

"use client"

import React, { useState } from 'react'
import { Plus, List, Link as LinkIcon, Trash2, GripVertical, ChevronRight, X, Info } from 'lucide-react'

const initialNavigation = [
    { id: 1, label: "Engagement Rings", link: "/engagement-rings", items: 12 },
    { id: 2, label: "Loose Diamonds", link: "/diamonds", items: 8 },
    { id: 3, label: "Gemstones", link: "/gemstones", items: 6 },
    { id: 4, label: "Wedding Rings", link: "/wedding-rings", items: 10 },
]

export default function NavigationManagement() {
    const [navItems, setNavItems] = useState(initialNavigation)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newItem, setNewItem] = useState({ label: "", link: "", icon: "", alt: "" })

    const handleDelete = (id: number) => {
        if (confirm("Remove this menu item?")) {
            setNavItems(navItems.filter(item => item.id !== id))
        }
    }

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault()
        const itemToAdd = {
            id: navItems.length + 1,
            label: newItem.label,
            link: newItem.link,
            items: 0
        }
        setNavItems([...navItems, itemToAdd])
        setIsModalOpen(false)
        setNewItem({ label: "", link: "", icon: "", alt: "" })
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Navigation Menu</h1>
                    <p className="text-slate-500 mt-1 text-sm">Configure your website's header and footer navigation structure.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md"
                >
                    <Plus className="w-4 h-4" /> Add Menu Item
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 space-y-4">
                    {navItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl transition-all cursor-move group">
                            <GripVertical className="w-4 h-4 text-slate-300" />
                            <div className="flex-1 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg text-[#163E3E] shadow-sm">
                                        <List className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{item.link}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.items} sub-items</span>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-400 hover:text-[#163E3E] transition-colors"><ChevronRight className="w-4 h-4" /></button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add New Item Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-xl font-serif text-slate-900">Configure Menu Item</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handleAddItem} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menu Label</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none" placeholder="e.g. Fine Jewelry" value={newItem.label} onChange={(e) => setNewItem({ ...newItem, label: e.target.value })} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target URL</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none" placeholder="/jewelry" value={newItem.link} onChange={(e) => setNewItem({ ...newItem, link: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Icon Identifier (Optional)</label>
                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none" placeholder="e.g. diamond-icon" value={newItem.icon} onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alt/Aria Label</label>
                                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-xl text-sm outline-none" placeholder="Screen reader text..." value={newItem.alt} onChange={(e) => setNewItem({ ...newItem, alt: e.target.value })} />
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
                                <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                                <p className="text-[10px] text-blue-700 leading-relaxed font-medium capitalize">Menu items are top-level triggers for mega-menus. Sub-items can be added once the primary category is created.</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">Discard</button>
                                <button type="submit" className="flex-1 py-4 bg-[#163E3E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#123333] transition-all shadow-xl shadow-[#163E3E]/20">Save Menu Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

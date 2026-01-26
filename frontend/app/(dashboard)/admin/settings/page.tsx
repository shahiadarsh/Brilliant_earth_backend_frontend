"use client"

import React, { useState, useEffect } from 'react'
import {
    Settings,
    Shield,
    User,
    Save,
    Globe,
    Bell,
    Lock,
    CreditCard,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    Sparkles
} from 'lucide-react'
import {
    useGetSettingsQuery,
    useUpdateSettingsMutation
} from '@/lib/redux/slices/settingsApiSlice'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

export default function SettingsPage() {
    const { user } = useSelector((state: any) => state.auth)
    const { data: settingsData, isLoading } = useGetSettingsQuery({})
    const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation()

    const [activeTab, setActiveTab] = useState<'site' | 'profile' | 'security'>('site')

    const [siteData, setSiteData] = useState({
        siteName: '',
        contactEmail: '',
        contactPhone: '',
        address: ''
    })

    useEffect(() => {
        if (settingsData?.data?.settings) {
            setSiteData({
                siteName: settingsData.data.settings.siteName || '',
                contactEmail: settingsData.data.settings.contactEmail || '',
                contactPhone: settingsData.data.settings.contactPhone || '',
                address: settingsData.data.settings.address || ''
            })
        }
    }, [settingsData])

    const handleSave = async () => {
        try {
            await updateSettings(siteData).unwrap()
            toast.success("Enterprise settings updated successfully")
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update configuration")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-[#163E3E] rounded-full animate-spin"></div>
            </div>
        )
    }

    const tabs = [
        { id: 'site', label: 'Site Configuration', icon: <Globe className="w-4 h-4" />, description: 'Branding & Global Details' },
        { id: 'profile', label: 'Administrator Profile', icon: <User className="w-4 h-4" />, description: 'Personal Identity' },
        { id: 'security', label: 'Security & Access', icon: <Shield className="w-4 h-4" />, description: 'Privacy & Protections' },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] mb-2">
                        <Settings className="w-3.5 h-3.5" /> System Control
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 leading-tight">Admin Settings</h1>
                    <p className="text-slate-500 mt-1 max-w-xl">Configure your environment, manage administrative access, and fine-tune global parameters.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex items-center gap-3 px-8 py-4 bg-[#163E3E] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#163E3E]/20 disabled:bg-slate-300 active:scale-95 group"
                >
                    {isUpdating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    ) : (
                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    {isUpdating ? "Processing..." : "Commit Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white p-2 rounded-[32px] border border-slate-100 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all group relative overflow-hidden
                                    ${activeTab === tab.id ? 'bg-[#163E3E] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
                                `}
                            >
                                <div className={`p-2.5 rounded-xl transition-colors
                                    ${activeTab === tab.id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-[#163E3E] group-hover:bg-white'}
                                `}>
                                    {tab.icon}
                                </div>
                                <div className="text-left">
                                    <p className="text-[11px] font-bold uppercase tracking-wider">{tab.label}</p>
                                    <p className={`text-[10px] mt-0.5 ${activeTab === tab.id ? 'text-white/60' : 'text-slate-400'}`}>{tab.description}</p>
                                </div>
                                {activeTab === tab.id && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-white" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-emerald-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                            <Sparkles className="w-20 h-20" />
                        </div>
                        <h4 className="font-serif text-lg mb-2 relative z-10">System Integrity</h4>
                        <p className="text-white/60 text-xs leading-relaxed relative z-10">Always review your SEO metadata and contact details before committing changes to the production environment.</p>
                        <div className="mt-6 flex items-center gap-2 relative z-10">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9FEFBF]">API Connection Active</span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 min-h-[500px]">
                        {activeTab === 'site' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                    <h3 className="text-2xl font-serif text-slate-900">Site Configuration</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                        <Globe className="w-3.5 h-3.5" /> Public Branding & Information
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Global Site Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10"
                                                value={siteData.siteName}
                                                onChange={(e) => setSiteData({ ...siteData, siteName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Master Support Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input
                                                type="email"
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10"
                                                value={siteData.contactEmail}
                                                onChange={(e) => setSiteData({ ...siteData, contactEmail: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Institutional Contact No.</label>
                                        <div className="relative">
                                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input
                                                type="text"
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10"
                                                value={siteData.contactPhone}
                                                onChange={(e) => setSiteData({ ...siteData, contactPhone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Corporate Headquarters Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <input
                                                type="text"
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-900 outline-none shadow-sm focus:ring-2 focus:ring-[#163E3E]/10"
                                                value={siteData.address}
                                                onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                    <h3 className="text-2xl font-serif text-slate-900">Administrator Profile</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Identity & Credentials
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-12 pt-4">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-[#163E3E]/5 border-2 border-dashed border-[#163E3E]/20 flex items-center justify-center overflow-hidden">
                                            <User className="w-12 h-12 text-[#163E3E]/20" />
                                        </div>
                                        <button className="absolute bottom-1 right-1 p-2 bg-white border border-slate-100 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                            <Save className="w-3.5 h-3.5 text-[#163E3E]" />
                                        </button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Display Name</label>
                                            <input
                                                type="text"
                                                disabled
                                                className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-400 outline-none shadow-inner cursor-not-allowed"
                                                defaultValue={user?.name || "Ritzin Administrative Unit"}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Principal Auth Email</label>
                                            <input
                                                type="text"
                                                disabled
                                                className="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-400 outline-none shadow-inner cursor-not-allowed"
                                                defaultValue={user?.email || "admin@ritzin.com"}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100/50 flex items-center gap-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm"><Shield className="w-6 h-6 text-blue-500" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-900">Governance Policy</p>
                                        <p className="text-xs text-blue-700/60 leading-relaxed mt-1">Profile data is synchronized with your core authentication identity. To change your primary email, please contact the network supervisor.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                    <h3 className="text-2xl font-serif text-slate-900">Security & Access Control</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                        <Lock className="w-3.5 h-3.5" /> Environmental Protections
                                    </p>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <div className="p-8 bg-slate-50 rounded-[32px] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-[#163E3E] group-hover:scale-110 transition-all duration-500">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Multi-Factor Authentication</p>
                                                <p className="text-xs text-slate-400 mt-1">Strengthen your vault with a secondary verification pulse.</p>
                                            </div>
                                        </div>
                                        <div className="w-14 h-8 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                                            <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-50 rounded-[32px] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-amber-500 group-hover:scale-110 transition-all duration-500">
                                                <Lock className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Password Encryption Ceremony</p>
                                                <p className="text-xs text-slate-400 mt-1">Rotate your master credentials routinely for maximum safety.</p>
                                            </div>
                                        </div>
                                        <button disabled className="px-6 py-3 bg-white border border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-50 cursor-not-allowed">Rotate Key</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

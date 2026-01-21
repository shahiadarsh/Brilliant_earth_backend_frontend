"use client"

import React, { useState, useEffect } from 'react'
import { Settings, Shield, User, Save, Globe } from 'lucide-react'
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
            toast.success("Settings updated successfully")
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update settings")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#163E3E]"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div>
                <h1 className="text-3xl font-serif text-slate-900 leading-tight">Admin Settings</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage your profile, security preferences, and global configurations.</p>
            </div>

            <div className="space-y-8">
                {/* Site Configuration */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Globe className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Site Configuration</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Site Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                                value={siteData.siteName}
                                onChange={(e) => setSiteData({ ...siteData, siteName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                                value={siteData.contactEmail}
                                onChange={(e) => setSiteData({ ...siteData, contactEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><User className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Profile Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                            <input
                                type="text"
                                disabled
                                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm opacity-60 cursor-not-allowed"
                                defaultValue={user?.name || "Admin"}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                disabled
                                className="w-full px-4 py-3 bg-slate-100 border-none rounded-xl text-sm opacity-60 cursor-not-allowed"
                                defaultValue={user?.email || "admin@ritzin.com"}
                            />
                        </div>
                    </div>
                    <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-tighter">* Profile updates are managed via auth service</p>
                </section>

                {/* Security Section */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Shield className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Security & Privacy</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <div>
                                <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                                <p className="text-xs text-slate-400 mt-1">Add an extra layer of security to your account.</p>
                            </div>
                            <div className="w-12 h-6 bg-slate-200 rounded-full relative shadow-inner">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <button
                            disabled
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all opacity-50"
                        >
                            Change Password
                        </button>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-8 py-4 bg-[#163E3E] text-white rounded-xl text-sm font-bold hover:bg-[#123333] transition-all shadow-xl disabled:bg-slate-400"
                    >
                        {isUpdating ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isUpdating ? "Saving..." : "Save All Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}


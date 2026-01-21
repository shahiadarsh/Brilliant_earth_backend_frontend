import React from 'react'
import { Settings, Shield, User, Save } from 'lucide-react'
import {
    useGetSettingsQuery,
    useUpdateSettingsMutation
} from '@/lib/redux/slices/settingsApiSlice'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

export default function SettingsPage() {
    const { user } = useSelector((state: any) => state.auth)
    const { data: settingsData, isLoading } = useGetSettingsQuery({})
    const [updateSettings] = useUpdateSettingsMutation()

    const handleSave = async () => {
        toast.info("Settings update simulated. Real profile updates require auth profile endpoint.")
    }

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-serif text-slate-900 leading-tight">Admin Settings</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage your profile, security preferences, and global configurations.</p>
            </div>

            <div className="space-y-8">
                {/* Profile Section */}
                <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><User className="w-6 h-6" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Profile Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none" defaultValue={user?.name || "Admin"} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none" defaultValue={user?.email || "admin@ritzin.com"} />
                        </div>
                    </div>
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
                            <div className="w-12 h-6 bg-emerald-500 rounded-full relative shadow-inner">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                            Change Password
                        </button>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-8 py-4 bg-[#163E3E] text-white rounded-xl text-sm font-bold hover:bg-[#123333] transition-all shadow-xl"
                    >
                        <Save className="w-4 h-4" /> Save All Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

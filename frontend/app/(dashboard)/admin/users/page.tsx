"use client"

import React, { useState, useEffect } from 'react'
import {
    Users,
    Search,
    Mail,
    Shield,
    Trash2,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Calendar,
    Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/v1/admin/management/users?search=${searchQuery}`)
            const result = await response.json()
            if (result.success) {
                setUsers(result.data)
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    // Server-side filtering is active, so we use the users state directly
    const filteredUsers = users

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900">User Management</h1>
                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Manage all registered users and their permissions
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/50 backdrop-blur-sm border-slate-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Users</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">{users.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-sm border-slate-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Today</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                                    {users.filter(u => new Date(u.updatedAt).toDateString() === new Date().toDateString()).length}
                                </h3>
                            </div>
                            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white/50 backdrop-blur-sm border-slate-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admins</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-1">{users.filter(u => u.role === 'admin').length}</h3>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <Shield className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Control Header */}
            <Card className="overflow-hidden border-slate-100 shadow-lg">
                <CardHeader className="bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4 py-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-xl h-11 px-6">
                            <Filter className="w-4 h-4 mr-2" /> Filters
                        </Button>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed Up</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-10 w-48 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-24 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 w-32 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-6 py-4"><div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-50 rounded-full">
                                                <Users className="w-10 h-10 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">No users found</p>
                                                <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#163E3E] text-white flex items-center justify-center font-bold text-sm">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Badge
                                            variant="outline"
                                            className={`rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider
                                                ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}
                                            `}
                                        >
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {user.isVerified ? (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                    <XCircle className="w-3 h-3" /> Unverified
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Showing {filteredUsers.length} of {users.length} users
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl px-6 h-10 text-[11px] font-bold uppercase tracking-widest disabled:opacity-50" disabled>Previous</Button>
                        <Button variant="outline" size="sm" className="rounded-xl px-6 h-10 text-[11px] font-bold uppercase tracking-widest disabled:opacity-50" disabled>Next Page</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

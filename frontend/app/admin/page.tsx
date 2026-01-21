"use client"

import React from 'react'
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Plus,
    Filter,
    Download
} from 'lucide-react'

import {
    useGetStatsQuery,
    useGetInventoryAlertsQuery,
    useGetRecentTransactionsQuery
} from '@/lib/redux/slices/dashboardApiSlice'

export default function Dashboard() {
    const { data: statsData, isLoading: statsLoading } = useGetStatsQuery({});
    const { data: alertsData, isLoading: alertsLoading } = useGetInventoryAlertsQuery({});
    const { data: transactionsData, isLoading: transactionsLoading } = useGetRecentTransactionsQuery({});

    const dashboardStats = [
        {
            title: "Total Revenue",
            value: statsLoading ? "..." : `$${statsData?.data?.totalSales?.toLocaleString() || "0.00"}`,
            change: "+12.5%",
            trend: "up",
            icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
            bg: "bg-emerald-50"
        },
        {
            title: "Active Orders",
            value: statsLoading ? "..." : statsData?.data?.activeOrders || "0",
            change: "+3",
            trend: "up",
            icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50"
        },
        {
            title: "Total Customers",
            value: statsLoading ? "..." : statsData?.data?.userCount || "0",
            change: "+18%",
            trend: "up",
            icon: <Users className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50"
        },
        {
            title: "Inventory Health",
            value: "92%",
            change: "-2%",
            trend: "down",
            icon: <Package className="w-6 h-6 text-orange-600" />,
            bg: "bg-orange-50"
        }
    ]

    const recentOrders = transactionsData?.data?.recentOrders || []

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1 text-sm">Welcome back, Adarsh. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-4 h-4" /> Export Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#163E3E] text-white rounded-lg text-sm font-medium hover:bg-[#123333] transition-all shadow-md">
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between">
                            <div className={`${stat.bg} p-3 rounded-xl transition-transform group-hover:scale-110 duration-300`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Split */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Orders List */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                        <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
                        <button className="text-xs font-bold text-[#163E3E] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        {transactionsLoading ? (
                            <div className="p-8 text-center text-slate-400">Loading transactions...</div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-slate-50">
                                        <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Order ID</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Customer</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total</th>
                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Status</th>
                                        <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentOrders.map((order: any) => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-4 text-xs font-bold text-[#163E3E]">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-slate-900">{order.user?.firstName} {order.user?.lastName}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">{order.user?.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">${order.totalPrice}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${order.isDelivered ? 'bg-emerald-50 text-emerald-600' :
                                                        order.isPaid ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}
                                                `}>
                                                    {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-medium text-slate-900 text-right">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {recentOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-10 text-center text-slate-400 text-sm italic">No recent transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Activity or Tools */}
                <div className="space-y-8">
                    {/* Quick Tools */}
                    <div className="bg-[#163E3E] p-8 rounded-2xl shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h4 className="text-xl font-serif italic relative z-10">Sales Goal</h4>
                        <div className="mt-6 flex items-end gap-3 relative z-10">
                            <span className="text-4xl font-bold">${statsLoading ? "..." : (statsData?.data?.totalSales / 1000).toFixed(0)}k</span>
                            <span className="text-white/60 text-sm mb-1 pb-1">/ $150k target</span>
                        </div>
                        <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden relative z-10">
                            <div
                                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000"
                                style={{ width: `${Math.min((statsData?.data?.totalSales / 150000) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <p className="mt-6 text-xs text-white/50 leading-relaxed font-light relative z-10">
                            You're almost there! Keep focusing on the 2026 Trend Report products to hit your goal.
                        </p>
                    </div>

                    {/* Inventory Health */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Low Stock Alert</h3>
                            <div className="bg-rose-50 text-rose-500 p-1.5 rounded-lg">
                                <Plus className="w-4 h-4 rotate-45" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {alertsLoading ? (
                                <p className="text-xs text-slate-400">Checking inventory...</p>
                            ) : (
                                alertsData?.data?.alerts?.map((item: any, i: number) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-700">{item.name}</span>
                                            <span className="text-slate-400">{item.stock} left</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.stock < 2 ? 'bg-rose-500' : 'bg-orange-400'} rounded-full transition-all duration-1000`}
                                                style={{ width: `${(item.stock / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {(!alertsLoading && alertsData?.data?.alerts?.length === 0) && (
                                <p className="text-xs text-emerald-600 font-medium">✨ All inventory levels are healthy.</p>
                            )}
                        </div>
                        <button className="w-full py-3 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-slate-100 transition-colors mt-2">
                            Restock Inventory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

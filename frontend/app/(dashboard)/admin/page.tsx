"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ShoppingBag,
    Layers,
    Package,
    DollarSign,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Plus,
    PlusCircle,
    Eye,
    ArrowRight,
    Calendar,
    Users,
    Filter,
    FileText,
    Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// ========================================
// DASHBOARD HOME PAGE
// ========================================

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: { total: 0, change: 0 },
        categories: { total: 0, change: 0 },
        orders: { total: 0, change: 0 },
        revenue: { total: 0, change: 0 }
    })

    const [loading, setLoading] = useState(true)

    // Fetch dashboard stats
    useEffect(() => {
        fetchDashboardStats()
    }, [])

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch('/api/v1/admin/management/dashboard/stats')
            const result = await response.json()

            if (result.success) {
                const { counts, alerts, recentOrders, recentUsers } = result.data
                setStats({
                    products: { total: (counts.rings || 0) + (counts.diamonds || 0), change: 0 },
                    categories: { total: counts.users || 0, change: 0 }, // Using users count for now as placeholder
                    orders: { total: counts.orders || 0, change: 0 },
                    revenue: { total: counts.revenue || 0, change: 0 }
                })
                // We'll pass the rest of the data to sub-components
                setDashboardData(result.data)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching stats:', error)
            setLoading(false)
        }
    }

    const [dashboardData, setDashboardData] = useState<any>(null)

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 7 Days
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Products */}
                <StatsCard
                    title="Total Products"
                    value={stats.products.total}
                    change={stats.products.change}
                    icon={<Package className="w-6 h-6" />}
                    color="blue"
                    loading={loading}
                />

                {/* Total Categories */}
                <StatsCard
                    title="Categories"
                    value={stats.categories.total}
                    change={stats.categories.change}
                    icon={<Layers className="w-6 h-6" />}
                    color="purple"
                    loading={loading}
                />

                {/* Total Orders */}
                <StatsCard
                    title="Orders (Today)"
                    value={stats.orders.total}
                    change={stats.orders.change}
                    icon={<ShoppingBag className="w-6 h-6" />}
                    color="green"
                    loading={loading}
                />

                {/* Revenue */}
                <StatsCard
                    title="Revenue (Today)"
                    value={`$${stats.revenue.total.toLocaleString()}`}
                    change={stats.revenue.change}
                    icon={<DollarSign className="w-6 h-6" />}
                    color="orange"
                    loading={loading}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Sales Chart */}
                    <Card className="border-slate-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Growth Analysis
                            </CardTitle>
                            <CardDescription>Visual representation of your performance</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="h-[350px] flex items-center justify-center bg-white relative">
                                <div className="absolute inset-x-8 inset-y-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 flex items-center justify-center">
                                    <p className="text-slate-400 text-sm font-medium">Analytics Engine Visualizing Data...</p>
                                </div>
                                {/* TODO: Add Recharts Line Chart */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Orders */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
                            <div>
                                <CardTitle className="text-lg">Recent Orders</CardTitle>
                                <CardDescription>Latest transactions in your store</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="rounded-xl">
                                <Link href="/admin/orders">
                                    View All
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <RecentOrdersList orders={dashboardData?.recentOrders} />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                    {/* New Signups */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="border-b border-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-500" />
                                New Customers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <RecentUsersList users={dashboardData?.recentUsers} />
                            <Button variant="outline" className="w-full mt-4 rounded-xl border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] h-11" asChild>
                                <Link href="/admin/users">Manage All Users</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Stock Alerts */}
                    <Card className="border-slate-100 shadow-sm bg-[#163E3E]/[0.02]">
                        <CardHeader className="border-b border-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                Inventory Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <DashboardAlerts alerts={dashboardData?.alerts} />
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="border-b border-slate-50">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Plus className="w-5 h-5 text-green-500" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-6">
                            <QuickActionButton
                                href="/admin/catalog/rings"
                                icon={<Package className="w-4 h-4" />}
                                label="Add Diamond Ring"
                                description="Create new setting"
                            />
                            <QuickActionButton
                                href="/admin/catalog/necklaces"
                                icon={<PlusCircle className="w-4 h-4" />}
                                label="Add Necklace"
                                description="New jewelry piece"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// ========================================
// STATS CARD COMPONENT
// ========================================

interface StatsCardProps {
    title: string
    value: string | number
    change: number
    icon: React.ReactNode
    color: 'blue' | 'purple' | 'green' | 'orange'
    loading?: boolean
}

function StatsCard({ title, value, change, icon, color, loading }: StatsCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600'
    }

    const isPositive = change >= 0

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                        {icon}
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                    <div className="flex items-center gap-1 text-sm">
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                            {isPositive ? '+' : ''}{change}%
                        </span>
                        <span className="text-slate-500">vs last week</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ========================================
// QUICK ACTION BUTTON
// ========================================

interface QuickActionButtonProps {
    href: string
    icon: React.ReactNode
    label: string
    description: string
}

function QuickActionButton({ href, icon, label, description }: QuickActionButtonProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200"
        >
            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </Link>
    )
}

// ========================================
// ALERT ITEM
// ========================================

interface AlertItemProps {
    type: 'warning' | 'danger' | 'info'
    count: number
    label: string
    href: string
}

function AlertItem({ type, count, label, href }: AlertItemProps) {
    const typeStyles = {
        warning: 'bg-orange-50 text-orange-600 border-orange-200',
        danger: 'bg-red-50 text-red-600 border-red-200',
        info: 'bg-blue-50 text-blue-600 border-blue-200'
    }

    return (
        <Link
            href={href}
            className={`flex items-center justify-between p-3 rounded-lg border ${typeStyles[type]} hover:shadow-md transition-all`}
        >
            <div className="flex items-center gap-3">
                <div className="font-bold text-lg">{count}</div>
                <span className="text-sm font-medium">{label}</span>
            </div>
            <ArrowRight className="w-4 h-4" />
        </Link>
    )
}

// ========================================
// STATUS ITEM
// ========================================

interface StatusItemProps {
    label: string
    status: 'healthy' | 'warning' | 'error'
}

function StatusItem({ label, status }: StatusItemProps) {
    const statusConfig = {
        healthy: { color: 'bg-green-500', text: 'Healthy' },
        warning: { color: 'bg-orange-500', text: 'Warning' },
        error: { color: 'bg-red-500', text: 'Error' }
    }

    const config = statusConfig[status]

    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-600">{label}</span>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
                <span className="text-xs font-medium text-slate-700">{config.text}</span>
            </div>
        </div>
    )
}

// ========================================
// RECENT ORDERS LIST
// ========================================

function RecentOrdersList({ orders }: { orders: any[] }) {
    if (!orders || orders.length === 0) {
        return <div className="py-10 text-center text-slate-400 text-sm">No recent orders</div>
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order._id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                            {order.user?.firstName} {order.user?.lastName}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">Order #{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-[#163E3E]">${order.totalPrice?.toLocaleString()}</p>
                        <Badge className={`${order.isPaid ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'} text-[10px] uppercase tracking-wider`}>
                            {order.isPaid ? 'Paid' : 'Pending'}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ========================================
// RECENT USERS LIST
// ========================================

function RecentUsersList({ users }: { users: any[] }) {
    if (!users || users.length === 0) {
        return <div className="py-10 text-center text-slate-400 text-sm">No recent signups</div>
    }

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div key={user._id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all">
                    <div className="w-10 h-10 bg-[#163E3E] text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                        {user.role}
                    </Badge>
                </div>
            ))}
        </div>
    )
}

// ========================================
// CATEGORY OVERVIEW (Renamed to Alerts/Stats)
// ========================================

function DashboardAlerts({ alerts }: { alerts: any }) {
    const lowStock = alerts?.lowStock || []

    return (
        <div className="space-y-4">
            {lowStock.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-sm">No low stock alerts</div>
            ) : (
                lowStock.map((item: any) => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            <div>
                                <p className="text-sm font-bold text-slate-900">{item.name}</p>
                                <p className="text-xs text-orange-600 font-medium">Only {item.stock} left in stock</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-orange-700" asChild>
                            <Link href="/admin/catalog/rings">Restock</Link>
                        </Button>
                    </div>
                ))
            )}
        </div>
    )
}

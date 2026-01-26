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
            // TODO: Replace with actual API calls
            // const response = await fetch('/api/v1/admin/dashboard/stats')
            // const data = await response.json()

            // Mock data for now
            setStats({
                products: { total: 245, change: 12 },
                categories: { total: 12, change: 2 },
                orders: { total: 48, change: 5 },
                revenue: { total: 12450, change: 8.5 }
            })
            setLoading(false)
        } catch (error) {
            console.error('Error fetching stats:', error)
            setLoading(false)
        }
    }

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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Sales Overview
                            </CardTitle>
                            <CardDescription>Your sales performance this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
                                <p className="text-slate-400">Chart will be rendered here</p>
                                {/* TODO: Add Recharts Line Chart */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Products */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Products</CardTitle>
                                <CardDescription>Latest products added to inventory</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/catalog/rings">
                                    View All
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <RecentProductsList />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-green-500" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <QuickActionButton
                                href="/admin/catalog/rings/new"
                                icon={<Package className="w-4 h-4" />}
                                label="Add Product"
                                description="Create new product"
                            />
                            <QuickActionButton
                                href="/admin/catalog/categories/new"
                                icon={<Layers className="w-4 h-4" />}
                                label="Add Category"
                                description="Create new category"
                            />
                            <QuickActionButton
                                href="/admin/catalog/filters/new"
                                icon={<Filter className="w-4 h-4" />}
                                label="Add Filter"
                                description="Create new filter"
                            />
                            <QuickActionButton
                                href="/admin/orders"
                                icon={<ShoppingBag className="w-4 h-4" />}
                                label="View Orders"
                                description="Manage orders"
                            />
                        </CardContent>
                    </Card>

                    {/* Alerts & Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <AlertItem
                                type="warning"
                                count={5}
                                label="Low Stock Items"
                                href="/admin/catalog/rings?filter=low-stock"
                            />
                            <AlertItem
                                type="danger"
                                count={2}
                                label="Out of Stock"
                                href="/admin/catalog/rings?filter=out-of-stock"
                            />
                            <AlertItem
                                type="info"
                                count={3}
                                label="Pending Orders"
                                href="/admin/orders?status=pending"
                            />
                        </CardContent>
                    </Card>

                    {/* System Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">System Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <StatusItem label="Database" status="healthy" />
                            <StatusItem label="API Server" status="healthy" />
                            <StatusItem label="Image Storage" status="healthy" />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Section - Category Overview */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Category Overview</CardTitle>
                        <CardDescription>Products distribution across categories</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/catalog/categories">
                            Manage Categories
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <CategoryOverview />
                </CardContent>
            </Card>
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
// RECENT PRODUCTS LIST
// ========================================

function RecentProductsList() {
    // TODO: Fetch from API
    const products = [
        { id: 1, name: 'Petite Pavé Diamond Ring', category: 'Engagement Rings', price: 1890, image: '/placeholder.jpg' },
        { id: 2, name: 'Classic Solitaire Ring', category: 'Engagement Rings', price: 2450, image: '/placeholder.jpg' },
        { id: 3, name: 'Halo Diamond Ring', category: 'Engagement Rings', price: 3200, image: '/placeholder.jpg' },
    ]

    return (
        <div className="space-y-3">
            {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">${product.price}</p>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ========================================
// CATEGORY OVERVIEW
// ========================================

function CategoryOverview() {
    // TODO: Fetch from API
    const categories = [
        { name: 'Engagement Rings', count: 120, percentage: 49 },
        { name: 'Wedding Rings', count: 85, percentage: 35 },
        { name: 'Gemstones', count: 30, percentage: 12 },
        { name: 'Jewelry', count: 10, percentage: 4 },
    ]

    return (
        <div className="space-y-4">
            {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">{category.name}</span>
                        <span className="text-slate-500">{category.count} products ({category.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-all"
                            style={{ width: `${category.percentage}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

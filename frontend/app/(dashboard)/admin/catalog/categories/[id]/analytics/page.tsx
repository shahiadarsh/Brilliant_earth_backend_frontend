"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Eye,
    MousePointerClick,
    ShoppingCart,
    Users,
    Calendar,
    Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function CategoryAnalyticsPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [loading, setLoading] = useState(true)
    const [timeRange, setTimeRange] = useState('7days')
    const [categoryName, setCategoryName] = useState('')
    const [analytics, setAnalytics] = useState({
        overview: {
            pageViews: 0,
            uniqueVisitors: 0,
            clicks: 0,
            conversionRate: 0,
            avgTimeOnPage: 0,
            bounceRate: 0
        },
        trends: {
            pageViewsChange: 0,
            visitorsChange: 0,
            clicksChange: 0,
            conversionChange: 0
        },
        topProducts: [],
        topSubcategories: [],
        trafficSources: []
    })

    useEffect(() => {
        fetchAnalytics()
    }, [categoryId, timeRange])

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            // Mock data
            setCategoryName('Engagement Rings')
            setAnalytics({
                overview: {
                    pageViews: 15420,
                    uniqueVisitors: 8340,
                    clicks: 3240,
                    conversionRate: 2.8,
                    avgTimeOnPage: 245,
                    bounceRate: 42.5
                },
                trends: {
                    pageViewsChange: 12.5,
                    visitorsChange: 8.3,
                    clicksChange: -3.2,
                    conversionChange: 5.1
                },
                topProducts: [
                    { name: 'Petite Pavé Diamond Ring', views: 1240, clicks: 340, sales: 12 },
                    { name: 'Classic Solitaire Ring', views: 980, clicks: 280, sales: 9 },
                    { name: 'Halo Diamond Ring', views: 850, clicks: 220, sales: 7 }
                ],
                topSubcategories: [
                    { name: 'Solitaire', views: 4200, percentage: 27 },
                    { name: 'Halo', views: 3800, percentage: 25 },
                    { name: 'Three Stone', views: 2900, percentage: 19 }
                ],
                trafficSources: [
                    { source: 'Organic Search', visitors: 4500, percentage: 54 },
                    { source: 'Direct', visitors: 2100, percentage: 25 },
                    { source: 'Social Media', visitors: 1200, percentage: 14 },
                    { source: 'Referral', visitors: 540, percentage: 7 }
                ]
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const formatNumber = (num: number) => {
        return num.toLocaleString()
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{categoryName} Analytics</h1>
                        <p className="text-slate-500 mt-1">Performance metrics and insights</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <Calendar className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24hours">Last 24 Hours</SelectItem>
                            <SelectItem value="7days">Last 7 Days</SelectItem>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Page Views"
                    value={formatNumber(analytics.overview.pageViews)}
                    change={analytics.trends.pageViewsChange}
                    icon={<Eye className="w-5 h-5" />}
                    color="blue"
                />
                <StatCard
                    title="Unique Visitors"
                    value={formatNumber(analytics.overview.uniqueVisitors)}
                    change={analytics.trends.visitorsChange}
                    icon={<Users className="w-5 h-5" />}
                    color="green"
                />
                <StatCard
                    title="Clicks"
                    value={formatNumber(analytics.overview.clicks)}
                    change={analytics.trends.clicksChange}
                    icon={<MousePointerClick className="w-5 h-5" />}
                    color="purple"
                />
                <StatCard
                    title="Conversion Rate"
                    value={`${analytics.overview.conversionRate}%`}
                    change={analytics.trends.conversionChange}
                    icon={<ShoppingCart className="w-5 h-5" />}
                    color="orange"
                />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Avg. Time on Page</span>
                            <span className="text-lg font-bold text-slate-900">
                                {formatTime(analytics.overview.avgTimeOnPage)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Bounce Rate</span>
                            <span className="text-lg font-bold text-slate-900">
                                {analytics.overview.bounceRate}%
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {analytics.trafficSources.map((source, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">{source.source}</span>
                                    <span className="font-medium">{formatNumber(source.visitors)} ({source.percentage}%)</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${source.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Top Products */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                    <CardDescription>Most viewed products in this category</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {analytics.topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{product.name}</p>
                                        <p className="text-sm text-slate-500">{formatNumber(product.views)} views</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="text-center">
                                        <p className="text-slate-500">Clicks</p>
                                        <p className="font-bold text-slate-900">{formatNumber(product.clicks)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-500">Sales</p>
                                        <p className="font-bold text-green-600">{product.sales}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Subcategories */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Subcategories</CardTitle>
                    <CardDescription>Most popular subcategories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {analytics.topSubcategories.map((subcat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-700">{subcat.name}</span>
                                <span className="text-slate-500">{formatNumber(subcat.views)} views ({subcat.percentage}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{ width: `${subcat.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

// ========================================
// STAT CARD COMPONENT
// ========================================

interface StatCardProps {
    title: string
    value: string
    change: number
    icon: React.ReactNode
    color: 'blue' | 'green' | 'purple' | 'orange'
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600'
    }

    const isPositive = change >= 0

    return (
        <Card>
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
                        <span className="text-slate-500">vs last period</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

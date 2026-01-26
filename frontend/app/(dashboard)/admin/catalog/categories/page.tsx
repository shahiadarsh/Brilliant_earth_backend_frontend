"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    ChevronDown,
    ArrowUpDown,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

// ========================================
// TYPES
// ========================================

interface Category {
    _id: string
    name: string
    slug: string
    level: number
    isActive: boolean
    isMainCategory: boolean
    displayOrder: number
    subcategoriesCount: number
    productsCount: number
}

// ========================================
// CATEGORIES LIST PAGE
// ========================================

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterLevel, setFilterLevel] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [sortBy, setSortBy] = useState('displayOrder')

    // Fetch categories
    useEffect(() => {
        fetchCategories()
    }, [filterLevel, filterStatus, sortBy])

    const fetchCategories = async () => {
        try {
            setLoading(true)

            // Build query params
            const params = new URLSearchParams()
            if (filterLevel !== 'all') params.append('level', filterLevel)
            if (filterStatus !== 'all') params.append('isActive', filterStatus)

            // TODO: Replace with actual API call
            // const response = await fetch(`/api/v1/admin/management/categories?${params}`)
            // const data = await response.json()

            // Mock data for now
            const mockData = [
                {
                    _id: '1',
                    name: 'Engagement Rings',
                    slug: 'engagement-rings',
                    level: 0,
                    isActive: true,
                    isMainCategory: true,
                    displayOrder: 1,
                    subcategoriesCount: 8,
                    productsCount: 120
                },
                {
                    _id: '2',
                    name: 'Wedding Rings',
                    slug: 'wedding-rings',
                    level: 0,
                    isActive: true,
                    isMainCategory: true,
                    displayOrder: 2,
                    subcategoriesCount: 4,
                    productsCount: 85
                },
                {
                    _id: '3',
                    name: 'Diamonds',
                    slug: 'diamonds',
                    level: 0,
                    isActive: true,
                    isMainCategory: true,
                    displayOrder: 3,
                    subcategoriesCount: 0,
                    productsCount: 45
                },
                {
                    _id: '4',
                    name: 'Gemstones',
                    slug: 'gemstones',
                    level: 0,
                    isActive: true,
                    isMainCategory: true,
                    displayOrder: 4,
                    subcategoriesCount: 5,
                    productsCount: 30
                },
                {
                    _id: '5',
                    name: 'Jewelry',
                    slug: 'jewelry',
                    level: 0,
                    isActive: false,
                    isMainCategory: true,
                    displayOrder: 5,
                    subcategoriesCount: 3,
                    productsCount: 10
                }
            ]

            setCategories(mockData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching categories:', error)
            toast.error('Failed to load categories')
            setLoading(false)
        }
    }

    // Toggle category active status
    const toggleActive = async (categoryId: string, currentStatus: boolean) => {
        try {
            // TODO: API call
            // await fetch(`/api/v1/admin/management/categories/${categoryId}/toggle-active`, {
            //     method: 'PATCH'
            // })

            // Update local state
            setCategories(prev =>
                prev.map(cat =>
                    cat._id === categoryId ? { ...cat, isActive: !currentStatus } : cat
                )
            )

            toast.success(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully`)
        } catch (error) {
            toast.error('Failed to update category status')
        }
    }

    // Delete category
    const deleteCategory = async (categoryId: string, categoryName: string) => {
        if (!confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) {
            return
        }

        try {
            // TODO: API call
            // await fetch(`/api/v1/admin/management/categories/${categoryId}`, {
            //     method: 'DELETE'
            // })

            setCategories(prev => prev.filter(cat => cat._id !== categoryId))
            toast.success('Category deleted successfully')
        } catch (error) {
            toast.error('Failed to delete category')
        }
    }

    // Filter categories based on search
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your product categories and subcategories
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/catalog/categories/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                    label="Total Categories"
                    value={categories.length}
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-500" />}
                />
                <StatsCard
                    label="Active"
                    value={categories.filter(c => c.isActive).length}
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                />
                <StatsCard
                    label="Inactive"
                    value={categories.filter(c => !c.isActive).length}
                    icon={<XCircle className="w-5 h-5 text-red-500" />}
                />
                <StatsCard
                    label="Main Categories"
                    value={categories.filter(c => c.isMainCategory).length}
                    icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
                />
            </div>

            {/* Filters & Search */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter by Level */}
                        <Select value={filterLevel} onValueChange={setFilterLevel}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="0">Level 0 (Main)</SelectItem>
                                <SelectItem value="1">Level 1 (Sub)</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Filter by Status */}
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Sort By */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="displayOrder">Display Order</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="createdAt">Created Date</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No categories found</h3>
                            <p className="text-slate-500 mb-4">
                                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first category'}
                            </p>
                            {!searchQuery && (
                                <Button asChild>
                                    <Link href="/admin/catalog/categories/new">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Category
                                    </Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Subcategories</TableHead>
                                        <TableHead>Products</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((category) => (
                                        <TableRow key={category._id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {category.name}
                                                    {category.isMainCategory && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            Main
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500 font-mono text-sm">
                                                {category.slug}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Level {category.level}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {category.isActive ? (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-slate-600">{category.subcategoriesCount}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-slate-600">{category.productsCount}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-slate-600">{category.displayOrder}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/catalog/categories/${category._id}`}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => toggleActive(category._id, category.isActive)}
                                                        >
                                                            {category.isActive ? (
                                                                <>
                                                                    <EyeOff className="w-4 h-4 mr-2" />
                                                                    Deactivate
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    Activate
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => deleteCategory(category._id, category.name)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

// ========================================
// STATS CARD COMPONENT
// ========================================

interface StatsCardProps {
    label: string
    value: number
    icon: React.ReactNode
}

function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 mb-1">{label}</p>
                        <p className="text-2xl font-bold text-slate-900">{value}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

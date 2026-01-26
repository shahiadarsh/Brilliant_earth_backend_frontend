"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Save,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    Image as ImageIcon,
    FileText,
    Tag,
    Search as SearchIcon,
    BarChart3,
    Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// ========================================
// EDIT CATEGORY PAGE
// ========================================

export default function EditCategoryPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [category, setCategory] = useState<any>(null)

    // Fetch category data
    useEffect(() => {
        fetchCategory()
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            setLoading(true)

            // TODO: Replace with actual API call
            // const response = await fetch(`/api/v1/admin/management/categories/${categoryId}`)
            // const data = await response.json()

            // Mock data
            const mockCategory = {
                _id: categoryId,
                name: 'Engagement Rings',
                slug: 'engagement-rings',
                description: 'Find your perfect engagement ring from our stunning collection.',
                level: 0,
                isMainCategory: true,
                isActive: true,
                showOnHome: true,
                homePosition: 'hero',
                displayOrder: 1,
                subcategoriesCount: 8,
                productsCount: 120,
                hero: {
                    image: '/images/hero/engagement-rings.jpg',
                    title: 'Find Your Perfect Ring',
                    subtitle: 'Ethically Sourced, Brilliantly Crafted',
                    description: 'Explore our collection of stunning engagement rings.',
                    quote: 'Love is the greatest adventure',
                    ctaText: 'Explore Collection',
                    ctaLink: '/engagement-rings'
                },
                pageContent: {
                    bannerImage: '/images/banners/engagement-banner.jpg',
                    bannerText: 'Free Shipping & 30-Day Returns',
                    introText: 'Our engagement rings are designed to celebrate your unique love story.',
                    features: [
                        { icon: 'Shield', title: 'Lifetime Warranty', description: 'Every ring comes with warranty' },
                        { icon: 'Truck', title: 'Free Shipping', description: 'Complimentary shipping' },
                        { icon: 'RefreshCw', title: '30-Day Returns', description: 'Easy returns' }
                    ]
                },
                promo: {
                    isEnabled: true,
                    image: '/images/promos/engagement-promo.jpg',
                    title: 'New Arrivals',
                    text: 'Discover our latest collection',
                    linkText: 'Shop New Arrivals',
                    link: '/engagement-rings?filter=new-arrivals'
                },
                seo: {
                    metaTitle: 'Engagement Rings | Brilliant Earth',
                    metaDescription: 'Shop our stunning collection of ethically sourced engagement rings.',
                    metaKeywords: 'engagement rings, diamond rings, ethical diamonds',
                    canonicalUrl: '/engagement-rings',
                    focusKeyword: 'engagement rings',
                    robots: 'index, follow'
                },
                analytics: {
                    viewCount: 15420,
                    clickCount: 3240,
                    conversionRate: 2.8
                }
            }

            setCategory(mockCategory)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching category:', error)
            toast.error('Failed to load category')
            setLoading(false)
        }
    }

    // Save category
    const handleSave = async () => {
        try {
            setSaving(true)

            // TODO: API call
            // await fetch(`/api/v1/admin/management/categories/${categoryId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(category)
            // })

            toast.success('Category updated successfully!')
            setSaving(false)
        } catch (error) {
            toast.error('Failed to update category')
            setSaving(false)
        }
    }

    // Toggle active status
    const toggleActive = async () => {
        try {
            // TODO: API call
            setCategory({ ...category, isActive: !category.isActive })
            toast.success(`Category ${!category.isActive ? 'activated' : 'deactivated'}`)
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    // Delete category
    const handleDelete = async () => {
        try {
            // TODO: API call
            toast.success('Category deleted successfully')
            router.push('/admin/catalog/categories')
        } catch (error) {
            toast.error('Failed to delete category')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        )
    }

    if (!category) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">Category not found</p>
                <Button onClick={() => router.back()} className="mt-4">
                    Go Back
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-slate-900">{category.name}</h1>
                            <Badge variant={category.isActive ? 'default' : 'secondary'}>
                                {category.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        </div>
                        <p className="text-slate-500 mt-1">
                            Edit category details and settings
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={toggleActive}
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
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete "{category.name}" and all associated data.
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Subcategories</p>
                                <p className="text-2xl font-bold text-slate-900">{category.subcategoriesCount}</p>
                            </div>
                            <Settings className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Products</p>
                                <p className="text-2xl font-bold text-slate-900">{category.productsCount}</p>
                            </div>
                            <ImageIcon className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Page Views</p>
                                <p className="text-2xl font-bold text-slate-900">{category.analytics.viewCount.toLocaleString()}</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                    <Link href={`/admin/catalog/categories/${categoryId}/hero`}>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Edit Hero Section
                    </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                    <Link href={`/admin/catalog/categories/${categoryId}/promo`}>
                        <Tag className="w-4 h-4 mr-2" />
                        Edit Promo
                    </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                    <Link href={`/admin/catalog/categories/${categoryId}/seo`}>
                        <SearchIcon className="w-4 h-4 mr-2" />
                        Edit SEO
                    </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                    <Link href={`/admin/catalog/categories/${categoryId}/analytics`}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                    </Link>
                </Button>
            </div>

            {/* Tabs for Different Sections */}
            <Tabs defaultValue="basic" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="display">Display Settings</TabsTrigger>
                    <TabsTrigger value="content">Page Content</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Edit category name, slug, and description</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Category Name</Label>
                                    <Input
                                        id="name"
                                        value={category.name}
                                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={category.slug}
                                        onChange={(e) => setCategory({ ...category, slug: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={category.description}
                                    onChange={(e) => setCategory({ ...category, description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="level">Category Level</Label>
                                    <Select
                                        value={category.level.toString()}
                                        onValueChange={(value) => setCategory({ ...category, level: parseInt(value) })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Level 0 (Main Category)</SelectItem>
                                            <SelectItem value="1">Level 1 (Subcategory)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="displayOrder">Display Order</Label>
                                    <Input
                                        id="displayOrder"
                                        type="number"
                                        value={category.displayOrder}
                                        onChange={(e) => setCategory({ ...category, displayOrder: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Display Settings Tab */}
                <TabsContent value="display" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                            <CardDescription>Control where and how this category appears</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label className="text-base font-medium">Main Category</Label>
                                    <p className="text-sm text-slate-500">Show in main navigation menu</p>
                                </div>
                                <Switch
                                    checked={category.isMainCategory}
                                    onCheckedChange={(checked) => setCategory({ ...category, isMainCategory: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label className="text-base font-medium">Show on Homepage</Label>
                                    <p className="text-sm text-slate-500">Display in homepage sections</p>
                                </div>
                                <Switch
                                    checked={category.showOnHome}
                                    onCheckedChange={(checked) => setCategory({ ...category, showOnHome: checked })}
                                />
                            </div>

                            {category.showOnHome && (
                                <div className="space-y-2">
                                    <Label htmlFor="homePosition">Homepage Position</Label>
                                    <Select
                                        value={category.homePosition}
                                        onValueChange={(value) => setCategory({ ...category, homePosition: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hero">Hero Section</SelectItem>
                                            <SelectItem value="featured">Featured Section</SelectItem>
                                            <SelectItem value="popular">Popular Section</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Page Content Tab */}
                <TabsContent value="content" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>Banner and introduction text</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bannerImage">Banner Image URL</Label>
                                <Input
                                    id="bannerImage"
                                    value={category.pageContent.bannerImage}
                                    onChange={(e) => setCategory({
                                        ...category,
                                        pageContent: { ...category.pageContent, bannerImage: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bannerText">Banner Text</Label>
                                <Input
                                    id="bannerText"
                                    value={category.pageContent.bannerText}
                                    onChange={(e) => setCategory({
                                        ...category,
                                        pageContent: { ...category.pageContent, bannerText: e.target.value }
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="introText">Introduction Text</Label>
                                <Textarea
                                    id="introText"
                                    value={category.pageContent.introText}
                                    onChange={(e) => setCategory({
                                        ...category,
                                        pageContent: { ...category.pageContent, introText: e.target.value }
                                    })}
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

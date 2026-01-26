"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Eye, Upload, Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function EditPromoPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [promo, setPromo] = useState({
        isEnabled: false,
        image: '',
        title: '',
        text: '',
        code: '',
        linkText: '',
        link: ''
    })

    useEffect(() => {
        fetchPromoData()
    }, [categoryId])

    const fetchPromoData = async () => {
        try {
            // Mock data
            setPromo({
                isEnabled: true,
                image: '/images/promos/engagement-promo.jpg',
                title: 'New Arrivals',
                text: 'Discover our latest collection of engagement rings',
                code: 'SAVE15',
                linkText: 'Shop New Arrivals',
                link: '/engagement-rings?filter=new-arrivals'
            })
            setLoading(false)
        } catch (error) {
            toast.error('Failed to load promo data')
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            // TODO: API call
            toast.success('Promo updated successfully!')
            setSaving(false)
        } catch (error) {
            toast.error('Failed to update promo')
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Edit Promo Banner</h1>
                        <p className="text-slate-500 mt-1">Manage promotional banner for this category</p>
                    </div>
                </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-6">
                    {/* Enable/Disable */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Promo Status</CardTitle>
                            <CardDescription>Control promo banner visibility</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <Label htmlFor="isEnabled" className="text-base font-medium">
                                        Enable Promo Banner
                                    </Label>
                                    <p className="text-sm text-slate-500">Show promotional banner on category page</p>
                                </div>
                                <Switch
                                    id="isEnabled"
                                    checked={promo.isEnabled}
                                    onCheckedChange={(checked) => setPromo({ ...promo, isEnabled: checked })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Promo Content */}
                    {promo.isEnabled && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Promo Content</CardTitle>
                                <CardDescription>Edit promo banner details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="image">Promo Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="image"
                                            placeholder="/images/promos/engagement-promo.jpg"
                                            value={promo.image}
                                            onChange={(e) => setPromo({ ...promo, image: e.target.value })}
                                        />
                                        <Button variant="outline" size="icon">
                                            <Upload className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-slate-500">Recommended: 800x400px</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Promo Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="New Arrivals"
                                            value={promo.title}
                                            onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="code">Promo Code (Optional)</Label>
                                        <div className="relative">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                id="code"
                                                placeholder="SAVE15"
                                                value={promo.code}
                                                onChange={(e) => setPromo({ ...promo, code: e.target.value.toUpperCase() })}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="text">Promo Text</Label>
                                    <Textarea
                                        id="text"
                                        placeholder="Discover our latest collection of engagement rings"
                                        value={promo.text}
                                        onChange={(e) => setPromo({ ...promo, text: e.target.value })}
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="linkText">Link Text</Label>
                                        <Input
                                            id="linkText"
                                            placeholder="Shop New Arrivals"
                                            value={promo.linkText}
                                            onChange={(e) => setPromo({ ...promo, linkText: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="link">Link URL</Label>
                                        <Input
                                            id="link"
                                            placeholder="/engagement-rings?filter=new-arrivals"
                                            value={promo.link}
                                            onChange={(e) => setPromo({ ...promo, link: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Live Preview
                            </CardTitle>
                            <CardDescription>See how your promo banner will look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {promo.isEnabled ? (
                                <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <div className="p-8 space-y-4">
                                        {promo.title && (
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-bold">{promo.title}</h3>
                                                {promo.code && (
                                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-mono">
                                                        {promo.code}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {promo.text && (
                                            <p className="text-white/90">{promo.text}</p>
                                        )}
                                        {promo.linkText && (
                                            <Button className="bg-white text-blue-600 hover:bg-white/90">
                                                {promo.linkText}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-slate-50 rounded-lg border-2 border-dashed">
                                    <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500">Promo banner is disabled</p>
                                    <p className="text-sm text-slate-400 mt-2">Enable it to see the preview</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Promo Templates */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Templates</CardTitle>
                            <CardDescription>Use these templates to get started</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setPromo({
                                    ...promo,
                                    title: 'New Arrivals',
                                    text: 'Discover our latest collection',
                                    linkText: 'Shop Now',
                                    code: ''
                                })}
                            >
                                <div className="text-left">
                                    <p className="font-medium">New Arrivals</p>
                                    <p className="text-xs text-slate-500">Promote new products</p>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setPromo({
                                    ...promo,
                                    title: 'Limited Time Offer',
                                    text: 'Save 15% on all items',
                                    linkText: 'Shop Sale',
                                    code: 'SAVE15'
                                })}
                            >
                                <div className="text-left">
                                    <p className="font-medium">Sale/Discount</p>
                                    <p className="text-xs text-slate-500">Promote discounts</p>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setPromo({
                                    ...promo,
                                    title: 'Free Shipping',
                                    text: 'On all orders over $100',
                                    linkText: 'Learn More',
                                    code: ''
                                })}
                            >
                                <div className="text-left">
                                    <p className="font-medium">Free Shipping</p>
                                    <p className="text-xs text-slate-500">Promote shipping offer</p>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600">
                            <p>• Keep title short and attention-grabbing</p>
                            <p>• Use action-oriented link text ("Shop Now", "Get Offer")</p>
                            <p>• Promo codes should be uppercase and memorable</p>
                            <p>• Make sure the link URL is correct</p>
                            <p>• Test the promo on different screen sizes</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

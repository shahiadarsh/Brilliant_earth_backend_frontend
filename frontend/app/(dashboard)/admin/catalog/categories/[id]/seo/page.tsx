"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function EditSEOPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [categorySlug, setCategorySlug] = useState('')
    const [seo, setSeo] = useState({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        focusKeyword: '',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: ''
    })

    useEffect(() => {
        fetchSEOData()
    }, [categoryId])

    const fetchSEOData = async () => {
        try {
            // Mock data
            setCategoryName('Engagement Rings')
            setCategorySlug('engagement-rings')
            setSeo({
                metaTitle: 'Engagement Rings | Ethically Sourced Diamond Rings | Brilliant Earth',
                metaDescription: 'Shop our stunning collection of ethically sourced engagement rings. Find the perfect diamond or gemstone ring to celebrate your love story.',
                metaKeywords: 'engagement rings, diamond rings, ethical diamonds, lab grown diamonds, wedding rings',
                canonicalUrl: '/engagement-rings',
                focusKeyword: 'engagement rings',
                robots: 'index, follow',
                ogTitle: 'Engagement Rings | Brilliant Earth',
                ogDescription: 'Find your perfect engagement ring from our ethically sourced collection',
                ogImage: '/images/og/engagement-rings.jpg',
                twitterTitle: 'Engagement Rings | Brilliant Earth',
                twitterDescription: 'Shop ethically sourced engagement rings',
                twitterImage: '/images/twitter/engagement-rings.jpg'
            })
            setLoading(false)
        } catch (error) {
            toast.error('Failed to load SEO data')
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            // TODO: API call
            toast.success('SEO settings updated successfully!')
            setSaving(false)
        } catch (error) {
            toast.error('Failed to update SEO settings')
            setSaving(false)
        }
    }

    // SEO Score calculation
    const calculateSEOScore = () => {
        let score = 0
        let issues = []
        let suggestions = []

        // Meta Title
        if (seo.metaTitle) {
            if (seo.metaTitle.length >= 50 && seo.metaTitle.length <= 60) {
                score += 20
            } else if (seo.metaTitle.length > 0) {
                score += 10
                issues.push('Meta title should be 50-60 characters')
            }
        } else {
            issues.push('Meta title is required')
        }

        // Meta Description
        if (seo.metaDescription) {
            if (seo.metaDescription.length >= 150 && seo.metaDescription.length <= 160) {
                score += 20
            } else if (seo.metaDescription.length > 0) {
                score += 10
                issues.push('Meta description should be 150-160 characters')
            }
        } else {
            issues.push('Meta description is required')
        }

        // Focus Keyword
        if (seo.focusKeyword) {
            score += 15
            if (seo.metaTitle.toLowerCase().includes(seo.focusKeyword.toLowerCase())) {
                score += 10
            } else {
                suggestions.push('Include focus keyword in meta title')
            }
            if (seo.metaDescription.toLowerCase().includes(seo.focusKeyword.toLowerCase())) {
                score += 10
            } else {
                suggestions.push('Include focus keyword in meta description')
            }
        } else {
            issues.push('Focus keyword is required')
        }

        // Canonical URL
        if (seo.canonicalUrl) score += 10
        else suggestions.push('Add canonical URL')

        // OG Tags
        if (seo.ogTitle && seo.ogDescription && seo.ogImage) {
            score += 15
        } else {
            suggestions.push('Complete Open Graph tags for social sharing')
        }

        return { score, issues, suggestions }
    }

    const seoAnalysis = calculateSEOScore()

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
                        <h1 className="text-3xl font-bold text-slate-900">Edit SEO Settings</h1>
                        <p className="text-slate-500 mt-1">Optimize {categoryName} for search engines</p>
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

            {/* SEO Score Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>SEO Score</CardTitle>
                            <CardDescription>How well optimized is this page?</CardDescription>
                        </div>
                        <div className="text-center">
                            <div className={`text-4xl font-bold ${seoAnalysis.score >= 80 ? 'text-green-600' :
                                    seoAnalysis.score >= 60 ? 'text-orange-600' :
                                        'text-red-600'
                                }`}>
                                {seoAnalysis.score}
                            </div>
                            <p className="text-sm text-slate-500">out of 100</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {seoAnalysis.issues.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-red-600">Issues to Fix:</p>
                            {seoAnalysis.issues.map((issue, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-red-600">
                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{issue}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {seoAnalysis.suggestions.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-orange-600">Suggestions:</p>
                            {seoAnalysis.suggestions.map((suggestion, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-orange-600">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{suggestion}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Basic SEO */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic SEO</CardTitle>
                    <CardDescription>Essential meta tags for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="metaTitle">
                            Meta Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="metaTitle"
                            placeholder="Engagement Rings | Ethically Sourced Diamond Rings | Brilliant Earth"
                            value={seo.metaTitle}
                            onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                            maxLength={60}
                        />
                        <div className="flex items-center justify-between text-xs">
                            <p className="text-slate-500">Recommended: 50-60 characters</p>
                            <p className={seo.metaTitle.length > 60 ? 'text-red-500' : 'text-slate-500'}>
                                {seo.metaTitle.length}/60
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaDescription">
                            Meta Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="metaDescription"
                            placeholder="Shop our stunning collection of ethically sourced engagement rings..."
                            value={seo.metaDescription}
                            onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                            rows={3}
                            maxLength={160}
                        />
                        <div className="flex items-center justify-between text-xs">
                            <p className="text-slate-500">Recommended: 150-160 characters</p>
                            <p className={seo.metaDescription.length > 160 ? 'text-red-500' : 'text-slate-500'}>
                                {seo.metaDescription.length}/160
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="focusKeyword">Focus Keyword</Label>
                            <Input
                                id="focusKeyword"
                                placeholder="engagement rings"
                                value={seo.focusKeyword}
                                onChange={(e) => setSeo({ ...seo, focusKeyword: e.target.value })}
                            />
                            <p className="text-xs text-slate-500">Main keyword to rank for</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="canonicalUrl">Canonical URL</Label>
                            <Input
                                id="canonicalUrl"
                                placeholder="/engagement-rings"
                                value={seo.canonicalUrl}
                                onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                            />
                            <p className="text-xs text-slate-500">Preferred URL for this page</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaKeywords">Meta Keywords</Label>
                        <Input
                            id="metaKeywords"
                            placeholder="engagement rings, diamond rings, ethical diamonds"
                            value={seo.metaKeywords}
                            onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
                        />
                        <p className="text-xs text-slate-500">Separate keywords with commas</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="robots">Robots Meta Tag</Label>
                        <Select
                            value={seo.robots}
                            onValueChange={(value) => setSeo({ ...seo, robots: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="index, follow">Index, Follow (Recommended)</SelectItem>
                                <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                                <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                                <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Open Graph (Facebook) */}
            <Card>
                <CardHeader>
                    <CardTitle>Open Graph Tags (Facebook)</CardTitle>
                    <CardDescription>How your page appears when shared on Facebook</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ogTitle">OG Title</Label>
                        <Input
                            id="ogTitle"
                            placeholder="Engagement Rings | Brilliant Earth"
                            value={seo.ogTitle}
                            onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ogDescription">OG Description</Label>
                        <Textarea
                            id="ogDescription"
                            placeholder="Find your perfect engagement ring from our ethically sourced collection"
                            value={seo.ogDescription}
                            onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ogImage">OG Image URL</Label>
                        <Input
                            id="ogImage"
                            placeholder="/images/og/engagement-rings.jpg"
                            value={seo.ogImage}
                            onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                        />
                        <p className="text-xs text-slate-500">Recommended: 1200x630px</p>
                    </div>
                </CardContent>
            </Card>

            {/* Twitter Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Twitter Card Tags</CardTitle>
                    <CardDescription>How your page appears when shared on Twitter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="twitterTitle">Twitter Title</Label>
                        <Input
                            id="twitterTitle"
                            placeholder="Engagement Rings | Brilliant Earth"
                            value={seo.twitterTitle}
                            onChange={(e) => setSeo({ ...seo, twitterTitle: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="twitterDescription">Twitter Description</Label>
                        <Textarea
                            id="twitterDescription"
                            placeholder="Shop ethically sourced engagement rings"
                            value={seo.twitterDescription}
                            onChange={(e) => setSeo({ ...seo, twitterDescription: e.target.value })}
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="twitterImage">Twitter Image URL</Label>
                        <Input
                            id="twitterImage"
                            placeholder="/images/twitter/engagement-rings.jpg"
                            value={seo.twitterImage}
                            onChange={(e) => setSeo({ ...seo, twitterImage: e.target.value })}
                        />
                        <p className="text-xs text-slate-500">Recommended: 1200x600px</p>
                    </div>
                </CardContent>
            </Card>

            {/* Search Preview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Search Engine Preview
                    </CardTitle>
                    <CardDescription>How your page will appear in Google search results</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-slate-50 rounded-lg space-y-1">
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                            {seo.metaTitle || 'Your meta title will appear here'}
                        </div>
                        <div className="text-green-700 text-sm">
                            https://brilliantearth.com{seo.canonicalUrl || `/${categorySlug}`}
                        </div>
                        <div className="text-slate-600 text-sm">
                            {seo.metaDescription || 'Your meta description will appear here. Make it compelling to encourage clicks!'}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

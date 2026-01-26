"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Loader2, Eye, Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function EditHeroPage() {
    const router = useRouter()
    const params = useParams()
    const categoryId = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [hero, setHero] = useState({
        image: '',
        title: '',
        subtitle: '',
        description: '',
        quote: '',
        ctaText: '',
        ctaLink: ''
    })

    useEffect(() => {
        fetchHeroData()
    }, [categoryId])

    const fetchHeroData = async () => {
        try {
            // Mock data
            setHero({
                image: '/images/hero/engagement-rings.jpg',
                title: 'Find Your Perfect Ring',
                subtitle: 'Ethically Sourced, Brilliantly Crafted',
                description: 'Explore our collection of stunning engagement rings, each one crafted with ethically sourced diamonds.',
                quote: 'Love is the greatest adventure of all',
                ctaText: 'Explore Collection',
                ctaLink: '/engagement-rings'
            })
            setLoading(false)
        } catch (error) {
            toast.error('Failed to load hero data')
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            // TODO: API call
            toast.success('Hero section updated successfully!')
            setSaving(false)
        } catch (error) {
            toast.error('Failed to update hero section')
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
                        <h1 className="text-3xl font-bold text-slate-900">Edit Hero Section</h1>
                        <p className="text-slate-500 mt-1">Update the hero banner for this category</p>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Content</CardTitle>
                            <CardDescription>Edit hero section text and image</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="image">Hero Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image"
                                        placeholder="/images/hero/engagement-rings.jpg"
                                        value={hero.image}
                                        onChange={(e) => setHero({ ...hero, image: e.target.value })}
                                    />
                                    <Button variant="outline" size="icon">
                                        <Upload className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-500">Recommended: 1920x800px</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Hero Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Find Your Perfect Ring"
                                    value={hero.title}
                                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Hero Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    placeholder="Ethically Sourced, Brilliantly Crafted"
                                    value={hero.subtitle}
                                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Hero Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Explore our collection..."
                                    value={hero.description}
                                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quote">Hero Quote (Optional)</Label>
                                <Input
                                    id="quote"
                                    placeholder="Love is the greatest adventure"
                                    value={hero.quote}
                                    onChange={(e) => setHero({ ...hero, quote: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ctaText">CTA Button Text</Label>
                                    <Input
                                        id="ctaText"
                                        placeholder="Explore Collection"
                                        value={hero.ctaText}
                                        onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ctaLink">CTA Button Link</Label>
                                    <Input
                                        id="ctaLink"
                                        placeholder="/engagement-rings"
                                        value={hero.ctaLink}
                                        onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Preview */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Live Preview
                            </CardTitle>
                            <CardDescription>See how your hero section will look</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative rounded-lg overflow-hidden bg-slate-900 text-white">
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />
                                <div className="relative p-12 space-y-6">
                                    {hero.title && (
                                        <h1 className="text-4xl font-bold">{hero.title}</h1>
                                    )}
                                    {hero.subtitle && (
                                        <p className="text-xl text-slate-300">{hero.subtitle}</p>
                                    )}
                                    {hero.description && (
                                        <p className="text-slate-400 max-w-2xl">{hero.description}</p>
                                    )}
                                    {hero.quote && (
                                        <p className="text-lg italic text-slate-300 border-l-4 border-white pl-4">
                                            "{hero.quote}"
                                        </p>
                                    )}
                                    {hero.ctaText && (
                                        <Button className="bg-white text-slate-900 hover:bg-slate-100">
                                            {hero.ctaText}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600">
                            <p>• Keep title short and impactful (5-8 words)</p>
                            <p>• Subtitle should complement the title</p>
                            <p>• Description provides more context (2-3 sentences)</p>
                            <p>• Quote is optional but adds emotional appeal</p>
                            <p>• CTA should be action-oriented ("Shop Now", "Explore")</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

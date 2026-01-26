"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Info,
    Image as ImageIcon,
    FileText,
    Tag,
    Search as SearchIcon,
    Save,
    Eye
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
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { PageContentStep, PromoStep, SEOStep } from '@/components/admin/CategoryFormSteps'

// ========================================
// CREATE CATEGORY PAGE (MULTI-STEP FORM)
// ========================================

const STEPS = [
    { id: 1, name: 'Basic Info', icon: Info, description: 'Name, slug, and description' },
    { id: 2, name: 'Display Settings', icon: Eye, description: 'Order and visibility' },
    { id: 3, name: 'Hero Section', icon: ImageIcon, description: 'Banner image and text' },
    { id: 4, name: 'Page Content', icon: FileText, description: 'Features and content' },
    { id: 5, name: 'Promo', icon: Tag, description: 'Promotional banner' },
    { id: 6, name: 'SEO', icon: SearchIcon, description: 'Meta tags and SEO' }
]

export default function CreateCategoryPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        // Basic Info
        name: '',
        slug: '',
        description: '',
        level: '0',
        parent: null,

        // Display Settings
        displayOrder: 1,
        isMainCategory: true,
        isActive: true,
        showOnHome: true,
        homePosition: 'hero',

        // Hero Section
        hero: {
            image: '',
            title: '',
            subtitle: '',
            description: '',
            quote: '',
            ctaText: 'Explore Collection',
            ctaLink: ''
        },

        // Page Content
        pageContent: {
            bannerImage: '',
            bannerText: '',
            introText: '',
            features: [
                { icon: 'Shield', title: '', description: '' },
                { icon: 'Truck', title: '', description: '' },
                { icon: 'RefreshCw', title: '', description: '' }
            ]
        },

        // Promo
        promo: {
            isEnabled: false,
            image: '',
            title: '',
            text: '',
            code: '',
            linkText: '',
            link: ''
        },

        // SEO
        seo: {
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
            canonicalUrl: '',
            focusKeyword: '',
            robots: 'index, follow'
        }
    })

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        }))
    }

    // Handle form submission
    const handleSubmit = async () => {
        try {
            setLoading(true)

            // TODO: API call
            // const response = await fetch('/api/v1/admin/management/categories', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })

            toast.success('Category created successfully!')
            router.push('/admin/catalog/categories')
        } catch (error) {
            toast.error('Failed to create category')
            setLoading(false)
        }
    }

    const nextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900">Create New Category</h1>
                    <p className="text-slate-500 mt-1">
                        Fill in the details to create a new category
                    </p>
                </div>
            </div>

            {/* Progress Steps */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        {STEPS.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center gap-2">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentStep > step.id
                                            ? 'bg-green-500 text-white'
                                            : currentStep === step.id
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-200 text-slate-400'
                                            }`}
                                    >
                                        {currentStep > step.id ? (
                                            <Check className="w-6 h-6" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="text-center hidden md:block">
                                        <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'
                                            }`}>
                                            {step.name}
                                        </p>
                                        <p className="text-xs text-slate-400 max-w-[100px]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 rounded ${currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Form Content */}
            <Card>
                <CardHeader>
                    <CardTitle>{STEPS[currentStep - 1].name}</CardTitle>
                    <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                        <BasicInfoStep formData={formData} setFormData={setFormData} handleNameChange={handleNameChange} />
                    )}

                    {/* Step 2: Display Settings */}
                    {currentStep === 2 && (
                        <DisplaySettingsStep formData={formData} setFormData={setFormData} />
                    )}

                    {/* Step 3: Hero Section */}
                    {currentStep === 3 && (
                        <HeroSectionStep formData={formData} setFormData={setFormData} />
                    )}

                    {/* Step 4: Page Content */}
                    {currentStep === 4 && (
                        <PageContentStep formData={formData} setFormData={setFormData} />
                    )}

                    {/* Step 5: Promo */}
                    {currentStep === 5 && (
                        <PromoStep formData={formData} setFormData={setFormData} />
                    )}

                    {/* Step 6: SEO */}
                    {currentStep === 6 && (
                        <SEOStep formData={formData} setFormData={setFormData} />
                    )}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                </Button>

                <div className="text-sm text-slate-500">
                    Step {currentStep} of {STEPS.length}
                </div>

                {currentStep < STEPS.length ? (
                    <Button onClick={nextStep}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Create Category
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}

// ========================================
// STEP 1: BASIC INFO
// ========================================

function BasicInfoStep({ formData, setFormData, handleNameChange }: any) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Category Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        placeholder="e.g., Engagement Rings"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                    />
                    <p className="text-xs text-slate-500">This will be displayed to customers</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">
                        Slug <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="slug"
                        placeholder="e.g., engagement-rings"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                    />
                    <p className="text-xs text-slate-500">URL-friendly version (auto-generated)</p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Brief description of this category..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                />
                <p className="text-xs text-slate-500">Describe what products are in this category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="level">Category Level</Label>
                    <Select
                        value={formData.level}
                        onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Level 0 (Main Category)</SelectItem>
                            <SelectItem value="1">Level 1 (Subcategory)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">Hierarchy level of this category</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="parent">Parent Category</Label>
                    <Select
                        value={formData.parent || 'none'}
                        onValueChange={(value) => setFormData({ ...formData, parent: value === 'none' ? null : value })}
                        disabled={formData.level === '0'}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select parent..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None (Root Category)</SelectItem>
                            {/* TODO: Load from API */}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">Only for subcategories</p>
                </div>
            </div>
        </div>
    )
}

// ========================================
// STEP 2: DISPLAY SETTINGS
// ========================================

function DisplaySettingsStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                    id="displayOrder"
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                />
                <p className="text-xs text-slate-500">Lower numbers appear first</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="isMainCategory" className="text-base font-medium">
                            Main Category
                        </Label>
                        <p className="text-sm text-slate-500">Show in main navigation menu</p>
                    </div>
                    <Switch
                        id="isMainCategory"
                        checked={formData.isMainCategory}
                        onCheckedChange={(checked) => setFormData({ ...formData, isMainCategory: checked })}
                    />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="isActive" className="text-base font-medium">
                            Active
                        </Label>
                        <p className="text-sm text-slate-500">Make this category visible to customers</p>
                    </div>
                    <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="showOnHome" className="text-base font-medium">
                            Show on Homepage
                        </Label>
                        <p className="text-sm text-slate-500">Display in homepage sections</p>
                    </div>
                    <Switch
                        id="showOnHome"
                        checked={formData.showOnHome}
                        onCheckedChange={(checked) => setFormData({ ...formData, showOnHome: checked })}
                    />
                </div>
            </div>

            {formData.showOnHome && (
                <div className="space-y-2">
                    <Label htmlFor="homePosition">Homepage Position</Label>
                    <Select
                        value={formData.homePosition}
                        onValueChange={(value) => setFormData({ ...formData, homePosition: value })}
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
        </div>
    )
}

// ========================================
// STEP 3: HERO SECTION
// ========================================

function HeroSectionStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <Input
                    id="heroImage"
                    placeholder="/images/hero/engagement-rings.jpg"
                    value={formData.hero.image}
                    onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, image: e.target.value }
                    })}
                />
                <p className="text-xs text-slate-500">Large banner image for category page</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input
                        id="heroTitle"
                        placeholder="Find Your Perfect Ring"
                        value={formData.hero.title}
                        onChange={(e) => setFormData({
                            ...formData,
                            hero: { ...formData.hero, title: e.target.value }
                        })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input
                        id="heroSubtitle"
                        placeholder="Ethically Sourced, Brilliantly Crafted"
                        value={formData.hero.subtitle}
                        onChange={(e) => setFormData({
                            ...formData,
                            hero: { ...formData.hero, subtitle: e.target.value }
                        })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="heroDescription">Hero Description</Label>
                <Textarea
                    id="heroDescription"
                    placeholder="Explore our collection of stunning engagement rings..."
                    value={formData.hero.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, description: e.target.value }
                    })}
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="heroQuote">Hero Quote (Optional)</Label>
                <Input
                    id="heroQuote"
                    placeholder="Love is the greatest adventure"
                    value={formData.hero.quote}
                    onChange={(e) => setFormData({
                        ...formData,
                        hero: { ...formData.hero, quote: e.target.value }
                    })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="ctaText">CTA Button Text</Label>
                    <Input
                        id="ctaText"
                        placeholder="Explore Collection"
                        value={formData.hero.ctaText}
                        onChange={(e) => setFormData({
                            ...formData,
                            hero: { ...formData.hero, ctaText: e.target.value }
                        })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ctaLink">CTA Button Link</Label>
                    <Input
                        id="ctaLink"
                        placeholder="/engagement-rings"
                        value={formData.hero.ctaLink}
                        onChange={(e) => setFormData({
                            ...formData,
                            hero: { ...formData.hero, ctaLink: e.target.value }
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

// Continuing in next message due to length...

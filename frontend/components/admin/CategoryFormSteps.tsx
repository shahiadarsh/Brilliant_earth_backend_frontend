import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

// ========================================
// STEP 4: PAGE CONTENT
// ========================================

export function PageContentStep({ formData, setFormData }: any) {
    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...formData.pageContent.features]
        newFeatures[index] = { ...newFeatures[index], [field]: value }
        setFormData({
            ...formData,
            pageContent: { ...formData.pageContent, features: newFeatures }
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image URL</Label>
                <Input
                    id="bannerImage"
                    placeholder="/images/banners/engagement-banner.jpg"
                    value={formData.pageContent.bannerImage}
                    onChange={(e) => setFormData({
                        ...formData,
                        pageContent: { ...formData.pageContent, bannerImage: e.target.value }
                    })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="bannerText">Banner Text</Label>
                <Input
                    id="bannerText"
                    placeholder="Free Shipping & 30-Day Returns"
                    value={formData.pageContent.bannerText}
                    onChange={(e) => setFormData({
                        ...formData,
                        pageContent: { ...formData.pageContent, bannerText: e.target.value }
                    })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="introText">Introduction Text</Label>
                <Textarea
                    id="introText"
                    placeholder="Our engagement rings are designed to celebrate your unique love story..."
                    value={formData.pageContent.introText}
                    onChange={(e) => setFormData({
                        ...formData,
                        pageContent: { ...formData.pageContent, introText: e.target.value }
                    })}
                    rows={4}
                />
            </div>

            <div className="space-y-4">
                <Label>Features (3 items)</Label>
                {formData.pageContent.features.map((feature: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                {index + 1}
                            </div>
                            <span className="font-medium">Feature {index + 1}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                                <Label>Icon Name</Label>
                                <Select
                                    value={feature.icon}
                                    onValueChange={(value) => updateFeature(index, 'icon', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Shield">Shield (Warranty)</SelectItem>
                                        <SelectItem value="Truck">Truck (Shipping)</SelectItem>
                                        <SelectItem value="RefreshCw">Refresh (Returns)</SelectItem>
                                        <SelectItem value="Award">Award (Quality)</SelectItem>
                                        <SelectItem value="Heart">Heart (Love)</SelectItem>
                                        <SelectItem value="Star">Star (Premium)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    placeholder="e.g., Lifetime Warranty"
                                    value={feature.title}
                                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-1">
                                <Label>Description</Label>
                                <Input
                                    placeholder="e.g., Every ring comes with..."
                                    value={feature.description}
                                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ========================================
// STEP 5: PROMO
// ========================================

export function PromoStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="promoEnabled" className="text-base font-medium">
                        Enable Promo Banner
                    </Label>
                    <p className="text-sm text-slate-500">Show promotional banner on category page</p>
                </div>
                <Switch
                    id="promoEnabled"
                    checked={formData.promo.isEnabled}
                    onCheckedChange={(checked) => setFormData({
                        ...formData,
                        promo: { ...formData.promo, isEnabled: checked }
                    })}
                />
            </div>

            {formData.promo.isEnabled && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="promoImage">Promo Image URL</Label>
                        <Input
                            id="promoImage"
                            placeholder="/images/promos/engagement-promo.jpg"
                            value={formData.promo.image}
                            onChange={(e) => setFormData({
                                ...formData,
                                promo: { ...formData.promo, image: e.target.value }
                            })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="promoTitle">Promo Title</Label>
                            <Input
                                id="promoTitle"
                                placeholder="New Arrivals"
                                value={formData.promo.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    promo: { ...formData.promo, title: e.target.value }
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                            <Input
                                id="promoCode"
                                placeholder="SAVE15"
                                value={formData.promo.code}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    promo: { ...formData.promo, code: e.target.value }
                                })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="promoText">Promo Text</Label>
                        <Textarea
                            id="promoText"
                            placeholder="Discover our latest collection of engagement rings"
                            value={formData.promo.text}
                            onChange={(e) => setFormData({
                                ...formData,
                                promo: { ...formData.promo, text: e.target.value }
                            })}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="promoLinkText">Link Text</Label>
                            <Input
                                id="promoLinkText"
                                placeholder="Shop New Arrivals"
                                value={formData.promo.linkText}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    promo: { ...formData.promo, linkText: e.target.value }
                                })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="promoLink">Link URL</Label>
                            <Input
                                id="promoLink"
                                placeholder="/engagement-rings?filter=new-arrivals"
                                value={formData.promo.link}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    promo: { ...formData.promo, link: e.target.value }
                                })}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

// ========================================
// STEP 6: SEO
// ========================================

export function SEOStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>SEO Tip:</strong> Fill in these fields to improve your category's search engine ranking.
                    Use relevant keywords and write compelling descriptions.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="metaTitle">
                    Meta Title <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="metaTitle"
                    placeholder="Engagement Rings | Ethically Sourced Diamond Rings | Brilliant Earth"
                    value={formData.seo.metaTitle}
                    onChange={(e) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaTitle: e.target.value }
                    })}
                    maxLength={60}
                />
                <div className="flex items-center justify-between text-xs">
                    <p className="text-slate-500">Recommended: 50-60 characters</p>
                    <p className={formData.seo.metaTitle.length > 60 ? 'text-red-500' : 'text-slate-500'}>
                        {formData.seo.metaTitle.length}/60
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="metaDescription">
                    Meta Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    id="metaDescription"
                    placeholder="Shop our stunning collection of ethically sourced engagement rings. Find the perfect diamond or gemstone ring to celebrate your love story."
                    value={formData.seo.metaDescription}
                    onChange={(e) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaDescription: e.target.value }
                    })}
                    rows={3}
                    maxLength={160}
                />
                <div className="flex items-center justify-between text-xs">
                    <p className="text-slate-500">Recommended: 150-160 characters</p>
                    <p className={formData.seo.metaDescription.length > 160 ? 'text-red-500' : 'text-slate-500'}>
                        {formData.seo.metaDescription.length}/160
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                    id="metaKeywords"
                    placeholder="engagement rings, diamond rings, ethical diamonds, lab grown diamonds"
                    value={formData.seo.metaKeywords}
                    onChange={(e) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaKeywords: e.target.value }
                    })}
                />
                <p className="text-xs text-slate-500">Separate keywords with commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="focusKeyword">Focus Keyword</Label>
                    <Input
                        id="focusKeyword"
                        placeholder="engagement rings"
                        value={formData.seo.focusKeyword}
                        onChange={(e) => setFormData({
                            ...formData,
                            seo: { ...formData.seo, focusKeyword: e.target.value }
                        })}
                    />
                    <p className="text-xs text-slate-500">Main keyword to rank for</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                    <Input
                        id="canonicalUrl"
                        placeholder="/engagement-rings"
                        value={formData.seo.canonicalUrl}
                        onChange={(e) => setFormData({
                            ...formData,
                            seo: { ...formData.seo, canonicalUrl: e.target.value }
                        })}
                    />
                    <p className="text-xs text-slate-500">Preferred URL for this page</p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="robots">Robots Meta Tag</Label>
                <Select
                    value={formData.seo.robots}
                    onValueChange={(value) => setFormData({
                        ...formData,
                        seo: { ...formData.seo, robots: value }
                    })}
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
                <p className="text-xs text-slate-500">How search engines should treat this page</p>
            </div>

            <div className="p-4 bg-slate-50 border rounded-lg space-y-3">
                <h4 className="font-medium text-slate-900">SEO Preview</h4>
                <div className="space-y-1">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                        {formData.seo.metaTitle || 'Your meta title will appear here'}
                    </div>
                    <div className="text-green-700 text-sm">
                        https://brilliantearth.com{formData.seo.canonicalUrl || formData.slug ? `/${formData.slug}` : '/your-category'}
                    </div>
                    <div className="text-slate-600 text-sm">
                        {formData.seo.metaDescription || 'Your meta description will appear here. Make it compelling to encourage clicks!'}
                    </div>
                </div>
            </div>
        </div>
    )
}

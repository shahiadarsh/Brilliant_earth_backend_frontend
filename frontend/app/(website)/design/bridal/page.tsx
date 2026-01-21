"use client"

import React from 'react'
import { FlowHeader } from '@/components/shared/FlowHeader'
import { Sparkles, Crown, Heart } from 'lucide-react'
import Link from 'next/link'

export default function BridalSetSelectionPage() {
    return (
        <div className="min-h-screen bg-white">
            <FlowHeader />
            <main className="max-w-[1400px] mx-auto px-6 py-24 text-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10">
                    <Crown className="w-12 h-12 text-[#163E3E]" />
                </div>
                <h1 className="text-[42px] font-serif text-[#163E3E] mb-6 italic">Signature Bridal Sets</h1>
                <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed mb-12 text-[16px]">
                    Our matched bridal sets are designed to coordinate perfectly, featuring an engagement ring and a wedding band that fit seamlessly together.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[1, 2].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[4/5] bg-gray-50 rounded-sm mb-6 flex items-center justify-center relative overflow-hidden">
                                <Sparkles className="w-12 h-12 text-gray-200 animate-pulse" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                            </div>
                            <h3 className="font-serif text-xl text-gray-900 mb-2">The Versailles Bridal Set</h3>
                            <p className="text-[14px] text-gray-400">$3,450 (Setting Only)</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-12 border-t border-gray-100">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Want to customize?</p>
                    <Link href="/design/setting" className="text-[#163E3E] font-serif italic text-lg hover:underline underline-offset-8">
                        Design your own ring from scratch &gt;
                    </Link>
                </div>
            </main>
        </div>
    )
}

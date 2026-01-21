"use client"

import Link from "next/link"
import { CheckCircle2, Package, Calendar, MoveRight, Sparkles, Heart } from "lucide-react"
import { useEffect, useState } from "react"

export default function OrderSuccessPage() {
    const [orderNumber, setOrderNumber] = useState("")

    useEffect(() => {
        setOrderNumber(`RZ-${Math.floor(100000 + Math.random() * 900000)}`)
    }, [])

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-32 text-center space-y-16">

                {/* Success Icon & Heading */}
                <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-[#163E3E]/5 rounded-full animate-ping duration-[3000ms]"></div>
                        <div className="w-24 h-24 bg-[#163E3E] rounded-full flex items-center justify-center relative shadow-2xl">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#163E3E]">Order Confirmed</p>
                        <h1 className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight italic">A Brilliant <br /> Choice, Indeed.</h1>
                    </div>
                </div>

                {/* Order Details Card */}
                <div className="bg-[#FAFAFA] p-12 md:p-16 rounded-sm border border-gray-100 shadow-sm space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="grid md:grid-cols-3 gap-12 text-left">
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Order Number</p>
                            <p className="text-sm font-medium font-mono">{orderNumber}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Ship Date</p>
                            <p className="text-sm font-medium">Estimated Jan 24, 2026</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Method</p>
                            <p className="text-sm font-medium">Insured Express Shipping</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-12 text-left space-y-6">
                        <p className="text-sm text-gray-600 font-light leading-relaxed">
                            Thank you for letting Ritzin be a part of your journey. An order confirmation has been sent to your email. We&apos;ll notify you when your handcrafted piece is ready for its voyage.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/account" className="flex-1 bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl">
                                <Package className="w-4 h-4" /> Track My Order
                            </Link>
                            <Link href="/" className="flex-1 border border-gray-900 py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                                Return to Home <MoveRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Upsell / Newsletter Mock */}
                <div className="grid md:grid-cols-2 gap-8 text-left py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <div className="p-10 bg-white border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                        <Sparkles className="w-6 h-6 text-[#163E3E]/40" />
                        <h4 className="font-serif text-xl">Care & Cleaning</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-light">Learn how to maintain the lifetime brilliance of your new treasure.</p>
                        <Link href="/guides/care" className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E] hover:underline">Read Guide</Link>
                    </div>
                    <div className="p-10 bg-white border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                        <Heart className="w-6 h-6 text-red-200" />
                        <h4 className="font-serif text-xl">Refer a Friend</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-light">Share the brilliance and you both receive $100 toward your next purchase.</p>
                        <Link href="/referral" className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E] hover:underline">Get Link</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

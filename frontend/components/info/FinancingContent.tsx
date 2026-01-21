"use client"

import Link from "next/link"
import { CreditCard, Calendar, Percent, ShieldCheck, ArrowRight, Zap } from "lucide-react"

export const FinancingContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Zap className="w-3 h-3" /> Instant Approval
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                    Make your dream <br /> a reality.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    We offer a range of flexible financing options through our trusted partners, helping you invest in a piece of luxury that lasts a lifetime.
                </p>
            </div>

            {/* Partner Grid */}
            <div className="grid lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-sm overflow-hidden font-sans">
                {[
                    {
                        partner: "Affirm",
                        title: "Pay Over Time",
                        desc: "Simple monthly payments with no hidden fees and no surprises. Choose the payment schedule that works for you.",
                        benefit: "Starting at 0% APR"
                    },
                    {
                        partner: "Wells Fargo",
                        title: "Ritzin Credit Card",
                        desc: "A dedicated line of credit for your jewelry purchases with special financing for 12 months or more on qualifying orders.",
                        benefit: "Deferred Interest Plans"
                    }
                ].map((plan, i) => (
                    <div key={i} className="bg-white p-12 md:p-20 space-y-8 hover:bg-gray-50 transition-colors group">
                        <div className="flex justify-between items-start">
                            <h3 className="font-serif text-3xl text-gray-900">{plan.partner}</h3>
                            <div className="px-4 py-1 bg-[#163E3E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{plan.benefit}</div>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900">{plan.title}</h4>
                        <p className="text-gray-500 leading-relaxed font-light">{plan.desc}</p>
                        <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#163E3E] group-hover:gap-5 transition-all">Learn More <ArrowRight className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>

            {/* Why Finance */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover"
                        alt="Modern Finance"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="space-y-12">
                    <h3 className="font-serif text-4xl text-gray-900">The Benefits of Financing</h3>
                    <div className="space-y-10">
                        {[
                            { icon: <Percent className="w-6 h-6" />, title: "Low Monthly Payments", desc: "Break your purchase into manageable budget-friendly sizes." },
                            { icon: <Calendar className="w-6 h-6" />, title: "Flexible Terms", desc: "Choose from 3 to 36 month payment intervals based on your preference." },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "Secure & Transparent", desc: "No hidden fees, prepayment penalties, or compounding interest on most plans." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="p-3 bg-gray-50 text-[#163E3E] rounded-full">{item.icon}</div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress Calculator */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 text-center text-white">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h3 className="font-serif text-5xl md:text-7xl font-light">See your buying power.</h3>
                    <p className="text-2xl opacity-80 font-light leading-relaxed">
                        Pre-qualify in minutes without affecting your credit score. Know exactly what you can afford for that perfect ring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-white text-[#163E3E] px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all shadow-2xl">Prequalify with Affirm</Link>
                        <Link href="/contact" className="border border-white/30 text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all">Apply for Ritzin Credit Card</Link>
                    </div>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest">Subject to credit approval. Minimum monthly payments required.</p>
                </div>
            </div>
        </div>
    )
}

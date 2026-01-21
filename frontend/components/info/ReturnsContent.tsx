"use client"

import Link from "next/link"
import { RefreshCcw, ShieldCheck, Truck, PackageCheck, ArrowRight } from "lucide-react"

export const ReturnsContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <RefreshCcw className="w-3 h-3" /> Risk-Free Purchase
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                    Peace of mind, <br /> guaranteed.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                    We want you to be completely in love with your Ritzin piece. If it's not exactly what you imagined, our 30-day return policy ensures a stress-free experience.
                </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    {
                        icon: <PackageCheck className="w-10 h-10" />,
                        title: "30-Day Window",
                        desc: "Return or exchange any item in its original condition within 30 days of shipment."
                    },
                    {
                        icon: <Truck className="w-10 h-10" />,
                        title: "Free Return Shipping",
                        desc: "We provide a pre-paid FedEx shipping label for all domestic returns."
                    },
                    {
                        icon: <ShieldCheck className="w-10 h-10" />,
                        title: "Full Insurance",
                        desc: "Your return shipment is fully insured by us from the moment it leaves your hands."
                    }
                ].map((step, i) => (
                    <div key={i} className="bg-gray-50 p-12 rounded-sm space-y-6 hover:translate-y-[-8px] transition-all duration-500">
                        <div className="text-[#163E3E]">{step.icon}</div>
                        <h4 className="font-serif text-2xl">{step.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">{step.desc}</p>
                    </div>
                ))}
            </div>

            {/* Visual Guide */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
                    <img
                        src="https://images.unsplash.com/photo-1549462226-94ad669046c2?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover grayscale transition-transform duration-[3000ms] group-hover:scale-105"
                        alt="Packaging"
                    />
                    <div className="absolute inset-x-8 bottom-8 bg-white/90 backdrop-blur-md p-8 shadow-xl">
                        <p className="italic text-gray-600">"Every return is handled with the same care and attention as your original purchase."</p>
                    </div>
                </div>
                <div className="space-y-12">
                    <h3 className="font-serif text-4xl text-gray-900">How It Works</h3>
                    <div className="space-y-10">
                        {[
                            { num: "01", title: "Initiate Request", desc: "Contact our diamond experts or log into your account to request a Return Authorization." },
                            { num: "02", title: "Pack Securely", desc: "Place your item in its original packaging along with all documentation and certificates." },
                            { num: "03", title: "Ship with Ease", desc: "Drop off your package at any FedEx location using our pre-paid, insured label." },
                            { num: "04", title: "Final Inspection", desc: "Once received, our quality team inspects the item and processes your full refund within 5 business days." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <span className="text-4xl font-serif text-[#163E3E]/20 group-hover:text-[#163E3E] transition-colors">{item.num}</span>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[11px]">{item.title}</h4>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fine Print / CTA */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 text-center text-white rounded-sm">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h3 className="font-serif text-4xl">Questions about an exchange?</h3>
                    <p className="text-white/70 text-lg font-light leading-relaxed">
                        Our experts can help you find a different size, style, or stone shape to make your piece perfect.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">Chat Now</Link>
                        <Link href="/info/faqs" className="border border-white/30 px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-white hover:text-black transition-all">Return Policy FAQs</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

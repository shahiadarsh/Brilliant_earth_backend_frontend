"use client"

import Link from "next/link"
import { Search, Package, Truck, CheckCircle, ArrowRight, ShieldCheck, Globe, Info } from "lucide-react"

export default function OrderTrackingPage() {
    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-[#163E3E] text-white py-24 md:py-40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1586528116311-ad86d6ade5e0?auto=format&fit=crop&q=80&w=1000" className="object-cover w-full h-full rotate-6 scale-125" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.4em] font-bold">
                        <Globe className="w-4 h-4" /> Global Fulfillment
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl text-white leading-tight font-light">Track Your <br /> Masterpiece.</h1>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                        Your Ritzin jewelry is currently being crafted, inspected, or shipped with the utmost care. Enter your details to follow its journey.
                    </p>
                </div>
            </div>

            {/* Tracking Form */}
            <div className="max-w-xl mx-auto px-6 -mt-20 relative z-20">
                <div className="bg-white p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 space-y-10 rounded-sm">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#163E3E]">Order Number</label>
                            <input
                                type="text"
                                placeholder="e.g. RZ-123456"
                                className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent font-serif text-2xl placeholder:text-gray-200"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#163E3E]">Email Address</label>
                            <input
                                type="email"
                                placeholder="The email used for purchase"
                                className="w-full border-b-2 border-gray-100 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent font-serif text-2xl placeholder:text-gray-200"
                            />
                        </div>
                    </div>
                    <button className="w-full bg-[#163E3E] text-white py-7 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-4 group">
                        Track My Order <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        <ShieldCheck className="w-4 h-4" /> Secure 256-bit Encrypted Check
                    </div>
                </div>
            </div>

            {/* Timeline Guide */}
            <div className="max-w-7xl mx-auto px-6 py-32 md:py-48 grid lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="font-serif text-4xl md:text-6xl text-gray-900">Crafting <br /> Excellence.</h2>
                        <div className="w-20 h-1 bg-[#163E3E]"></div>
                    </div>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        Every Ritzin piece undergoes a meticulous creation process. From sourcing the finest ethically-mined stones to the final hand-polish, excellence takes time.
                    </p>
                    <div className="space-y-12">
                        {[
                            { step: "Design & Sourcing", time: "2-4 Days", desc: "Our specialists select your diamonds and prepare the workshop." },
                            { step: "Hand-Crafting", time: "5-10 Days", desc: "Master jewelers set your stone and cast the precious metal." },
                            { step: "Quality Assurance", time: "1-2 Days", desc: "GIA gemologists verify every detail under 10x magnification." },
                            { step: "Insured Transit", time: "1-3 Days", desc: "Your piece is shipped via fully-insured FedEx overnight." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <span className="text-4xl font-serif text-[#163E3E]/10 group-hover:text-[#163E3E] transition-colors">0{i + 1}</span>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-1">{item.step} <span className="text-gray-300 ml-2 font-normal">| {item.time}</span></h4>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-4 border border-gray-100 rounded-sm -z-10 group-hover:inset-0 transition-all duration-700"></div>
                    <img
                        src="https://images.unsplash.com/photo-1549462226-94ad669046c2?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover rounded-sm shadow-2xl grayscale transition-all duration-1000 group-hover:grayscale-0"
                    />
                    <div className="absolute top-12 left-12 bg-white/90 backdrop-blur-md p-8 shadow-2xl border-l-4 border-[#163E3E]">
                        <Info className="w-8 h-8 text-[#163E3E] mb-4" />
                        <h4 className="font-bold uppercase tracking-widest text-[10px] mb-2">Did you know?</h4>
                        <p className="text-sm text-gray-600 font-serif italic leading-relaxed">Most engagement rings require over 40 hours of artisanal labor to achieve the Ritzin standard.</p>
                    </div>
                </div>
            </div>

            {/* Support Footer */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-gray-100 text-sans">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="font-serif text-4xl text-gray-900 italic">Need immediate assistance?</h3>
                        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">Our concierge team is available around the clock to provide updates on your order or answer any questions.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <Link href="/contact" className="bg-[#163E3E] text-white px-12 py-5 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-xl">Contact Expert</Link>
                        <Link href="/info/faqs" className="border border-gray-900 px-12 py-5 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all">View Shipping FAQs</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

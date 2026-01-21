"use client"

import Link from "next/link"
import { ShieldCheck, Sparkles, Gem, Hammer, CheckCircle } from "lucide-react"

export const WarrantyContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-3 h-3" /> Lifetime Guarantee
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                    Craftsmanship built <br /> for generations.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    At Ritzin, we stand behind the quality of our craftsmanship. Our free lifetime warranty ensures your jewelry remains as exquisite as the day you first saw it.
                </p>
            </div>

            {/* Split Feature */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <h3 className="font-serif text-4xl text-gray-900 leading-tight">Protection that endures.</h3>
                    <p className="text-lg text-gray-600 font-light leading-relaxed font-sans">
                        Your jewelry is meant to be worn and loved. Our comprehensive warranty covers manufacturing defects for the life of the piece, giving you confidence in every sparkle.
                    </p>
                    <div className="grid gap-8">
                        {[
                            { icon: <CheckCircle className="w-6 h-6 text-[#163E3E]" />, title: "Manufacturing Defects", desc: "Covers any issues related to the structural integrity and creation of the piece." },
                            { icon: <CheckCircle className="w-6 h-6 text-[#163E3E]" />, title: "Prong Tightening", desc: "Expert inspection and tightening of prongs as part of our care program." },
                            { icon: <CheckCircle className="w-6 h-6 text-[#163E3E]" />, title: "Lifetime Cleaning", desc: "Free ultrasonic cleaning and professional steam cleaning in any showroom." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                {item.icon}
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200"
                        className="w-full rounded-sm shadow-2xl"
                        alt="Jewelry Inspection"
                    />
                    <div className="absolute -bottom-12 -right-12 bg-[#163E3E] p-12 text-white shadow-2xl hidden md:block max-w-xs">
                        <Gem className="w-10 h-10 mb-6 opacity-30" />
                        <p className="font-serif text-2xl mb-4 italic">Certified Quality</p>
                        <p className="text-sm opacity-70 font-light leading-relaxed">Every Ritzin piece undergoes a multi-point inspection by GIA-certified gemologists before it reaches you.</p>
                    </div>
                </div>
            </div>

            {/* Care Program */}
            <div className="bg-[#F9F9F9] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 rounded-sm border-b border-gray-100">
                <div className="text-center mb-24 space-y-4">
                    <h3 className="font-serif text-4xl">The Ritzin Care Program</h3>
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Maintaining brilliance for a lifetime</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {[
                        {
                            icon: <Sparkles className="w-10 h-10" />,
                            title: "Free Inspections",
                            desc: "We recommend a professional cleaning and inspection every 6 months to maintain your warranty."
                        },
                        {
                            icon: <Hammer className="w-10 h-10" />,
                            title: "Expert Repairs",
                            desc: "Should your jewelry need repair outside of manufacturing defects, our master jewelers offer discounted rates."
                        },
                        {
                            icon: <ShieldCheck className="w-10 h-10" />,
                            title: "Resizing Service",
                            desc: "We offer one free resizing within the first 60 days for most engagement rings and wedding bands."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-12 space-y-6 hover:shadow-xl transition-all group border border-gray-100">
                            <div className="text-[#163E3E] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all">{item.icon}</div>
                            <h4 className="font-serif text-2xl">{item.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-12">
                <div className="max-w-xl mx-auto space-y-6">
                    <h3 className="font-serif text-4xl">Need a Repair?</h3>
                    <p className="text-gray-500 font-light leading-relaxed">Our team is ready to restore your Ritzin piece to its original glory. Start your online repair request today or visit a showroom.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/contact" className="bg-[#163E3E] text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-xl">Initiate Repair</Link>
                    <Link href="/info/faqs" className="border border-gray-900 px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all">Warranty FAQs</Link>
                </div>
            </div>
        </div>
    )
}

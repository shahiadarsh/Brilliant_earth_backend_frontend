"use client"

import { Recycle, ShieldCheck, Leaf, Sparkles, ArrowRight } from "lucide-react"

export const RepurposedGoldContent = () => {
    return (
        <div className="space-y-32 -mt-12 font-sans">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Recycle className="w-3 h-3" /> Circular Luxury
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                    Pure luxury, <br /> endlessly recycled.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    Gold is one of the world's most sustainable materials. We use 100% recycled precious metals to minimize environmental impact without compromising on brilliance or quality.
                </p>
            </div>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
                {[
                    { label: "Environmental Saving", value: "99%", desc: "Lower carbon footprint compared to newly mined gold." },
                    { label: "Water Usage", value: "-90%", desc: "Reduction in water consumption during processing." },
                    { label: "Waste Reduction", value: "ZERO", desc: "Chemical-free recycling process in our closed-loop system." }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-12 text-center space-y-4">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{stat.label}</p>
                        <p className="text-5xl font-serif text-[#163E3E]">{stat.value}</p>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Split Process Section */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <h3 className="font-serif text-4xl text-gray-900">The Journey of <br /> Repurposed Gold</h3>
                    <div className="space-y-10 border-l border-gray-100 pl-8">
                        {[
                            { title: "Ethical Collection", desc: "We source post-consumer jewelry and industrial metals from certified suppliers." },
                            { title: "Refining Excellence", desc: "Materials are refined back to their purest elemental form, indistinguishable from new gold." },
                            { title: "Artisanal Casting", desc: "Our master jewelers use this 100% recycled metal to cast your unique design." }
                        ].map((step, i) => (
                            <div key={i} className="space-y-2 relative">
                                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#163E3E]"></div>
                                <h4 className="font-bold text-[11px] uppercase tracking-widest text-[#163E3E]">{step.title}</h4>
                                <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200"
                        className="w-full rounded-sm shadow-2xl transition-all duration-1000"
                    />
                    <div className="absolute -bottom-10 -left-10 bg-[#163E3E] p-10 text-white shadow-2xl max-w-xs">
                        <ShieldCheck className="w-10 h-10 mb-6 opacity-30" />
                        <h4 className="font-serif text-2xl mb-2 italic">Indistinguishable Quality</h4>
                        <p className="text-xs opacity-70 leading-relaxed font-light">Gold is an element. Its molecular structure never changes, no matter how many times it's repurposed.</p>
                    </div>
                </div>
            </div>

            {/* Why it Matters */}
            <div className="bg-[#F9F9F9] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 rounded-sm border-y border-gray-100">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="aspect-square relative group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1549462226-94ad669046c2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" />
                    </div>
                    <div className="space-y-12">
                        <h3 className="font-serif text-5xl">Healing the Earth.</h3>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Traditional gold mining can be environmentally destructive. By choosing repurposed gold, you are actively supporting a circular economy and protecting fragile ecosystems.
                        </p>
                        <div className="grid gap-8">
                            <div className="flex gap-4 items-center py-4 border-b border-gray-200">
                                <Leaf className="w-6 h-6 text-[#163E3E]" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">No New Mining Required</span>
                            </div>
                            <div className="flex gap-4 items-center py-4 border-b border-gray-200">
                                <Sparkles className="w-6 h-6 text-[#163E3E]" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Identical Brilliance & Luster</span>
                            </div>
                            <div className="flex gap-4 items-center py-4 border-b border-gray-200">
                                <ShieldCheck className="w-6 h-6 text-[#163E3E]" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">RJC Chain of Custody Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

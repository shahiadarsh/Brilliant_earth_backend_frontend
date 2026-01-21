"use client"

import { FileText, TrendingUp, Globe, Heart, ShieldCheck, ArrowRight, Download } from "lucide-react"

export const MissionReportContent = () => {
    return (
        <div className="space-y-32 -mt-12 font-sans">
            {/* Hero Section */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 md:py-48 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-4xl mx-auto space-y-10 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.3em] font-bold">
                        Annual Impact Report
                    </div>
                    <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] font-light italic">Mission 2024.</h2>
                    <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed max-w-2xl">
                        A transparent look at our progress, our challenges, and our unwavering commitment to creating a more ethical jewelry industry.
                    </p>
                    <button className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all flex items-center gap-4">
                        Download Full PDF <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Impact Pillars */}
            <div className="grid lg:grid-cols-3 gap-12">
                {[
                    { icon: <Globe className="w-10 h-10" />, title: "Environmental", val: "Carbon Neutral", desc: "For the third consecutive year, we have offset 100% of our operations footprint." },
                    { icon: <Heart className="w-10 h-10" />, title: "Social Impact", val: "$2.4M Donated", desc: "Supporting education and healthcare in artisanal mining communities." },
                    { icon: <ShieldCheck className="w-10 h-10" />, title: "Ethical Supply", val: "100% Traceable", desc: "Every diamond above 0.5ct is now tracked on our proprietary blockchain." }
                ].map((pillar, i) => (
                    <div key={i} className="p-12 border border-gray-100 space-y-8 hover:bg-gray-50 transition-colors group">
                        <div className="text-[#163E3E] group-hover:scale-110 transition-transform">{pillar.icon}</div>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{pillar.title}</p>
                            <h4 className="text-3xl font-serif text-gray-900">{pillar.val}</h4>
                        </div>
                        <p className="text-gray-500 font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                ))}
            </div>

            {/* Progress Visualization */}
            <div className="grid lg:grid-cols-2 gap-24 items-center py-20 border-t border-gray-100">
                <div className="space-y-10">
                    <h3 className="font-serif text-4xl leading-tight">Measuring <br /> our progress.</h3>
                    <div className="space-y-12">
                        {[
                            { label: "Recycled Metal Adoption", progress: "100%", goal: "Achieved 2024" },
                            { label: "Lab Diamond Sourcing (Renewable Energy)", progress: "85%", goal: "Target 100% by 2026" },
                            { label: "Packaging Biodegradability", progress: "95%", goal: "Target 100% by 2025" }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span>{item.label}</span>
                                    <span className="text-[#163E3E]">{item.progress}</span>
                                </div>
                                <div className="h-1 w-full bg-gray-100 relative">
                                    <div
                                        className="h-full bg-[#163E3E] transition-all duration-1000"
                                        style={{ width: item.progress }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gray-400 italic">Current Status: {item.goal}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative aspect-video lg:aspect-square bg-gray-50 rounded-sm overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1576085890983-490351717dfb?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <TrendingUp className="w-12 h-12 text-[#163E3E]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Community Spotlight */}
            <div className="text-center space-y-16">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h3 className="font-serif text-5xl">Voices of Impact.</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        Beyond numbers, our mission is about people. Here's a glimpse into the communities we support.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="relative h-[400px] group overflow-hidden rounded-sm">
                        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-left text-white translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                            <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">Community Education</p>
                            <h4 className="text-2xl font-serif italic mb-4">"The high school fellowship has allowed us to train the next generation of gemologists right here in Botswana."</h4>
                            <p className="text-xs opacity-60">— Dr. Amara K., Education Lead</p>
                        </div>
                    </div>
                    <div className="relative h-[400px] group overflow-hidden rounded-sm">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end text-left text-white translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                            <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">Renewable Energy</p>
                            <h4 className="text-2xl font-serif italic mb-4">"Transitioning our workshop to 100% solar power was a challenge we met two years ahead of schedule."</h4>
                            <p className="text-xs opacity-60">— Marcus V., Operations Director</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

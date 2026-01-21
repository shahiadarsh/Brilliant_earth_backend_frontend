"use client"

import { Heart, Globe, Sparkles, ArrowRight, Zap, Coffee } from "lucide-react"

export default function CareersPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Split Hero */}
            <div className="grid lg:grid-cols-2 min-h-[70vh]">
                <div className="bg-[#F9F9F9] flex flex-col justify-center p-12 md:p-24 lg:p-32 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                        <Zap className="w-3 h-3" /> 20+ New Positions
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl text-gray-900 leading-[1.05]">Join the <br /> Revolution.</h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                        Help us cultivate a more transparent, sustainable, and compassionate jewelry industry.
                    </p>
                    <button className="bg-[#163E3E] text-white px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black transition-all shadow-xl w-fit">View Open Roles</button>
                </div>
                <div className="relative overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover grayscale transition-transform duration-[4000ms] group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#163E3E]/10 mix-blend-multiply group-hover:bg-transparent transition-all"></div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-40">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="grid grid-cols-2 gap-8">
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" className="rounded-sm translate-y-12" />
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600" className="rounded-sm" />
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif text-4xl text-gray-900">Why Ritzin?</h2>
                            <p className="text-xl text-gray-500 font-light leading-relaxed">
                                We are more than a jewelry company. We are a team of innovators, dreamers, and doers working together to redefine luxury for the modern world.
                            </p>
                        </div>
                        <div className="space-y-8">
                            {[
                                { icon: <Globe className="w-6 h-6" />, title: "Global Impact", desc: "A portion of every sale goes to community initiatives in mining regions." },
                                { icon: <Sparkles className="w-6 h-6" />, title: "Innovation Culture", desc: "We lead the industry in ethical sourcing and digital retail technology." },
                                { icon: <Coffee className="w-6 h-6" />, title: "Wellness First", desc: "Comprehensive health benefits, flexible working, and holistic support." }
                            ].map((value, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="p-3 bg-gray-50 text-[#163E3E] rounded-full">{value.icon}</div>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">{value.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed font-light">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Listings Expansion */}
            <div className="bg-[#163E3E] -mx-0 px-6 py-32 text-white">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <h3 className="font-serif text-5xl">Open Opportunities</h3>
                            <p className="text-xl opacity-70 font-light max-w-xl">Explore our current openings across our global headquarters and showroom network.</p>
                        </div>
                        <div className="flex gap-4">
                            {["Remote", "San Francisco", "London", "New York"].map((loc) => (
                                <button key={loc} className="px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#163E3E] transition-all">
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-px bg-white/10 border border-white/10">
                        {[
                            { title: "Senior Jewelry Stylist", cat: "Retail", loc: "San Francisco, CA" },
                            { title: "Product Manager, AR/VR", cat: "Technology", loc: "Remote" },
                            { title: "Content Marketing Lead", cat: "Marketing", loc: "London, UK" },
                            { title: "Diamond Inventory Analyst", cat: "Operations", loc: "New York, NY" },
                            { title: "Sustainability Data Analyst", cat: "Corporate", loc: "San Francisco, CA" }
                        ].map((job, i) => (
                            <div key={i} className="group bg-[#163E3E] p-12 flex flex-col md:flex-row justify-between items-center hover:bg-[#1C4C4C] transition-all cursor-pointer">
                                <div className="space-y-2 text-center md:text-left">
                                    <h4 className="font-serif text-3xl group-hover:translate-x-4 transition-transform duration-500">{job.title}</h4>
                                    <p className="text-xs uppercase tracking-[0.3em] opacity-50">{job.cat} • {job.loc}</p>
                                </div>
                                <button className="mt-8 md:mt-0 px-10 py-4 bg-white text-[#163E3E] text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

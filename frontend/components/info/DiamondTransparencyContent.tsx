"use client"

import { ShieldCheck, Map, Search, Globe, Sparkles, ArrowRight, Database } from "lucide-react"

export const DiamondTransparencyContent = () => {
    return (
        <div className="space-y-32 -mt-12 font-sans">
            {/* Immersive Hero */}
            <div className="relative h-[80vh] -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden rounded-sm group">
                <img
                    src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover transition-transform duration-[8000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-6 md:p-12 space-y-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-[0.4em]">
                        Beyond Conflict Free™
                    </div>
                    <h2 className="font-serif text-5xl md:text-9xl leading-[0.85] font-light">Radical <br /> Transparency.</h2>
                    <p className="text-xl md:text-3xl font-light opacity-80 max-w-3xl mx-auto leading-relaxed">
                        Knowing the origin of your diamond is not a privilege—it's a right. We provide a full chain of custody for every natural gem.
                    </p>
                </div>
            </div>

            {/* Blockchain Explanation */}
            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h3 className="font-serif text-5xl text-gray-900 leading-tight">The Ledger of <br /> Brilliance.</h3>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            We utilize advanced blockchain technology to create an unchangeable digital record for every diamond in our collection. This "digital passport" tracks the gem from the mine to your finger.
                        </p>
                    </div>
                    <div className="grid gap-8">
                        {[
                            { icon: <Database className="w-6 h-6" />, title: "Immutable Records", desc: "Data entered at source cannot be altered, ensuring the highest level of trust." },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "Certified Provenance", desc: "Digital certificates verify the exact mine of origin and the ethical standards maintained." },
                            { icon: <Search className="w-6 h-6" />, title: "Public Verification", desc: "Scan your diamond's unique ID to see its entire journey through the supply chain." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="p-3 bg-gray-50 text-[#163E3E] rounded-full">{item.icon}</div>
                                <div>
                                    <h4 className="font-bold border-b border-[#163E3E] pb-1 mb-2 w-fit text-[11px] uppercase tracking-widest text-[#163E3E]">{item.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative p-12 bg-[#F9F9F9] rounded-sm">
                    <Map className="w-full h-auto text-gray-200" />
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#163E3E] rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#163E3E] rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-[#163E3E] rounded-full animate-spin"></div>
                </div>
            </div>

            {/* Sourcing Standards */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 text-white text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h3 className="font-serif text-5xl md:text-7xl font-light italic">More than just "Conflict-Free."</h3>
                    <p className="text-2xl text-white/70 font-light leading-relaxed">
                        The Kimberley Process isn't enough. Our standards go further, ensuring zero forced labor, fair wages, and environmental restoration in every mining community we partner with.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-white text-[#163E3E] px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all">View Our Standards</button>
                        <button className="border border-white/30 text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all">Sourcing Report</button>
                    </div>
                </div>
            </div>

            {/* Visual Quote */}
            <div className="relative h-[600px] group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1549462226-94ad669046c2?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                    <div className="max-w-2xl bg-white/95 backdrop-blur-md p-16 shadow-2xl relative">
                        <Globe className="w-12 h-12 text-[#163E3E] mb-8 mx-auto" />
                        <p className="font-serif text-3xl md:text-5xl italic text-gray-900 leading-[1.2] mb-8">"Transparency is the only way forward for luxury. If you can't trace it, don't trust it."</p>
                        <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#163E3E]">Gerard R., CEO of Ritzin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

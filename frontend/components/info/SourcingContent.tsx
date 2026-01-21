"use client"

import { Globe, ShieldCheck, MapPin, Eye } from "lucide-react"

export const SourcingContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Intro Grid */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">Beyond Conflict Free™</h2>
                    <p className="text-xl text-gray-600 font-light leading-relaxed">
                        Standard "conflict-free" diamonds are defined by the Kimberley Process, but we believe those standards are too narrow. We go further to protect human rights and the environment.
                    </p>
                    <div className="pt-8 border-t border-gray-100 flex gap-12">
                        <div>
                            <p className="text-3xl font-serif text-[#163E3E]">100%</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Traceable Diamonds</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif text-[#163E3E]">98%</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Recycled Gold</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-auto rounded-sm shadow-2xl"
                    />
                    <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl max-w-xs hidden md:block">
                        <p className="italic text-gray-600">"Our standards represent the most rigorous diamond sourcing protocols in the jewelry industry."</p>
                    </div>
                </div>
            </div>

            {/* Standards Grid */}
            <div className="space-y-16">
                <div className="text-center">
                    <h3 className="font-serif text-4xl mb-4">Our Rigorous Standards</h3>
                    <p className="text-gray-500">How we evaluate every single gemstone supplier</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <ShieldCheck className="w-8 h-8" />,
                            title: "Human Rights",
                            desc: "Strict prohibition of child labor and forced labor, with mandated living wages."
                        },
                        {
                            icon: <Globe className="w-8 h-8" />,
                            title: "Environmental Stewardship",
                            desc: "Suppliers must minimize environmental footprint and practice land restoration."
                        },
                        {
                            icon: <Eye className="w-8 h-8" />,
                            title: "Total Transparency",
                            desc: "Audited chain of custody from the mine to our workshop."
                        }
                    ].map((std, i) => (
                        <div key={i} className="border border-gray-100 p-12 rounded-sm space-y-6 hover:border-[#163E3E] transition-colors group">
                            <div className="text-[#163E3E]/40 group-hover:text-[#163E3E] transition-colors">{std.icon}</div>
                            <h4 className="font-serif text-2xl">{std.title}</h4>
                            <p className="text-gray-500 leading-relaxed">{std.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mapping Section */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 text-white">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                        className="w-full rounded-sm opacity-60 grayscale brightness-125"
                    />
                    <div className="space-y-8">
                        <h3 className="font-serif text-5xl">Global Impact</h3>
                        <p className="text-xl opacity-80 font-light">
                            We source from specific countries that meet our high standards, including Canada, Botswana, Namibia, and South Africa.
                        </p>
                        <div className="space-y-6">
                            {[
                                { place: "Canada", detail: "Exemplary environmental and labor laws." },
                                { place: "Botswana", detail: "Jewelry industry funds 25% of the GDP." },
                                { place: "Namibia", detail: "Supporting marine ecosystem restoration." }
                            ].map((loc, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <MapPin className="w-6 h-6 shrink-0 opacity-40" />
                                    <div>
                                        <p className="font-bold uppercase tracking-[0.2em] text-[10px] mb-1">{loc.place}</p>
                                        <p className="opacity-70 text-sm">{loc.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

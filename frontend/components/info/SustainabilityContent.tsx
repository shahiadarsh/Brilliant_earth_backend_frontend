"use client"

import { Leaf, Wind, Recycle, Zap } from "lucide-react"

export const SustainabilityContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Mission Hero */}
            <div className="text-center max-w-4xl mx-auto space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Zap className="w-3 h-3" /> Net Zero by 2040
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-[1.1]">
                    Luxury that gives more <br /> than it takes.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    We are carbon neutral today and have set ambitious goals to reduce our absolute emissions and reaching Net Zero by 2040.
                </p>
            </div>

            {/* Recycled Metals Section */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1596944210900-34a5cd8019c4?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover rounded-full p-12 border border-gray-100"
                    />
                    <div className="absolute inset-0 border-[20px] border-[#163E3E]/5 rounded-full animate-pulse-slow"></div>
                </div>
                <div className="space-y-10">
                    <h3 className="font-serif text-4xl text-gray-900">100% Recycled Metals</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Mining gold is environmentally intensive. To minimize our footprint, over 90% of our gold and 100% of our silver is from recycled sources. These metals are identical in quality to newly mined gold but without the environmental toll.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <Recycle className="w-6 h-6 text-[#163E3E]" />
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">Sustainable Circle</h4>
                                <p className="text-sm text-gray-500">We offer a gold recycling program for your old jewelry pieces.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <Leaf className="w-6 h-6 text-[#163E3E]" />
                            <div>
                                <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">Lower Carbon</h4>
                                <p className="text-sm text-gray-500">Recycled gold has 99% fewer carbon emissions than mined gold.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Climate Action Grid */}
            <div className="space-y-20">
                <div className="text-center">
                    <h3 className="font-serif text-4xl mb-4">Our Commitment to Climate</h3>
                    <p className="text-gray-500">Measured actions, not just promises.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-px bg-gray-100">
                    {[
                        {
                            title: "Carbon Removal",
                            detail: "We invest in nature-based solutions and technological carbon removal projects to offset 100% of our operational emissions."
                        },
                        {
                            title: "Sustainable Packaging",
                            detail: "Our signature wood boxes are sourced from FSC-certified forests, and our shipping materials are 100% recyclable."
                        },
                        {
                            title: "Renewable Energy",
                            detail: "We power our headquarters and showrooms with 100% renewable wind and solar energy certificates."
                        },
                        {
                            title: "Zero Waste",
                            detail: "Our goal is to divert 95% of our office and showroom waste from landfills by 2030 through rigorous recycling and composting."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-16 space-y-6 hover:bg-gray-50 transition-colors">
                            <h4 className="font-serif text-2xl">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed font-light">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h3 className="font-serif text-4xl text-white">Download Our Full Report</h3>
                    <p className="text-white/70 text-lg">Read about our progress toward our 2040 Net Zero goals in our latest ESG transparency report.</p>
                    <button className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all shadow-2xl">Download PDF</button>
                </div>
            </div>
        </div>
    )
}

"use client"

import { Heart, Globe, Users, Sparkles, ShieldCheck, ArrowRight } from "lucide-react"

export const InclusivityContent = () => {
    return (
        <div className="space-y-32 -mt-12 font-sans">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Users className="w-3 h-3" /> Built for Everyone
                </div>
                <h2 className="font-serif text-5xl md:text-8xl text-gray-900 leading-[0.9] font-light italic">Equality <br /> in every facet.</h2>
                <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    A more brilliant future is one where everyone is seen, heard, and celebrated. We are committed to fostering a culture of belonging for our team and our customers.
                </p>
            </div>

            {/* Split Feature */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative group overflow-hidden rounded-sm">
                    <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover grayscale transition-transform duration-[4000ms] group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="space-y-12">
                    <h3 className="font-serif text-4xl leading-tight">Diversity as a <br /> core strength.</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        We believe that our differences make us stronger. From our hiring practices to our range of product designs, inclusivity is woven into the fabric of Ritzin.
                    </p>
                    <div className="space-y-8">
                        {[
                            { title: "Inclusive Sizing", desc: "Our rings are available in the widest range of sizes in the industry, from 1 to 15, including quarter sizes." },
                            { title: "Gender Neutral Collections", desc: "Jewelry has no gender. We offer bold, sophisticated designs suitable for every expression of love." },
                            { title: "Diverse Artist Network", desc: "We collaborate with designers from underrepresented backgrounds to bring unique perspectives to our collections." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="p-3 bg-gray-50 text-[#163E3E] rounded-full group-hover:bg-[#163E3E] group-hover:text-white transition-colors h-fit">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[11px]">{item.title}</h4>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workplace Commitment */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 text-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <h3 className="font-serif text-5xl">Our Global Team.</h3>
                        <p className="text-xl opacity-70 font-light leading-relaxed">
                            Our commitment starts from within. We are proud to have a global team that reflects the diversity of the world we serve.
                        </p>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <p className="text-4xl font-serif">72%</p>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Women in Leadership</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-serif">40%+</p>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">BIPOC Representation</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-serif">Global</p>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Remote-First Culture</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-serif">Inclusive</p>
                                <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Benefits & Support</p>
                            </div>
                        </div>
                        <button className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">Join Our Team</button>
                    </div>
                    <div className="aspect-[4/5] relative bg-white/5 p-4 rotate-3 group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                    </div>
                </div>
            </div>

            {/* Support Message */}
            <div className="max-w-3xl mx-auto text-center space-y-12">
                <Heart className="w-16 h-16 text-[#163E3E] mx-auto opacity-20" />
                <h3 className="font-serif text-4xl">Every story is precious.</h3>
                <p className="text-xl text-gray-500 font-light leading-relaxed italic">
                    "At Ritzin, we don't just sell jewelry. We celebrate the unique sparks that make us human. Our mission is to ensure that luxury is a space where everyone feels they belong."
                </p>
                <div className="pt-8 flex justify-center gap-8">
                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">Bethany M.</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Chief People Officer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

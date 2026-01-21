"use client"

import { Heart, Leaf, Users, ShieldCheck } from "lucide-react"

export const MissionContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Hero Quote */}
            <div className="text-center max-w-3xl mx-auto space-y-8">
                <h2 className="font-serif text-3xl md:text-5xl text-gray-900 leading-tight">
                    "We believe luxury should not come at a cost to people or the planet."
                </h2>
                <div className="w-16 h-1 bg-[#163E3E] mx-auto"></div>
                <p className="text-xl text-gray-500 font-light leading-relaxed">
                    Ritzin was founded with a rebellious spirit and a lofty objective: to cultivate a more transparent, sustainable, and compassionate jewelry industry.
                </p>
            </div>

            {/* Split Section: The Beginning */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <img
                        src="https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F5d1212c525024258ab3e2212e86e85dd&w=1920&q=75&dpl=a04e727cd2fb07c9e057b0f6f9cdca82a6798dad"
                        className="w-full h-full object-cover"
                        alt="Ethical Sourcing"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="space-y-8">
                    <h3 className="font-serif text-4xl text-gray-900">Transcending Tradition</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        For too long, the jewelry industry has been shrouded in mystery and complex supply chains. Ritzin was born out of a desire for change. We've spent over two decades challenging the status quo, ensuring every diamond and gemstone we offer is sourced with the highest ethical standards.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Direct-to-consumer model for fair pricing",
                            "100% Transparency in origin",
                            "Community-first approach to mining regions"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-gray-700">
                                <div className="w-1.5 h-1.5 bg-[#163E3E] rounded-full"></div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* The Four Pillars */}
            <div className="bg-[#163E3E]/5 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 rounded-sm">
                <div className="text-center mb-20 space-y-4">
                    <h3 className="font-serif text-4xl text-gray-900">Our Four Pillars</h3>
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">The foundation of everything we do</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        {
                            icon: <ShieldCheck className="w-10 h-10" />,
                            title: "Ethical Sourcing",
                            desc: "Going beyond conflict-free to ensure fair labor and safe conditions."
                        },
                        {
                            icon: <Leaf className="w-10 h-10" />,
                            title: "Sustainability",
                            desc: "Active carbon removal and 100% recycled metals in every piece."
                        },
                        {
                            icon: <Users className="w-10 h-10" />,
                            title: "Community",
                            desc: "Investing in education and healthcare in artisanal mining communities."
                        },
                        {
                            icon: <Heart className="w-10 h-10" />,
                            title: "Transparency",
                            desc: "Blockchain-backed origin tracking for every major gemstone."
                        }
                    ].map((pillar, i) => (
                        <div key={i} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl transition-all group">
                            <div className="text-[#163E3E] mb-6 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                            <h4 className="font-serif text-xl mb-4">{pillar.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Width Impact Section */}
            <div className="relative h-[600px] -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden group">
                <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                    <h3 className="font-serif text-5xl md:text-7xl mb-8">20 Years of Innovation</h3>
                    <p className="max-w-xl text-xl opacity-80 font-light mb-12">
                        From the first lab-grown collection to our net-zero commitment, we're just getting started.
                    </p>
                    <button className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">
                        View Our Timeline
                    </button>
                </div>
            </div>
        </div>
    )
}

"use client"

import { Heart, School, TreePine, GraduationCap } from "lucide-react"

export const GiveBackContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Split Header */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">Giving Back <br /> with Every Grain</h2>
                    <p className="text-xl text-gray-600 font-light leading-relaxed">
                        We don't just sell jewelry; we invest in the future of the communities that make our business possible. Since our founding, we've donated millions to causes aligned with our mission.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-[3/4] rounded-sm overflow-hidden translate-y-12">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[3/4] rounded-sm overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Impact Cards */}
            <div className="space-y-20">
                <div className="text-center">
                    <h3 className="font-serif text-4xl mb-4">Our Core Initiatives</h3>
                    <p className="text-gray-500">How your purchase directly makes a difference</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        {
                            icon: <School className="w-10 h-10" />,
                            title: "Mobile Schools",
                            desc: "Supporting the Diamond Development Initiative (DDI) to bring education to artisanal mining communities in Sierra Leone.",
                            stat: "Over 5,000 children reached"
                        },
                        {
                            icon: <TreePine className="w-10 h-10" />,
                            title: "Rainforest Restoration",
                            desc: "Partnering with Rainforest Releaf to restore ecosystems in areas affected by historical mining activities.",
                            stat: "1 Million trees planted"
                        },
                        {
                            icon: <GraduationCap className="w-10 h-10" />,
                            title: "The Ritzin Scholarship",
                            desc: "Providing vocational training and higher education scholarships for women in mining regions.",
                            stat: "$2M in scholarships"
                        }
                    ].map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="mb-8 overflow-hidden rounded-sm">
                                <div className="bg-[#163E3E] p-16 text-white flex justify-center group-hover:bg-[#123333] transition-colors">
                                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                                </div>
                            </div>
                            <h4 className="font-serif text-2xl mb-4">{item.title}</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed font-light">{item.desc}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#163E3E]">{item.stat}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Story */}
            <div className="bg-[#F9F9F9] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 rounded-sm">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 relative">
                        <img
                            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200"
                            className="w-full rounded-sm shadow-2xl"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-10 rounded-full cursor-pointer hover:bg-white/20 transition-all">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 space-y-8">
                        <h3 className="font-serif text-4xl text-gray-900">Education for a Brighter Future</h3>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Watch our short documentary on how Ritzin's mobile schools are changing the lives of young children in the Kono district of Sierra Leone.
                        </p>
                        <button className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-[#163E3E] group">
                            Watch the Story <Heart className="w-4 h-4 group-hover:fill-[#163E3E] transition-all" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

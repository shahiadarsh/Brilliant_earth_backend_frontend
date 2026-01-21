"use client"

import { useState } from "react"
import { Calendar, Monitor, MapPin, ChevronRight, Clock, Star, ShieldCheck, ArrowRight } from "lucide-react"

export default function AppointmentPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Split Hero */}
            <div className="grid lg:grid-cols-2 min-h-[85vh]">
                <div className="relative bg-[#F9F9F9] overflow-hidden group flex flex-col justify-center p-12 md:p-24 lg:p-32">
                    <div className="relative z-10 space-y-10">
                        <Monitor className="w-12 h-12 mb-6 text-[#163E3E]" />
                        <h2 className="font-serif text-5xl md:text-8xl text-gray-900 leading-[1.05] font-light">Virtual <br /> Consultation.</h2>
                        <p className="max-w-md text-xl text-gray-500 font-light leading-relaxed">Experience the Ritzin collection from your own space with our jewelry experts via high-definition video call.</p>
                        <button className="bg-[#163E3E] text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-2xl w-fit">Book Virtual</button>
                    </div>
                </div>

                <div className="relative bg-white overflow-hidden group">
                    <img
                        src="https://image.brilliantearth.com/cdn-cgi/image/width=1440,height=1090,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F86d77be7c3a0462b85e8d39d3701b03d"
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-[5000ms] group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#163E3E]/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                        <div className="bg-white p-12 md:p-20 shadow-2xl space-y-8 max-w-lg">
                            <MapPin className="w-10 h-10 mb-6 text-[#163E3E] mx-auto" />
                            <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">In-Store Showcase.</h2>
                            <p className="text-gray-500 font-light leading-relaxed">Visit one of our luxury showrooms to see our pieces in person and receive personalized guidance from a diamond specialist.</p>
                            <button className="bg-black text-white px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-[#163E3E] transition-all w-full">Find a Location</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preparation Section */}
            <div className="max-w-7xl mx-auto px-6 py-32 md:py-48">
                <div className="grid lg:grid-cols-2 gap-32 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif text-4xl md:text-6xl text-gray-900">Expertise on <br /> Your Schedule.</h2>
                            <div className="w-16 h-1 bg-[#163E3E]"></div>
                        </div>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Our appointments are designed to be a personalized experience, whether you're just starting your search or ready to finalize a custom design. Discover why Ritzin is the leader in modern luxury.
                        </p>
                        <div className="space-y-10">
                            {[
                                { icon: <Star className="w-6 h-6" />, title: "Curated Selection", desc: "We pre-select diamonds and settings based on your style and budget preferences." },
                                { icon: <ShieldCheck className="w-6 h-6" />, title: "Certified Guidance", desc: "Learn about the 4Cs and ethical sourcing from GIA-trained experts." },
                                { icon: <Clock className="w-6 h-6" />, title: "Relaxed Pace", desc: "Enjoy 45-60 minutes of dedicated time with no purchase pressure." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#163E3E] group-hover:bg-[#163E3E] group-hover:text-white transition-all">{item.icon}</div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold uppercase tracking-widest text-[11px] text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=600" className="rounded-sm" />
                            <img src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600" className="rounded-sm" />
                        </div>
                        <div className="pt-20 space-y-4">
                            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600" className="rounded-sm" />
                            <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600" className="rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Banner */}
            <div className="bg-[#163E3E] py-32 text-white text-center">
                <div className="max-w-3xl mx-auto px-6 space-y-10">
                    <p className="font-serif text-3xl md:text-5xl italic opacity-90">"The virtual appointment was like having a personal jeweler in our living room. Truly exceptional."</p>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-white" />)}
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] font-bold">Jason & Emily, NYC</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

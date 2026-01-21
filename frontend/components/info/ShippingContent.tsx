"use client"

import { Truck, ShieldCheck, Globe, Package, Zap } from "lucide-react"

export const ShippingContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#163E3E]/5 text-[#163E3E] rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-3 h-3" /> Fully Insured & Discreet
                </div>
                <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">
                    Luxury delivered at <br /> your doorstep.
                </h2>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                    We offer free, insured shipping on every order, ensuring your Ritzin purchase arrives safely and securely at its destination.
                </p>
            </div>

            {/* Core Benefits */}
            <div className="grid lg:grid-cols-2 gap-20 items-stretch font-sans">
                <div className="bg-[#163E3E] text-white p-12 md:p-20 space-y-12 rounded-sm flex flex-col justify-center">
                    <h3 className="font-serif text-4xl">Our Shipping Guarantee</h3>
                    <div className="space-y-8">
                        {[
                            { icon: <Zap className="w-6 h-6" />, title: "Free Standard Shipping", desc: "Always free within the US, Canada, UK, and Australia." },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "Fully Insured", desc: "Every package is insured for its full value from our door to yours." },
                            { icon: <Package className="w-6 h-6" />, title: "Discreet Packaging", desc: "Our outside boxes are plain to keep your surprise safe." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="p-3 bg-white/10 rounded-full">{item.icon}</div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">{item.title}</h4>
                                    <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-sm group min-h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1580674291580-5a82200388e3?auto=format&fit=crop&q=80&w=1200"
                        className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-[4000ms] group-hover:scale-110 group-hover:grayscale-0"
                    />
                </div>
            </div>

            {/* Delivery Timeline */}
            <div className="space-y-16">
                <div className="text-center space-y-4">
                    <h3 className="font-serif text-4xl">Estimated Delivery</h3>
                    <p className="text-gray-500 font-light">Crafting perfection takes time, but your wait is worth it.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
                    {[
                        { title: "Ready to Ship", time: "1-3 Days", desc: "Select jewelry and calibrated gemstones." },
                        { title: "Made to Order", time: "1-3 Weeks", desc: "Customized settings and engagement rings." },
                        { title: "Expedited", time: "Next Day", desc: "Priority shipping available on checkout." },
                        { title: "International", time: "3-7 Days", desc: "Global delivery via FedEx International." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-12 space-y-6 flex flex-col items-center text-center group hover:bg-gray-50/50 transition-colors">
                            <h4 className="font-bold uppercase tracking-widest text-[10px] text-gray-400 group-hover:text-[#163E3E] transition-colors">{item.title}</h4>
                            <p className="text-4xl font-serif text-gray-900">{item.time}</p>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Global Reach */}
            <div className="bg-[#F9F9F9] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 rounded-sm border-y border-gray-100">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 text-[#163E3E]">
                            <Globe className="w-10 h-10" />
                            <h3 className="font-serif text-4xl">International Shipping</h3>
                        </div>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Ritzin is proud to serve luxury enthusiasts around the globe. We partner with world-class logistics providers to ensure seamless international delivery, including all customs and duties handling in most countries.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div className="space-y-2">
                                <h4 className="font-bold uppercase tracking-widest text-[11px]">Free Shipping to</h4>
                                <ul className="text-sm text-gray-600 space-y-1 italic">
                                    <li>United Kingdom</li>
                                    <li>Canada</li>
                                    <li>Australia</li>
                                    <li>European Union</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold uppercase tracking-widest text-[11px]">Secure Transit</h4>
                                <ul className="text-sm text-gray-600 space-y-1 italic">
                                    <li>Signature Required</li>
                                    <li>Real-time Tracking</li>
                                    <li>Discreet Customs Forms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover brightness-75" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-8 bg-white/10 backdrop-blur-md rounded-full">
                                <Truck className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

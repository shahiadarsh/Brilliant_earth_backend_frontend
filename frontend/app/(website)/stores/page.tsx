"use client"

import Link from "next/link"
import { MapPin, Search, ChevronRight, Clock, Star, ArrowRight } from "lucide-react"

export default function StoresPage() {
    const stores = [
        {
            city: "New York",
            address: "5th Avenue, Suite 1200",
            phone: "212.555.0123",
            image: "https://image.brilliantearth.com/cdn-cgi/image/width=886,height=1026,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fcd349e42a89c40aa8c5340cea3fdcb48",
            hours: "Mon-Sat: 10am-7pm, Sun: 11am-6pm"
        },
        {
            city: "San Francisco",
            address: "Union Square, 4th Floor",
            phone: "415.555.0456",
            image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=800",
            hours: "Mon-Sat: 11am-8pm, Sun: 11am-5pm"
        },
        {
            city: "London",
            address: "Bond Street, Ground Floor",
            phone: "+44 20 7555 0123",
            image: "https://image.brilliantearth.com/cdn-cgi/image/width=1156,height=1340,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F1442a12706ac4ae3b663e0e36c486f87",
            hours: "Mon-Sat: 10am-6pm"
        }
    ]

    return (
        <main className="bg-white min-h-screen">
            {/* Split Banner */}
            <div className="flex flex-col lg:flex-row border-b border-gray-100">
                <div className="lg:w-1/2 bg-[#163E3E] text-white p-12 md:p-24 lg:p-32 space-y-12">
                    <h1 className="font-serif text-5xl md:text-8xl leading-tight font-light">Visit Our <br /> Showrooms.</h1>
                    <p className="text-xl opacity-70 font-light max-w-md">
                        Experience our world-class service in a relaxed, no-pressure environment. Our experts are here to help you find the piece of your dreams.
                    </p>
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Enter City or Zip Code"
                            className="w-full bg-white/10 border border-white/20 px-8 py-5 rounded-sm outline-none focus:border-white transition-all text-white placeholder:text-white/40"
                        />
                        <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                    </div>
                </div>
                <div className="lg:w-1/2 relative bg-gray-100">
                    <img src="https://image.brilliantearth.com/cdn-cgi/image/width=1440,height=1090,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F86d77be7c3a0462b85e8d39d3701b03d" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            </div>

            {/* Featured Locations */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                <div className="text-center mb-24 space-y-6">
                    <h2 className="font-serif text-4xl">Featured Locations</h2>
                    <p className="text-gray-500 font-light uppercase tracking-widest text-xs">Over 30 locations worldwide</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {stores.map((store, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[4/5] overflow-hidden rounded-sm mb-8 relative shadow-lg">
                                <img src={store.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 flex items-center gap-2">
                                    <Star className="w-3 h-3 text-[#163E3E] fill-[#163E3E]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E]">Top Rated Showcase</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-serif text-3xl">{store.city}</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <MapPin className="w-4 h-4 text-[#163E3E]" /> {store.address}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                                        <Clock className="w-4 h-4 text-[#163E3E]" /> {store.hours}
                                    </div>
                                </div>
                                <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#163E3E] hover:gap-6 transition-all pt-4 group">
                                    Details & Appointment <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Appointment Banner */}
            <div className="bg-[#F9F9F9] border-y border-gray-100 py-32">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
                    <h3 className="font-serif text-4xl md:text-6xl text-gray-900 font-light italic">Can't make it to a store?</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        Experience the Ritzin collection from the comfort of your home with our personalized virtual consultations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/appointment" className="bg-[#163E3E] text-white px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black transition-all shadow-xl">Book Virtual</Link>
                        <Link href="/info/faqs" className="border border-gray-900 px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">Common FAQs</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

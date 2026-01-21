"use client"

import { Mail, Phone, MessageSquare, MapPin, Clock, ArrowRight, Instagram, Twitter, Facebook } from "lucide-react"

export default function ContactPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#163E3E] text-white py-32 md:py-48 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <img src="https://images.unsplash.com/photo-1596944210900-34a5cd8019c4?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <h1 className="font-serif text-5xl md:text-8xl leading-none font-light">Here for <br /> Your Journey.</h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Whether you're celebrating a milestone or designing a legacy, our experts are ready to guide you.
                    </p>
                </div>
            </div>

            {/* Support Methods Grid */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Phone className="w-8 h-8" />, label: "Call Us", value: "800.691.0952", sub: "Available 24/7" },
                        { icon: <MessageSquare className="w-8 h-8" />, label: "Live Chat", value: "Chat with an Expert", sub: "24/7 Instant response" },
                        { icon: <Mail className="w-8 h-8" />, label: "Email Us", value: "experts@ritzin.com", sub: "Response within 24h" },
                        { icon: <MapPin className="w-8 h-8" />, label: "Visit Us", value: "Find a Showroom", sub: "30+ Locations worldwide" }
                    ].map((method, i) => (
                        <div key={i} className="bg-white p-12 shadow-xl hover:shadow-2xl transition-all group border border-gray-100 flex flex-col items-center text-center">
                            <div className="text-[#163E3E] mb-8 group-hover:scale-110 transition-transform">{method.icon}</div>
                            <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mb-4">{method.label}</h3>
                            <p className="text-xl font-serif text-gray-900 mb-2 truncate w-full">{method.value}</p>
                            <p className="text-sm text-gray-500 font-light">{method.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form & Hours */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-40">
                <div className="grid lg:grid-cols-2 gap-24 split-container font-sans">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Send us a Message</h2>
                            <p className="text-gray-500 font-light leading-relaxed">Our customer experience team is dedicated to providing you with the highest level of service. Please fill out the form below and we'll be in touch shortly.</p>
                        </div>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" placeholder="First Name" className="w-full border-b border-gray-200 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent" />
                                <input type="text" placeholder="Last Name" className="w-full border-b border-gray-200 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent" />
                            </div>
                            <input type="email" placeholder="Email Address" className="w-full border-b border-gray-200 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent" />
                            <select className="w-full border-b border-gray-200 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent text-gray-400">
                                <option>Inquiry Type</option>
                                <option>Engagement Rings</option>
                                <option>Wedding Bands</option>
                                <option>Order Support</option>
                                <option>Showroom Visit</option>
                            </select>
                            <textarea placeholder="How can we help?" rows={4} className="w-full border-b border-gray-200 py-4 outline-none focus:border-[#163E3E] transition-all bg-transparent resize-none"></textarea>
                            <button className="bg-black text-white px-12 py-5 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-[#163E3E] transition-all w-fit shadow-lg">Submit Request</button>
                        </form>
                    </div>

                    <div className="bg-gray-50 p-12 md:p-20 space-y-16 rounded-sm">
                        <div className="space-y-8">
                            <h3 className="font-serif text-3xl">Support Hours</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                    <span className="text-sm font-medium">Customer Service</span>
                                    <span className="text-sm text-gray-500">24/7 (Daily)</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                    <span className="text-sm font-medium">Showroom Appointments</span>
                                    <span className="text-sm text-gray-500">10am - 8pm Local Time</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                    <span className="text-sm font-medium">Live Jewelry Consultation</span>
                                    <span className="text-sm text-gray-500">6am - 9pm PT</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="font-serif text-3xl">Follow our Story</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                                    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                                    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" }
                                ].map((social, i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                                        {social.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

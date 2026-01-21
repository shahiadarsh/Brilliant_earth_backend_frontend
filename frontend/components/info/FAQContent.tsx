"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Search, MessageSquare, Phone, HelpCircle } from "lucide-react"

export const FAQContent = () => {
    const [activeTab, setActiveTab] = useState("shipping")
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const categories = [
        { id: "shipping", label: "Shipping & Delivery" },
        { id: "returns", label: "Returns & Exchanges" },
        { id: "jewelry", label: "Jewelry Care" },
        { id: "orders", label: "Orders & Payments" }
    ]

    const faqs: Record<string, { q: string, a: string }[]> = {
        shipping: [
            { q: "Is shipping really free?", a: "Yes! We offer free, insured shipping on all orders to the US, Canada, UK, Australia, and the EU." },
            { q: "Will the package be discreet?", a: "To maintain the element of surprise, our outside packaging is plain and includes only our return shipping address, not the Ritzin name." },
            { q: "How long does delivery take?", a: "Ready-to-ship items arrive in 1-3 business days. Custom engagement rings typically take 1-3 weeks depending on the complexity of the design." },
            { q: "Do you ship to P.O. Boxes?", a: "For security reasons, we require a physical address and a signature for all deliveries." }
        ],
        returns: [
            { q: "How do I start a return?", a: "Contact our customer service team or visit your account portal to receive a Return Authorization and a pre-paid insured FedEx label." },
            { q: "How long does a refund take?", a: "Once we receive and inspect your returned item, your refund will be processed within 5 business days to your original payment method." },
            { q: "Can I return a custom ring?", a: "Most custom-built engagement rings are eligible for our 30-day return policy. Only final sale items or modified pieces are excluded." }
        ],
        jewelry: [
            { q: "How should I clean my ring?", a: "We recommend using a solution of warm water and mild dish soap with a soft-bristled toothbrush. You can also visit any showroom for an ultrasonic cleaning." },
            { q: "How often should I have my ring inspected?", a: "To keep your lifetime warranty active, we recommend a professional cleaning and inspection every 6 months." },
            { q: "Do you offer resizing?", a: "Yes, we offer one free resizing within the first 60 days on most ring styles." }
        ],
        orders: [
            { q: "Can I change my order after placing it?", a: "Since many items are made to order, please contact us within 24 hours if you need to make changes to your design or shipping address." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Affirm financing, and bank wire transfers (which receive a 1.5% discount)." },
            { q: "Do you provide appraisals?", a: "Yes, every Ritzin engagement ring and gemstone jewelry purchase includes a complimentary appraisal for insurance purposes." }
        ]
    }

    return (
        <div className="space-y-24 -mt-12 font-sans">
            {/* Split Header */}
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <h2 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[1.05]">Common <br /> Questions.</h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        Find quick answers to our most frequently asked questions. Still need help? Our diamond experts are available 24/7.
                    </p>
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search help topics..."
                            className="w-full border-b border-gray-200 py-5 pl-0 pr-10 outline-none focus:border-[#163E3E] transition-all bg-transparent font-light"
                        />
                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                    </div>
                </div>
                <div className="bg-[#163E3E] p-12 md:p-16 text-white rounded-sm space-y-8">
                    <HelpCircle className="w-12 h-12 opacity-30" />
                    <h3 className="font-serif text-3xl">Can't find what you're looking for?</h3>
                    <div className="space-y-6">
                        <div className="flex gap-6 items-center">
                            <Phone className="w-6 h-6 text-white/50" />
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-1">Call Us</p>
                                <p className="text-lg font-medium">800.691.0952</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <MessageSquare className="w-6 h-6 text-white/50" />
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-1">Live Chat</p>
                                <p className="text-lg font-medium">Available 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Selector & Content */}
            <div className="space-y-12">
                <div className="flex flex-wrap gap-4 border-b border-gray-100">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveTab(cat.id); setOpenIndex(0); }}
                            className={`pb-4 px-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-all border-b-2 ${activeTab === cat.id ? 'border-[#163E3E] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-900'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 max-w-4xl">
                    {faqs[activeTab].map((item, i) => (
                        <div key={i} className="border border-gray-100 rounded-sm overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors group"
                            >
                                <span className={`text-xl font-serif transition-colors ${openIndex === i ? 'text-[#163E3E]' : 'text-gray-900'}`}>{item.q}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-[#163E3E]' : 'text-gray-300 group-hover:text-gray-900'}`} />
                            </button>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-8 pt-0 text-gray-500 font-light leading-relaxed prose prose-sm prose-serif">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual CTA */}
            <div className="relative h-[500px] -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden group rounded-sm">
                <img
                    src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 space-y-8">
                    <h3 className="font-serif text-4xl md:text-6xl">The Ritzin Standard.</h3>
                    <p className="max-w-xl text-xl opacity-80 font-light">Learn more about our ethical sourcing and carbon-neutral commitment.</p>
                    <Link href="/info/responsible-sourcing" className="bg-white text-[#163E3E] px-12 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">Our Ethics</Link>
                </div>
            </div>
        </div>
    )
}

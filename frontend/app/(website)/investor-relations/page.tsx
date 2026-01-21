"use client"

import { FileText, TrendingUp, Shield, Mail, ArrowRight } from "lucide-react"

export default function InvestorRelationsPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Dark Hero */}
            <div className="bg-[#163E3E] text-white py-32 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                        className="object-cover w-full h-full scale-110"
                        alt="Background"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h1 className="font-serif text-5xl md:text-8xl mb-8 font-light lg:-ml-1 tracking-tight">Investor Relations</h1>
                    <p className="text-xl md:text-3xl opacity-80 max-w-2xl font-light leading-relaxed">
                        Redefining the luxury landscape through transparency, innovation, and sustainable growth.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                <div className="grid lg:grid-cols-3 gap-24">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-24">
                        {/* Highlights */}
                        <section className="space-y-12">
                            <div className="flex items-center gap-4 text-[#163E3E]">
                                <TrendingUp className="w-8 h-8" />
                                <h2 className="font-serif text-4xl">Financial Highlights</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-10 bg-gray-50 rounded-sm space-y-4">
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Annual Revenue 2025</p>
                                    <p className="text-4xl font-serif text-[#163E3E]">$1.2 Billion</p>
                                    <p className="text-sm text-gray-500">+15% Year-over-Year Growth</p>
                                </div>
                                <div className="p-10 bg-gray-50 rounded-sm space-y-4">
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Sustainability Score</p>
                                    <p className="text-4xl font-serif text-[#163E3E]">A+ Rated</p>
                                    <p className="text-sm text-gray-500">Leader in Ethical Luxury Index</p>
                                </div>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                Ritzin continues to demonstrate strong financial performance and market share expansion, driven by our unique direct-to-consumer model and industry-leading digital innovation.
                            </p>
                        </section>

                        {/* Reports */}
                        <section className="space-y-12">
                            <div className="flex items-center gap-4 text-[#163E3E]">
                                <FileText className="w-8 h-8" />
                                <h2 className="font-serif text-4xl">Reports & Filings</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "2025 Annual Shareholder Report", date: "Jan 12, 2026", size: "4.2 MB" },
                                    { title: "Q3 2025 Financial Statement", date: "Nov 08, 2025", size: "2.8 MB" },
                                    { title: "Environmental & Social Impact Report", date: "Oct 24, 2025", size: "5.1 MB" },
                                    { title: "Proxy Statement 2025", date: "Sep 15, 2025", size: "1.2 MB" },
                                ].map((doc, i) => (
                                    <div key={i} className="flex justify-between items-center p-8 border border-gray-100 hover:border-[#163E3E] transition-all group cursor-pointer rounded-sm">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-[#163E3E] transition-colors">{doc.title}</h3>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest">{doc.date} • {doc.size}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#163E3E] transition-all translate-x-0 group-hover:translate-x-2" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-12">
                        <div className="bg-[#F9F9F9] p-10 rounded-sm space-y-8 sticky top-32">
                            <section className="space-y-4">
                                <h3 className="font-serif text-2xl text-gray-900 flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-[#163E3E]" /> Governance
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Ritzin is committed to the highest standards of ethics. Our Board of Directors oversees our strategic direction and corporate responsibility.
                                </p>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E] hover:underline">View Board Members</button>
                            </section>

                            <hr className="border-gray-200" />

                            <section className="space-y-4">
                                <h3 className="font-serif text-2xl text-gray-900 flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-[#163E3E]" /> Contact
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">For investor inquiries:</p>
                                <p className="font-bold text-[#163E3E] hover:underline cursor-pointer">investors@ritzin.com</p>
                                <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                                    Transfer Agent:<br />
                                    Computershare Trust Company<br />
                                    800-522-6645
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

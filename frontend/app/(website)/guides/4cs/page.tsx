"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Star, ShieldCheck, Sun, Scaling, Info, CheckCircle } from "lucide-react"

export default function FourCsGuide() {
    return (
        <main className="bg-white min-h-screen">
            {/* Split Header */}
            <div className="flex flex-col lg:flex-row min-h-[70vh] border-b border-gray-100">
                <div className="lg:w-[45%] bg-[#163E3E] text-white p-12 md:p-24 lg:p-32 flex flex-col justify-center space-y-12">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/guides/diamond" className="hover:text-white">Education</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white">The 4Cs</span>
                    </nav>
                    <h1 className="font-serif text-5xl md:text-8xl leading-none font-light">Diamond <br /> Education.</h1>
                    <p className="text-xl opacity-70 font-light max-w-md leading-relaxed">
                        Master the 4Cs—the universal standard for evaluating diamond quality. Knowledge is the first step to a confident choice.
                    </p>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-0.5 bg-white/20 overflow-hidden"><div className={`h-full bg-white transition-all duration-1000 ${i === 1 ? 'w-full' : 'w-0'}`}></div></div>)}
                    </div>
                </div>
                <div className="lg:w-[55%] relative overflow-hidden bg-gray-50">
                    <Image
                        src="/edu1.jfif"
                        alt="Diamond Education"
                        fill
                        className="object-cover transition-transform duration-[6000ms] hover:scale-110"
                        priority
                    />
                    <div className="absolute inset-x-12 bottom-12">
                        <div className="bg-white/95 backdrop-blur-md p-10 max-w-md shadow-2xl">
                            <p className="text-xs uppercase tracking-widest font-bold text-[#163E3E] mb-4 italic">Certified Quality</p>
                            <h3 className="font-serif text-2xl text-gray-900 leading-relaxed italic">"The 4Cs provide a way to objectively describe a diamond's quality in an understandable language."</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* In-Depth Sections */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-40">
                <div className="grid lg:grid-cols-12 gap-24">
                    {/* Left Rail: Section Labels */}
                    <div className="lg:col-span-3 hidden lg:block sticky top-32 h-fit space-y-12">
                        <div className="space-y-6">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Chapters</p>
                            <div className="space-y-4 text-sm font-medium">
                                <a href="#cut" className="block text-[#163E3E] hover:translate-x-2 transition-transform">01. Diamond Cut</a>
                                <a href="#color" className="block text-gray-400 hover:text-gray-900 hover:translate-x-2 transition-transform">02. Diamond Color</a>
                                <a href="#clarity" className="block text-gray-400 hover:text-gray-900 hover:translate-x-2 transition-transform">03. Diamond Clarity</a>
                                <a href="#carat" className="block text-gray-400 hover:text-gray-900 hover:translate-x-2 transition-transform">04. Carat Weight</a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-48">
                        {/* CUT */}
                        <section id="cut" className="space-y-12 group">
                            <div className="flex items-center gap-6">
                                <Sun className="w-10 h-10 text-[#163E3E]" />
                                <h2 className="font-serif text-5xl md:text-7xl">01. Cut</h2>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                Cut determines how light travels through a diamond. A superior cut unlocks the diamond's inner fire and brilliance, making it the most critical factor in a stone's visual impact.
                            </p>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] text-gray-900">The Light Effect</h4>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4 items-start text-sm text-gray-500 font-light italic">
                                            <CheckCircle className="w-4 h-4 text-[#163E3E] shrink-0" /> Brilliance: The total light reflected from a diamond.
                                        </li>
                                        <li className="flex gap-4 items-start text-sm text-gray-500 font-light italic">
                                            <CheckCircle className="w-4 h-4 text-[#163E3E] shrink-0" /> Fire: The dispersion of light into the colors of the spectrum.
                                        </li>
                                        <li className="flex gap-4 items-start text-sm text-gray-500 font-light italic">
                                            <CheckCircle className="w-4 h-4 text-[#163E3E] shrink-0" /> Scintillation: The flashes of light and the pattern of light and dark.
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-sm">
                                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-4">Quality Tip</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed font-serif italic">"Always aim for an 'Excellent' or 'Super Ideal' cut. A high cut grade can even hide lower color or clarity."</p>
                                </div>
                            </div>
                        </section>

                        {/* COLOR */}
                        <section id="color" className="space-y-12">
                            <div className="flex items-center gap-6">
                                <Scaling className="w-10 h-10 text-[#163E3E]" />
                                <h2 className="font-serif text-5xl md:text-7xl">02. Color</h2>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                Diamonds are graded for their absence of color. The GIA scale ranges from D (completely colorless) to Z (pale yellow or brown).
                            </p>
                            <div className="grid grid-cols-5 gap-2 border-y border-gray-100 py-12">
                                {[
                                    { grade: "D-F", label: "Colorless" },
                                    { grade: "G-J", label: "Near Colorless" },
                                    { grade: "K-M", label: "Faint" },
                                    { grade: "N-R", label: "Very Light" },
                                    { grade: "S-Z", label: "Light" }
                                ].map((item, i) => (
                                    <div key={i} className="text-center space-y-4">
                                        <div className="h-1 bg-[#163E3E]/10 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-[#163E3E]"></div>
                                        </div>
                                        <p className="font-serif text-xl">{item.grade}</p>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CLARITY */}
                        <section id="clarity" className="space-y-12">
                            <div className="flex items-center gap-6">
                                <ShieldCheck className="w-10 h-10 text-[#163E3E]" />
                                <h2 className="font-serif text-5xl md:text-7xl">03. Clarity</h2>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                Clarity measures the natural inclusions found in every diamond. While many are microscopic, clarity grades help define the rarity and purity of the stone.
                            </p>
                            <div className="bg-[#163E3E] p-12 md:p-20 text-white rounded-sm">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="font-bold uppercase tracking-widest text-[11px] opacity-50">Understanding Eye-Clean</h4>
                                        <p className="text-lg opacity-80 font-light leading-relaxed italic">Most inclusions in VS1 and larger stones are not visible to the naked eye. Selecting an "eye-clean" diamond offers the best value.</p>
                                    </div>
                                    <Image src="/edu4.jfif" alt="Clarity" fill className="object-cover rounded-sm opacity-50" />
                                </div>
                            </div>
                        </section>

                        {/* CARAT */}
                        <section id="carat" className="space-y-12">
                            <div className="flex items-center gap-6">
                                <Star className="w-10 h-10 text-[#163E3E]" />
                                <h2 className="font-serif text-5xl md:text-7xl">04. Carat</h2>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                Carat is the measure of a diamond's weight. One carat equals 0.2 grams. As carat weight increases, the rarity—and price—increases exponentially.
                            </p>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[0.5, 1.0, 1.5, 2.0, 3.0].map(c => (
                                    <div key={c} className="p-8 border border-gray-100 rounded-sm text-center space-y-4 hover:border-[#163E3E] transition-all">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-[#163E3E] font-bold">{c}</div>
                                        <p className="font-serif text-lg">{c} Carat</p>
                                        <p className="text-xs text-gray-400 font-light">Significant presence on hand</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-[#F9F9F9] py-32 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
                    <h3 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">Apply your knowledge.</h3>
                    <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">Now that you understand the 4Cs, explore our collection of GIA-certified diamonds and find the one that fits your legacy.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/design/diamond" className="bg-[#163E3E] text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-xl">Start with a Diamond</Link>
                        <Link href="/diamonds" className="border border-gray-900 px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all">Shop All Diamonds</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

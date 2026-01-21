"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft } from "lucide-react"

const collections = [
    { name: "Horizon Collection", href: "/collections/horizon", src: "/sign1.jfif" },
    { name: "Luna Collection", href: "/collections/luna", src: "/sign2.jfif" },
    { name: "Stellar Collection", href: "/collections/stellar", src: "/sign3.jfif" },
    { name: "Willow Collection", href: "/collections/willow", src: "/sign4.jfif" },
    { name: "Crest Collection", href: "/collections/crest", src: "/sign5.jfif" },
]

export function SignatureCollections() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 200 : 300
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <section className="bg-white py-12 md:py-20 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="mb-10 md:mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-2">Signature Fine Jewelry</h2>
                        <p className="font-sans text-sm md:text-base text-gray-500 max-w-lg">Handcrafted designs that blend modern sensibilities with timeless craftsmanship.</p>
                    </div>
                    <Link href="/collections" className="hidden sm:inline-block text-[11px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E]/20 hover:border-[#163E3E] transition-all pb-1 sm:mb-2">View All Collections</Link>
                </div>
                <div className="relative group/slider mb-20">
                    <button onClick={() => scroll("left")} className="hidden md:flex absolute left-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 items-center justify-center text-gray-600 hover:text-[#163E3E] opacity-0 group-hover/slider:opacity-100 -ml-5"><ChevronLeft className="w-5 h-5" /></button>
                    <div ref={scrollRef} className="flex gap-4 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {collections.map((item) => (
                            <Link key={item.name} href={item.href} className="flex flex-col flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] snap-start group">
                                <div className="relative aspect-[3/4.5] overflow-hidden mb-4 rounded-sm bg-[#0B2B26] shadow-md">
                                    <Image src={item.src} alt={item.name} fill className="object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-all duration-1000" />
                                    <Image src={item.src} alt={item.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-1000 z-10" />
                                </div>
                                <h3 className="text-[11px] md:text-xs font-bold tracking-[0.1em] text-center uppercase text-gray-900 group-hover:text-[#163E3E] transition-colors">{item.name}</h3>
                            </Link>
                        ))}
                    </div>
                    <button onClick={() => scroll("right")} className="hidden md:flex absolute right-0 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 items-center justify-center text-gray-600 hover:text-[#163E3E] opacity-0 group-hover/slider:opacity-100 -mr-5"><ChevronRight className="w-5 h-5" /></button>
                </div>
                <div className="w-full bg-[#052B23] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex items-center rounded-sm">
                    <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-r from-[#052B23] via-[#094d40] to-[#052B23] opacity-60"></div>
                    <div className="max-w-6xl mx-auto w-full px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-16">
                        <div className="relative h-64 w-64 mx-auto md:mx-0 md:h-[400px] md:w-full transition-transform duration-[2s] group-hover:scale-110">
                            <Image src="/jewelry.jpg" alt="Fine Jewelry Craft" fill className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]" />
                        </div>
                        <div className="text-center md:text-left flex flex-col items-center md:items-start text-white">
                            <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 opacity-70">Design Heritage</p>
                            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">Unrivaled <span className="italic">Artistry</span></h3>
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-10 max-w-sm opacity-80">We believe fine jewelry should be as unique as the person wearing it.</p>
                            <Link href="/about" className="bg-white text-[#052B23] text-[11px] font-bold uppercase tracking-widest px-12 py-4 hover:bg-[#163E3E] hover:text-white transition-all transform hover:scale-105">Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

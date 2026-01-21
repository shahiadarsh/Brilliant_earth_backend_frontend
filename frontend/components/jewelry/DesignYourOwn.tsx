"use client"

import Link from "next/link"
import Image from "next/image"

const collections = [
    { name: "Diamond Studs", href: "/jewelry/earrings/diamond", src: "/featured1.webp" },
    { name: "Create a Pendant", href: "/design/pendant", src: "/featured2.webp" },
    { name: "Stackable Bands", href: "/jewelry/rings/stackable", src: "/featured3.webp" },
    { name: "Personalized Jewelry", href: "/jewelry/personalized", src: "/design4.jfif" },
]

export function DesignYourOwn() {
    return (
        <section className="bg-white py-12 md:py-20 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
                    Create Your Signature Look
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-24">
                    {collections.map((item) => (
                        <Link key={item.name} href={item.href} className="group block">
                            <div className="relative aspect-square overflow-hidden mb-4 bg-gray-50 rounded-sm">
                                <Image src={item.src} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                            </div>
                            <h3 className="text-sm md:text-base font-sans text-gray-900 font-medium group-hover:text-[#163E3E] transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                    ))}
                </div>
                <div className="w-full bg-[#163E3E] text-white overflow-hidden relative flex flex-col md:flex-row items-center justify-between py-10 px-8 md:py-12 md:px-16 gap-8 rounded-sm shadow-xl">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 z-10 order-2 md:order-1">
                        <Image src="/design5.webp" alt="Jewelry Gift" fill className="object-cover rounded-full border-4 border-white/10 shadow-2xl" />
                    </div>
                    <div className="text-center md:text-left flex flex-col justify-center flex-1 z-10 order-1 md:order-2">
                        <p className="text-[10px] font-bold tracking-[0.3em] mb-3 uppercase text-white/70">Member Exclusive</p>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic mb-4">Receive a Fine Jewelry Care Kit <span className="block sm:inline font-sans not-italic text-sm md:text-lg opacity-80">With Any Jewelry Purchase.</span></h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                            <p className="text-xs md:text-sm tracking-[0.1em]">USE CODE <span className="font-bold text-lg inline-block ml-1">CAREKIT</span></p>
                            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white underline">Terms Apply</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

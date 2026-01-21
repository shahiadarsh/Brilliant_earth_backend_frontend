"use client"

import Link from "next/link"
import Image from "next/image"

export function ShowroomPromo() {
    return (
        <section className="bg-white py-12 md:py-24 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="relative aspect-[16/10] sm:aspect-video lg:aspect-square xl:aspect-[16/10] w-full overflow-hidden rounded-sm shadow-2xl group order-1 lg:order-2">
                        <Image src="/showroom.jfif" alt="Jewelry Showroom" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" priority />
                    </div>
                    <div className="flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1 text-center lg:text-left">
                        <p className="text-[10px] b-6 uppercase tracking-[0.4em] text-gray-400 font-bold mb-6">In-Store & Online</p>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-[1.1] tracking-wide">Personalized <br /> <span className="italic">Service</span></h2>
                        <p className="font-sans text-sm md:text-base lg:text-lg text-gray-600 mb-12 leading-relaxed max-w-lg">Whether you're shopping for a gift or yourself, our jewelry consultants are an appointment away.</p>
                        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                            <Link href="/stores" className="bg-[#163E3E] text-white px-10 py-4 text-[11px] font-bold tracking-[0.2em] rounded-[2px] transition-all transform hover:scale-105 shadow-xl text-center uppercase min-w-[220px]">Visit a Showroom</Link>
                            <Link href="/virtual-appointment" className="bg-white text-[#163E3E] border border-[#163E3E]/20 px-10 py-4 text-[11px] font-bold tracking-[0.2em] rounded-[2px] transition-all transform hover:scale-105 shadow-xl text-center uppercase min-w-[220px]">Book Virtual Appt</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

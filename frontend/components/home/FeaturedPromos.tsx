"use client"

import Link from "next/link"
import Image from "next/image"

export function FeaturedPromos() {
  return (
    <section className="w-full bg-white flex flex-col">
      
      {/* SECTION 1: Medallions (Text Left, Image Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 order-2 md:order-1 bg-white">
          <span className="font-sans text-[11px] font-medium tracking-widest text-gray-500 uppercase mb-4">
            Just Dropped
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-6 leading-tight">
            Medallions with Meaning
          </h2>
          
          <p className="font-sans text-[15px] leading-relaxed text-gray-600 mb-8 max-w-md font-light">
            New limited edition medallions are here — meticulously designed and handcrafted.
          </p>

          <Link 
            href="/jewelry/medallions"
            className="inline-block border border-gray-900 px-10 py-3.5 text-[13px] font-medium text-center hover:bg-gray-50 transition-colors uppercase tracking-widest max-w-[200px]"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Content */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] order-1 md:order-2">
          <Image
            src="/home/featured1.jfif" 
            alt="Gold medallions with diamonds and gemstones"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* SECTION 2: Showroom (Image Left, Text Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Image Content */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[600px]">
          <Image
            src="/home/featured2.avif"
            alt="Ritzin Showroom Interior"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 bg-white">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-gray-900 mb-6 leading-tight">
            We&apos;re Here for You, In Person and Online
          </h2>
          
          <p className="font-sans text-[15px] leading-relaxed text-gray-600 mb-10 max-w-lg font-light">
            Whether it&apos;s at a store near you or online, we curate your appointment just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <Link 
              href="/stores"
              className="flex-1 border border-gray-900 px-6 py-3.5 text-[13px] font-medium text-center hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Visit a Showroom
            </Link>
            <Link 
              href="/virtual-appointment"
              className="flex-1 border border-gray-900 px-6 py-3.5 text-[13px] font-medium text-center hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Book a Virtual Appointment
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}

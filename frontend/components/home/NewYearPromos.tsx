"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageSquareText } from "lucide-react"

export function NewYearPromos() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">

        {/* Left Banner: Ring in the New Year */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full group overflow-hidden">
          <Image
            src="/home/ring3.jfif"
            alt="Diamond ring on dark green background"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Dark Green Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#052B23] via-[#052B23]/40 to-transparent opacity-90"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-8 drop-shadow-md">
              Ring in the New Year
            </h2>
            <Link
              href="/engagement-rings"
              className="bg-[#1F4242] text-white px-10 py-3.5 text-sm font-bold tracking-wide rounded-[2px] hover:bg-[#163E3E] transition-colors shadow-lg min-w-[240px]"
            >
              Shop Engagement Rings
            </Link>
          </div>
        </div>

        {/* Right Banner: Best-Selling Styles */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full group overflow-hidden">
          <Image
            src="/home/promo1.webp"
            alt="Woman wearing jewelry"
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-8 drop-shadow-md">
              Best-Selling Styles
            </h2>
            <Link
              href="/jewelry/best-sellers"
              className="bg-[#1F4242] text-white px-10 py-3.5 text-sm font-bold tracking-wide rounded-[2px] hover:bg-[#163E3E] transition-colors shadow-lg min-w-[240px]"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

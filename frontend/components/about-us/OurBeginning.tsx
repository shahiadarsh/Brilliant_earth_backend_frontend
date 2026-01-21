"use client"

import Image from "next/image"

export function OurBeginning() {
  return (
    <section id="our-beginning" className="bg-white py-16 md:py-28 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <div className="flex flex-col">
            <div className="mb-10">
              <h2 className="font-sans text-3xl md:text-[36px] tracking-[0.1em] uppercase text-gray-800 mb-6 font-light">
                Our Beginning
              </h2>
              {/* Teal Underline */}
              <div className="h-[2px] w-24 bg-[#2F5B5B]"></div>
            </div>

            <div className="font-sans text-[16px] leading-8 text-gray-600 space-y-8 font-light italic_md">
              <p>
                In 2004, Co-Founder and CEO Beth Gerstein couldn&apos;t find a diamond engagement ring that was ethical, sustainable, and traceable. She wanted the sparkling symbol of her commitment to represent more than love; the perfect piece would also respect the planet and protect its future.
              </p>
              <p>
                On a mission to make the jewelry industry more sustainable and ethical, Beth – alongside Eric Grossberg – founded Ritzin in 2005. Since that first step twenty years ago, we&apos;ve revolutionized the way jewelry is sourced, crafted, sold, and worn.
              </p>
              <p className="font-medium text-gray-800">
                We do not compromise between quality and conscience – and neither do our customers.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-10">
            {/* Video Thumbnail Placeholder */}
            <div className="relative aspect-video w-full bg-black shadow-xl rounded-sm overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                alt="Beth Gerstein, CEO & Co-Founder speaking"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              {/* Optional Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col gap-4 px-2 border-l-2 border-[#2F5B5B]/20 py-2">
              <p className="font-serif text-xl md:text-[24px] text-gray-700 leading-relaxed font-light italic">
                “We started Ritzin in 2005 to raise the ethical standards of the diamond industry and to create a new way to buy beautiful fine jewelry.”
              </p>
              <p className="font-sans text-sm md:text-[14px] text-gray-500 uppercase tracking-widest mt-2">
                — Beth Gerstein, CEO & Co-Founder
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

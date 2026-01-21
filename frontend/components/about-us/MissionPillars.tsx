"use client"

import Link from "next/link"
import Image from "next/image"

const pillars = [
  {
    title: "TRANSPARENCY",
    description: "We know where our precious metals and gemstones come from and how our jewelry is made. And we share that information with you — so you can feel good about the jewelry you're wearing.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=400&auto=format&fit=crop", // Diamonds on dark background
    href: "/mission/transparency"
  },
  {
    title: "SUSTAINABILITY",
    description: "We use repurposed and sustainable materials, apply energy-efficient practices, and minimize our carbon footprint.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=400&auto=format&fit=crop", // Gold nuggets in hand
    href: "/mission/sustainability"
  },
  {
    title: "COMPASSION",
    description: "We care about and are committed to our communities, our employees, and the people who help to bring our jewelry to life.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop", // People/Community
    href: "/mission/compassion"
  },
  {
    title: "INCLUSION",
    description: "We support and invest in our diverse teams to ensure every employee knows that they belong, and our designs are always crafted with inclusivity in mind.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=400&auto=format&fit=crop", // Diverse team
    href: "/mission/inclusion"
  }
]

export function MissionPillars() {
  return (
    <section id="mission-pillars" className="bg-[#163E3E] text-white py-20 md:py-32 scroll-mt-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Centered Text */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="font-sans text-2xl md:text-[32px] lg:text-[40px] leading-tight font-light transition-all duration-700">
            Our Mission to cultivate a <span className="italic">more transparent, sustainable, compassionate, and inclusive</span> jewelry industry.
          </h2>
          <div className="h-[1px] w-32 bg-white/20 mx-auto mt-12"></div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-20">
          <h3 className="font-sans text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/60">
            OUR MISSION PILLARS
          </h3>
        </div>

        {/* 4-Column Grid with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10 lg:border-t-0">

          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`flex flex-col p-8 lg:p-12 relative group transition-all duration-500 hover:bg-white/[0.03]
                ${/* Desktop: border right for all except last */ ""}
                ${index !== pillars.length - 1 ? "lg:border-r lg:border-white/10" : ""}
                {/* Tablet: border right for even, border bottom for all except last 2 */ ""}
                ${index % 2 === 0 ? "md:border-r md:border-white/10" : ""}
                ${index < 2 ? "md:border-b md:border-white/10" : ""}
                ${/* Mobile: border bottom for all except last */ ""}
                ${index !== pillars.length - 1 ? "border-b border-white/10 lg:border-b-0 md:border-b-inherit" : ""}
              `}
            >
              <div className="relative mb-10 overflow-hidden rounded-sm">
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0F2F2F]">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#163E3E]/60 to-transparent opacity-60"></div>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-sans text-[20px] font-medium tracking-widest mb-6 uppercase text-white group-hover:translate-x-1 transition-transform duration-300">
                {pillar.title}
              </h4>

              {/* Description */}
              <p className="font-sans text-[15px] leading-relaxed text-white/70 mb-10 font-light min-h-[100px] group-hover:text-white/90 transition-colors">
                {pillar.description}
              </p>

              {/* Link */}
              <div className="mt-auto">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-3 font-sans text-[13px] font-semibold tracking-widest uppercase text-white/50 group-hover:text-white transition-all duration-300"
                >
                  <span className="h-[1px] w-6 bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-300"></span>
                  Learn More
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

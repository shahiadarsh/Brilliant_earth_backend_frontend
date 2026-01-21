"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export function AboutHero() {
  const navItems = [
    { label: "About", href: "#our-beginning" },
    { label: "Mission", href: "#mission-pillars" },
    { label: "Transparency", href: "#mission-pillars" }, // Usually transparency is part of mission
    { label: "Sustainability", href: "#forever-forward" },
    { label: "Compassion", href: "#mission-pillars" },
    { label: "Inclusion", href: "#mission-pillars" },
  ]

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-[11px] md:text-xs text-gray-500 font-sans tracking-wide">
          <Link href="/" className="hover:text-[#163E3E] hover:underline transition-colors">
            Home
          </Link>
          <span className="mx-1">/</span>
          <span className="text-gray-900">About</span>
        </nav>
      </div>

      <div className="relative w-full h-[450px] md:h-[550px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="https://images.unsplash.com/photo-1596328639257-2c938c5f6e81?q=80&w=2070&auto=format&fit=crop"
            alt="Soft Blue Sky Background"
            fill
            className="object-cover opacity-90 scale-105 transition-transform duration-[10s] hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          <Sparkles strokeWidth={1} className="w-16 h-16 text-[#2F5B5B] mb-8 animate-pulse fill-[#2F5B5B]/5" />

          <h1 className="font-sans text-4xl md:text-6xl lg:text-[64px] text-gray-800 tracking-wider font-light mb-8 uppercase leading-tight">
            Jewelry <span className="font-normal italic">Redefined</span>
          </h1>

          <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl font-light">
            We are pioneers. We are disruptors. We are innovators. <br className="hidden sm:block" />
            Join us in transforming the jewelry industry for good.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#163E3E] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] mx-auto">
          <ul className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-hide py-0 px-4 gap-2 md:gap-0">
            {navItems.map((item, index) => (
              <li key={item.label} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`block px-5 md:px-8 py-5 text-[12px] md:text-[14px] tracking-[0.15em] uppercase font-medium transition-all duration-300 relative group
                    ${index === 0
                      ? "text-white after:content-[''] after:absolute after:bottom-3 after:left-5 after:right-5 after:h-[2px] after:bg-[#A6C4C4]"
                      : "text-white/70 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                  <span className="absolute bottom-3 left-5 right-5 h-[2px] bg-[#A6C4C4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

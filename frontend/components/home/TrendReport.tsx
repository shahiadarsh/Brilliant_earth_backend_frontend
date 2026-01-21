"use client"

import Link from "next/link"
import Image from "next/image"

const trends = [
  {
    title: "Fine Jewelry",
    description: "From vibrant gemstones to styles with architectural precision, fine jewelry is the ultimate style statement.",
    href: "/jewelry",
    src: "/home/trend1.webp",
    theme: "light" // White text for darker images
  },
  {
    title: "Engagement Rings",
    description: "Discover sculptural settings, vintage-inspired details, and fancy shapes redefining the moment.",
    href: "/engagement-rings",
    src: "/home/trend2.webp",
    theme: "dark" // Dark text for lighter images
  },
  {
    title: "Wedding Bands",
    description: "Fancy-cut diamonds, bold styles, and vintage-inspired designs take centerstage in the stacks of 2026.",
    href: "/wedding-rings",
    src: "/home/trend3.webp",
    theme: "light" // White text for darker images
  }
]

export function TrendReport() {
  return (
    <section className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            2026 Trend Report
          </h2>
          <p className="font-sans text-[11px] md:text-[12px] text-gray-500 uppercase tracking-wide">
            This year&apos;s must-have trends combine classic traditions with artistic expressions to feel both timeless and personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
          {trends.map((item, index) => (
            <div key={index} className="relative aspect-[3/4] md:aspect-[3/3.5] group overflow-hidden w-full">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 px-6 text-center">
                <h3 
                  className={`font-serif text-xl md:text-2xl mb-3 
                    ${item.theme === 'light' ? 'text-white' : 'text-gray-900'}
                  `}
                >
                  {item.title}
                </h3>
                
                <p 
                  className={`font-sans text-[10px] md:text-[11px] leading-relaxed mb-6 max-w-xs
                    ${item.theme === 'light' ? 'text-white/90' : 'text-gray-600'}
                  `}
                >
                  {item.description}
                </p>

                <Link 
                  href={item.href}
                  className={`
                    inline-block px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest border transition-colors
                    ${item.theme === 'light' 
                      ? 'border-white text-white hover:bg-white hover:text-black' 
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                    }
                  `}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

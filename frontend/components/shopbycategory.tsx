"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronUp } from "lucide-react"

const diamondShapes = [
  { name: "Oval", src: "/shop1.webp" },
  { name: "Round", src: "/shop2.webp" },
  { name: "Emerald", src: "/shop3.webp" },
  { name: "Marquise", src: "/shop4.webp" },
  { name: "Radiant", src: "/shop5.webp" },
  { name: "Pear", src: "/shop6.webp" },
  { name: "Elongated Cushion", src: "/shop7.webp" },
  { name: "Cushion", src: "/shop8.webp" },
  { name: "Princess", src: "/shop9.webp" },
  { name: "Asscher", src: "/shop10.webp" },
]

const ringStyles = [
  {
    name: "Solitaire",
    src: "/ring1.jfif"
  },
  {
    name: "Nature Inspired",
    src: "/ring2.jfif"
  },
  {
    name: "Three Stone",
    src: "/ring3.jfif"
  },
  {
    name: "Accented",
    src: "/ring4.jfif"
  },
  {
    name: "Hidden Halo",
    src: "/ring5.jfif"
  },
  {
    name: "Bezel",
    src: "/ring6.jfif"
  },
]

export function ShopByCategory() {
  return (
    <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-10 md:mb-16 text-center">
            Shop Diamonds by Shape
          </h2>

          <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-x-2 gap-y-10 md:gap-y-12 justify-items-center">
              {diamondShapes.map((shape) => (
                <Link
                  key={shape.name}
                  href={`/diamonds/${shape.name.toLowerCase().replace(" ", "-")}`}
                  className="group flex flex-col items-center gap-3 w-full"
                >
                  <div className="relative w-12 h-12 xs:w-14 xs:h-14 lg:w-16 lg:h-16 transition-all duration-300 group-hover:scale-110">
                    <Image
                      src={shape.src}
                      alt={`${shape.name} Diamond`}
                      fill
                      className="object-contain opacity-60 group-hover:opacity-100 md:grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[12px] text-gray-500 font-sans tracking-widest uppercase group-hover:text-[#163E3E] transition-colors text-center leading-tight">
                    {shape.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
            Shop Engagement Rings By Style
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {ringStyles.map((style) => (
              <Link
                key={style.name}
                href={`/engagement-rings/style/${style.name.toLowerCase().replace(" ", "-")}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-sm">
                  <Image
                    src={style.src}
                    alt={`${style.name} Engagement Ring`}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <h3 className="text-sm md:text-[15px] font-sans text-gray-900 font-medium group-hover:text-[#163E3E] transition-colors tracking-wide">
                  {style.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

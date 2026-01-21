"use client"

import Link from "next/link"
import Image from "next/image"

const shapes = [
  { name: "Oval", src: "/home/diamond1.webp" },
  { name: "Round", src: "/home/diamond2.webp" },
  { name: "Emerald", src: "/home/diamond3.webp" },
  { name: "Marquise", src: "/home/diamond4.webp" },
  { name: "Radiant", src: "/home/diamond5.webp" },
  { name: "Pear", src: "/home/diamond6.webp" },
  { name: "Elongated Cushion", src: "/home/diamond7.webp" },
  { name: "Cushion", src: "/home/diamond8.webp" },
  { name: "Princess", src: "/home/diamond9.webp" },
  { name: "Asscher", src: "/home/diamond10.webp" },
]

export function ShopDiamondsByShape() {
  return (
    <section className="bg-[#F9F9F9] py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Left Side: Title & Ring Image */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0 lg:w-[30%]">
            <h2 className="font-serif text-3xl md:text-[38px] text-gray-800 mb-8 leading-tight">
              Shop Diamonds <br className="hidden lg:block" /> by Shape
            </h2>

            <div className="relative w-[280px] h-[200px] lg:w-[320px] lg:h-[220px]">
              <Image
                src="/home/diamond1.webp" // Solitaire ring placeholder
                alt="Oval Diamond Solitaire Ring"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Side: Shape Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4">
              {shapes.map((shape) => (
                <Link
                  key={shape.name}
                  href={`/diamonds/${shape.name.toLowerCase().replace(" ", "-")}`}
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-16 h-20 mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                    {/* 
                        Using placeholder images here. 
                        In a real implementation, you would use transparent PNGs of the specific diamond cuts.
                     */}
                    <Image
                      src={shape.src}
                      alt={`${shape.name} Cut`}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-all"
                    />
                  </div>
                  <span className="font-sans text-[15px] text-gray-600 group-hover:text-[#163E3E] transition-colors text-center">
                    {shape.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

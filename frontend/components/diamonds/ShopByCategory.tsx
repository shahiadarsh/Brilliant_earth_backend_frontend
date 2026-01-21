"use client"

import Link from "next/link"
import Image from "next/image"

const diamondShapes = [
    { name: "Oval", src: "/shop1.webp" },
    { name: "Round", src: "/shop2.webp" },
    { name: "Emerald", src: "/shop3.webp" },
    { name: "Marquise", src: "/shop4.webp" },
    { name: "Radiant", src: "/shop5.webp" },
    { name: "Pear", src: "/shop6.webp" },
    { name: "Cushion", src: "/shop8.webp" },
    { name: "Princess", src: "/shop9.webp" },
    { name: "Asscher", src: "/shop10.webp" },
    { name: "Heart", src: "/shop1.webp" },
]

export function ShopByCategory() {
    return (
        <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

                <div className="mb-8 overflow-hidden">
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
            </div>
        </section>
    )
}

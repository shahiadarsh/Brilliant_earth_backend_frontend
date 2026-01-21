"use client"

import Link from "next/link"
import Image from "next/image"

const gemstoneShapes = [
    { name: "Oval", src: "/shop1.webp" },
    { name: "Round", src: "/shop2.webp" },
    { name: "Emerald", src: "/shop3.webp" },
    { name: "Marquise", src: "/shop4.webp" },
    { name: "Radiant", src: "/shop5.webp" },
    { name: "Pear", src: "/shop6.webp" },
    { name: "Cushion", src: "/shop8.webp" },
    { name: "Princess", src: "/shop9.webp" },
]

const gemstoneStyles = [
    { name: "Sapphire", src: "/sign1.jfif" },
    { name: "Emerald", src: "/sign2.jfif" },
    { name: "Ruby", src: "/sign3.jfif" },
    { name: "Aquamarine", src: "/sign4.jfif" },
    { name: "Morganite", src: "/sign5.jfif" },
    { name: "Moissanite", src: "/sign6.jfif" },
]

export function ShopByCategory() {
    return (
        <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

                <div className="mb-16 md:mb-24">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-10 md:mb-16 text-center">
                        Shop Gemstones by Shape
                    </h2>

                    <div className="w-full">
                        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-10 md:gap-y-12 justify-items-center">
                            {gemstoneShapes.map((shape) => (
                                <Link
                                    key={shape.name}
                                    href={`/gemstones/${shape.name.toLowerCase().replace(" ", "-")}`}
                                    className="group flex flex-col items-center gap-3 w-full"
                                >
                                    <div className="relative w-12 h-12 xs:w-14 xs:h-14 lg:w-16 lg:h-16 transition-all duration-300 group-hover:scale-110">
                                        <Image
                                            src={shape.src}
                                            alt={`${shape.name} Gemstone`}
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
                        Shop Gemstone Rings By Type
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
                        {gemstoneStyles.map((style) => (
                            <Link
                                key={style.name}
                                href={`/gemstones/type/${style.name.toLowerCase().replace(" ", "-")}`}
                                className="group block"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-sm">
                                    <Image
                                        src={style.src}
                                        alt={`${style.name} Gemstone Ring`}
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

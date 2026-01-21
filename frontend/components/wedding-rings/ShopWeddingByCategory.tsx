"use client"

import Link from "next/link"
import Image from "next/image"

const weddingStyles = [
    { name: "Classic Bands", src: "/ring1.jfif" },
    { name: "Diamond Bands", src: "/ring2.jfif" },
    { name: "Eternity Rings", src: "/ring3.jfif" },
    { name: "Stackable Rings", src: "/ring4.jfif" },
    { name: "Vintage Styles", src: "/ring5.jfif" },
    { name: "Alternative Metals", src: "/ring6.jfif" },
]

export function ShopWeddingByCategory() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-12 text-center md:text-left">
                    Shop Wedding Rings By Style
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {weddingStyles.map((style) => (
                        <Link
                            key={style.name}
                            href={`/wedding-rings/style/${style.name.toLowerCase().replace(" ", "-")}`}
                            className="group block"
                        >
                            <div className="relative aspect-square overflow-hidden bg-white mb-4 rounded-sm shadow-sm">
                                <Image
                                    src={style.src}
                                    alt={style.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-sm md:text-[15px] font-sans text-gray-900 font-medium group-hover:text-[#163E3E] transition-colors tracking-wide text-center">
                                {style.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

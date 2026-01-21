"use client"

import Link from "next/link"
import Image from "next/image"

const gemstoneCategories = [
    { name: "Sapphire", src: "/shop1.webp" },
    { name: "Emerald", src: "/shop2.webp" },
    { name: "Ruby", src: "/shop3.webp" },
    { name: "Aquamarine", src: "/shop4.webp" },
    { name: "Morganite", src: "/shop5.webp" },
    { name: "Moissanite", src: "/shop6.webp" },
    { name: "Lab Gemstones", src: "/shop7.webp" },
    { name: "Birthstones", src: "/shop8.webp" },
]

export function ShopGemstonesByCategory() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-12 text-center">
                    Shop Gemstones By Type
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 justify-items-center">
                    {gemstoneCategories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/gemstones/${cat.name.toLowerCase().replace(" ", "-")}`}
                            className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2"
                        >
                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                                <Image
                                    src={cat.src}
                                    alt={cat.name}
                                    fill
                                    className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <span className="text-[12px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-[#163E3E] transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

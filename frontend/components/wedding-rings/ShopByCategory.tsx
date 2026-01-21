"use client"

import Link from "next/link"
import Image from "next/image"

const weddingCategories = [
    { name: "Women's Rings", src: "/ring1.jfif" },
    { name: "Men's Rings", src: "/ring4.jfif" },
    { name: "Wedding Sets", src: "/featured2.webp" },
]

const weddingStyles = [
    { name: "Classic Bands", src: "/ring5.jfif" },
    { name: "Diamond Bands", src: "/ring2.jfif" },
    { name: "Eternity Rings", src: "/ring3.jfif" },
    { name: "Stackable Rings", src: "/ring1.jfif" },
    { name: "Nature Inspired", src: "/ring6.jfif" },
    { name: "Vintage Styles", src: "/design4.jfif" },
]

export function ShopByCategory() {
    return (
        <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

                {/* Section 1: Shop by Category (Large Tiles) */}
                <div className="mb-20 md:mb-32">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-10 md:mb-16 text-center">
                        Shop Wedding Rings by Category
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                        {weddingCategories.map((category) => (
                            <Link
                                key={category.name}
                                href={`/wedding-rings/${category.name.toLowerCase().replace("'s", "").replace(" ", "-")}`}
                                className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-50"
                            >
                                <Image
                                    src={category.src}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col items-center">
                                    <h3 className="text-white font-serif text-2xl md:text-3xl tracking-wide drop-shadow-lg mb-4">
                                        {category.name}
                                    </h3>
                                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/60 pb-1 group-hover:border-white transition-all">
                                        Shop Now
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Section 2: Shop by Style (Grid) */}
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
                        Shop Wedding Rings By Style
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
                        {weddingStyles.map((style) => (
                            <Link
                                key={style.name}
                                href={`/wedding-rings/style/${style.name.toLowerCase().replace(" ", "-")}`}
                                className="group block"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-sm">
                                    <Image
                                        src={style.src}
                                        alt={`${style.name} Wedding Ring`}
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

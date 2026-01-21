"use client"

import Link from "next/link"
import Image from "next/image"

const categories = [
    { name: "Earrings", src: "/shop1.webp" },
    { name: "Necklaces", src: "/shop2.webp" },
    { name: "Bracelets", src: "/shop3.webp" },
    { name: "Rings", src: "/shop4.webp" },
    { name: "Mens", src: "/shop5.webp" },
    { name: "Personalized", src: "/shop6.webp" },
]

export function ShopByCategory() {
    return (
        <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
                    Shop Fine Jewelry by Category
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.name} href={`/jewelry/${cat.name.toLowerCase()}`} className="group block">
                            <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-sm">
                                <Image src={cat.src} alt={cat.name} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                            </div>
                            <h3 className="text-sm md:text-[15px] font-sans text-gray-900 font-medium group-hover:text-[#163E3E] transition-colors tracking-wide text-center">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

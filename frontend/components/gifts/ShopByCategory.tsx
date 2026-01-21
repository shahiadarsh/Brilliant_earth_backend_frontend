"use client"

import Link from "next/link"
import Image from "next/image"

const giftCategories = [
    { name: "Under $250", src: "/featured1.webp" },
    { name: "Under $500", src: "/featured2.webp" },
    { name: "Anniversary", src: "/featured3.webp" },
    { name: "Birthday", src: "/shop1.webp" },
    { name: "Graduation", src: "/shop2.webp" },
    { name: "Personalized", src: "/shop6.webp" },
]

export function ShopByCategory() {
    return (
        <section className="bg-white pb-16 md:pb-24 pt-8 md:pt-12 relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
                    Shop Gifts by Occasion & Price
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
                    {giftCategories.map((cat) => (
                        <Link key={cat.name} href={`/gifts/${cat.name.toLowerCase().replace(" ", "-")}`} className="group block">
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

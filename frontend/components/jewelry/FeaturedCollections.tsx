"use client"

import Link from "next/link"
import Image from "next/image"

const collections = [
    {
        title: "New Arrivals",
        description: "Explore our latest fine jewelry designs, featuring brilliant diamonds and colorful gemstones in modern settings.",
        href: "/jewelry/new-arrivals",
        src: "/featured1.webp",
        alt: "Latest jewelry designs"
    },
    {
        title: "The Silver Collection",
        description: "Sleek and versatile designs in premium sterling silver. Perfect for everyday elegance and effortless stacking.",
        href: "/jewelry/silver",
        src: "/featured2.webp",
        alt: "Silver jewelry collection"
    },
    {
        title: "Eco-Friendly Gold",
        description: "Consciously crafted jewelry in 100% recycled gold. Beautiful pieces that support a more sustainable future.",
        href: "/jewelry/recycled-gold",
        src: "/featured3.webp",
        alt: "Gold jewelry collection"
    }
]

export function FeaturedCollections() {
    return (
        <section className="w-full bg-white pt-10 pb-20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full px-6 sm:px-8 lg:px-12">
                {collections.map((item, index) => (
                    <div key={index} className="flex flex-col items-center w-full group">
                        <Link href={item.href} className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        </Link>
                        <div className="flex flex-col items-center text-center px-4 pt-10 pb-4 max-w-lg mx-auto">
                            <h3 className="font-serif text-2xl lg:text-3xl text-gray-900 mb-4 tracking-wide group-hover:text-[#163E3E] transition-colors">
                                {item.title}
                            </h3>
                            <p className="font-sans text-[13px] leading-relaxed text-gray-600 mb-10 max-w-xs xl:max-w-sm">
                                {item.description}
                            </p>
                            <Link
                                href={item.href}
                                className="inline-block border border-[#163E3E] text-[#163E3E] px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#163E3E] hover:text-white transition-all duration-300 min-w-[200px]"
                            >
                                Explore Collection
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

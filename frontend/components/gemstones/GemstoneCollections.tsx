"use client"

import Image from "next/image"
import Link from "next/link"

const collections = [
    {
        title: "The Oasis Collection",
        description: "Serene aquamarines and emeralds that evoke the beauty of tropical waters.",
        image: "/featured1.webp",
        link: "/gemstones/oasis"
    },
    {
        title: "Midnight Sapphires",
        description: "Deep blue sapphires paired with brilliant diamonds for a timeless look.",
        image: "/featured2.webp",
        link: "/gemstones/midnight"
    }
]

export function GemstoneCollections() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-12 text-center">
                    Handcrafted Gemstone Collections
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collections.map((col) => (
                        <div key={col.title} className="relative group overflow-hidden bg-white rounded-sm aspect-video">
                            <Image
                                src={col.image}
                                alt={col.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent h-2/3 transition-all duration-500"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                <h3 className="text-white font-serif text-2xl md:text-3xl mb-3 tracking-wide">{col.title}</h3>
                                <p className="text-white/80 text-sm md:text-base font-sans max-w-md mb-6">
                                    {col.description}
                                </p>
                                <Link
                                    href={col.link}
                                    className="bg-white text-gray-900 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] rounded-[1px] hover:bg-gray-100 transition-all w-fit"
                                >
                                    Explore Collection
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

"use client"

import Image from "next/image"
import Link from "next/link"

const collections = [
    {
        title: "The Versailles Collection",
        description: "Intricate floral patterns inspired by the gardens of Versailles.",
        image: "/wedding-rings.jpg",
        link: "/wedding-rings/versailles"
    },
    {
        title: "The Matte Collection",
        description: "Sleek, modern finishes for a contemporary wedding look.",
        image: "/engagement-rings.jpg",
        link: "/wedding-rings/matte"
    }
]

export function WeddingCollections() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-12 text-center">
                    Featured Wedding Collections
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collections.map((col) => (
                        <div key={col.title} className="relative group overflow-hidden bg-gray-100 rounded-sm aspect-[16/9]">
                            <Image
                                src={col.image}
                                alt={col.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                <h3 className="text-white font-serif text-2xl md:text-3xl mb-3 tracking-wide capitalize">{col.title}</h3>
                                <p className="text-white/90 text-sm md:text-base font-sans max-w-md mb-6 leading-relaxed">
                                    {col.description}
                                </p>
                                <Link
                                    href={col.link}
                                    className="inline-block text-white text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 border-white/40 hover:border-white transition-all w-fit pb-1"
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

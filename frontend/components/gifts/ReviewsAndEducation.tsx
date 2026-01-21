"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Star } from "lucide-react"

const reviews = [
    { id: 1, author: "Amy S.", product: "Silver Initial Necklace", text: "The perfect birthday gift for my sister. She literally wears it every single day.", src: "/review1.avif" },
    { id: 2, author: "Chris P.", product: "Diamond Stud Earrings", text: "My wife was absolutely thrilled with these for our anniversary. Stunning quality.", src: "/review2.avif" },
    { id: 3, author: "Jessica M.", product: "Caring Gift Set", text: "The packaging was beautiful and it arrived just in time. Excellent service!", src: "/review3.avif" },
]

const education = [
    { title: "Gifting Guide", text: "Find the perfect piece of jewelry for every personality with our expert tips.", src: "/edu1.jfif" },
    { title: "Anniversary Milestones", text: "Discover traditional and modern jewelry gifts for every year of marriage.", src: "/edu2.jfif" },
]

export function ReviewsAndEducation() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 200 : 300
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <section className="bg-white py-12 md:py-24 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="mb-16 md:mb-24">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
                        <h2 className="font-serif text-3xl md:text-[42px] text-gray-900 leading-tight">Gifts That Delighted</h2>
                        <div className="flex gap-2">
                            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                        </div>
                    </div>
                    <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {reviews.map((review) => (
                            <div key={review.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-start bg-gray-50 p-6 md:p-8 rounded-sm">
                                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />)}</div>
                                <p className="font-sans text-sm md:text-base text-gray-700 italic mb-6">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200"><Image src={review.src} alt={review.author} fill className="object-cover" /></div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">{review.author}</p>
                                        <p className="text-[11px] text-gray-500 uppercase tracking-wider">{review.product}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {education.map((item) => (
                        <div key={item.title} className="group cursor-pointer">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-6 shadow-lg"><Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
                            <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">{item.title}</h3>
                            <p className="font-sans text-sm md:text-base text-gray-600 mb-6 max-w-sm">{item.text}</p>
                            <Link href="/education" className="text-[11px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E]/20 hover:border-[#163E3E] transition-all pb-1">Read the Guide</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

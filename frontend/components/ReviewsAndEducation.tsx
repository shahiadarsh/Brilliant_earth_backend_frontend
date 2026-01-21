"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, ChevronRight } from "lucide-react"

// --- DATA: Reviews ---
const reviews = [
  {
    name: "Alexandra",
    product: "Secret Garden Engagement Ring",
    text: "This is absolutely the ring of my dreams and is very comfortable. I receive compliments on it regularly!",
    src: "/review1.avif"
  },
  {
    name: "Mike",
    product: "Freesia Hidden Halo Engagement Ring",
    text: "The eye-catching design and exceptional quality of the diamond ring from Ritzin made it a truly special and worthwhile purchase.",
    src: "/review2.avif"
  },
  {
    name: "Adam",
    product: "Nadia Engagement Ring",
    text: "Perfect! Absolutely gorgeous ring and I'm very excited to give this to the love of my life. The quality of the ring is unmatched.",
    src: "/review3.avif"
  },
  {
    name: "Logan",
    product: "Demi Engagement Ring",
    text: "Beautiful setting. Very well put together and it arrived exactly the way it was described online!",
    src: "/review4.avif"
  }
]

// --- DATA: Education ---
const education = [
  {
    title: "How to Buy an Engagement Ring",
    desc: "Your go-to guide for choosing the perfect engagement ring.",
    src: "/edu1.jfif"
  },
  {
    title: "Engagement Ring Trends",
    desc: "Here are the top eight engagement ring trends to expect in 2026 as told by our experts.",
    src: "/edu2.jfif"
  },
  {
    title: "4 C's of Diamonds",
    desc: "Our diamond quality guide explores how to assess diamond grades according to the 4 C's.",
    src: "/edu3.jfif" // Using loose diamond/gem image
  },
  {
    title: "How to Measure Ring Size",
    desc: "View our ring size chart, request a free ring sizer, and learn how to find your ring size at home.",
    src: "/edu4.jfif"
  },
  {
    title: "Moissanite vs. Diamond",
    desc: "Learn how moissanite and diamond compare in appearance, durability, and price to select the ideal gemstone for you.",
    src: "/edu5.jfif"
  }
]

export function ReviewsAndEducation() {
  return (
    <section className="bg-white py-12 md:py-24 overflow-hidden border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* === SECTION 1: REVIEWS === */}
        <div className="mb-20 md:mb-32">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-10 md:mb-16 text-center sm:text-left">
            Engagement Ring Reviews
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {reviews.map((review, idx) => (
              <div key={idx} className="flex flex-col group">
                <Link href="#" className="relative aspect-square overflow-hidden mb-5 rounded-sm bg-gray-50 shadow-sm">
                  <Image
                    src={review.src}
                    alt={review.product}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </Link>

                {/* Name & Stars */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-widest leading-none">
                    {review.name}
                  </span>
                  <div className="flex text-[#163E3E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Product Title */}
                <Link href="#" className="font-serif text-sm md:text-base text-gray-900 hover:text-[#163E3E] transition-colors mb-3 leading-tight">
                  {review.product}
                </Link>

                {/* Review Text */}
                <p className="text-[12px] md:text-[13px] leading-relaxed text-gray-600 mb-4 line-clamp-3 md:line-clamp-4 italic opacity-80">
                  "{review.text}"
                </p>

                {/* Shop Now Link */}
                <Link href="#" className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#163E3E] border-b border-transparent hover:border-[#163E3E] transition-all pb-0.5 self-start">
                  Shop Design
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* === SECTION 2: EDUCATION === */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-10 md:mb-16 text-center sm:text-left">
            Engagement Ring Education
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {education.map((item, idx) => (
              <div key={idx} className="flex flex-col group">
                <Link href="#" className="relative aspect-square overflow-hidden mb-5 rounded-sm bg-gray-50 shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                </Link>

                <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-3 group-hover:text-[#163E3E] transition-colors tracking-wide leading-snug">
                  {item.title}
                </h3>

                <p className="text-[11px] md:text-[12px] leading-relaxed text-gray-500 line-clamp-2 mb-4">
                  {item.desc}
                </p>

                <Link href="#" className="text-[10px] md:text-[11px] font-bold text-[#163E3E] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

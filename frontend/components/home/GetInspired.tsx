"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play } from "lucide-react"
import { useGetPublicPromosQuery } from "@/lib/redux/slices/promosApiSlice"

export function GetInspired() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: promosData, isLoading } = useGetPublicPromosQuery(undefined);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <section className="bg-white py-12 md:py-16 border-t border-gray-100">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-100 animate-pulse mb-8" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[280px] aspect-square bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const instaPosts = Array.isArray(promosData)
    ? promosData
      .filter((p: any) => p.position === 'insta-post')
      .sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0))
    : [];

  if (instaPosts.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-serif text-3xl md:text-[34px] text-gray-900">
            Get Inspired
          </h2>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hidden sm:block font-sans text-[13px] underline underline-offset-4 text-gray-900 hover:text-[#163E3E] transition-colors"
          >
            Shop Instagram
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/slider">

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {instaPosts.map((post: any) => (
              <Link
                key={post._id}
                href={post.link || "#"}
                target="_blank"
                className="relative min-w-[240px] md:min-w-[280px] aspect-square flex-shrink-0 snap-start bg-gray-100 cursor-pointer group/item overflow-hidden"
              >
                <Image
                  src={post.desktopImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                />

                {/* Video Indicator Overlay */}
                {post.altText === "video" && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
              </Link>
            ))}

            {/* Spacer */}
            <div className="min-w-[20px]"></div>
          </div>

          {/* Navigation Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
          </button>

        </div>

        {/* Mobile Link Fallback */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href="https://instagram.com"
            className="font-sans text-[13px] underline underline-offset-4 text-gray-900 hover:text-[#163E3E]"
          >
            Shop Instagram
          </Link>
        </div>

      </div>
    </section>
  )
}

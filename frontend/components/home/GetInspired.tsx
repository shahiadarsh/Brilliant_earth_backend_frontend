"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Play } from "lucide-react"

const instaPosts = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    alt: "Three stone emerald cut engagement ring"
  },
  {
    id: 2,
    type: "image", // Text overlay style image
    src: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=600",
    alt: "5 Unique Diamond Cuts 2026 Brides Need To Know"
  },
  {
    id: 3,
    type: "video",
    src: "https://images.unsplash.com/photo-1626027988355-6b83f4cb27f0?auto=format&fit=crop&q=80&w=600",
    alt: "Hand wearing oval engagement ring in snow"
  },
  {
    id: 4,
    type: "video",
    src: "https://images.unsplash.com/photo-1598556851364-3850b4a8b696?auto=format&fit=crop&q=80&w=600",
    alt: "Sparkling pear shaped diamond ring close up"
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1603561596112-0a132b722353?auto=format&fit=crop&q=80&w=600",
    alt: "5 Engagement Ring Predictions for 2026"
  },
  {
    id: 6,
    type: "video",
    src: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600",
    alt: "Gold necklaces gift box unboxing"
  },
  {
    id: 7,
    type: "image",
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
    alt: "Lifestyle jewelry shot"
  }
]

export function GetInspired() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

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
            {instaPosts.map((post) => (
              <div 
                key={post.id} 
                className="relative min-w-[240px] md:min-w-[280px] aspect-square flex-shrink-0 snap-start bg-gray-100 cursor-pointer group/item overflow-hidden"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                />
                
                {/* Video Indicator Overlay */}
                {post.type === "video" && (
                  <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
              </div>
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

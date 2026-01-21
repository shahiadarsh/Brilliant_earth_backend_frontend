"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  Gem, 
  MoveHorizontal, 
  ChevronRight 
} from "lucide-react"

const guarantees = [
  {
    title: "FREE SHIPPING & RETURNS",
    icon: <Truck strokeWidth={1.2} className="w-9 h-9" />
  },
  {
    title: "FREE LIFETIME WARRANTY",
    icon: <ShieldCheck strokeWidth={1.2} className="w-9 h-9" />
  },
  {
    title: "24/7 CUSTOMER SUPPORT",
    icon: <MessageSquare strokeWidth={1.2} className="w-9 h-9" />
  },
  {
    title: "LIFETIME DIAMOND UPGRADE",
    icon: <Gem strokeWidth={1.2} className="w-9 h-9" />
  },
  {
    title: "FREE 1-YEAR RESIZING",
    // Custom ring icon using basic shapes + lucide
    icon: (
      <div className="relative flex items-center justify-center w-8 h-8">
        <div className="absolute inset-0 border-[1.5px] border-current rounded-full"></div>
        <div className="absolute -top-1 w-2 h-2 border-[1.5px] border-current rotate-45 bg-[#163E3E]"></div>
        <MoveHorizontal className="w-4 h-4" strokeWidth={1.5} />
      </div>
    )
  }
]

const missionCollections = [
  {
    title: "20th Anniversary Collection",
    src: "/home/promo2.webp",
    href: "#"
  },
  {
    title: "Jane Goodall Collection",
    src: "/home/promo3.webp",
    href: "#"
  },
  {
    title: "Signature Collections",
    src: "/home/promo4.webp",
    href: "#"
  },
  {
    title: "Recycled Gold Collection",
    src: "/home/promo1.webp",
    href: "#"
  },
  {
    title: "Fairmined Gold",
    src: "/home/promo2.webp",
    href: "#"
  }
]

export function AboutPagePromos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full flex flex-col">
      
      {/* SECTION 1: Service Guarantees (Teal Bar) */}
      <section className="bg-[#163E3E] text-white py-20 border-b border-[#1F4F4F]">
        <div className="max-w-[1600px] mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
              We&apos;ve Got You Covered
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 justify-items-center">
            {guarantees.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group w-full">
                {/* Glassy Icon Container */}
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-6 shadow-xl backdrop-blur-[2px] transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/10">
                  {item.icon}
                </div>
                
                <h3 className="font-sans text-[13px] font-medium tracking-wider uppercase max-w-[160px] leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: Mission Highlights (Split Layout) */}
      <section className="w-full bg-white grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Hero Image */}
        <div className="relative h-[500px] lg:h-auto lg:min-h-[700px] w-full order-1">
          <Image
            src="/home/promo1.webp" 
            alt="Woman looking away wearing jewelry"
            fill
            className="object-cover object-[center_20%]"
          />
        </div>

        {/* Right Side: Content Area */}
        <div className="flex flex-col justify-center py-20 px-6 md:px-16 lg:px-20 bg-white order-2 overflow-hidden">
          
          {/* Text Block */}
          <div className="text-center mb-20 max-w-lg mx-auto">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">
              20 YEARS OF OUR MISSION
            </h3>
            
            <p className="font-serif text-2xl md:text-[28px] leading-[1.6] text-gray-900 mb-8 font-light">
              From our pioneering diamond standards to our unmatched transparency, we&apos;re redefining what it means to design, craft, and experience jewelry that makes a real difference.
            </p>

            <Link 
              href="/mission"
              className="inline-block font-sans text-[13px] font-medium underline underline-offset-4 text-gray-900 hover:text-[#163E3E] uppercase tracking-wide decoration-gray-400 hover:decoration-[#163E3E] transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Collections Slider */}
          <div className="relative w-full pl-2">
            
            <div 
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {missionCollections.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  className="min-w-[220px] md:min-w-[260px] snap-start group flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square overflow-hidden mb-4 bg-gray-50">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-sans text-[14px] text-center text-gray-900 group-hover:text-[#163E3E] transition-colors">
                    {item.title}
                  </h4>
                </Link>
              ))}
              {/* Spacer */}
              <div className="min-w-[40px]"></div>
            </div>

            {/* Navigation Arrow */}
            <button 
              onClick={scroll}
              className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:scale-105 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      </section>

    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/shared/ProductCard"

const METALS = ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"]

const ringCategories = [
  {
    title: "Nature Inspired Rings",
    href: "/engagement-rings/nature-inspired",
    src: "/home/ring2.jfif"
  },
  {
    title: "Solitaire Rings",
    href: "/engagement-rings/solitaire",
    src: "/home/ring3.jfif"
  },
  {
    title: "Three Stone Rings",
    href: "/engagement-rings/three-stone",
    src: "/home/ring4.jfif"
  },
  {
    title: "Bridal Sets",
    href: "/engagement-rings/bridal-sets",
    src: "/home/ring5.jfif"
  },
  {
    title: "Bezel Rings",
    href: "/engagement-rings/bezel",
    src: "/home/ring6.jfif"
  },
  {
    title: "Ready to Ship Rings",
    href: "/engagement-rings/ready-to-ship",
    src: "/home/ring7.jfif"
  }
]

export function PopularEngagementRings() {
  return (
    <section className="w-full bg-white">

      <div className="w-full bg-[#163E3E] text-white relative py-6 md:py-8 px-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6">

          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <Image
              src="/home/ring1.webp"
              alt="Diamond Necklace"
              fill
              className="object-cover rounded-full border border-white/20"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] font-semibold tracking-widest mb-1.5 uppercase text-white/90">
              Ends Soon!
            </p>
            <h3 className="text-[13px] md:text-[14px] leading-relaxed tracking-wide mb-1.5 font-medium uppercase">
              Receive a Natural Diamond Necklace <span className="font-light normal-case">With Purchase Over $1,000. A $225 Value.</span>
            </h3>
            <p className="text-[11px] md:text-[12px] tracking-wide">
              USE CODE <span className="font-bold">DIAMOND</span> IN CART.
            </p>
          </div>

          <Link href="/terms" className="absolute bottom-2 right-4 text-[9px] text-white/60 hover:text-white underline decoration-white/30 hover:decoration-white transition-all">
            See Terms
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-[34px] text-gray-900 mb-3">
            Popular Engagement Rings
          </h2>
          <p className="font-sans text-[13px] md:text-[14px] text-gray-600">
            Artistry and craftsmanship in every detail.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ringCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className="relative aspect-square overflow-hidden mb-3 bg-gray-50">
                <Image
                  src={cat.src}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <h3 className="font-sans text-[15px] font-normal text-gray-900 group-hover:text-[#163E3E] transition-colors pl-1">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-24">
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-[34px] text-gray-900 mb-3">
              Top Rated Designs
            </h2>
            <p className="font-sans text-[13px] md:text-[14px] text-gray-600">
              Our most-loved engagement ring styles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                key={i}
                id={`featured-${i}`}
                name={`${["Petite Twisted Vine", "Secret Garden", "Waverly", "Luxe Ballad"][i - 1]} Ring`}
                price={1200 + (i * 300)}
                imagesByMetal={{
                  "18K White Gold": `/home/ring${i === 1 ? 2 : i === 2 ? 3 : i === 3 ? 4 : 5}.jfif`,
                  "18K Yellow Gold": `/home/ring${i === 1 ? 3 : i === 2 ? 4 : i === 3 ? 5 : 6}.jfif`,
                  "14K Rose Gold": `/home/ring${i === 1 ? 4 : i === 2 ? 5 : i === 3 ? 6 : 7}.jfif`,
                  "Platinum": `/home/ring${i === 1 ? 5 : i === 2 ? 6 : i === 3 ? 7 : 2}.jfif`,
                }}
                defaultMetal="18K White Gold"
                metals={METALS}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

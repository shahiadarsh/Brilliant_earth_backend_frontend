"use client"

import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/shared/ProductCard"
import { useGetPublicPromosQuery } from "@/lib/redux/slices/promosApiSlice"
import { useGetCategoriesQuery } from "@/lib/redux/slices/categoriesApiSlice"
import { useGetRingsQuery } from "@/lib/redux/slices/ringsApiSlice"

const METALS = ["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"]

export function PopularEngagementRings() {
  const { data: promosData } = useGetPublicPromosQuery(undefined);
  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const { data: ringsData } = useGetRingsQuery({ limit: 4 });

  const promo = promosData?.find((p: any) => p.position === 'popular-rings-promo');
  const popularCategories = Array.isArray(categoriesData)
    ? categoriesData
      .filter((cat: any) => cat.showOnHome && cat.homePosition === 'popular-engagement')
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <section className="w-full bg-white">

      <div className="w-full bg-[#163E3E] text-white relative py-6 md:py-8 px-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-6">

          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <Image
              src={promo?.desktopImage || "/home/ring1.webp"}
              alt={promo?.altText || "Promo image"}
              fill
              className="object-cover rounded-full border border-white/20"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] font-semibold tracking-widest mb-1.5 uppercase text-white/90">
              {promo?.startDate ? "Ends Soon!" : "Featured"}
            </p>
            <h3 className="text-[13px] md:text-[14px] leading-relaxed tracking-wide mb-1.5 font-medium uppercase">
              {promo?.title || "Receive a Natural Diamond Necklace With Purchase Over $1,000."}
            </h3>
            <p className="text-[11px] md:text-[12px] tracking-wide">
              {promo?.buttonText ? `USE CODE ${promo.buttonText} IN CART.` : "Shop our collection of handcrafted designs."}
            </p>
          </div>

          <Link href={promo?.link || "/terms"} className="absolute bottom-2 right-4 text-[9px] text-white/60 hover:text-white underline decoration-white/30 hover:decoration-white transition-all">
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
          {popularCategories.map((cat: any) => (
            <Link key={cat._id} href={`/${cat.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden mb-3 bg-gray-50">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <h3 className="font-sans text-[15px] font-normal text-gray-900 group-hover:text-[#163E3E] transition-colors pl-1">
                {cat.name}
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
            {ringsData?.data?.map((ring: any) => (
              <ProductCard
                key={ring._id}
                id={ring._id}
                name={ring.name}
                price={ring.price}
                imagesByMetal={ring.imagesByMetal}
                defaultMetal={ring.metals?.[0] || "18K White Gold"}
                metals={ring.metals || METALS}
              />
            )) || [...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-gray-100 animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-100 animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

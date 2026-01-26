"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetCategoriesQuery } from "@/lib/redux/slices/categoriesApiSlice"

export function ShopDiamondsByShape() {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <section className="bg-[#F9F9F9] py-20 mr-12 ml-12 rounded-[50px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex animate-pulse gap-12">
            <div className="w-1/3 h-64 bg-gray-200" />
            <div className="flex-1 grid grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const shapes = Array.isArray(categoriesData)
    ? categoriesData
      .filter((cat: any) => cat.showOnHome && cat.homePosition === 'diamond-shape')
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <section className="bg-[#F9F9F9] py-20 md:mx-12 rounded-[20px] md:rounded-[50px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Left Side: Title & Ring Image */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0 lg:w-[35%]">
            <h2 className="font-serif text-3xl md:text-[36px] text-gray-800 mb-8 leading-snug font-light">
              Shop Diamonds <br className="hidden lg:block" /> by Shape
            </h2>

            <div className="relative w-[280px] h-[220px] lg:w-[360px] lg:h-[260px]">
              <Image
                src="/home/diamond1.webp"
                alt="Diamond Shape Solitaire Ring"
                fill
                className="object-contain drop-shadow-2xl brightness-105"
              />
            </div>
          </div>

          {/* Right Side: Shape Grid */}
          <div className="flex-1 w-full bg-white/50 p-8 rounded-3xl backdrop-blur-sm border border-white/40">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-4">
              {shapes.map((shape: any) => (
                <Link
                  key={shape._id}
                  href={`/diamonds/${shape.slug}`}
                  className="flex flex-col items-center group transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative w-16 h-16 mb-4 filter drop-shadow-sm">
                    <Image
                      src={shape.image || "/placeholder.svg"}
                      alt={`${shape.name} Cut`}
                      fill
                      className="object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all opacity-100"
                    />
                  </div>
                  <span className="font-sans text-[13px] font-bold tracking-wider uppercase text-gray-500 group-hover:text-[#163E3E] transition-colors text-center">
                    {shape.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetPublicPromosQuery } from "@/lib/redux/slices/promosApiSlice"

export function NewYearPromos() {
  const { data: promosData, isLoading } = useGetPublicPromosQuery(undefined);

  if (isLoading) {
    return <div className="w-full h-[500px] bg-gray-100 animate-pulse"></div>;
  }

  const leftPromo = promosData?.find((p: any) => p.position === 'new-year-left');
  const rightPromo = promosData?.find((p: any) => p.position === 'new-year-right');

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">

        {/* Left Banner */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full group overflow-hidden">
          <Image
            src={leftPromo?.desktopImage || "/home/ring3.jfif"}
            alt={leftPromo?.altText || "Promotion banner"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#052B23] via-[#052B23]/40 to-transparent opacity-90"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-8 drop-shadow-md">
              {leftPromo?.title || "Ring in the New Year"}
            </h2>
            <Link
              href={leftPromo?.link || "#"}
              className="bg-[#1F4242] text-white px-10 py-3.5 text-sm font-bold tracking-wide rounded-[2px] hover:bg-[#163E3E] transition-colors shadow-lg min-w-[240px]"
            >
              {leftPromo?.buttonText || "Shop Now"}
            </Link>
          </div>
        </div>

        {/* Right Banner */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full group overflow-hidden">
          <Image
            src={rightPromo?.desktopImage || "/home/promo1.webp"}
            alt={rightPromo?.altText || "Promotion banner"}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white mb-8 drop-shadow-md">
              {rightPromo?.title || "Best-Selling Styles"}
            </h2>
            <Link
              href={rightPromo?.link || "#"}
              className="bg-[#1F4242] text-white px-10 py-3.5 text-sm font-bold tracking-wide rounded-[2px] hover:bg-[#163E3E] transition-colors shadow-lg min-w-[240px]"
            >
              {rightPromo?.buttonText || "Shop Now"}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

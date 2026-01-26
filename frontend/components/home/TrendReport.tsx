"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetPublicPromosQuery } from "@/lib/redux/slices/promosApiSlice"

export function TrendReport() {
  const { data: promosData, isLoading } = useGetPublicPromosQuery(undefined);

  if (isLoading) {
    return (
      <section className="w-full bg-white py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
          <div className="h-8 w-64 bg-gray-100 animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const trends = Array.isArray(promosData)
    ? promosData
      .filter((p: any) => p.position === 'trend-report')
      .sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0))
    : [];

  return (
    <section className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">

        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            2026 Trend Report
          </h2>
          <p className="font-sans text-[11px] md:text-[12px] text-gray-500 uppercase tracking-wide">
            This year&apos;s must-have trends combine classic traditions with artistic expressions to feel both timeless and personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
          {trends.map((item: any, index: number) => (
            <div key={item._id} className="relative aspect-[3/4] md:aspect-[3/3.5] group overflow-hidden w-full">
              <Image
                src={item.desktopImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 px-6 text-center bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-white">
                  {item.title}
                </h3>

                <p className="font-sans text-[11px] md:text-[12px] leading-relaxed mb-6 max-w-xs text-white/90 font-light">
                  {item.description}
                </p>

                <Link
                  href={item.link}
                  className="inline-block px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-white text-white hover:bg-white hover:text-black transition-colors"
                >
                  {item.buttonText || 'Shop Now'}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

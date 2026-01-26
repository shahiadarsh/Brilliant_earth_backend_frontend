"use client"

import Link from "next/link"
import Image from "next/image"
import { useGetCategoriesQuery } from "@/lib/redux/slices/categoriesApiSlice"

export function ShopJewelryByCategory() {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 bg-gray-100 animate-pulse mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Filter categories that should be shown on home
  const homeCategories = Array.isArray(categoriesData)
    ? categoriesData
      .filter((cat: any) => cat.showOnHome)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-[34px] text-gray-900 mb-3">
            Shop Jewelry by Category
          </h2>
          <p className="font-sans text-[13px] md:text-[14px] text-gray-600">
            Thoughtfully designed collections for the big day and every day.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
          {homeCategories.map((cat: any) => (
            <Link key={cat._id} href={`/${cat.slug}`} className="group block">
              <div className="relative aspect-square bg-[#F9F9F9] mb-4 overflow-hidden">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-sans text-[15px] text-gray-900 group-hover:text-[#163E3E] transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

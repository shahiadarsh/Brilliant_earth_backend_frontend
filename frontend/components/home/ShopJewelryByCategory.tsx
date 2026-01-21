"use client"

import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    title: "Engagement Rings",
    href: "/engagement-rings",
    src: "/home/shop1.jfif"
  },
  {
    title: "Women's Wedding Rings",
    href: "/wedding-rings/women",
    src: "/home/shop2.jfif"
  },
  {
    title: "Men's Wedding Rings",
    href: "/wedding-rings/men",
    src: "/home/shop3.jfif"
  },
  {
    title: "Gemstone Rings",
    href: "/rings/gemstone",
    src: "/home/shop4.jfif"
  },
  {
    title: "Fine Jewelry",
    href: "/jewelry",
    src: "/home/shop5.jfif"
  },
  {
    title: "Best Sellers",
    href: "/jewelry/best-sellers",
    src: "/home/shop6.jfif"
  }
]

export function ShopJewelryByCategory() {
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
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className="relative aspect-square bg-[#F9F9F9] mb-4 overflow-hidden">
                <Image
                  src={cat.src}
                  alt={cat.title}
                  fill
                  className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-sans text-[15px] text-gray-900 group-hover:text-[#163E3E] transition-colors">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

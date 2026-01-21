"use client"

import Image from "next/image"

export function TheDifference() {
  return (
    <section id="the-difference" className="bg-white py-20 md:py-32 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Main Section Header */}
        <div className="text-center mb-24 md:mb-36">
          <h2 className="font-sans text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
            The Ritzin Difference
          </h2>
          <div className="h-[1px] w-24 bg-gray-200 mx-auto"></div>
        </div>

        <div className="flex flex-col gap-28 md:gap-40">

          {/* Item 1: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="flex flex-col order-2 lg:order-1 max-w-lg">
              <h3 className="font-sans text-3xl md:text-[40px] font-light uppercase text-gray-800 mb-8 leading-[1.1] tracking-tight">
                Expertly Designed <br /> <span className="font-normal italic">Jewelry</span>
              </h3>
              <div className="h-[2px] w-16 bg-[#2F5B5B]/30 mb-10"></div>
              <p className="font-sans text-[16px] leading-8 text-gray-600 font-light italic_md">
                Award-winning designers in our San Francisco studio dream up each piece,
                considering every aspect of the distinct design. Artisans with masterful
                attention to detail bring our jewelry to life, so you can wear it forever.
              </p>
            </div>
            <div className="relative aspect-[4/5] w-full bg-gray-50 order-1 lg:order-2 shadow-2xl overflow-hidden rounded-sm group">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
                alt="Stack of diamond rings"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Item 2: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="relative aspect-[4/5] w-full bg-gray-50 order-1 shadow-2xl overflow-hidden rounded-sm group">
              <Image
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1000"
                alt="Close up of solitaire diamond engagement ring"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="flex flex-col order-2 max-w-lg">
              <h3 className="font-sans text-3xl md:text-[40px] font-light uppercase text-gray-800 mb-8 leading-[1.1] tracking-tight">
                Every Piece Crafted <br /> <span className="font-normal italic">Ethically</span>
              </h3>
              <div className="h-[2px] w-16 bg-[#2F5B5B]/30 mb-10"></div>
              <p className="font-sans text-[16px] leading-8 text-gray-600 font-light">
                Every aspect of our jewelry is ethically crafted, from the minute the materials
                are sourced, to the moment you put it on — because we believe you should
                feel good about what you&apos;re wearing.
              </p>
            </div>
          </div>

          {/* Item 3: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="flex flex-col order-2 lg:order-1 max-w-lg">
              <h3 className="font-sans text-3xl md:text-[40px] font-light uppercase text-gray-800 mb-8 leading-[1.1] tracking-tight">
                Uniquely <br /> <span className="font-normal italic">Yours</span>
              </h3>
              <div className="h-[2px] w-16 bg-[#2F5B5B]/30 mb-10"></div>
              <p className="font-sans text-[16px] leading-8 text-gray-600 font-light">
                We craft our jewelry joyfully, and just for you. Whether it&apos;s a made-to-order,
                one-of-a-kind engagement ring or a personalized piece of fine jewelry, our
                designs reflect the unique story of who you are.
              </p>
            </div>
            <div className="relative aspect-[4/5] w-full bg-gray-50 order-1 lg:order-2 shadow-2xl overflow-hidden rounded-sm group">
              <Image
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1000"
                alt="Oval diamond engagement ring"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

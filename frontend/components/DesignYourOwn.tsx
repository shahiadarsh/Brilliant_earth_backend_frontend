"use client"

import Link from "next/link"
import Image from "next/image"
import { useSelection } from "@/context/SelectionContext"
import { useRouter } from "next/navigation"

const designOptions = [
  {
    title: "Start with a Setting",
    href: "/design/setting",
    // Ring setting image
    src: "/design1.jfif"
  },
  {
    title: "Start with a Natural Diamond",
    href: "/diamonds/natural",
    // Loose diamonds vibe
    src: "/design2.jfif"
  },
  {
    title: "Start with a Lab Diamond",
    href: "/diamonds/lab",
    // Single large diamond
    src: "/design3.jfif"
  },
  {
    title: "Start with a Gemstone",
    href: "/gemstones",
    // Colored gemstone ring
    src: "/design4.jfif"
  }
]

export function DesignYourOwn() {
  const { clearSelection, setCurrentStep, setStartType } = useSelection()
  const router = useRouter()
  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

        <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 mb-8 md:mb-12 text-center sm:text-left">
          Design Your Own Engagement Ring
        </h2>

        {/* Grid Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-24">
          {designOptions.map((option) => (
            <div
              key={option.title}
              onClick={() => {
                clearSelection()
                if (option.href.includes('setting')) {
                  setCurrentStep('setting')
                  setStartType('setting')
                } else if (option.href.includes('diamond')) {
                  setCurrentStep('diamond')
                  setStartType('diamond')
                } else if (option.href.includes('gemstone')) {
                  setCurrentStep('gemstone')
                  setStartType('gemstone')
                }
                router.push(option.href)
              }}
              className="group block cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden mb-4 bg-gradient-to-br from-[#F0FAF9] to-white rounded-sm">
                <Image
                  src={option.src}
                  alt={option.title}
                  fill
                  className="object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-sm md:text-base font-sans text-gray-900 font-medium group-hover:text-[#163E3E] transition-colors leading-tight">
                {option.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Banner Section */}
        <div className="w-full bg-[#163E3E] text-white overflow-hidden relative flex flex-col md:flex-row items-center justify-between py-10 px-8 md:py-12 md:px-16 gap-8 rounded-sm shadow-xl mt-12">

          {/* Background Texture/Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

          {/* Necklace Image Floating */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 z-10 order-2 md:order-1">
            <Image
              src="/design5.webp"
              alt="Diamond Necklace"
              fill
              className="object-cover rounded-full border-4 border-white/10 shadow-2xl"
            />
            <div className="absolute -inset-2 border border-white/20 rounded-full animate-pulse"></div>
          </div>

          {/* Banner Text */}
          <div className="text-center md:text-left flex flex-col justify-center flex-1 z-10 order-1 md:order-2">
            <p className="text-[10px] font-bold tracking-[0.3em] mb-3 uppercase text-white/70">Exclusive Offer</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl leading-[1.2] tracking-wide mb-4 font-serif italic">
              Receive a Natural Diamond Necklace <span className="block sm:inline font-sans not-italic text-sm md:text-lg opacity-80 mt-1 sm:mt-0">With Purchase Over $1,000.</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <p className="text-xs md:text-sm tracking-[0.1em]">
                USE CODE <span className="font-bold text-lg inline-block ml-1">DIAMOND</span>
              </p>
              <Link href="/terms" className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-4 transition-colors">
                Terms & Conditions Applied
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

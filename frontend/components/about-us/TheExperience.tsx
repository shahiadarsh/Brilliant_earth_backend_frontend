"use client"

import Link from "next/link"
import Image from "next/image"

const benefits = [
  { title: "Free Shipping Both Ways", href: "#" },
  { title: "Free 30-Day Returns & Exchanges", href: "#" },
  { title: "24/7 Customer Support", href: "#" },
  { title: "Free 1-Year Resizing", href: "#" },
  { title: "Free Diamond Upgrades", href: "#" },
]

const missionLinks = [
  { label: "About", isActive: true },
  { label: "Mission", isActive: false },
  { label: "Transparency", isActive: false },
  { label: "Sustainability", isActive: false },
  { label: "Compassion", isActive: false },
  { label: "Inclusion", isActive: false },
]

export function TheExperience() {
  const missionLinks = [
    { label: "About", href: "#our-beginning" },
    { label: "Mission", href: "#mission-pillars" },
    { label: "Transparency", href: "#mission-pillars" },
    { label: "Sustainability", href: "#forever-forward" },
    { label: "Compassion", href: "#mission-pillars" },
    { label: "Inclusion", href: "#mission-pillars" },
  ]

  return (
    <div id="the-experience" className="w-full scroll-mt-20">

      {/* SECTION 1: THE EXPERIENCE */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          <div className="text-center mb-20 md:mb-28">
            <h2 className="font-sans text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gray-400 mb-6">
              The Experience
            </h2>
            <div className="h-[1px] w-24 bg-gray-100 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

            {/* Text Content */}
            <div className="flex flex-col items-start max-w-xl">
              <h3 className="font-sans text-3xl md:text-[44px] font-light uppercase text-gray-800 mb-8 tracking-wide leading-tight">
                We&apos;re <span className="font-normal italic">Here For You</span>
              </h3>
              <div className="h-[2px] w-20 bg-[#2F5B5B] mb-10"></div>

              <p className="font-sans text-[16px] leading-8 text-gray-600 font-light mb-12 italic_md">
                Appointments are relaxed, joyful, and tailored to you. Whether it&apos;s a milestone
                moment or an everyday luxury, we&apos;re here to help you start your stack, find
                your fit, and design the perfect piece.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link
                  href="/stores"
                  className="bg-[#163E3E] text-white px-8 py-4 text-[13px] font-semibold tracking-widest uppercase text-center hover:bg-[#0F2F2F] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Visit a Showroom
                </Link>
                <Link
                  href="/virtual-appointment"
                  className="border border-[#163E3E] text-[#163E3E] px-8 py-4 text-[13px] font-semibold tracking-widest uppercase text-center hover:bg-gray-50 transition-all duration-300"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] w-full bg-gray-50 shadow-2xl overflow-hidden rounded-sm group">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000"
                alt="Ritzin Showroom Interior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICE BENEFITS (Teal Banner) */}
      <section className="bg-[#0F5555] text-white py-20 md:py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-16 text-center">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center h-full justify-between group">
                <h4 className="font-sans text-[14px] font-bold tracking-widest uppercase leading-loose mb-8 max-w-[180px] mx-auto group-hover:text-white/90 transition-colors">
                  {benefit.title}
                </h4>
                <Link
                  href={benefit.href}
                  className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-all duration-300"
                >
                  <span className="h-[1px] w-4 bg-white/30"></span>
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: MORE ABOUT OUR MISSION (Dark Footer Nav) */}
      <section className="bg-[#163E3E] text-white py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 text-center">

          <h3 className="font-sans text-xs font-semibold tracking-[0.4em] uppercase text-white/40 mb-12">
            More About Our Mission
          </h3>

          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
            {missionLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative px-2 py-1"
              >
                <span className="text-[14px] font-medium tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

        </div>
      </section>

    </div>
  )
}

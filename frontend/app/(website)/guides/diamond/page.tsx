"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, BookOpen, Star, ShieldCheck, Globe, Gem } from "lucide-react"

export default function DiamondGuidePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Immersive Hero */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/edu1.jfif"
          alt="Education"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-[#163E3E]/40 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-white text-center">
          <div className="inline-flex items-center gap-2 mb-12 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.4em] font-bold">
            <BookOpen className="w-4 h-4" /> Ritzin Academy
          </div>
          <h1 className="font-serif text-6xl md:text-[10rem] leading-none mb-12 font-light tracking-tight">Education.</h1>
          <p className="text-2xl md:text-3xl max-w-2xl mx-auto font-light leading-relaxed opacity-80">
            Empowering your journey with the knowledge of master gemologists.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-0.5 h-12 bg-white/30"></div>
        </div>
      </div>

      {/* Guide Grid */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="grid lg:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
          {/* Featured Article 4Cs */}
          <div className="bg-white col-span-1 lg:col-span-2 p-12 md:p-24 flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#163E3E]">Essential Reading</span>
              <h2 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">The Universal Standard: <br /> Understanding the 4Cs</h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed">Master the pillars of diamond quality—Cut, Color, Clarity, and Carat—and learn how they influence brilliance and value.</p>
              <Link href="/guides/4cs" className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-900 hover:gap-8 transition-all">
                Explore the Guide <ArrowRight className="w-5 h-5 text-[#163E3E]" />
              </Link>
            </div>
            <div className="md:w-1/2 relative aspect-square group overflow-hidden">
              <Image
                src="/edu2.jfif"
                alt="The 4Cs"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Smaller Guides */}
          {[
            {
              title: "Lab-Grown vs. Natural",
              slug: "lab-vs-natural",
              desc: "Two distinct paths to brilliance. Learn the science and soul behind each diamond origin.",
              img: "https://images.unsplash.com/photo-1573408302185-9127b5428e3a?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Moissanite vs. Diamond",
              slug: "moissanite-vs-diamond",
              desc: "An in-depth comparison of two of the worlds most brilliant gemstones.",
              img: "https://image.brilliantearth.com/media/thumbnail/c3/a4/c3a4c414356ca5315fe244611f6469ba.jpg"
            },
            {
              title: "The Ring Sizer",
              slug: "ring-sizer",
              desc: "Our guide to finding the perfect fit safely and discreetly at home.",
              img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Our Sourcing Ethics",
              slug: "responsible-sourcing",
              desc: "Discover how Ritzin goes Beyond Conflict Free™ to protect communities.",
              img: "https://images.unsplash.com/photo-1549462226-94ad669046c2?auto=format&fit=crop&q=80&w=800"
            }
          ].map((guide, i) => (
            <div key={i} className="bg-white p-12 md:p-20 space-y-10 group hover:bg-gray-50 transition-colors">
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                <Image
                  src={guide.img}
                  alt={guide.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-gray-900 group-hover:text-[#163E3E] transition-colors">{guide.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">{guide.desc}</p>
                <Link href={guide.slug.includes('sourcing') ? `/info/${guide.slug}` : `/guides/${guide.slug}`} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-900 group-hover:gap-6 transition-all">
                  Read Article <ArrowRight className="w-4 h-4 text-[#163E3E]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Education Matters */}
      <div className="bg-[#163E3E] text-white py-32 md:py-48 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">Luxury is <br /> transparency.</h2>
            <div className="space-y-8">
              {[
                { icon: <Globe className="w-6 h-6" />, title: "Ethical Origins", desc: "Every gemstone we sell is traced back to its source, ensuring environmental and social integrity." },
                { icon: <Gem className="w-6 h-6" />, title: "GIA Standards", desc: "We adhere strictly to the grading standards of the Gemological Institute of America." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Lifetime Support", desc: "Our education doesn't end at purchase. We provide lifelong care for your jewelry." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">{item.icon}</div>
                  <div className="space-y-2">
                    <h4 className="font-bold uppercase tracking-widest text-[11px] mb-1">{item.title}</h4>
                    <p className="text-sm opacity-60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3]">
            <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full"></div>
            <Image
              src="/featured1.webp"
              alt="Luxury transparency"
              fill
              className="object-cover relative z-10 rounded-sm shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Expert Consultation CTA */}
      <div className="py-32 text-center bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h3 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">Need personalized expert advice?</h3>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">Our diamond specialists are here to guide you through every choice, ensuring your purchase is as unique as your story.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/appointment" className="bg-[#163E3E] text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black transition-all shadow-xl">Book a Consultation</Link>
            <Link href="/contact" className="border border-gray-900 px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all">Connect with Us</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

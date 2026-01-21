"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Info, BookOpen, Star, Sparkles } from "lucide-react"

export default function GuideDetailPage() {
    const params = useParams()
    const slug = (params.slug || params.guide) as string

    const displayTitle = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Expert Guide"

    // Mock specialized content based on slug
    const guides: Record<string, any> = {
        "lab-vs-natural": {
            hero: "/edu1.jfif",
            tag: "Comparison Guide",
            intro: "Both are chemically and physically identical, but their origins tell different stories. Discover which diamond narrative resonates with you.",
            sections: [
                { title: "Chemical Composition", text: "Lab-grown diamonds are 100% carbon, just like natural diamonds. They possess the same crystal structure and optical properties." },
                { title: "The Origin Story", text: "Natural diamonds were forged billions of years ago under the earth's crust. Lab diamonds are grown in weeks using advanced HPHT or CVD technology." },
                { title: "Sustainability & Ethics", text: "Lab diamonds reduce surface mining, while our natural diamonds support community development in mining regions." }
            ]
        },
        "moissanite-vs-diamond": {
            hero: "/edu4.jfif",
            tag: "Expert Analysis",
            intro: "While they may look similar at a glance, moissanite and diamond have distinct fire, brilliance, and durability characteristics.",
            sections: [
                { title: "Refractive Index", text: "Moissanite has a higher refractive index than diamond, creating a 'rainbow' sparkle that is more intense than diamond's white light." },
                { title: "Durability (Mohs Scale)", text: "Diamonds are a 10, making them the hardest material. Moissanite is a 9.25, still exceptionally durable for everyday wear." },
                { title: "Value & Price", text: "Moissanite offers a significantly lower price point, allowing for larger stones with a smaller budget." }
            ]
        },
        "ring-sizer": {
            hero: "/edu3.jfif",
            tag: "Practical Tool",
            intro: "Finding the perfect fit is essential for comfort and security. Use our expert methods to determine her ring size accurately.",
            sections: [
                { title: "The String Method", text: "A simple home technique to measure the circumference of the finger." },
                { title: "Free Physical Sizer", text: "Request our complimentary plastic ring sizer delivered to your home for the most accurate measurement." },
                { title: "Secret Sizing Tips", text: "How to find out their size without them knowing—using a ring they already wear." }
            ]
        },
        "marriage-compatibility": {
            hero: "/edu5.jfif",
            tag: "Lifestyle Guide",
            intro: "Explore how ring styles and astrological signs intersect in our guide to celestial synergy.",
            sections: [
                { title: "Zodiac Gems", text: "Certain gemstones are traditionally linked to zodiac signs, believed to bring harmony and balance to the wearer." },
                { title: "Style Personalities", text: "From the steady Earth signs to the fiery Fire signs, find the design that matches your elemental core." }
            ]
        },
        "engagement-captions": {
            hero: "/edu2.jfif",
            tag: "Gift Guide",
            intro: "The perfect ring deserves the perfect words. Our curated list of captions for your big reveal.",
            sections: [
                { title: "The Minimalist", text: "Short, sweet, and focused on the moment. Sometimes less is truly more." },
                { title: "The Storyteller", text: "Longer captions that weave together your journey from the first date to the 'Yes'." }
            ]
        },
        "angel-numbers": {
            hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
            tag: "Symbolism",
            intro: "Interpreting the synchronicity of numbers and how they influence jewelry choices and significant dates.",
            sections: [
                { title: "11:11", text: "The number of manifestation and spiritual awakening. A popular choice for engagement dates." },
                { title: "777", text: "Universal luck and divine protection. Often symbolized through triple-stone ring settings." }
            ]
        },
        "capsule-jewelry": {
            hero: "/featured2.webp",
            tag: "Fashion Essentials",
            intro: "Building a timeless jewelry collection that transitions effortlessly from day to night.",
            sections: [
                { title: "The 5 Pillars", text: "Studs, a pendant, a tennis bracelet, a gold band, and a statement ring form the perfect capsule." },
                { title: "Quality over Quantity", text: "Why investing in solid gold and lab diamonds is the ultimate sustainable fashion choice." }
            ]
        },
        "jewelry-essentials": {
            hero: "/featured3.webp",
            tag: "Buying Guide",
            intro: "The foundational pieces every jewelry box should hold, according to our master stylists.",
            sections: [
                { title: "The Solitaire Pendant", text: "A single diamond on a fine chain is the epitome of elegance." },
                { title: "Diamond Hoops", text: "A modern twist on a classic, offering light from every angle." }
            ]
        },
        "diamond-cut": {
            hero: "/edu1.jfif",
            tag: "Education",
            intro: "The most important of the 4Cs. Learn how cut determines a diamond's brilliance and fire.",
            sections: [
                { title: "Anatomy of Sparkle", text: "The table, pavilion, and crown must work in harmony to reflect light perfectly." },
                { title: "Cut Grades", text: "From Ideal to Poor, understand why we only offer the top 3% of cuts." }
            ]
        },
        "platinum-vs-gold": {
            hero: "/ring1.jfif",
            tag: "Material Guide",
            intro: "Density, durability, and tone. Choosing the precious metal that best suits your lifestyle.",
            sections: [
                { title: "Platinum's Purity", text: "Naturally white and hypoallergenic, platinum is the choice for sensitive skin." },
                { title: "The Allure of Gold", text: "Available in Yellow, White, and Rose, gold offers classic warmth and versatility." }
            ]
        }
    }

    const currentGuide = guides[slug] || {
        hero: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
        tag: "In-Depth Guide",
        intro: "Our comprehensive guide to everything you need to know about " + displayTitle.toLowerCase() + ".",
        sections: [
            { title: "The Quality Standard", text: "Understand the core components that determine the value and beauty of " + displayTitle.toLowerCase() + "." },
            { title: "Ethical Considerations", text: "How Ritzin ensures every piece meets our rigorous standards of transparency and fairness." },
            { title: "Care & Maintenance", text: "Keep your piece looking its best for a lifetime with our expert cleaning and storage tips." }
        ]
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Magazine Header */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24 border-b border-gray-100">
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12">
                    <Link href="/" className="hover:text-[#163E3E]">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/guides/diamond" className="hover:text-[#163E3E]">Education</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900">{displayTitle}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-24 items-end">
                    <div className="space-y-8">
                        <p className="text-[#163E3E] text-[10px] font-bold uppercase tracking-[0.4em]">{currentGuide.tag}</p>
                        <h1 className="font-serif text-5xl md:text-8xl text-gray-900 leading-[1.1]">{displayTitle}</h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">{currentGuide.intro}</p>
                    </div>
                    <div className="text-gray-400 flex flex-col gap-4 text-xs tracking-widest uppercase font-bold text-right hidden lg:flex">
                        <div className="flex items-center justify-end gap-3"><BookOpen className="w-4 h-4" /> 12 MIN READ</div>
                        <div className="flex items-center justify-end gap-3"><Star className="w-4 h-4 fill-gray-100" /> EXPERT VERIFIED</div>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="relative aspect-video rounded-sm overflow-hidden group">
                    <Image
                        src={currentGuide.hero}
                        alt={displayTitle}
                        fill
                        className="object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-x-12 bottom-12 hidden md:block">
                        <div className="bg-white/90 backdrop-blur-md p-10 max-w-lg shadow-2xl">
                            <Sparkles className="w-8 h-8 text-[#163E3E] mb-4" />
                            <p className="font-serif text-2xl italic text-gray-900 leading-relaxed border-l-2 border-[#163E3E] pl-6">"Every diamond tells a story. At Ritzin, we make sure it's a story of integrity and brilliance."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-6 py-24 space-y-24">
                {currentGuide.sections.map((section: any, i: number) => (
                    <section key={i} className="space-y-8 animate-fade-in group">
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-bold border-b-2 border-[#163E3E] text-[#163E3E]">0{i + 1}</span>
                            <h2 className="font-serif text-3xl md:text-5xl text-gray-900">{section.title}</h2>
                        </div>
                        <p className="text-xl text-gray-600 font-light leading-relaxed">
                            {section.text}
                        </p>
                    </section>
                ))}

                {/* Expert Tip Callout */}
                <div className="bg-[#163E3E]/5 p-12 md:p-20 rounded-sm border-l-[6px] border-[#163E3E] space-y-6">
                    <div className="flex items-center gap-4 text-[#163E3E]">
                        <Info className="w-8 h-8" />
                        <h4 className="font-bold uppercase tracking-widest text-xs">Diamond Specialist Tip</h4>
                    </div>
                    <p className="text-xl text-gray-700 italic font-serif leading-relaxed">
                        "If you're unsure between two options, focus on the Cut quality. A perfectly cut diamond will always appear larger and more brilliant than its counterpart with a higher color grade."
                    </p>
                </div>
            </div>

            {/* Shop CTA */}
            <div className="bg-[#163E3E] py-32 text-center text-white">
                <div className="max-w-3xl mx-auto px-6 space-y-12">
                    <h3 className="font-serif text-4xl md:text-6xl font-light">Ready to choose yours?</h3>
                    <p className="text-xl opacity-70 font-light max-w-xl mx-auto">Explore our collection of ethically sourced gems and start designing your legacy today.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/design/diamond" className="bg-white text-[#163E3E] px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-black hover:text-white transition-all shadow-2xl">Start Case Study</Link>
                        <Link href="/diamonds" className="border border-white/30 text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all">Shop Diamonds</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

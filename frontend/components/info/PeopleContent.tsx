"use client"

import { Users, Layout, Palette, Heart } from "lucide-react"

export const PeopleContent = () => {
    return (
        <div className="space-y-32 -mt-12">
            {/* Mission Hero */}
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10">
                    <h2 className="font-serif text-5xl md:text-7xl text-gray-900 leading-[1.05]">The Team <br /> Behind the Sparkle.</h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                        At Ritzin, we are powered by a team of passionate, creative, and dedicated individuals who are committed to our mission of redefining luxury.
                    </p>
                    <div className="flex flex-wrap gap-8">
                        <div>
                            <p className="text-4xl font-serif text-[#163E3E]">500+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Team Members</p>
                        </div>
                        <div>
                            <p className="text-4xl font-serif text-[#163E3E]">72%</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Women in Leadership</p>
                        </div>
                        <div>
                            <p className="text-4xl font-serif text-[#163E3E]">30+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Showrooms</p>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Department Grid */}
            <div className="space-y-20 px-6">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                    <h3 className="font-serif text-4xl">Diverse Talents, One Goal</h3>
                    <p className="text-gray-500 leading-relaxed font-light">From jewelry designers to tech innovators, our team brings together experts from all fields to create a unique luxury experience.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
                    {[
                        { icon: <Palette className="w-8 h-8" />, name: "Design & Creative", desc: "Crafting the unique silhouettes and styles that define Ritzin." },
                        { icon: <Layout className="w-8 h-8" />, name: "Tech & Innovation", desc: "Building the industry-leading digital tools for ring design." },
                        { icon: <Heart className="w-8 h-8" />, name: "Customer Experience", desc: "Providing expert guidance to our customers around the world." },
                        { icon: <Users className="w-8 h-8" />, name: "Ethics & Compliance", desc: "Ensuring our sourcing standards are rigorously maintained." }
                    ].map((dept, i) => (
                        <div key={i} className="bg-white p-12 space-y-6 hover:bg-gray-50 transition-colors">
                            <div className="text-[#163E3E] opacity-40">{dept.icon}</div>
                            <h4 className="font-serif text-2xl">{dept.name}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{dept.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Diversity Banner */}
            <div className="bg-[#163E3E] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-32 text-center text-white">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h3 className="font-serif text-5xl md:text-7xl">Inclusion is our Strength.</h3>
                    <p className="text-2xl opacity-80 font-light leading-relaxed">
                        We believe that our diversity of backgrounds, perspectives, and experiences is what allows us to innovate and grow. Ritzin is committed to creating an environment where everyone feels valued and empowered.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
                        className="w-full rounded-sm opacity-90 brightness-110"
                    />
                </div>
            </div>
        </div>
    )
}

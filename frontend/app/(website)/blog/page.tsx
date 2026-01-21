"use client"

import { Search, ChevronRight, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import { BLOG_POSTS } from "@/lib/blog-data"

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0]
    const gridPosts = BLOG_POSTS.slice(1)

    return (
        <main className="bg-white min-h-screen">
            {/* Magazine Header */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">The Ritzin Journal</p>
                <h1 className="font-serif text-5xl md:text-8xl text-gray-900 leading-tight">Art, Innovation <br /> & Ethical Luxury.</h1>
            </div>

            {/* Featured Post */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Link href={`/blog/${featuredPost.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-sm group cursor-pointer">
                        <img
                            src={featuredPost.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                            alt={featuredPost.title}
                        />
                    </Link>
                    <div className="space-y-8">
                        <p className="text-[#163E3E] text-[10px] font-bold uppercase tracking-[0.2em]">{featuredPost.cat} • {featuredPost.date}</p>
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight hover:text-[#163E3E] transition-colors cursor-pointer line-clamp-2">{featuredPost.title}</h2>
                        </Link>
                        <p className="text-xl text-gray-500 font-light leading-relaxed line-clamp-3">
                            {featuredPost.excerpt}
                        </p>
                        <Link href={`/blog/${featuredPost.slug}`} className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-900 hover:gap-6 transition-all">
                            Read the Story <ArrowRight className="w-5 h-5 text-[#163E3E]" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Newsletter Interstitial */}
            <div className="bg-[#F9F9F9] py-24 my-12 hidden md:block">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-12">
                    <div className="space-y-4">
                        <h3 className="font-serif text-3xl">Get the Journal in your Inbox.</h3>
                        <p className="text-gray-500 font-light">Join 50,000+ others receiving our weekly curation of trends and ethical luxury news.</p>
                    </div>
                    <div className="flex gap-4">
                        <input type="email" placeholder="Email Address" className="px-8 py-5 border border-gray-200 rounded-sm w-80 outline-none focus:border-[#163E3E]" />
                        <button className="bg-[#163E3E] text-white px-10 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-black transition-all">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Grid Posts */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                    {gridPosts.map((post, i) => (
                        <div key={i} className="group cursor-pointer space-y-8">
                            <Link href={`/blog/${post.slug}`} className="block aspect-[4/5] overflow-hidden rounded-sm relative">
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt={post.title}
                                />
                                <div className="absolute top-6 left-6">
                                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-full hover:bg-[#163E3E] hover:text-white transition-all shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{post.cat}</p>
                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className="font-serif text-2xl text-gray-900 group-hover:text-[#163E3E] transition-colors leading-tight line-clamp-3">{post.title}</h3>
                                </Link>
                                <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#163E3E] group-hover:gap-4 transition-all">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <button className="border border-gray-900 px-16 py-6 uppercase font-bold tracking-widest text-[11px] hover:bg-black hover:text-white transition-all">Load More Stories</button>
                </div>
            </div>
        </main>
    )
}

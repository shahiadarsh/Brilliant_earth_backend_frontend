"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/blog-data'
import { ArrowLeft, Share2, Heart, MessageSquare, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogDetailPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params?.slug as string

    const post = BLOG_POSTS.find(p => p.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <h1 className="font-serif text-4xl text-[#163E3E]">Story Not Found</h1>
                <Link href="/blog" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#163E3E] flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Journal
                </Link>
            </div>
        )
    }

    const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2)

    return (
        <main className="bg-white min-h-screen">
            {/* Minimal Sticky Nav */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => router.back()} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-[#163E3E] transition-colors"><Share2 className="w-4 h-4" /></button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Heart className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <article>
                <header className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
                    <p className="text-[#163E3E] text-[11px] font-bold uppercase tracking-[0.3em]">{post.cat} • {post.date}</p>
                    <h1 className="font-serif text-4xl md:text-6xl text-gray-900 leading-tight">{post.title}</h1>
                    <div className="flex items-center justify-center gap-4 py-4 border-y border-gray-50">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#163E3E] font-serif italic text-lg">{post.author[0]}</div>
                        <div className="text-left">
                            <p className="text-[12px] font-bold uppercase tracking-widest text-gray-900">{post.author}</p>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest">{post.readTime} Read</p>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Article Content */}
                <div className="max-w-2xl mx-auto px-6 pb-24">
                    <div
                        className="prose prose-lg prose-gray max-w-none font-light leading-relaxed text-gray-600 space-y-8
                        [&>h3]:font-serif [&>h3]:text-3xl [&>h3]:text-[#163E3E] [&>h3]:pt-8
                        [&>p]:text-[18px] [&>p]:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags & Engagement */}
                    <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-4">
                            {['Sustainability', 'Innovation', 'Design'].map(tag => (
                                <span key={tag} className="px-6 py-2 bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 rounded-full">#{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">
                                <MessageSquare className="w-4 h-4" /> 12 Comments
                            </button>
                            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#163E3E]">
                                <Heart className="w-4 h-4" /> 284 Like
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Shop the Look Box */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="font-serif text-4xl text-[#163E3E]">Shop the Brilliance</h2>
                        <p className="text-gray-500 font-light italic">Featured pieces and inspirations from this story.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "The Secret Halo Ring", price: "2,450", image: "/home/ring1.webp" },
                            { name: "Versailles Diamond Band", price: "1,890", image: "/home/ring2.webp" },
                            { name: "Oval Sapphire Aura", price: "3,120", image: "/home/ring3.webp" }
                        ].map((prod, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm shadow-sm group hover:shadow-xl transition-all cursor-pointer">
                                <div className="aspect-square relative overflow-hidden mb-6">
                                    <Image src={prod.image} alt={prod.name} fill className="object-contain group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <h4 className="font-serif text-xl mb-2">{prod.name}</h4>
                                <p className="text-[13px] text-gray-400 uppercase tracking-widest mb-6">From ${prod.price}</p>
                                <button className="w-full border border-gray-100 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#163E3E] hover:text-white transition-all">Explore Piece</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Stories */}
            <section className="max-w-7xl mx-auto px-6 py-32 space-y-16">
                <div className="flex justify-between items-end border-b border-gray-100 pb-8">
                    <div className="space-y-4">
                        <h2 className="font-serif text-4xl text-gray-900">Keep Reading</h2>
                        <p className="text-gray-500 font-light">More from the Ritzin Journal</p>
                    </div>
                    <Link href="/blog" className="text-[11px] font-bold uppercase tracking-widest text-[#163E3E] flex items-center gap-2 group">
                        See All Stories <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    {relatedPosts.map((rPost, i) => (
                        <Link href={`/blog/${rPost.slug}`} key={i} className="group space-y-8 block">
                            <div className="aspect-[16/9] overflow-hidden rounded-sm relative">
                                <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{rPost.cat}</p>
                                <h3 className="font-serif text-3xl text-gray-900 group-hover:text-[#163E3E] transition-colors leading-tight line-clamp-2">{rPost.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#163E3E] py-24 text-center text-white">
                <div className="max-w-3xl mx-auto px-6 space-y-12">
                    <Sparkles className="w-12 h-12 text-white/20 mx-auto" />
                    <h2 className="font-serif text-4xl md:text-5xl leading-tight">Design a ring that tells your unique story.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/design/setting" className="bg-white text-[#163E3E] px-12 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all">Start with a Setting</Link>
                        <Link href="/design/diamond" className="border border-white/30 text-white px-12 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Explore Diamonds</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

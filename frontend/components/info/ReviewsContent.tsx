"use client"

import { Star, CheckCircle, Image as ImageIcon } from "lucide-react"

export const ReviewsContent = () => {
    const reviews = [
        {
            name: "Sarah M.",
            stars: 5,
            title: "Absolutely Perfect",
            text: "The ring is more beautiful than I could have imagined. Knowing it's ethically sourced makes it even more special.",
            product: "Petite Shared Prong Engagement Ring",
            image: "https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "David K.",
            stars: 5,
            title: "Exceptional Service",
            text: "The virtual appointment was so helpful. I was nervous about buying online, but the expert guided me through everything.",
            product: "Round Brilliant Natural Diamond",
            image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=400"
        },
        {
            name: "Jessica L.",
            stars: 5,
            title: "Stunning Quality",
            text: "The sparkle is unreal. I've received so many compliments! Highly recommend Ritzin for their quality and mission.",
            product: "Waverly Diamond Ring",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400"
        }
    ]

    return (
        <div className="space-y-32 -mt-12">
            {/* Review Aggregator */}
            <div className="bg-[#F9F9F9] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 rounded-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="font-serif text-5xl md:text-7xl text-gray-900">4.9 / 5.0</h2>
                        <div className="flex gap-1 justify-center md:justify-start">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-8 h-8 fill-[#163E3E] text-[#163E3E]" />)}
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Based on 15,000+ Verified Reviews</p>
                    </div>
                    <div className="h-px w-full md:w-px md:h-32 bg-gray-200"></div>
                    <div className="flex gap-12 text-center">
                        <div>
                            <p className="text-4xl font-serif text-[#163E3E]">98%</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Recommended</p>
                        </div>
                        <div>
                            <p className="text-4xl font-serif text-[#163E3E]">10k+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Photos Shared</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Feed Section */}
            <div className="space-y-12">
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-3xl">Customer Gallery</h3>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#163E3E]">View All Gallery <ImageIcon className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square relative group overflow-hidden bg-gray-100">
                            <img
                                src={`https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400&sig=${i}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Star className="w-6 h-6 text-white fill-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="grid gap-8">
                {reviews.map((review, i) => (
                    <div key={i} className="bg-white p-12 border border-gray-100 rounded-sm flex flex-col lg:flex-row gap-16 items-start hover:border-[#163E3E]/20 transition-all">
                        <div className="lg:w-1/4 shrink-0 space-y-4 text-center lg:text-left">
                            <img src={review.image} className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 shadow-lg" />
                            <div>
                                <p className="font-bold text-gray-900">{review.name}</p>
                                <div className="flex gap-0.5 justify-center lg:justify-start mt-1">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold justify-center lg:justify-start capitalize font-sans">
                                <CheckCircle className="w-3 h-3" /> Verified Buyer
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">
                            <h4 className="font-serif text-2xl font-light text-gray-900">"{review.title}"</h4>
                            <p className="text-gray-600 text-lg leading-relaxed font-light">{review.text}</p>
                            <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Purchased: <span className="text-gray-900 italic font-normal normal-case ml-2">{review.product}</span></p>
                                <button className="text-[10px] bg-gray-100 px-4 py-2 font-bold uppercase tracking-widest hover:bg-[#163E3E] hover:text-white transition-all">Helpful? (12)</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center space-y-8 py-20">
                <h3 className="font-serif text-4xl">Share your own brilliance.</h3>
                <p className="text-gray-500 max-w-xl mx-auto">We love seeing Ritzin jewelry in the wild. Upload your photo and story to be featured in our gallery.</p>
                <button className="border border-[#163E3E] text-[#163E3E] px-16 py-5 uppercase font-bold tracking-widest text-[11px] hover:bg-[#163E3E] hover:text-white transition-all">Write a Review</button>
            </div>
        </div>
    )
}

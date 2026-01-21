import Link from "next/link"
import Image from "next/image"

export function Hero() {
    return (
        <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[600px] bg-gray-50">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/jewelry.jpg"
                    alt="Exquisite Fine Jewelry"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
                <div className="max-w-xl text-center sm:text-left mt-12 sm:mt-0">
                    <h1 className="text-white font-serif text-3xl xs:text-4xl md:text-5xl lg:text-[64px] leading-[1.1] mb-6 drop-shadow-xl">
                        Timeless Elegance <br /> for Every Moment
                    </h1>
                    <p className="text-white text-[15px] sm:text-[17px] md:text-lg font-sans mb-10 drop-shadow-lg tracking-wide font-medium max-w-[280px] xs:max-w-none mx-auto sm:mx-0">
                        From classic diamond earrings to modern statement necklaces, discover our exquisite collection of fine jewelry.
                    </p>

                    <div className="flex flex-col xs:flex-row gap-4 justify-center sm:justify-start">
                        <Link
                            href="/jewelry/new-arrivals"
                            className="bg-[#163E3E] text-white px-8 py-4 text-xs sm:text-sm font-bold tracking-widest rounded-[2px] hover:bg-[#123333] transition-all transform hover:scale-[1.02] text-center min-w-[210px] shadow-lg"
                        >
                            Shop New Arrivals
                        </Link>
                        <Link
                            href="/jewelry/all"
                            className="bg-white text-[#163E3E] px-8 py-4 text-xs sm:text-sm font-bold tracking-widest rounded-[2px] hover:bg-gray-100 transition-all transform hover:scale-[1.02] text-center min-w-[210px] shadow-lg"
                        >
                            Explore All
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

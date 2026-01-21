import { Hero } from "@/components/gemstones/Hero"
import { PopularRings } from "@/components/gemstones/PopularRings"
import { ShopByCategory } from "@/components/gemstones/ShopByCategory"
import { DesignYourOwn } from "@/components/gemstones/DesignYourOwn"
import { FeaturedCollections } from "@/components/gemstones/FeaturedCollections"
import { SignatureCollections } from "@/components/gemstones/SignatureCollections"
import { Breadcrumb } from "@/components/breadcrumb"
import { ReviewsAndEducation } from "@/components/gemstones/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/gemstones/ShowroomPromo"

export const metadata = {
  title: "Gemstone Engagement Rings | Sapphire, Emerald & Ruby Rings | Ritzin",
  description: "Discover the beauty of gemstone engagement rings. Shop our collection of sapphires, emeralds, rubies, and more in unique handcrafted settings.",
}

export default function GemstonesLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb />
      <Hero />
      <PopularRings />
      <ShopByCategory />
      <DesignYourOwn />
      <FeaturedCollections />
      <SignatureCollections />
      <ReviewsAndEducation />
      <ShowroomPromo />
    </div>
  )
}

import { Hero } from "@/components/jewelry/Hero"
import { PopularRings } from "@/components/jewelry/PopularRings"
import { ShopByCategory } from "@/components/jewelry/ShopByCategory"
import { DesignYourOwn } from "@/components/jewelry/DesignYourOwn"
import { FeaturedCollections } from "@/components/jewelry/FeaturedCollections"
import { SignatureCollections } from "@/components/jewelry/SignatureCollections"
import { Breadcrumb } from "@/components/breadcrumb"
import { ReviewsAndEducation } from "@/components/jewelry/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/jewelry/ShowroomPromo"

export const metadata = {
  title: "Fine Jewelry | Diamond Earrings, Necklaces & Bracelets | Ritzin",
  description: "Shop our collection of ethically sourced fine jewelry. Discover brilliant diamond earrings, necklaces, bracelets, and rings for every occasion.",
}

export default function JewelryLandingPage() {
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

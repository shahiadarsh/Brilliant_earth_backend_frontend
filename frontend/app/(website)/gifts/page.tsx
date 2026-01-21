import { Hero } from "@/components/gifts/Hero"
import { PopularRings } from "@/components/gifts/PopularRings"
import { ShopByCategory } from "@/components/gifts/ShopByCategory"
import { DesignYourOwn } from "@/components/gifts/DesignYourOwn"
import { FeaturedCollections } from "@/components/gifts/FeaturedCollections"
import { SignatureCollections } from "@/components/gifts/SignatureCollections"
import { Breadcrumb } from "@/components/breadcrumb"
import { ReviewsAndEducation } from "@/components/gifts/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/gifts/ShowroomPromo"

export const metadata = {
  title: "Jewelry Gifts | Anniversary, Birthday & Holiday Gifts | Ritzin",
  description: "Find the perfect jewelry gift for any occasion. Shop our curated collections of diamond earrings, necklaces, and more for anniversaries, birthdays, and milestones.",
}

export default function GiftsLandingPage() {
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

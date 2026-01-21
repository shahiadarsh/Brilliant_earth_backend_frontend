import { Hero } from "@/components/hero"
import { Breadcrumb } from "@/components/breadcrumb"
import { PopularRings } from "@/components/popular-rings"
import { ShopByCategory } from "@/components/shopbycategory"
import { DesignYourOwn } from "@/components/DesignYourOwn"
import { FeaturedCollections } from "@/components/FeaturedCollections"
import { SignatureCollections } from "@/components/SignatureCollections"
import { ReviewsAndEducation } from "@/components/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/ShowroomPromo"

export const metadata = {
  title: "Engagement Rings | Design Your Own Ring | Ritzin",
  description: "Design your own custom engagement ring. Choose from thousands of certified diamonds and unique ring settings.",
}

export default function EngagementRingsLandingPage() {
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

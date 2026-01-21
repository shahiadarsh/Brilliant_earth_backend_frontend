import { Hero } from "@/components/diamonds/Hero"
import { PopularRings } from "@/components/diamonds/PopularRings"
import { ShopByCategory } from "@/components/diamonds/ShopByCategory"
import { DesignYourOwn } from "@/components/diamonds/DesignYourOwn"
import { FeaturedCollections } from "@/components/diamonds/FeaturedCollections"
import { SignatureCollections } from "@/components/diamonds/SignatureCollections"
import { Breadcrumb } from "@/components/breadcrumb"
import { ReviewsAndEducation } from "@/components/diamonds/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/diamonds/ShowroomPromo"

export const metadata = {
  title: "Loose Diamonds | Certified Natural & Lab Grown Diamonds | Ritzin",
  description: "Explore our collection of ethically sourced natural and lab grown diamonds. Find the perfect stone for your engagement ring or piece of fine jewelry.",
}

export default function DiamondsLandingPage() {
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

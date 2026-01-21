import { Hero } from "@/components/wedding-rings/Hero"
import { PopularRings } from "@/components/wedding-rings/PopularRings"
import { ShopByCategory } from "@/components/wedding-rings/ShopByCategory"
import { DesignYourOwn } from "@/components/wedding-rings/DesignYourOwn"
import { FeaturedCollections } from "@/components/wedding-rings/FeaturedCollections"
import { SignatureCollections } from "@/components/wedding-rings/SignatureCollections"
import { Breadcrumb } from "@/components/breadcrumb"
import { ReviewsAndEducation } from "@/components/wedding-rings/ReviewsAndEducation"
import { ShowroomPromo } from "@/components/wedding-rings/ShowroomPromo"

export const metadata = {
  title: "Wedding Rings | Men's & Women's Wedding Bands | Ritzin",
  description: "Browse our collection of wedding rings and bands. Choose from classic, diamond, and unique wedding ring styles in ethical metals.",
}

export default function WeddingRingsLandingPage() {
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

import { FeaturedPromos } from "@/components/home/FeaturedPromos"
import { GetInspired } from "@/components/home/GetInspired"
import { NewYearPromos } from "@/components/home/NewYearPromos"
import { PopularEngagementRings } from "@/components/home/PopularRings"
import { AboutPagePromos } from "@/components/home/ServiceGuarantees"
import { ShopDiamondsByShape } from "@/components/home/ShopDiamondsByShape"
import { ShopJewelryByCategory } from "@/components/home/ShopJewelryByCategory"
import { TrendReport } from "@/components/home/TrendReport"

export const metadata = {
    title: "Luxury Engagement Rings, Diamonds & Fine Jewelry | Ritzin",
    description: "Shop Ritzin for ethically sourced engagement rings, wedding rings, loose diamonds, and fine jewelry. Discover our unique designs and expert craftsmanship.",
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <NewYearPromos />
            <ShopJewelryByCategory />
            <ShopDiamondsByShape />
            <PopularEngagementRings />
            <TrendReport />
            <FeaturedPromos />
            <AboutPagePromos />
            <GetInspired />
        </div>
    )
}

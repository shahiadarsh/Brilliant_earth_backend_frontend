import GemstoneTemplate from "@/components/GemstoneTemplate"

const MOISSANITE_JEWELRY = [
    {
        id: 431,
        name: "Round Moissanite Tennis Bracelet",
        price: 950,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Moissanite Jewelry",
        type: "Bracelets",
        shape: "Round",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Moissanite Jewelry", "Bracelets", "Earrings", "Necklaces"]

export default function MoissaniteJewelryPage() {
    return (
        <GemstoneTemplate
            title="Moissanite Jewelry Collection"
            description="Sparkle with brilliance with our moissanite jewelry. Discover a stunning range of ethically sourced pieces that offer unmatched fire and durability."
            products={MOISSANITE_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Moissanite"
            section="Jewelry"
        />
    )
}

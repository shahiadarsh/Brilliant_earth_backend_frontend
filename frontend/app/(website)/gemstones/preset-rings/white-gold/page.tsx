import GemstoneTemplate from "@/components/GemstoneTemplate"

const WHITE_GOLD_GEMSTONE_RINGS = [
    {
        id: 321,
        name: "Cushion Morganite 14K White Gold Ring",
        price: 1650,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "14K White Gold",
        type: "Morganite",
        shape: "Cushion",
        isBestSeller: true
    },
    {
        id: 322,
        name: "Emerald Aquamarine 14K White Gold Ring",
        price: 1950,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "14K White Gold",
        type: "Aquamarine",
        shape: "Emerald"
    }
]

const FILTER_TABS = ["14K White Gold", "Morganite", "Aquamarine"]

export default function GemstoneWhiteGoldPage() {
    return (
        <GemstoneTemplate
            title="White Gold Gemstone Rings"
            description="Our 14K white gold settings provide a sleek, modern backdrop for the stunning colors of aquamarine and morganite."
            products={WHITE_GOLD_GEMSTONE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="White Gold"
            section="Preset Rings"
        />
    )
}

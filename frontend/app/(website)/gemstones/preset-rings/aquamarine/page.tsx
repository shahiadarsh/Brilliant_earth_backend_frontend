import GemstoneTemplate from "@/components/GemstoneTemplate"

const AQUAMARINE_RINGS = [
    {
        id: 371,
        name: "Pear Aquamarine Diamond Ring",
        price: 1650,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Aquamarine",
        type: "Aquamarine",
        shape: "Pear",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Aquamarine", "Blue", "Modern"]

export default function AquamarinePresetPage() {
    return (
        <GemstoneTemplate
            title="Aquamarine Engagement Rings"
            description="Named for the sea, aquamarine's serene blue tones evoke a sense of calm and clarity. A beautiful and sophisticated choice for an engagement ring."
            products={AQUAMARINE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Aquamarine"
            section="Preset Rings"
        />
    )
}

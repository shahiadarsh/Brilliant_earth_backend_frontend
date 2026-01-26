import GemstoneTemplate from "@/components/GemstoneTemplate"

const SAPPHIRE_RINGS = [
    {
        id: 351,
        name: "Blue Sapphire Round Signature Ring",
        price: 3450,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow", "rose"],
        category: "Sapphire",
        type: "Sapphire",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 352,
        name: "Pink Sapphire Oval Halo Ring",
        price: 2980,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "14K Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "Sapphire",
        type: "Sapphire",
        shape: "Oval"
    }
]

const FILTER_TABS = ["Sapphire", "Blue", "Pink", "Yellow"]

export default function SapphirePresetPage() {
    return (
        <GemstoneTemplate
            title="Sapphire Engagement Rings"
            description="Timeless and regal, our sapphires come in a palette of extraordinary colors. From deep blues to vibrant pinks, find a sapphire as unique as your love."
            products={SAPPHIRE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Sapphire"
            section="Preset Rings"
        />
    )
}

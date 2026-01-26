import GemstoneTemplate from "@/components/GemstoneTemplate"

const AQUAMARINE_JEWELRY = [
    {
        id: 441,
        name: "Pear Aquamarine Pendant",
        price: 850,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Aquamarine Jewelry",
        type: "Necklaces",
        shape: "Pear",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Aquamarine Jewelry", "Necklaces", "Earrings"]

export default function AquamarineJewelryPage() {
    return (
        <GemstoneTemplate
            title="Aquamarine Jewelry Collection"
            description="Our aquamarine jewelry brings the serene beauty of the ocean to your collection. Discover delicate pieces featuring this stunning blue gemstone."
            products={AQUAMARINE_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Aquamarine"
            section="Jewelry"
        />
    )
}

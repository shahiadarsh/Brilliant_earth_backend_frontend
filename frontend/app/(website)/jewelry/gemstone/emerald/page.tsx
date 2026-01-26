import GemstoneTemplate from "@/components/GemstoneTemplate"

const EMERALD_JEWELRY = [
    {
        id: 411,
        name: "Emerald Cut Emerald Pendant",
        price: 1450,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "18K Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Emerald Jewelry",
        type: "Necklaces",
        shape: "Emerald",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Emerald Jewelry", "Necklaces", "Earrings"]

export default function EmeraldJewelryPage() {
    return (
        <GemstoneTemplate
            title="Emerald Jewelry Collection"
            description="Our emerald jewelry captures the lush, vibrant spirit of nature. Choose from a selection of hand-crafted pieces featuring fine emeralds."
            products={EMERALD_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Emerald"
            section="Jewelry"
        />
    )
}

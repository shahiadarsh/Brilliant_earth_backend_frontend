import GemstoneTemplate from "@/components/GemstoneTemplate"

const PEARL_JEWELRY = [
    {
        id: 451,
        name: "Akoya Cultured Pearl Stud Earrings",
        price: 450,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Pearl Jewelry",
        type: "Earrings",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 452,
        name: "Cultured Pearl Strand Necklace",
        price: 1250,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "N/A",
        metalColors: ["white"],
        category: "Pearl Jewelry",
        type: "Necklaces",
        shape: "Round"
    }
]

const FILTER_TABS = ["Pearl Jewelry", "Necklaces", "Earrings", "Bracelets"]

export default function PearlJewelryPage() {
    return (
        <GemstoneTemplate
            title="Pearl Jewelry Collection"
            description="Timeless and elegant, our pearl jewelry combines classic beauty with modern design. Explore our collection of responsibly sourced cultured pearls."
            products={PEARL_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Pearl"
            section="Jewelry"
        />
    )
}

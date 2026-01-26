import GemstoneTemplate from "@/components/GemstoneTemplate"

const RUBY_JEWELRY = [
    {
        id: 421,
        name: "Round Ruby Stud Earrings",
        price: 1150,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Ruby Jewelry",
        type: "Earrings",
        shape: "Round",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Ruby Jewelry", "Earrings", "Necklaces"]

export default function RubyJewelryPage() {
    return (
        <GemstoneTemplate
            title="Ruby Jewelry Collection"
            description="Experience the passion and brilliance of our ruby jewelry. Our rubies are chosen for their intense color and exceptional clarity."
            products={RUBY_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Ruby"
            section="Jewelry"
        />
    )
}

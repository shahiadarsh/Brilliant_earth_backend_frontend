import JewelryTemplate from "@/components/JewelryTemplate"

const TENNIS_BRACELETS = [
    {
        id: 1201,
        name: "Classic Diamond Tennis Bracelet",
        price: 2990,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Classic",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1202,
        name: "Emerald Cut Tennis Bracelet",
        price: 4590,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Modern",
        type: "Diamond"
    },
    {
        id: 1203,
        name: "Sapphire & Diamond Tennis Bracelet",
        price: 3890,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Gemstone",
        type: "Sapphire",
        isBestSeller: true
    },
    {
        id: 1204,
        name: "Delicate Diamond Tennis Bracelet",
        price: 1990,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Classic",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Tennis Bracelets", "Classic", "Modern", "Gemstone", "Diamond"]

export default function TennisBraceletsPage() {
    return (
        <JewelryTemplate
            title="Tennis Bracelets"
            description="Our tennis bracelets feature a continuous line of brilliant diamonds or gemstones, offering timeless elegance and sophisticated sparkle."
            products={TENNIS_BRACELETS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Tennis Bracelets"
            section="Shop By Style"
        />
    )
}

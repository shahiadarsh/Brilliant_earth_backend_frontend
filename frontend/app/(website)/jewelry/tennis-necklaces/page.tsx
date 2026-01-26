import JewelryTemplate from "@/components/JewelryTemplate"

const TENNIS_NECKLACES = [
    {
        id: 1701,
        name: "Graduated Diamond Tennis Necklace",
        price: 5990,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Classic",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1702,
        name: "Petite Diamond Tennis Necklace",
        price: 3890,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Modern",
        type: "Diamond"
    },
    {
        id: 1703,
        name: "Sapphire Tennis Necklace",
        price: 4990,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Gemstone",
        type: "Sapphire",
        isBestSeller: true
    },
    {
        id: 1704,
        name: "Emerald Cut Tennis Necklace",
        price: 7490,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Modern",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Tennis Necklaces", "Classic", "Modern", "Gemstone", "Diamond"]

export default function TennisNecklacesPage() {
    return (
        <JewelryTemplate
            title="Tennis Necklaces"
            description="Our tennis necklaces are designed for effortless elegance, featuring a continuous loop of brilliant stones that catch the light from every angle."
            products={TENNIS_NECKLACES}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Tennis Necklaces"
            section="Shop By Style"
        />
    )
}

import JewelryTemplate from "@/components/JewelryTemplate"

const COCKTAIL_RINGS = [
    {
        id: 1601,
        name: "Amethyst Cocktail Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "14k White Gold",
        metalColors: ["white"],
        category: "Gemstone",
        type: "Amethyst",
        isBestSeller: true
    },
    {
        id: 1602,
        name: "Aquamarine Statement Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Gemstone",
        type: "Aquamarine"
    },
    {
        id: 1603,
        name: "Morganite Halo Ring",
        price: 1590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Halo",
        type: "Morganite",
        isBestSeller: true
    },
    {
        id: 1604,
        name: "Emerald Cocktail Ring",
        price: 3290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Statement",
        type: "Emerald"
    }
]

const FILTER_TABS = ["All Cocktail Rings", "Gemstone", "Halo", "Statement"]

export default function CocktailRingsPage() {
    return (
        <JewelryTemplate
            title="Cocktail Rings"
            description="Make a statement with our bold cocktail rings. Featuring large gemstones and intricate designs, these rings are designed to be the center of attention."
            products={COCKTAIL_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Cocktail Rings"
            section="Shop By Style"
        />
    )
}

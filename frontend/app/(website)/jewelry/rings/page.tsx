import JewelryTemplate from "@/components/JewelryTemplate"

const RINGS = [
    {
        id: 601,
        name: "Diamond Stacking Ring",
        price: 590,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Stacking",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 602,
        name: "Cocktail Blue Topaz Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "14k White Gold",
        metalColors: ["white"],
        category: "Cocktail",
        type: "Gemstone"
    },
    {
        id: 603,
        name: "Signet Gold Ring",
        price: 890,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Fashion",
        type: "Gold",
        isBestSeller: true
    },
    {
        id: 604,
        name: "Promise Diamond Ring",
        price: 1190,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow"],
        category: "Promise",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Rings", "Stacking", "Cocktail", "Fashion", "Promise", "Diamond", "Gemstone"]

export default function RingsPage() {
    return (
        <JewelryTemplate
            title="Rings"
            description="Our non-engagement ring collection includes everything from minimalist stacking bands to dramatic cocktail rings and personal signet rings."
            products={RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Rings"
        />
    )
}

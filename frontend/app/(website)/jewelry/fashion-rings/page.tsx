import JewelryTemplate from "@/components/JewelryTemplate"

const FASHION_RINGS = [
    {
        id: 1501,
        name: "Signet Star Ring",
        price: 890,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Signet",
        type: "Ring",
        isBestSeller: true
    },
    {
        id: 1502,
        name: "Diamond Band Fashion Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow"],
        category: "Modern",
        type: "Diamond"
    },
    {
        id: 1503,
        name: "Braided Gold Ring",
        price: 590,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "14k Rose Gold",
        metalColors: ["rose", "yellow"],
        category: "Textured",
        type: "Gold",
        isBestSeller: true
    },
    {
        id: 1504,
        name: "Open Band Diamond Ring",
        price: 990,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Modern",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Fashion Rings", "Signet", "Modern", "Textured", "Diamond", "Gold"]

export default function FashionRingsPage() {
    return (
        <JewelryTemplate
            title="Fashion Rings"
            description="Our fashion rings combine innovative design with precious metals and stones, perfect for elevating your everyday style or marking special moments."
            products={FASHION_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Fashion Rings"
            section="Shop By Style"
        />
    )
}

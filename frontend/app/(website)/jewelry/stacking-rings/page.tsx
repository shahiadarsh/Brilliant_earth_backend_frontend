import JewelryTemplate from "@/components/JewelryTemplate"

const STACKING_RINGS = [
    {
        id: 1401,
        name: "Delicate Diamond Stacking Ring",
        price: 590,
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Diamond",
        type: "Ring",
        isBestSeller: true
    },
    {
        id: 1402,
        name: "Textured Gold Stacking Band",
        price: 390,
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400",
        metal: "14k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "Gold",
        type: "Ring"
    },
    {
        id: 1403,
        name: "Emerald Stacking Ring",
        price: 790,
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Gemstone",
        type: "Ring",
        isBestSeller: true
    },
    {
        id: 1404,
        name: "Curved Stacking Band",
        price: 450,
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Curved",
        type: "Ring"
    }
]

const FILTER_TABS = ["All Stacking Rings", "Diamond", "Gold", "Gemstone", "Curved"]

export default function StackingRingsPage() {
    return (
        <JewelryTemplate
            title="Stacking Rings"
            description="Create your own unique look with our collection of stackable rings. Mix and match metals, textures, and gemstones for a personal style statement."
            products={STACKING_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Stacking Rings"
            section="Shop By Style"
        />
    )
}

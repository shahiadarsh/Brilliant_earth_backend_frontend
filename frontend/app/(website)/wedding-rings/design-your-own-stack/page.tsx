import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const STACK_RINGS = [
    {
        id: 11,
        name: "Delicate Pavé Diamond Stacking Ring",
        price: 890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Stacking Rings",
        type: "Pavé",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 12,
        name: "Curved Diamond Stacking Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Stacking Rings",
        type: "Curved",
        shape: "Round"
    },
    {
        id: 13,
        name: "Bezel Set Diamond Stacking Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Stacking Rings",
        type: "Bezel",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 14,
        name: "Minimalist Gold Stacking Band",
        price: 590,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Stacking Rings",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 15,
        name: "Eternity Diamond Stacking Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Stacking Rings",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 16,
        name: "Vintage Inspired Stacking Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Stacking Rings",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 17,
        name: "Channel Set Diamond Stacker",
        price: 1690,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Stacking Rings",
        type: "Channel",
        shape: "Round"
    },
    {
        id: 18,
        name: "Twisted Gold Stacking Ring",
        price: 790,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Stacking Rings",
        type: "Twisted",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Stacking Rings",
    "Pavé",
    "Curved",
    "Bezel",
    "Eternity",
    "Vintage",
    "Plain"
]

export default function DesignYourOwnStackPage() {
    return (
        <WeddingRingsTemplate
            title="Design Your Own Stack"
            description="Create a personalized wedding stack with our curated collection of stackable bands. Mix and match metals, styles, and diamond settings to design your perfect combination."
            products={STACK_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Design Your Own Stack"
            section="Women's"
        />
    )
}

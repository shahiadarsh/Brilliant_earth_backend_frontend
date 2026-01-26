import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const YELLOW_GOLD_RINGS = [
    {
        id: 211,
        name: "18K Yellow Gold Shared Prong Diamond Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 212,
        name: "18K Yellow Gold Comfort Fit Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 213,
        name: "18K Yellow Gold Eternity Diamond Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 214,
        name: "18K Yellow Gold Baguette Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 215,
        name: "Classic Half Round Yellow Gold Band",
        price: 790,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 216,
        name: "18K Yellow Gold Pavé Diamond Ring",
        price: 1990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 217,
        name: "18K Yellow Gold Milgrain Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 218,
        name: "18K Yellow Gold Bezel Set Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Yellow Gold",
    "Diamond",
    "Eternity",
    "Plain",
    "Vintage"
]

export default function WomenYellowGoldRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Yellow Gold Wedding Rings for Women"
            description="Celebrate your love with the classic glow of yellow gold. Our 18k yellow gold wedding rings for women combine traditional elegance with modern craftsmanship."
            products={YELLOW_GOLD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Yellow Gold"
            section="Women's"
        />
    )
}

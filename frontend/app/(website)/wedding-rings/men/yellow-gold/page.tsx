import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_YELLOW_GOLD_RINGS = [
    {
        id: 311,
        name: "Classic Comfort Fit 18K Yellow Gold Band",
        price: 990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 312,
        name: "18K Yellow Gold Beveled Edge Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 313,
        name: "18K Yellow Gold Matte Finish Band",
        price: 1090,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Matte",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 314,
        name: "18K Yellow Gold Hammered Wedding Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Hammered",
        shape: "Round"
    },
    {
        id: 315,
        name: "18K Yellow Gold Baguette Diamond Band",
        price: 2290,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 316,
        name: "Wide Comfort Fit 18K Yellow Gold Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 317,
        name: "18K Yellow Gold Brushed & Polished Band",
        price: 1250,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 318,
        name: "18K Yellow Gold Low Profile Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Yellow Gold",
        type: "Classic",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Yellow Gold",
    "Classic",
    "Modern",
    "Matte",
    "Hammered",
    "Diamond"
]

export default function MenYellowGoldRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Yellow Gold Wedding Bands"
            description="Traditional elegance with a modern touch. Our men's 18k yellow gold wedding bands offer a timeless warmth and classic style that never fades."
            products={MENS_YELLOW_GOLD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Yellow Gold"
            section="Men's"
        />
    )
}

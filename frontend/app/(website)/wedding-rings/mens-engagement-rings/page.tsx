import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_ENGAGEMENT_RINGS = [
    {
        id: 121,
        name: "Men's Solitaire Diamond Engagement Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Engagement",
        type: "Solitaire",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 122,
        name: "Men's Three Stone Engagement Ring",
        price: 2890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Engagement",
        type: "Three Stone",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 123,
        name: "Men's Bezel Set Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Engagement",
        type: "Bezel",
        shape: "Round"
    },
    {
        id: 124,
        name: "Men's Channel Set Engagement Band",
        price: 2690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Men's Engagement",
        type: "Channel",
        shape: "Princess",
        isBestSeller: true
    },
    {
        id: 125,
        name: "Men's Tension Set Diamond Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Engagement",
        type: "Tension",
        shape: "Round"
    },
    {
        id: 126,
        name: "Men's Pavé Diamond Engagement Ring",
        price: 2390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Engagement",
        type: "Pavé",
        shape: "Round"
    },
    {
        id: 127,
        name: "Men's Modern Diamond Band",
        price: 2790,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Engagement",
        type: "Modern",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 128,
        name: "Men's Vintage Inspired Engagement Ring",
        price: 2590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Engagement",
        type: "Vintage",
        shape: "Emerald"
    }
]

const FILTER_TABS = [
    "All Men's Engagement",
    "Solitaire",
    "Three Stone",
    "Bezel",
    "Channel",
    "Pavé",
    "Modern"
]

export default function MensEngagementRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Engagement Rings"
            description="Celebrate your commitment with our collection of men's engagement rings. Featuring diamonds and premium metals, these rings are designed for the modern man who values both style and symbolism."
            products={MENS_ENGAGEMENT_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Men's Engagement Rings"
            section="Men's"
        />
    )
}

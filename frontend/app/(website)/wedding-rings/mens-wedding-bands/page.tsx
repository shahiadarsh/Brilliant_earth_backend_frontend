import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_WEDDING_BANDS = [
    {
        id: 101,
        name: "Classic Comfort Fit Men's Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Bands",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 102,
        name: "Brushed Platinum Men's Wedding Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Bands",
        type: "Brushed",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 103,
        name: "Two-Tone Men's Wedding Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Bands",
        type: "Two-Tone",
        shape: "Round"
    },
    {
        id: 104,
        name: "Polished Rose Gold Men's Band",
        price: 990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Men's Bands",
        type: "Polished",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 105,
        name: "Wide Comfort Fit Platinum Band",
        price: 1690,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Bands",
        type: "Wide",
        shape: "Round"
    },
    {
        id: 106,
        name: "Slim Profile Men's Wedding Ring",
        price: 790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Bands",
        type: "Slim",
        shape: "Round"
    },
    {
        id: 107,
        name: "Beveled Edge Men's Band",
        price: 1090,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Bands",
        type: "Beveled",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 108,
        name: "Domed Men's Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Bands",
        type: "Domed",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Men's Bands",
    "Classic",
    "Brushed",
    "Polished",
    "Two-Tone",
    "Wide",
    "Slim"
]

export default function MensWeddingBandsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Wedding Bands"
            description="Discover our collection of men's wedding bands crafted with premium metals and timeless designs. From classic comfort fit to modern styles, find the perfect band to celebrate your commitment."
            products={MENS_WEDDING_BANDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Men's Wedding Bands"
            section="Men's"
        />
    )
}

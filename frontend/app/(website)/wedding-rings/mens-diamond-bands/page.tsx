import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_DIAMOND_BANDS = [
    {
        id: 141,
        name: "Men's Channel Set Diamond Band",
        price: 2190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Bands",
        type: "Channel Set",
        shape: "Princess",
        isBestSeller: true
    },
    {
        id: 142,
        name: "Men's Pavé Diamond Wedding Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Diamond Bands",
        type: "Pavé",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 143,
        name: "Men's Bezel Set Diamond Band",
        price: 2390,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Diamond Bands",
        type: "Bezel",
        shape: "Round"
    },
    {
        id: 144,
        name: "Men's Flush Set Diamond Ring",
        price: 1690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Diamond Bands",
        type: "Flush Set",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 145,
        name: "Men's Eternity Diamond Band",
        price: 2890,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Bands",
        type: "Eternity",
        shape: "Round"
    },
    {
        id: 146,
        name: "Men's Three Diamond Band",
        price: 1990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Diamond Bands",
        type: "Three Stone",
        shape: "Round"
    },
    {
        id: 147,
        name: "Men's Baguette Diamond Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Diamond Bands",
        type: "Baguette",
        shape: "Baguette",
        isBestSeller: true
    },
    {
        id: 148,
        name: "Men's Black Diamond Band",
        price: 2690,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Bands",
        type: "Black Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Diamond Bands",
    "Channel Set",
    "Pavé",
    "Bezel",
    "Flush Set",
    "Eternity",
    "Three Stone"
]

export default function MensDiamondBandsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Diamond Wedding Bands"
            description="Add brilliance to your commitment with our men's diamond wedding bands. Featuring ethically sourced diamonds in various settings, these bands combine masculine design with elegant sparkle."
            products={MENS_DIAMOND_BANDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Diamond Bands"
            section="Men's"
        />
    )
}

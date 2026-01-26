import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MATTE_BANDS = [
    {
        id: 151,
        name: "Brushed Matte Platinum Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Matte Bands",
        type: "Brushed",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 152,
        name: "Satin Finish Men's Wedding Ring",
        price: 990,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Matte Bands",
        type: "Satin",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 153,
        name: "Matte Gold Men's Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Matte Bands",
        type: "Matte",
        shape: "Round"
    },
    {
        id: 154,
        name: "Sandblasted Finish Wedding Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Matte Bands",
        type: "Sandblasted",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 155,
        name: "Matte Two-Tone Men's Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Matte Bands",
        type: "Two-Tone",
        shape: "Round"
    },
    {
        id: 156,
        name: "Brushed Center Polished Edge Band",
        price: 1090,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Matte Bands",
        type: "Mixed Finish",
        shape: "Round"
    },
    {
        id: 157,
        name: "Matte Platinum Wide Band",
        price: 1590,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Matte Bands",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 158,
        name: "Satin Finish Comfort Fit Ring",
        price: 1190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Matte Bands",
        type: "Comfort Fit",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Matte Bands",
    "Brushed",
    "Satin",
    "Matte",
    "Sandblasted",
    "Two-Tone",
    "Mixed Finish"
]

export default function MatteBandsPage() {
    return (
        <WeddingRingsTemplate
            title="Matte Finish Men's Wedding Bands"
            description="Discover our collection of matte finish men's wedding bands. From brushed platinum to satin gold, these sophisticated bands offer a modern, understated elegance perfect for the contemporary groom."
            products={MATTE_BANDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Matte Bands"
            section="Men's"
        />
    )
}

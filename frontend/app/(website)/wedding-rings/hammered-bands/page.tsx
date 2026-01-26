import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const HAMMERED_BANDS = [
    {
        id: 161,
        name: "Hand Hammered Platinum Band",
        price: 1490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Hammered Bands",
        type: "Hand Hammered",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 162,
        name: "Hammered Gold Men's Wedding Ring",
        price: 1090,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Hammered Bands",
        type: "Hammered",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 163,
        name: "Textured Hammered White Gold Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Hammered Bands",
        type: "Textured",
        shape: "Round"
    },
    {
        id: 164,
        name: "Hammered Rose Gold Wedding Band",
        price: 990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Hammered Bands",
        type: "Hammered",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 165,
        name: "Rustic Hammered Platinum Ring",
        price: 1690,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Hammered Bands",
        type: "Rustic",
        shape: "Round"
    },
    {
        id: 166,
        name: "Hammered Two-Tone Men's Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Hammered Bands",
        type: "Two-Tone",
        shape: "Round"
    },
    {
        id: 167,
        name: "Wide Hammered Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Hammered Bands",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 168,
        name: "Hammered Comfort Fit Ring",
        price: 1190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Hammered Bands",
        type: "Comfort Fit",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Hammered Bands",
    "Hand Hammered",
    "Hammered",
    "Textured",
    "Rustic",
    "Two-Tone",
    "Wide"
]

export default function HammeredBandsPage() {
    return (
        <WeddingRingsTemplate
            title="Hammered Men's Wedding Bands"
            description="Embrace artisan craftsmanship with our hammered men's wedding bands. Each ring features unique hand-hammered textures that create a distinctive, organic look celebrating individuality."
            products={HAMMERED_BANDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Hammered Bands"
            section="Men's"
        />
    )
}

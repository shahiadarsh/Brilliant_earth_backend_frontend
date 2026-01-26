import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const ANNIVERSARY_RINGS = [
    {
        id: 61,
        name: "10th Anniversary Diamond Band",
        price: 2190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Anniversary Rings",
        type: "10 Year",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 62,
        name: "25th Anniversary Platinum Band",
        price: 3290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Anniversary Rings",
        type: "25 Year",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 63,
        name: "5th Anniversary Sapphire & Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Anniversary Rings",
        type: "5 Year",
        shape: "Round"
    },
    {
        id: 64,
        name: "50th Anniversary Gold Eternity Band",
        price: 3990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Anniversary Rings",
        type: "50 Year",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 65,
        name: "15th Anniversary Ruby & Diamond Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Anniversary Rings",
        type: "15 Year",
        shape: "Round"
    },
    {
        id: 66,
        name: "20th Anniversary Emerald Band",
        price: 2790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Anniversary Rings",
        type: "20 Year",
        shape: "Emerald"
    },
    {
        id: 67,
        name: "Custom Anniversary Diamond Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Anniversary Rings",
        type: "Custom",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 68,
        name: "Milestone Anniversary Pavé Band",
        price: 2390,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Anniversary Rings",
        type: "Milestone",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Anniversary Rings",
    "5 Year",
    "10 Year",
    "15 Year",
    "20 Year",
    "25 Year",
    "50 Year"
]

export default function AnniversaryRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Anniversary Rings"
            description="Celebrate your milestone anniversaries with our stunning collection of anniversary rings. Each ring is designed to commemorate your enduring love and commitment through the years."
            products={ANNIVERSARY_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Anniversary Rings"
            section="Women's"
        />
    )
}

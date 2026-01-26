import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const CURVED_RINGS = [
    {
        id: 71,
        name: "Curved Pavé Diamond Wedding Band",
        price: 1490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Curved Rings",
        type: "Pavé Curved",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 72,
        name: "Contoured Diamond Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Curved Rings",
        type: "Contoured",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 73,
        name: "Chevron Curved Wedding Ring",
        price: 990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Curved Rings",
        type: "Chevron",
        shape: "Round"
    },
    {
        id: 74,
        name: "Notched Curved Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Curved Rings",
        type: "Notched",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 75,
        name: "Shadow Curved Diamond Ring",
        price: 1690,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Curved Rings",
        type: "Shadow",
        shape: "Round"
    },
    {
        id: 76,
        name: "Fitted Curved Wedding Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Curved Rings",
        type: "Fitted",
        shape: "Round"
    },
    {
        id: 77,
        name: "V-Shaped Curved Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Curved Rings",
        type: "V-Shaped",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 78,
        name: "Wishbone Curved Diamond Ring",
        price: 1590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Curved Rings",
        type: "Wishbone",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Curved Rings",
    "Pavé Curved",
    "Contoured",
    "Chevron",
    "Notched",
    "Shadow",
    "V-Shaped"
]

export default function CurvedRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Curved Wedding Rings"
            description="Designed to nestle perfectly against your engagement ring, our curved wedding bands offer a seamless fit. Choose from various curved styles to complement your unique engagement ring shape."
            products={CURVED_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Curved Rings"
            section="Women's"
        />
    )
}

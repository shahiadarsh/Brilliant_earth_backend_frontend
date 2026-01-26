import JewelryTemplate from "@/components/JewelryTemplate"

const BIRTHSTONE_JEWELRY = [
    {
        id: 1101,
        name: "January - Garnet Necklace",
        price: 490,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "January",
        type: "Garnet",
        isBestSeller: true
    },
    {
        id: 1102,
        name: "May - Emerald Studs",
        price: 890,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "May",
        type: "Emerald"
    },
    {
        id: 1103,
        name: "September - Sapphire Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "September",
        type: "Sapphire",
        isBestSeller: true
    },
    {
        id: 1104,
        name: "April - Diamond Studs",
        price: 990,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "April",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Birthstones", "January", "February", "March", "April", "May", "June", "July", "August", "September"]

export default function BirthstoneJewelryPage() {
    return (
        <JewelryTemplate
            title="Birthstone Jewelry"
            description="Find a meaningful gift or personal treasure with our birthstone jewelry collection. Each piece features a beautiful gemstone representing a month of the year."
            products={BIRTHSTONE_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Birthstone"
        />
    )
}

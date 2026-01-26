import JewelryTemplate from "@/components/JewelryTemplate"

const DIAMOND_STUDS = [
    {
        id: 1301,
        name: "Four-Prong Diamond Studs",
        price: 990,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Classic",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1302,
        name: "Bezel Set Diamond Studs",
        price: 890,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Modern",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1303,
        name: "Halo Diamond Studs",
        price: 1490,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Halo",
        type: "Diamond"
    },
    {
        id: 1304,
        name: "Lab Diamond Studs",
        price: 690,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Lab Grown",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Diamond Studs", "Classic", "Modern", "Halo", "Lab Grown"]

export default function DiamondStudsPage() {
    return (
        <JewelryTemplate
            title="Diamond Studs"
            description="Diamond stud earrings are the ultimate jewelry essential. Choose from various settings and diamond types to find your perfect pair."
            products={DIAMOND_STUDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Diamond Studs"
            section="Shop By Style"
        />
    )
}

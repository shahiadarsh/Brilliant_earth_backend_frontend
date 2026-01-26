import JewelryTemplate from "@/components/JewelryTemplate"

const MENS_JEWELRY = [
    {
        id: 801,
        name: "Men's Classic Band",
        price: 990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Rings",
        type: "Band",
        isBestSeller: true
    },
    {
        id: 802,
        name: "Men's Diamond Stud",
        price: 1190,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Earrings",
        type: "Diamond"
    },
    {
        id: 803,
        name: "Men's Curb Chain",
        price: 1490,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Necklaces",
        type: "Chain",
        isBestSeller: true
    },
    {
        id: 804,
        name: "Men's Cufflinks",
        price: 590,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400",
        metal: "Sterling Silver",
        metalColors: ["white"],
        category: "Accessories",
        type: "Silver"
    }
]

const FILTER_TABS = ["All Men's", "Rings", "Earrings", "Necklaces", "Accessories", "Diamond", "Gold"]

export default function MensJewelryPage() {
    return (
        <JewelryTemplate
            title="Men's Jewelry"
            description="Explore our collection of men's jewelry, including sophisticated wedding bands, elegant necklaces, and classic accessories."
            products={MENS_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Men's"
        />
    )
}

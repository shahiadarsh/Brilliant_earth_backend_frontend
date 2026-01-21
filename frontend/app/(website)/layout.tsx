import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/context/CartContext"
import { SelectionProvider } from "@/context/SelectionContext"

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <SelectionProvider>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </SelectionProvider>
        </CartProvider>
    )
}

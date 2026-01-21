"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, Share2, Check, Truck, RotateCcw, Lock, ChevronDown } from "lucide-react"

const mockProduct = {
  id: 1,
  title: "Solitaire Round Diamond Ring",
  price: 4500,
  rating: 4.9,
  reviews: 324,
  availability: "In Stock",
  metal: "18K White Gold",
  carat: "1.5 ct",
  cut: "Excellent",
  color: "D",
  clarity: "VS1",
  certification: "GIA",
  description:
    "Timeless elegance meets modern craftsmanship in this stunning solitaire engagement ring. Our master jewelers have created a piece that showcases a beautiful round brilliant diamond in a classic white gold setting.",
  images: ["Ring View 1", "Ring View 2", "Ring View 3", "Ring View 4"],
  deliveryEstimate: "3-5 business days",
  returnPolicy: "30-day returns",
  specifications: [
    { label: "Metal", value: "18K White Gold" },
    { label: "Carat Weight (Diamond)", value: "1.5 ct" },
    { label: "Diamond Shape", value: "Round" },
    { label: "Cut Quality", value: "Excellent" },
    { label: "Color", value: "D" },
    { label: "Clarity", value: "VS1" },
    { label: "Ring Size", value: "Available 4-14" },
  ],
  details: {
    sustainability:
      "This ring features an ethically sourced diamond certified by the Kimberley Process. Our white gold is responsibly recycled from certified suppliers.",
    shipping:
      "Free overnight shipping on orders over $3,000. Insured and tracked delivery to ensure your precious piece arrives safely.",
    returns:
      "Not satisfied? Return within 30 days for a full refund or exchange. We also offer free ring sizing for up to one year after purchase.",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("7")
  const [selectedMetal, setSelectedMetal] = useState("white-gold")
  const [quantity, setQuantity] = useState(1)
  const [expandedTab, setExpandedTab] = useState("description")

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: mockProduct.id, size: selectedSize, metal: selectedMetal, quantity })
  }

  const ringSize = ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
  const metals = [
    { name: "White Gold", value: "white-gold" },
    { name: "Yellow Gold", value: "yellow-gold" },
    { name: "Rose Gold", value: "rose-gold" },
    { name: "Platinum", value: "platinum" },
  ]

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="bg-muted aspect-square rounded flex items-center justify-center overflow-hidden">
              <span className="text-muted-foreground text-lg">{mockProduct.images[selectedImage]}</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded border-2 transition-colors overflow-hidden ${selectedImage === idx ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                >
                  <div className="bg-muted w-full h-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{image}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-light mb-4">{mockProduct.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {mockProduct.rating} ({mockProduct.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="border-b border-border pb-4">
              <div className="text-3xl font-serif font-light text-primary mb-2">
                ${mockProduct.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Metal Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Metal Type</label>
              <div className="grid grid-cols-2 gap-3">
                {metals.map((metal) => (
                  <button
                    key={metal.value}
                    onClick={() => setSelectedMetal(metal.value)}
                    className={`py-3 px-4 border rounded transition-colors text-sm font-medium ${selectedMetal === metal.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary"
                      }`}
                  >
                    {metal.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Ring Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Ring Size</label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {ringSize.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-2 border rounded transition-colors text-sm font-medium ${selectedSize === size
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link href="#" className="text-primary hover:text-secondary text-sm font-medium flex items-center gap-1">
                Get Your Ring Size
              </Link>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-3 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border border-border rounded hover:bg-muted"
                >
                  −
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 border border-border rounded hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Engraving */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-medium">Add Engraving (+$50)</span>
              </label>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-4 rounded hover:opacity-80 transition-all font-serif text-lg font-light"
            >
              Add to Bag
            </button>

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Add to Wishlist</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded hover:bg-muted transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">{mockProduct.deliveryEstimate}</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">{mockProduct.returnPolicy}</p>
              </div>
              <div className="text-center">
                <Lock className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="border-t border-border pt-8">
          <div className="space-y-4">
            <TabSection
              title="Description"
              isOpen={expandedTab === "description"}
              onClick={() => setExpandedTab("description")}
            >
              <p className="text-muted-foreground leading-relaxed">{mockProduct.description}</p>
            </TabSection>

            <TabSection
              title="Diamond Specifications"
              isOpen={expandedTab === "specs"}
              onClick={() => setExpandedTab("specs")}
            >
              <div className="grid grid-cols-2 gap-4">
                {mockProduct.specifications.map((spec, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-muted-foreground font-medium">{spec.label}</p>
                    <p className="font-serif font-light text-lg">{spec.value}</p>
                  </div>
                ))}
              </div>
            </TabSection>

            <TabSection
              title="Sustainability & Ethics"
              isOpen={expandedTab === "sustainability"}
              onClick={() => setExpandedTab("sustainability")}
            >
              <p className="text-muted-foreground leading-relaxed">{mockProduct.details.sustainability}</p>
            </TabSection>

            <TabSection
              title="Shipping & Returns"
              isOpen={expandedTab === "shipping"}
              onClick={() => setExpandedTab("shipping")}
            >
              <p className="text-muted-foreground leading-relaxed">{mockProduct.details.shipping}</p>
              <p className="text-muted-foreground leading-relaxed mt-4">{mockProduct.details.returns}</p>
            </TabSection>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-serif font-light mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <Link key={idx} href="#" className="group">
                <div className="bg-muted aspect-square rounded mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Ring {idx}</span>
                </div>
                <h3 className="font-serif text-lg font-light group-hover:text-secondary">Similar Ring Style</h3>
                <p className="text-lg font-medium text-primary">$4,200</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

function TabSection({
  title,
  isOpen,
  onClick,
  children,
}: {
  title: string
  isOpen: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full py-4 px-4 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
      >
        <h3 className="font-serif text-lg font-light">{title}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
      </button>
      {isOpen && <div className="py-4 px-4">{children}</div>}
    </div>
  )
}

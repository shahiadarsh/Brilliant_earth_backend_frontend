"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown, X, Heart } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    title: "Perfect Oval Diamond Engagement Ring",
    price: 4500,
    shape: "oval",
    style: "solitaire",
    metal: "platinum",
    inStock: true,
  },
  {
    id: 2,
    title: "Hidden Halo Oval Diamond Ring",
    price: 5200,
    shape: "oval",
    style: "halo",
    metal: "white-gold",
    inStock: true,
  },
  {
    id: 3,
    title: "Vintage Cushion Cut Engagement Ring",
    price: 6800,
    shape: "cushion",
    style: "vintage",
    metal: "yellow-gold",
    inStock: true,
  },
  {
    id: 4,
    title: "Three Stone Pear Diamond Ring",
    price: 7200,
    shape: "pear",
    style: "three-stone",
    metal: "platinum",
    inStock: true,
  },
  {
    id: 5,
    title: "Emerald Cut Halo Ring",
    price: 5900,
    shape: "emerald",
    style: "halo",
    metal: "white-gold",
    inStock: true,
  },
  {
    id: 6,
    title: "Nature Inspired Round Diamond Ring",
    price: 4200,
    shape: "round",
    style: "nature-inspired",
    metal: "rose-gold",
    inStock: true,
  },
  {
    id: 7,
    title: "Pavé Solitaire Round Diamond Ring",
    price: 5100,
    shape: "round",
    style: "solitaire",
    metal: "platinum",
    inStock: false,
  },
  {
    id: 8,
    title: "Princess Cut Solitaire Ring",
    price: 4800,
    shape: "princess",
    style: "solitaire",
    metal: "white-gold",
    inStock: true,
  },
  {
    id: 9,
    title: "Bezel Set Solitaire Round Diamond",
    price: 4600,
    shape: "round",
    style: "solitaire",
    metal: "yellow-gold",
    inStock: true,
  },
  {
    id: 10,
    title: "Marquise Diamond Halo Ring",
    price: 5500,
    shape: "marquise",
    style: "halo",
    metal: "platinum",
    inStock: true,
  },
  {
    id: 11,
    title: "Radiant Cut Three Stone Ring",
    price: 6200,
    shape: "radiant",
    style: "three-stone",
    metal: "white-gold",
    inStock: true,
  },
  {
    id: 12,
    title: "Asscher Cut Nature Inspired Ring",
    price: 5400,
    shape: "asscher",
    style: "nature-inspired",
    metal: "rose-gold",
    inStock: true,
  },
]

const shapes = ["Round", "Oval", "Cushion", "Emerald", "Pear", "Princess", "Marquise", "Asscher", "Heart"]
const styles = [
  "Solitaire",
  "Halo",
  "Hidden Halo",
  "Three Stone",
  "Vintage & Antique",
  "Nature Inspired",
  "Side Stone",
  "Pavé",
]
const priceRanges = [
  { label: "Under $3,000", min: 0, max: 3000 },
  { label: "$3,000 - $5,000", min: 3000, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: Number.POSITIVE_INFINITY },
]

interface Filters {
  shapes: string[]
  styles: string[]
  priceRange: { min: number; max: number } | null
  metal: string[]
  readyToShip: boolean
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="border-b border-border pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 font-serif text-lg font-light hover:text-secondary transition-colors"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
      </button>
      {isOpen && <div className="pt-4 space-y-3">{children}</div>}
    </div>
  )
}

export default function EngagementRingsPage() {
  const [filters, setFilters] = useState<Filters>({
    shapes: [],
    styles: [],
    priceRange: null,
    metal: [],
    readyToShip: false,
  })

  const [sortBy, setSortBy] = useState("best-sellers")
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(true)

  const toggleFilter = (filterType: keyof Omit<Filters, "priceRange" | "readyToShip">, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const hasActiveFilters = Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== false
  })

  const clearFilters = () => {
    setFilters({
      shapes: [],
      styles: [],
      priceRange: null,
      metal: [],
      readyToShip: false,
    })
  }

  const filteredProducts = mockProducts.filter((product) => {
    if (filters.shapes.length > 0 && !filters.shapes.includes(product.shape)) return false
    if (filters.styles.length > 0 && !filters.styles.includes(product.style)) return false
    if (filters.priceRange && (product.price < filters.priceRange.min || product.price > filters.priceRange.max))
      return false
    if (filters.metal.length > 0 && !filters.metal.includes(product.metal)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">

      {/* Hero/Header Section */}
      <div className="bg-white border-b border-border py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-light mb-4">Engagement Rings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find the perfect engagement ring from our collection of solitaire, halo, three-stone, and vintage-inspired
            designs. Shop certified natural and lab-grown diamonds in all shapes and metals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          <div className={`w-full md:w-72 flex-shrink-0 ${filtersPanelOpen ? "block" : "hidden"} md:block`}>
            <div className="sticky top-32 space-y-6">
              <div className="flex justify-between items-center md:hidden mb-4">
                <h3 className="font-serif text-xl font-light">Filters</h3>
                <button onClick={() => setFiltersPanelOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full text-center py-2 text-primary hover:text-secondary text-sm font-medium border border-primary rounded"
                >
                  Clear All Filters
                </button>
              )}

              <FilterSection title="Price">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                      onChange={() => setFilters((prev) => ({ ...prev, priceRange: range }))}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Diamond Shape">
                {shapes.map((shape) => (
                  <label key={shape} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.shapes.includes(shape.toLowerCase())}
                      onChange={() => toggleFilter("shapes", shape.toLowerCase())}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {shape}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Ring Style">
                {styles.map((style) => (
                  <label key={style} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.styles.includes(style.toLowerCase())}
                      onChange={() => toggleFilter("styles", style.toLowerCase())}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {style}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Metal Type">
                {["Platinum", "Gold", "White Gold", "Rose Gold"].map((metal) => (
                  <label key={metal} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.metal.includes(metal.toLowerCase())}
                      onChange={() => toggleFilter("metal", metal.toLowerCase())}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {metal}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Availability">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.readyToShip}
                    onChange={() => setFilters((prev) => ({ ...prev, readyToShip: !prev.readyToShip }))}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Ready to Ship
                  </span>
                </label>
              </FilterSection>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setFiltersPanelOpen(!filtersPanelOpen)}
                className="md:hidden text-primary font-medium text-sm flex items-center gap-2 hover:text-secondary"
              >
                <ChevronDown className="w-4 h-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded bg-background text-foreground text-sm hover:border-primary transition-colors focus:outline-none"
              >
                <option value="best-sellers">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group block hover:shadow-lg transition-shadow"
                >
                  <div className="bg-muted aspect-square rounded-lg mb-4 flex items-center justify-center overflow-hidden relative group">
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">💍</div>
                        <p className="text-muted-foreground text-sm font-light">{product.title}</p>
                      </div>
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      <Heart className="w-5 h-5" />
                    </button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-light mb-3 group-hover:text-primary transition-colors text-balance leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-lg font-medium text-primary">${product.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4 text-lg">No products match your filters.</p>
                <button onClick={clearFilters} className="text-primary hover:text-secondary font-medium">
                  Clear Filters and Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Filter } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  rating: number
  image: string
  description: string
  inStock: boolean
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    rating: 4.5,
    image: "/placeholder.svg?key=wh001",
    description: "Premium wireless headphones with noise cancellation",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    rating: 4.2,
    image: "/placeholder.svg?key=sw002",
    description: "Advanced fitness tracking and smart notifications",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    category: "Home",
    price: 89.99,
    rating: 4.7,
    image: "/placeholder.svg?key=cm003",
    description: "Programmable coffee maker with thermal carafe",
    inStock: false,
  },
  {
    id: "4",
    name: "Running Shoes",
    category: "Sports",
    price: 129.99,
    rating: 4.3,
    image: "/placeholder.svg?key=rs004",
    description: "Lightweight running shoes with superior cushioning",
    inStock: true,
  },
  {
    id: "5",
    name: "Desk Lamp",
    category: "Home",
    price: 45.99,
    rating: 4.1,
    image: "/placeholder.svg?key=dl005",
    description: "Adjustable LED desk lamp with USB charging port",
    inStock: true,
  },
  {
    id: "6",
    name: "Yoga Mat",
    category: "Sports",
    price: 39.99,
    rating: 4.6,
    image: "/placeholder.svg?key=ym006",
    description: "Non-slip yoga mat with alignment guides",
    inStock: true,
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    rating: 4.4,
    image: "/placeholder.svg?key=bs007",
    description: "Portable waterproof speaker with 12-hour battery",
    inStock: false,
  },
  {
    id: "8",
    name: "Kitchen Scale",
    category: "Home",
    price: 29.99,
    rating: 4.0,
    image: "/placeholder.svg?key=ks008",
    description: "Digital kitchen scale with precise measurements",
    inStock: true,
  },
]

export function ProductShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState("all")

  const categories = ["all", ...Array.from(new Set(sampleProducts.map((p) => p.category)))]

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      let matchesPrice = true
      if (priceRange === "under-50") matchesPrice = product.price < 50
      else if (priceRange === "50-100") matchesPrice = product.price >= 50 && product.price <= 100
      else if (priceRange === "100-200") matchesPrice = product.price > 100 && product.price <= 200
      else if (priceRange === "over-200") matchesPrice = product.price > 200

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section id="product-showcase" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Product Showcase</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Interactive product listing with advanced filtering and sorting capabilities. Search, filter by category and
            price, and sort by various criteria.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="over-200">Over $200</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {sampleProducts.length} products
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>

                  <Button
                    className="w-full mt-3"
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "secondary"}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

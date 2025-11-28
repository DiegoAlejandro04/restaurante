"use client"

import { useState } from "react"
import useSWR from "swr"
import { ProductCard } from "@/components/product-card"
import { CategoryTabs } from "@/components/category-tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { fetcher } from "@/lib/api"
import type { Category, Product } from "@/lib/types"

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  const { data: categories, isLoading: loadingCategories } = useSWR<Category[]>("/categories", fetcher)

  const productUrl = selectedCategory ? `/products?category=${selectedCategory}` : "/products"

  const { data: products, isLoading: loadingProducts } = useSWR<Product[]>(productUrl, fetcher)

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Nuestro Menú</h1>
        <p className="text-muted-foreground">Descubre todos nuestros deliciosos platillos</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        {loadingCategories ? (
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
        ) : (
          <CategoryTabs
            categories={categories || []}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
      </div>

      {/* Products Grid */}
      {loadingProducts ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </div>
  )
}

import { Metadata } from "next";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Products | MobileHub",
  description: "Browse our wide selection of mobile accessories and gadgets",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 md:shrink-0">
          <div className="sticky top-20">
            <ProductFilters />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">All Products</h1>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
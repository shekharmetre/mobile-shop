"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { products as allProducts } from "@/lib/data";
import { useFilterStore } from "@/store/filter";

export default function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { category, subcategory, minPrice, maxPrice, searchQuery } = useFilterStore();

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by subcategory
    if (subcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === subcategory
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const productPrice = product.discountPrice || product.price;
      return productPrice >= minPrice && productPrice <= maxPrice;
    });

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [category, subcategory, minPrice, maxPrice, searchQuery]);

  // Staggered animation for grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full py-10 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No products found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </motion.div>
  );
}
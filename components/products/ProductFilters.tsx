"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { products } from "@/lib/data";
import { useFilterStore } from "@/store/filter";
import { Category } from "@/lib/types";

export default function ProductFilters() {
  const {
    category: selectedCategory,
    minPrice,
    maxPrice,
    setCategory,
    setSubcategory,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  // Extract subcategories based on selected category
  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => !selectedCategory || p.category === selectedCategory)
        .map((p) => p.subcategory)
    )
  );

  // Extract all compatibilities
  const compatibilities = Array.from(
    new Set(
      products
        .filter((p) => p.compatibility)
        .flatMap((p) => p.compatibility!) // We know compatibility exists due to the filter
    )
  );

  // Find max price for slider
  const highestPrice = Math.ceil(
    Math.max(...products.map((p) => p.price))
  );

  // State for price slider
  const [priceRange, setPriceRangeLocal] = useState([minPrice, maxPrice]);

  // Update filter store when price range slider changes
  useEffect(() => {
    setPriceRange(priceRange[0], priceRange[1]);
  }, [priceRange, setPriceRange]);

  // Reset local state when filter store is reset
  useEffect(() => {
    setPriceRangeLocal([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleCategoryClick = (category: Category) => {
    setCategory(selectedCategory === category ? null : category);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSubcategory(subcategory);
  };

  const handleResetFilters = () => {
    resetFilters();
    setPriceRangeLocal([0, highestPrice]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="outline" size="sm" onClick={handleResetFilters}>
          Reset
        </Button>
      </div>

      <Accordion type="multiple" className="w-full" defaultValue={["category", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <div key={category.slug} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={selectedCategory === category.slug}
                    onCheckedChange={() => handleCategoryClick(category.slug)}
                  />
                  <label
                    htmlFor={`category-${category.slug}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {selectedCategory && (
          <AccordionItem value="subcategory">
            <AccordionTrigger>Subcategories</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-3">
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`subcategory-${subcategory}`}
                      onCheckedChange={() => handleSubcategoryClick(subcategory)}
                    />
                    <label
                      htmlFor={`subcategory-${subcategory}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subcategory
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, highestPrice]}
                max={highestPrice}
                step={1}
                value={priceRange}
                onValueChange={setPriceRangeLocal}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{priceRange[0]}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="compatibility">
          <AccordionTrigger>Compatibility</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-3">
              {compatibilities.map((compatibility) => (
                <div
                  key={compatibility}
                  className="flex items-center space-x-2"
                >
                  <Checkbox id={`compatibility-${compatibility}`} />
                  <label
                    htmlFor={`compatibility-${compatibility}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {compatibility}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
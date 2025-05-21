"use client";

import { create } from "zustand";
import { Category } from "@/lib/types";

interface FilterState {
  category: Category | null;
  subcategory: string | null;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  setCategory: (category: Category | null) => void;
  setSubcategory: (subcategory: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: null,
  subcategory: null,
  minPrice: 0,
  maxPrice: 100,
  searchQuery: "",
  
  setCategory: (category) => set({ category }),
  setSubcategory: (subcategory) => set({ subcategory }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () => set({
    category: null,
    subcategory: null,
    minPrice: 0,
    maxPrice: 100,
    searchQuery: "",
  }),
}));
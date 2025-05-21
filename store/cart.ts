"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem, CartState } from "@/lib/types";



export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );
        
        if (existingItem) {
          const updatedItems = currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          
          set(() => ({
            items: updatedItems,
            totalItems: get().totalItems + 1,
            totalPrice: get().totalPrice + (product.discountPrice || product.price),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + (product.discountPrice || product.price),
          }));
        }
      },
      
      removeItem: (productId: string) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find(
          (item) => item.product.id === productId
        );
        
        if (!itemToRemove) return;
        
        const updatedItems = currentItems.filter(
          (item) => item.product.id !== productId
        );
        
        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice:
            state.totalPrice -
            (itemToRemove.product.discountPrice || itemToRemove.product.price) *
              itemToRemove.quantity,
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;
        
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(
          (item) => item.product.id === productId
        );
        
        if (!itemToUpdate) return;
        
        const quantityDiff = quantity - itemToUpdate.quantity;
        const updatedItems = currentItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        
        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice:
            state.totalPrice +
            (itemToUpdate.product.discountPrice || itemToUpdate.product.price) * quantityDiff,
        }));
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
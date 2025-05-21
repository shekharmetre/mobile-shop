"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/cart";
import { EmptyCart } from "@/components/cart/empty";
import { CartItems } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";


export default function CartPage() {
  const { items,  totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);



  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);


  // ₹



  // Calculate shipping based on total price
  const calculateShipping = () => {
    if (totalPrice === 0) return 0;
    return totalPrice < 50 ? 4.99 : 0;
  };

  const shipping = calculateShipping();

  // Animation variants


  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="inline-flex items-center"
          asChild
        >
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <CartItems items={items}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            clearCart={clearCart} />

          {/* Cart Summary */}
          <CartSummary  />
        </div>
      )}
    </div>
  );
}


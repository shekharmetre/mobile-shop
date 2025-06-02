'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import Cookies from 'js-cookie';
import { showToast } from "@/hooks/filtered-toast";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';

export function CartSummary() {
  const supabase = createClient()
  const { totalItems, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const pathname = usePathname();

  const calculateShipping = () => {
    if (totalPrice === 0) return 0;
    return totalPrice < 50 ? 4.99 : 0;
  };


  const shipping = calculateShipping();
  const finalTotal = totalPrice + shipping;

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      // If not logged in, redirect to login with redirect param
      if (!user || error) {
        router.push(`/login?redirect=${pathname}`);
        return; // Stop further execution
      }

      // Already logged in, only redirect if not already on /checkout
      if (pathname !== "/checkout") {
        router.push("/checkout");
      }
    } catch (err) {
      console.error('Session check failed', err);
      showToast({
        title: "Error",
        description: "Could not verify login. Please try again.",
      });
      router.push(`/login?redirect=${pathname}`);
    } finally {
      // Only stop loading if no navigation happened
      setLoading(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md sticky top-24">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <div className="text-xs text-muted-foreground">
              Free shipping on orders over ₹50
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </div>
        <Button onClick={handleCheckout} disabled={loading} className="w-full mb-3" size="lg">
          {loading ? 'Checking...' : "Proceed to Checkout"}
        </Button>
        <div className="text-center text-xs text-muted-foreground">
          Taxes calculated at checkout
        </div>
      </div>
    </motion.div>
  );
}

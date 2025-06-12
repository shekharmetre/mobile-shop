// hooks/useOrder.ts
'use client'
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useOrder() {
  return useMutation({
    mutationFn: async (txnid: string) => {
      const response = await fetch("/api/orders/txnid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnid }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch order");
      }

      return response.json();
    },
    onError: (error: Error) => {
      toast.error(error.message.includes("temporarily unavailable")
        ? "Our payment system is busy. Please check your email for confirmation."
        : "Failed to verify payment. Please contact support.");
    },
  });
}
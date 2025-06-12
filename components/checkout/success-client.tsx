'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SuccessAnimation from './success-animation';
import { showToast } from '@/hooks/filtered-toast';
import { useEffect } from 'react';
import OrderSummaryCard from './order-summary';
import { useCartStore } from '@/store/cart';

async function fetchOrderByTxnId(txnId: string) {
  const res = await axios.post('/api/orders/txnid', { txnid: txnId });
  if (!res.data.success) {
    throw new Error(res.data.message || 'Failed to fetch order');
  }
  return res.data.data;
}

export function SuccessClient({ txnId }: { txnId: string }) {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', txnId],
    queryFn: () => fetchOrderByTxnId(txnId),
    enabled: !!txnId,
    retry: false,
  });

  const clearCart = useCartStore((state)=>state.clearCart)

// ✅ Proper place to show error toast
  useEffect(() => {
    if (isError && error instanceof Error) {
      showToast({ title: 'Error', description: error.message });
    }
  }, [isError, error]);

    useEffect(() => {
    if (data) {
      clearCart();
    }
  }, [data, clearCart]);

  if (isLoading) {
    return <p className="text-gray-500 text-center mt-6">Loading order details...</p>;
  }

  if (isError && error instanceof Error) {
    return <p className="text-red-500 text-center mt-6">Error: {error.message}</p>;
  }

  if (!data) return null;


  return (
    <>
      <div className="text-center mb-8 md:mb-12 relative z-10">
        <SuccessAnimation />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Payment Successful 🎉
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          Thank you! Your order has been placed.
        </p>
      </div>

      <div className="mb-12">
        <OrderSummaryCard order={data} />
      </div> 
      
    </>
  );
}

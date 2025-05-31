'use client';
import dynamic from 'next/dynamic';
import DummyLocationSearch from "@/components/checkout/search-location";
import { Button } from "@/components/ui/button";
const LottieAnimation = dynamic(() => import('@/hooks/lotti-anime'), {
  ssr: false,
});
// import { useMutation } from '@tanstack/react-query';
// import { createRazorpayOrder } from '@/lib/api';

import { ArrowLeft, LocateFixed, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import location from "@/public/animte/location.json"
import { getCurrentLocation } from '@/hooks/get-location';

type LocationData = {
  address?: string;
  error?: string;
};

const Checkout = () => {
  const [data, setData] = useState<LocationData | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const selectedLocation = (value: string) => {
    console.log(value);
  };

  const fetchUserLocation = async () => {
    setIsFetching(true);
    try {
      const locate = await getCurrentLocation();

      if (!locate || !locate.lat || !locate.lon) {
        setData({ error: 'Location not available' });
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locate.lat}&lon=${locate.lon}`
      );

      if (!response.ok) {
        setData({ error: 'Failed to fetch address from coordinates' });
        return;
      }

      const result = await response.json();

      if (result && result.display_name) {
        setData({ address: result.display_name });
      } else {
        setData({ error: 'Address not found' });
      }
    } catch (err: any) {
      setData({ error: err.message || 'Unexpected error occurred' });
    } finally {
      setIsFetching(false);
    }
  };

  const locationData = data?.address?.split(",");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" className="inline-flex items-center" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back To Cart
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Confirm delivery location</h1>
      <div className="relative">
        <Image alt="google map" width={200} height={200} className="w-full h-96 object-cover" src="/map.png" />
        <div className="absolute -top-5 w-[80%] ml-10 shadow-lg">
          <DummyLocationSearch selectedLocation={selectedLocation} />
        </div>
        <LottieAnimation animatedData={location} className="absolute w-32 h-32 top-[30%] left-[30%]" />
        <Button onClick={fetchUserLocation} variant="outline" className="px-3 h-8 absolute bottom-4 left-[20%] flex gap-2">
          <LocateFixed color="orange" />
          <span className="text-orange-700 ">Use current location</span>
        </Button>
      </div>

      <div id="address-bar" className="mt-6">
        <h2 className="text-blue-600">DELIVERY YOUR ORDER TO</h2>
        {isFetching ? (
          <div>Fetching location…</div>
        ) : data?.error ? (
          <div className="text-red-500">Error: {data.error}</div>
        ) : data?.address ? (
          <div className="mt-5 flex justify-between">
            <div className="flex gap-2 items-start">
              <MapPin color="red" fill="pink" className="" />
              <h2 className="flex flex-col font-semibold text-2xl">
                {data.address.split(',')[0]}
                <span className="font-medium text-sm">
                  {data.address.split(',').slice(1, 4).join(', ')}
                </span>
              </h2>
            </div>
            <Button variant="link" className="underline text-orange-500">CHANGE</Button>
          </div>
        ) : (
          <div>No location data found.</div>
        )}
      </div>

      {/* <CheckoutButton amount={5000} /> */}
    </div>
  );
};

export default Checkout;
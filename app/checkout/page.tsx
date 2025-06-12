'use client';

import dynamic from 'next/dynamic';
import DummyLocationSearch from "@/components/checkout/search-location";
import { Button } from "@/components/ui/button";
const LottieAnimation = dynamic(() => import('@/hooks/lotti-anime'), { ssr: false });

import { ArrowLeft, LocateFixed, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { lazy, useEffect, useState } from "react";
import location from "@/public/animte/location.json"
import { getCurrentLocation } from '@/hooks/get-location';
import { useUniversalModal } from '@/hooks/universal-popup';
import { getAddressFromCoordinates } from '@/hooks/use-location';
import { FormLocationData, LocationData } from '@/lib/types';
import ManualAddressForm from '@/components/modals/add-location-form';
const PaymentOptions = lazy(() => import('@/components/modals/payment-option'));

const Checkout = () => {
  const [data, setData] = useState<LocationData | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [userData, setUserData] = useState<FormLocationData>()
  const { openModal, closeModal } = useUniversalModal();
  const { openModal: manualForm, closeModal: closeManualForm } = useUniversalModal();

  useEffect(() => {
    const savedLocation = localStorage.getItem('currentLocation');
    if (savedLocation) {
      const parsedLocation: LocationData = JSON.parse(savedLocation);
      setData(parsedLocation); // or use it however you need
    }
  }, []);

  const selectedLocation = (value: LocationData) => {
    setData(value);
  };

  const detectCurrentLocation = async () => {
    setIsFetching(true);
    setLocationError('');

    try {
      const coordinates = await getCurrentLocation();
      const address = await getAddressFromCoordinates(coordinates.lat, coordinates.lon);

      const locationData: LocationData = {
        address,
        lat: coordinates.lat,
        lon: coordinates.lon,
        type: 'current'
      };

      // Save to localStorage
      localStorage.setItem('currentLocation', JSON.stringify(locationData));

      setData(locationData);
    } catch (error) {
      setLocationError('Failed to detect location');
    } finally {
      setIsFetching(false);
    }
  };


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
          <DummyLocationSearch onLocationSelected={selectedLocation} />
        </div>
        <LottieAnimation animatedData={location} className="absolute w-32 h-32 top-[30%] left-[30%]" />
        <Button
          onClick={detectCurrentLocation}
          disabled={isFetching}
          variant="outline"
          className="px-3 h-8 absolute bottom-4 left-[20%] flex gap-2"
        >
          <LocateFixed color="orange" />
          <span className="text-orange-700">Use current location</span>
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div id="address-bar" className="mt-6 w-full">
          <h2 className="text-blue-600">DELIVERY YOUR ORDER TO</h2>
          {isFetching ? (
            <div>Fetching location…</div>
          ) : locationError ? (
            <div className="text-red-500">Error: {locationError}</div>
          ) : data?.address ? (
            <div className="mt-5 flex gap-3 justify-between w-full">
              <div className="flex gap-3 w-full items-start  p-4 rounded-lg shadow-sm">
                <MapPin color="red" fill="pink" className="mt-1" />

                <div className="flex flex-col">
                  {/* Main address */}
                  <h2 className="font-semibold text-lg text-gray-900">
                    {data.address.split(',')[0]}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {data.address.split(',').slice(1).join(', ')}
                  </p>
                  {userData && <div className="mt-2 text-sm text-gray-700 space-y-1">
                    {userData?.receiverName && (
                      <p>
                        <span className="font-medium text-gray-800">Receiver:</span> {userData?.receiverName}
                      </p>
                    )}
                    {userData?.receiverPhone && (
                      <p>
                        <span className="font-medium text-gray-800">Phone:</span> {userData?.receiverPhone}
                      </p>
                    )}
                    {userData?.addressType && (
                      <p>
                        <span className="font-medium text-gray-800">Type:</span> {userData?.addressType}
                      </p>
                    )}
                    {userData?.landmark && (
                      <p>
                        <span className="font-medium text-gray-800">Landmark:</span> {userData?.landmark}
                      </p>
                    )}
                    {userData?.pincode && (
                      <p>
                        <span className="font-medium text-gray-800">Pincode:</span> {userData?.pincode}
                      </p>
                    )}
                  </div>}
                  {/* Extra details */}

                </div>
              </div>

              <h4 onClick={() => manualForm(<ManualAddressForm onAddressSaved={(addreData) => setUserData(addreData)} initialAddress={data} onClose={closeManualForm} />)} className="underline cursor-pointer hover:text-blue-600 underline-offset-1 text-orange-500 font-semibold text-xl">
                Change
              </h4>
            </div>
          ) : (
            <div>No location data found.</div>
          )}
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={() => openModal(<PaymentOptions onclose={closeModal} />)}
        className="bg-blue-600 mt-5 w-full"
      >
        Proceed To Payment
      </Button>
    </div>
  );
};

export default Checkout;

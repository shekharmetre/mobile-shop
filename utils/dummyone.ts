// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// // Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// // Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

// generator client {
//   provider = "prisma-client-js"
//   output   = "../lib/generated/prisma"
// }

// datasource db {
//   provider  = "postgresql"
//   url       = env("DATABASE_URL")
//   directUrl = env("DIRECT_URL")
// }


// model User {
//   id          String   @id @default(uuid())
//   email       String   @unique
//   password    String
//   firstName   String
//   lastName    String
//   phone       String
//   address     String?
//   useLocation Boolean?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

// }

// enum Category {
//   chargers
//   cables
//   audio
//   protection
//   accessories
//   adapters
//   gaming
//   mobile
//   sim
//   powerbanks
// }

// model Product {
//   id            String   @id @default(uuid())
//   name          String
//   description   String
//   price         Float
//   discountPrice Float?
//   images        String[] // Prisma supports array types on Postgres
//   category      Category
//   subcategory   String
//   compatibility String[] @default([])
//   features      String[] @default([])
//   rating        Float
//   reviews       Int
//   inStock       Boolean
//   isNew         Boolean? @default(false)
//   isFeatured    Boolean? @default(false)
//   isLatest      Boolean? @default(false)

//   // Relations (if you want to relate to CartItem)
//   cartItems CartItem[]
// }

// model CartItem {
//   id        String  @id @default(uuid())
//   product   Product @relation(fields: [productId], references: [id])
//   productId String
//   quantity  Int
// }

// model CategoryInfo {
//   id          String   @id @default(uuid())
//   name        String
//   slug        Category @unique
//   description String
//   image       String
// }




// ---------------------------------------------------
// 'use client';
// import dynamic from 'next/dynamic';
// import DummyLocationSearch from "@/components/checkout/search-location";
// import { Button } from "@/components/ui/button";
// const LottieAnimation = dynamic(() => import('@/hooks/lotti-anime'), {
//   ssr: false,
// });
// // import { useMutation } from '@tanstack/react-query';
// // import { createRazorpayOrder } from '@/lib/api';

// import { ArrowLeft, LocateFixed, MapPin } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import location from "@/public/animte/location.json"
// import { getCurrentLocation } from '@/hooks/get-location';
// import { useCartStore } from '@/store/cart';
// import { supabse } from '@/config/supbase-client';
// import { string } from 'zod';
// import { showToast } from '@/hooks/filtered-toast';
// import { useRouter } from 'next/navigation';

// type LocationData = {
//   address?: string;
//   error?: string;
// };

// type UserSessionInfo = {
//   email: string;
//   phone: string;
// };


// const Checkout = () => {
//   const [data, setData] = useState<LocationData | null>(null);
//   const [isFetching, setIsFetching] = useState(false);
//  const [session, setSession] = useState<UserSessionInfo | null>(null);
//  const router = useRouter()

// useEffect(() => {
//   const getSession = async () => {
//     const { data , error } = await supabse.auth.getSession();
//     if (error || !data.session) {
//       console.error("Supabase session error:", error);
//       return;
//     }

//     const user = data.session.user;
//     const metadata = user.user_metadata || {};

//     setSession({
//       email: user.email || "",
//       phone: metadata.phone || "",
//     });
//   };

//   getSession();
// }, []);


//   const selectedLocation = (value: string) => {
//     console.log(value);
//   };

//   const fetchUserLocation = async () => {
//     setIsFetching(true);
//     try {
//       const locate = await getCurrentLocation();

//       if (!locate || !locate.lat || !locate.lon) {
//         setData({ error: 'Location not available' });
//         return;
//       }

//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locate.lat}&lon=${locate.lon}`
//       );

//       if (!response.ok) {
//         setData({ error: 'Failed to fetch address from coordinates' });
//         return;
//       }

//       const result = await response.json();

//       if (result && result.display_name) {
//         setData({ address: result.display_name });
//       } else {
//         setData({ error: 'Address not found' });
//       }
//     } catch (err: any) {
//       setData({ error: err.message || 'Unexpected error occurred' });
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const locationData = data?.address?.split(",");

//   const { items, totalPrice, } = useCartStore();

//   const handlePayment = async () => {
//     try {
//       if(!session?.email){
//         showToast({title:"success",description:"please go ahead to the login"})
//         setTimeout(()=>{
//             router.push("/login")
//         },50000)
//       }
//       const response = await fetch('/api/auth/payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           // Send any required data like amount, user info, etc.
//           amount: "5",
//           email: session?.email,
//           phone: session?.phone || "9999999999",
//           totalPrice,
//           productinfo: "shekhar"
//         }),
//       });

//       if (!response.ok) throw new Error('Payment initiation failed');

//       const { paymentParams } = await response.json();

//       // Create and submit PayU form dynamically
//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = "https://secure.payu.in/_payment"; // or test URL for sandbox

//       for (const key in paymentParams) {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = paymentParams[key];
//         form.appendChild(input);
//       }

//       document.body.appendChild(form);
//       form.submit();
//       console.log("successsfull u get")

//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Please try again.");
//     }
//   };


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6 flex items-center">
//         <Button variant="ghost" className="inline-flex items-center" asChild>
//           <Link href="/products">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back To Cart
//           </Link>
//         </Button>
//       </div>

//       <h1 className="text-3xl font-bold mb-8">Confirm delivery location</h1>
//       <div className="relative">
//         <Image alt="google map" width={200} height={200} className="w-full h-96 object-cover" src="/map.png" />
//         <div className="absolute -top-5 w-[80%] ml-10 shadow-lg">
//           <DummyLocationSearch selectedLocation={selectedLocation} />
//         </div>
//         <LottieAnimation animatedData={location} className="absolute w-32 h-32 top-[30%] left-[30%]" />
//         <Button onClick={fetchUserLocation} variant="outline" className="px-3 h-8 absolute bottom-4 left-[20%] flex gap-2">
//           <LocateFixed color="orange" />
//           <span className="text-orange-700 ">Use current location</span>
//         </Button>
//       </div>

//       <div id="address-bar" className="mt-6">
//         <h2 className="text-blue-600">DELIVERY YOUR ORDER TO</h2>
//         {isFetching ? (
//           <div>Fetching location…</div>
//         ) : data?.error ? (
//           <div className="text-red-500">Error: {data.error}</div>
//         ) : data?.address ? (
//           <div className="mt-5 flex justify-between">
//             <div className="flex gap-2 items-start">
//               <MapPin color="red" fill="pink" className="" />
//               <h2 className="flex flex-col font-semibold text-2xl">
//                 {data.address.split(',')[0]}
//                 <span className="font-medium text-sm">
//                   {data.address.split(',').slice(1, 4).join(', ')}
//                 </span>
//               </h2>
//             </div>
//             <Button variant="link" className="underline text-orange-500">CHANGE</Button>
//           </div>
//         ) : (
//           <div>No location data found.</div>
//         )}
//       </div>
//       <Button variant="secondary" onClick={handlePayment}  className='bg-blue-600 mt-5 w-full'>
//         Proceed To Payment
//       </Button>
//     </div>
//   );
// };

// export default Checkout;


// 'use client';

// import { Search } from 'lucide-react';
// import React, { useState } from 'react';

// const dummyLocations = [
//     'New York City',
//     'Los Angeles',
//     'Chicago',
//     'Houston',
//     'Phoenix',
//     'San Francisco',
//     'Seattle',
//     'Austin',
//     'Boston',
//     'Miami',
// ];

// export default function DummyLocationSearch({ selectedLocation }: { selectedLocation?: (value: string) => void }) {
//     const [query, setQuery] = useState('');
//     const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setQuery(value);
//         if (value.length > 0) {
//             const suggestions = dummyLocations.filter(location =>
//                 location.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredSuggestions(suggestions);
//             setShowSuggestions(true);
//         } else {
//             setShowSuggestions(false);
//         }
//     };

//     const handleSelect = (value: string) => {
//         if (value) {
//             selectedLocation?.(value)
//         }
//         console.log(value, "searwch value")
//         setQuery(value);
//         setShowSuggestions(false);
//     };

//     return (
//         <div className="relative max-w-sm w-full mx-auto mt-10">
//             <div className="relative">
//                 <Search  color='orange' width={20} className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <input
//                     type="text"
//                     className="w-full pl-10 p-2 border-2 outline-none border-orange-500  rounded-md"
//                     placeholder="Search location..."
//                     value={query}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             {showSuggestions && filteredSuggestions.length > 0 && (
//                 <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg">
//                     {filteredSuggestions.map((suggestion, index) => (
//                         <li
//                             key={index}
//                             className="p-2 hover:bg-gray-100 cursor-pointer"
//                             onClick={() => handleSelect(suggestion)}
//                         >
//                             {suggestion}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }



// import React, { useState, useEffect, useRef } from 'react';
// import { Search, MapPin, Navigation, Clock, Star, X, Plus, Edit2 } from 'lucide-react';

// interface LocationData {
//   address: string;
//   lat: number;
//   lon: number;
//   type?: 'current' | 'search' | 'saved';
//   label?: string;
//   id?: string;
// }

// interface LocationSearchProps {
//   onLocationSelected: (location: LocationData) => void;
//   currentLocation?: LocationData | null;
// }

// export default function LocationSearch({ onLocationSelected, currentLocation }: LocationSearchProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<LocationData[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);
//   const [savedAddresses, setSavedAddresses] = useState<LocationData[]>([]);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<LocationData | null>(null);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const debounceRef = useRef<NodeJS.Timeout>();

//   // Load saved data from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('savedAddresses');
//     const recent = localStorage.getItem('recentSearches');
    
//     if (saved) {
//       setSavedAddresses(JSON.parse(saved));
//     }
//     if (recent) {
//       setRecentSearches(JSON.parse(recent));
//     }
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     if (searchQuery.length > 2) {
//       debounceRef.current = setTimeout(() => {
//         performSearch(searchQuery);
//       }, 300);
//     } else {
//       setSearchResults([]);
//       setShowResults(false);
//     }

//     return () => {
//       if (debounceRef.current) {
//         clearTimeout(debounceRef.current);
//       }
//     };
//   }, [searchQuery]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const performSearch = async (query: string) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`
//       );
      
//       if (response.ok) {
//         const results = await response.json();
//         const formattedResults: LocationData[] = results.map((result: any) => ({
//           address: result.display_name,
//           lat: parseFloat(result.lat),
//           lon: parseFloat(result.lon),
//           type: 'search'
//         }));
        
//         setSearchResults(formattedResults);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search failed:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleLocationSelect = (location: LocationData) => {
//     // Add to recent searches
//     const updatedRecent = [location, ...recentSearches.filter(r => r.address !== location.address)].slice(0, 5);
//     setRecentSearches(updatedRecent);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    
//     setSearchQuery('');
//     setShowResults(false);
//     onLocationSelected(location);
//   };

//   const saveAddress = (addressData: { label: string; address: string; lat: number; lon: number }) => {
//     const newAddress: LocationData = {
//       ...addressData,
//       type: 'saved',
//       id: Date.now().toString()
//     };
    
//     let updatedAddresses;
//     if (editingAddress) {
//       updatedAddresses = savedAddresses.map(addr => 
//         addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
//       );
//     } else {
//       updatedAddresses = [...savedAddresses, newAddress];
//     }
    
//     setSavedAddresses(updatedAddresses);
//     localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
//     setShowAddressForm(false);
//     setEditingAddress(null);
//   };

//   const deleteAddress = (id: string) => {
//     const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
//     setSavedAddresses(updatedAddresses);
//     localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
//   };

//   return (
//     <div className="relative" ref={searchRef}>
//       {/* Search Input */}
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search for area, street name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onFocus={() => setShowResults(true)}
//           className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
//         />
//         <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
//         {isSearching && (
//           <div className="absolute right-4 top-4">
//             <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
//           </div>
//         )}
//       </div>

//       {/* Search Results Dropdown */}
//       {showResults && (
//         <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
//           {/* Current Location */}
//           {currentLocation && (
//             <div className="p-4 border-b border-gray-100">
//               <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Current Location</h3>
//               <button
//                 onClick={() => handleLocationSelect(currentLocation)}
//                 className="w-full flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-colors text-left"
//               >
//                 <Navigation className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-900 truncate">
//                     {currentLocation.address.split(',')[0]}
//                   </p>
//                   <p className="text-sm text-gray-500 truncate">
//                     {currentLocation.address.split(',').slice(1, 3).join(', ')}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           )}

//           {/* Saved Addresses */}
//           {savedAddresses.length > 0 && (
//             <div className="p-4 border-b border-gray-100">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Saved Addresses</h3>
//                 <button
//                   onClick={() => setShowAddressForm(true)}
//                   className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>Add New</span>
//                 </button>
//               </div>
//               <div className="space-y-1">
//                 {savedAddresses.map((address) => (saveAddress
//                   <div key={address.id} className="group flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
//                     <button
//                       onClick={() => handleLocationSelect(address)}
//                       className="flex-1 flex items-start space-x-3 text-left"
//                     >
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                         <MapPin className="w-4 h-4 text-green-600" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{address.label}</p>
//                         <p className="text-sm text-gray-500 truncate">
//                           {address.address.split(',').slice(0, 2).join(', ')}
//                         </p>
//                       </div>
//                     </button>
//                     <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
//                       <button
//                         onClick={() => {
//                           setEditingAddress(address);
//                           setShowAddressForm(true);
//                         }}
//                         className="p-1 text-gray-400 hover:text-blue-600"
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => deleteAddress(address.id!)}
//                         className="p-1 text-gray-400 hover:text-red-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Recent Searches */}
//           {recentSearches.length > 0 && searchQuery.length === 0 && (
//             <div className="p-4 border-b border-gray-100">
//               <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Recent Searches</h3>
//               <div className="space-y-1">
//                 {recentSearches.map((search, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleLocationSelect(search)}
//                     className="w-full flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
//                   >
//                     <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">
//                         {search.address.split(',')[0]}
//                       </p>
//                       <p className="text-sm text-gray-500 truncate">
//                         {search.address.split(',').slice(1, 3).join(', ')}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Search Results */}
//           {searchResults.length > 0 && (
//             <div className="p-4">
//               <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Search Results</h3>
//               <div className="space-y-1">
//                 {searchResults.map((result, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleLocationSelect(result)}
//                     className="w-full flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
//                   >
//                     <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">
//                         {result.address.split(',')[0]}
//                       </p>
//                       <p className="text-sm text-gray-500 truncate">
//                         {result.address.split(',').slice(1, 3).join(', ')}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* No Results */}
//           {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
//             <div className="p-8 text-center">
//               <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No locations found for "{searchQuery}"</p>
//               <p className="text-sm text-gray-400 mt-1">Try searching with a different term</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add/Edit Address Modal */}
//       {showAddressForm && (
//         <AddressForm
//           address={editingAddress}
//           onSave={saveAddress}
//           onClose={() => {
//             setShowAddressForm(false);
//             setEditingAddress(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// // Address Form Component
// interface AddressFormProps {
//   address?: LocationData | null;
//   onSave: (data: { label: string; address: string; lat: number; lon: number }) => void;
//   onClose: () => void;
// }

// function AddressForm({ address, onSave, onClose }: AddressFormProps) {
//   const [formData, setFormData] = useState({
//     label: address?.label || '',
//     address: address?.address || '',
//     lat: address?.lat || 0,
//     lon: address?.lon || 0
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.label && formData.address) {
//       onSave(formData);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-gray-900">
//               {address ? 'Edit Address' : 'Add New Address'}
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Address Label
//             </label>
//             <input
//               type="text"
//               value={formData.label}
//               onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
//               placeholder="e.g., Home, Office, etc."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Address
//             </label>
//             <textarea
//               value={formData.address}
//               onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
//               placeholder="Enter complete address"
//               rows={3}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div className="flex space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
//             >
//               {address ? 'Update' : 'Save'} Address
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
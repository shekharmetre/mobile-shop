'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Clock, Star, X, Plus, Edit2 } from 'lucide-react';
import { LocationData, LocationSearchProps } from '@/lib/types';


export default function LocationSearch({ onLocationSelected, currentLocation }: LocationSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<LocationData[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [recentSearches, setRecentSearches] = useState<LocationData[]>([]);
    const [savedAddresses, setSavedAddresses] = useState<LocationData[]>([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<LocationData | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>(null);

    // Load saved data from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedAddresses');
        const recent = localStorage.getItem('recentSearches');

        if (saved) {
            setSavedAddresses(JSON.parse(saved));
        }
        if (recent) {
            setRecentSearches(JSON.parse(recent));
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (searchQuery.length > 2) {
            debounceRef.current = setTimeout(() => {
                performSearch(searchQuery);
            }, 300);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`
            );

            if (response.ok) {
                const results = await response.json();
                const formattedResults: LocationData[] = results.map((result: any) => ({
                    address: result.display_name,
                    lat: parseFloat(result.lat),
                    lon: parseFloat(result.lon),
                    type: 'search'
                }));

                setSearchResults(formattedResults);
                setShowResults(true);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };


    const saveAddress = (addressData: { label?: string; address: string; lat: number; lon: number }) => {
        const newAddress: LocationData = {
            ...addressData,
            type: 'saved',
            id: Date.now().toString()
        };

        let updatedAddresses;
        if (editingAddress) {
            updatedAddresses = savedAddresses.map(addr =>
                addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr
            );
        } else {
            updatedAddresses = [...savedAddresses, newAddress];
        }

        setSavedAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        setShowAddressForm(false);
        setEditingAddress(null);
    };

    const handleLocationSelect = (location: LocationData) => {
        // Add to recent searches
        const updatedRecent = [location, ...recentSearches.filter(r => r.address !== location.address)].slice(0, 5);
        setRecentSearches(updatedRecent);
        localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

        setSearchQuery('');
        setShowResults(false);
        onLocationSelected(location);
        saveAddress({
            label: location.label,
            address: location.address,
            lat: location.lat,
            lon: location.lon
        });

    };



    const deleteAddress = (id: string) => {
        const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
        setSavedAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    };

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Input */}
            <div className='absolute top-10 w-full'>
                <Search color='orange' width={20} className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                    type="text"
                    className="w-full pl-10 p-2 border-2 outline-none border-orange-500  rounded-md"
                    placeholder="Search for area, street name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                />
                {isSearching && (
                    <div className="absolute right-4 top-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
                <div className="absolute top-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                    {/* Current Location */}
                    {currentLocation && (
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Current Location</h3>
                            <button
                                onClick={() => handleLocationSelect(currentLocation)}
                                className="w-full flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-colors text-left"
                            >
                                <Navigation className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">
                                        {currentLocation.address.split(',')[0]}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {currentLocation.address.split(',').slice(1, 3).join(', ')}
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Saved Addresses */}
                    {/* {savedAddresses.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Saved Addresses</h3>
                                <button
                                    onClick={() => setShowAddressForm(true)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add New</span>
                                </button>
                            </div>
                            <div className="space-y-1">
                                {savedAddresses.map((address) => (
                                    <div key={address.id} className="group flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                                        <button
                                            onClick={() => handleLocationSelect(address)}
                                            className="flex-1 flex items-start space-x-3 text-left"
                                        >
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{address.label}</p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {address.address.split(',').slice(0, 2).join(', ')}
                                                </p>
                                            </div>
                                        </button>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                            <button
                                                onClick={() => {
                                                    setEditingAddress(address);
                                                    setShowAddressForm(true);
                                                }}
                                                className="p-1 text-gray-400 hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteAddress(address.id!)}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && searchQuery.length === 0 && (
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Recent Searches</h3>
                            <div className="space-y-1">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleLocationSelect(search)}
                                        className="w-full flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                    >
                                        <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {search.address.split(',')[0]}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {search.address.split(',').slice(1, 3).join(', ')}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Search Results</h3>
                            <div className="space-y-1">
                                {searchResults.map((result, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleLocationSelect(result)}
                                        className="w-full flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                    >
                                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {result.address.split(',')[0]}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {result.address.split(',').slice(1, 3).join(', ')}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
                        <div className="p-8 text-center">
                            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No locations found for "{searchQuery}"</p>
                            <p className="text-sm text-gray-400 mt-1">Try searching with a different term</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

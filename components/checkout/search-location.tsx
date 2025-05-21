'use client';

import { Search } from 'lucide-react';
import React, { useState } from 'react';

const dummyLocations = [
    'New York City',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'San Francisco',
    'Seattle',
    'Austin',
    'Boston',
    'Miami',
];

export default function DummyLocationSearch({ selectedLocation }: { selectedLocation?: (value: string) => void }) {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            const suggestions = dummyLocations.filter(location =>
                location.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(suggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (value: string) => {
        if (value) {
            selectedLocation?.(value)
        }
        console.log(value, "searwch value")
        setQuery(value);
        setShowSuggestions(false);
    };

    return (
        <div className="relative max-w-sm w-full mx-auto mt-10">
            <div className="relative">
                <Search  color='orange' width={20} className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                    type="text"
                    className="w-full pl-10 p-2 border-2 outline-none border-orange-500  rounded-md"
                    placeholder="Search location..."
                    value={query}
                    onChange={handleInputChange}
                />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

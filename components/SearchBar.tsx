'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Don't search for empty queries
    if (!query.trim()) {
      return;
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      onSearch(query.trim());
    }, 400);

    // Cleanup timeout on component unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Clear debounce and search immediately
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="search" className="sr-only">
          Search Pokemon cards
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards (e.g., name:pikachu or name:charizard)"
            disabled={isLoading}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </form>
      
      {/* Search examples */}
      <div className="mt-2 text-xs text-gray-600">
        <span className="font-medium">Examples:</span>{' '}
        <button
          type="button"
          onClick={() => setQuery('name:pikachu')}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          name:pikachu
        </button>
        {', '}
        <button
          type="button"
          onClick={() => setQuery('name:"charizard ex"')}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          name:&quot;charizard ex&quot;
        </button>
        {', '}
        <button
          type="button"
          onClick={() => setQuery('name:charizard subtypes:vmax')}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          name:charizard subtypes:vmax
        </button>
      </div>
    </div>
  );
}
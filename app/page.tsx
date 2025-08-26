'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import CardGrid from '@/components/CardGrid';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { ApiResponse, SearchState } from '@/lib/types';

const CARDS_PER_CLIENT_PAGE = 24;

export default function Home() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    serverPage: 1,
    clientPage: 1,
    status: 'idle',
    error: null,
    results: [],
    hasMorePages: false
  });

  const fetchCards = useCallback(async (query: string, page: number = 1, append: boolean = false) => {
    try {
      setSearchState(prev => ({
        ...prev,
        status: 'loading',
        error: null,
        ...(append ? {} : { results: [], clientPage: 1 })
      }));

      const response = await fetch(`/api/cards?q=${encodeURIComponent(query)}&page=${page}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      setSearchState(prev => ({
        ...prev,
        status: 'success',
        results: append ? [...prev.results, ...data.data] : data.data,
        serverPage: page,
        hasMorePages: data.data.length === 250, // API returns 250 per page when there are more
        query: append ? prev.query : query
      }));

    } catch (error) {
      console.error('Search error:', error);
      setSearchState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        results: append ? prev.results : []
      }));
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (query.trim() && query !== searchState.query) {
      fetchCards(query, 1, false);
    }
  }, [searchState.query, fetchCards]);

  const handlePageChange = useCallback((newClientPage: number) => {
    const totalClientPages = Math.ceil(searchState.results.length / CARDS_PER_CLIENT_PAGE);
    
    // If user wants to go to a page we don't have data for yet
    if (newClientPage > totalClientPages && searchState.hasMorePages && searchState.status !== 'loading') {
      // Load more data from server
      fetchCards(searchState.query, searchState.serverPage + 1, true);
    } else {
      // Just update client page
      setSearchState(prev => ({
        ...prev,
        clientPage: newClientPage
      }));
    }
  }, [searchState.results.length, searchState.hasMorePages, searchState.status, searchState.query, searchState.serverPage, fetchCards]);

  // Calculate current page cards
  const startIndex = (searchState.clientPage - 1) * CARDS_PER_CLIENT_PAGE;
  const endIndex = startIndex + CARDS_PER_CLIENT_PAGE;
  const currentPageCards = searchState.results.slice(startIndex, endIndex);
  const totalClientPages = Math.ceil(searchState.results.length / CARDS_PER_CLIENT_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-between items-center mb-8">
              <div></div>
              <Link
                href="/landing"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                🌟 Landing Page ansehen
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="text-blue-600">TCG-MATES</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-gray-700">Cardscout</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover and explore Pokémon trading cards with powerful search capabilities.
              Find cards by name, type, set, and more.
            </p>
          </div>
          
          <div className="mt-10">
            <SearchBar 
              onSearch={handleSearch}
              isLoading={searchState.status === 'loading'}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        <div aria-live="polite" className="sr-only">
          {searchState.status === 'loading' && 'Searching for cards...'}
          {searchState.status === 'error' && `Error: ${searchState.error}`}
          {searchState.status === 'success' && `Found ${searchState.results.length} cards`}
        </div>

        {/* Error State */}
        {searchState.status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Search Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{searchState.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome State */}
        {searchState.status === 'idle' && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <svg
                className="w-20 h-20 mx-auto text-blue-500 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Start searching for Pokémon cards
              </h2>
              <p className="text-gray-600 mb-8">
                Use the search bar above to find cards by name, set, type, or other attributes.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-3">Search Examples:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono">name:pikachu</code>
                    <span className="text-blue-700 ml-2">- Find cards with &quot;pikachu&quot; in the name</span>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono">name:&quot;charizard ex&quot;</code>
                    <span className="text-blue-700 ml-2">- Find exact phrase matches</span>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono">name:char*</code>
                    <span className="text-blue-700 ml-2">- Use wildcards for partial matches</span>
                  </div>
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono">name:charizard subtypes:vmax</code>
                    <span className="text-blue-700 ml-2">- Combine multiple search criteria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {(searchState.status === 'success' || searchState.status === 'loading') && (
          <>
            {searchState.status === 'success' && searchState.results.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Results for &quot;{searchState.query}&quot;
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {Math.min(searchState.results.length, endIndex)} of {searchState.results.length}{searchState.hasMorePages ? '+' : ''} cards
                </p>
              </div>
            )}

            <CardGrid 
              cards={currentPageCards}
              isLoading={searchState.status === 'loading'}
            />

            {/* Pagination */}
            {searchState.status === 'success' && searchState.results.length > CARDS_PER_CLIENT_PAGE && (
              <div className="mt-8">
                <Pagination
                  currentPage={searchState.clientPage}
                  totalItems={searchState.results.length}
                  itemsPerPage={CARDS_PER_CLIENT_PAGE}
                  onPageChange={handlePageChange}
                  hasMorePages={searchState.hasMorePages}
                  isLoading={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
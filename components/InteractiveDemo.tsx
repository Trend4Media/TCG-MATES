'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface DemoCard {
  id: string;
  name: string;
  set: string;
  rarity: string;
  type: string;
  image: string;
}

export default function InteractiveDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DemoCard[]>([]);
  const [currentExample, setCurrentExample] = useState(0);

  const searchExamples = [
    { query: 'name:charizard', description: 'Suche nach Charizard Karten' },
    { query: 'name:"pikachu vmax"', description: 'Exakte Phrase für VMAX Karten' },
    { query: 'types:fire rarity:rare', description: 'Feuer-Typ mit seltener Seltenheit' },
    { query: 'set.name:"base set"', description: 'Karten aus dem Base Set' }
  ];

  const mockResults: DemoCard[] = [
    {
      id: '1',
      name: 'Charizard ex',
      set: 'Obsidian Flames',
      rarity: 'Double Rare',
      type: 'Fire',
      image: '/api/placeholder/card1'
    },
    {
      id: '2',
      name: 'Pikachu VMAX',
      set: 'Vivid Voltage',
      rarity: 'VMAX',
      type: 'Lightning',
      image: '/api/placeholder/card2'
    },
    {
      id: '3',
      name: 'Charizard VSTAR',
      set: 'Brilliant Stars',
      rarity: 'VSTAR',
      type: 'Fire',
      image: '/api/placeholder/card3'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % searchExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [searchExamples.length]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      // Try real API first, fallback to mock data
      const { searchCardsClient, getMockApiResponse } = await import('@/lib/client-api');
      
      setTimeout(async () => {
        try {
          const apiResponse = await searchCardsClient(query, 1);
          const convertedResults = apiResponse.data.slice(0, 3).map(card => ({
            id: card.id,
            name: card.name,
            set: card.set.name,
            rarity: card.rarity || 'Common',
            type: card.types?.[0] || 'Normal',
            image: card.images.small
          }));
          setResults(convertedResults);
        } catch (error) {
          // Fallback to mock data
          const filteredResults = mockResults.filter(card => 
            card.name.toLowerCase().includes(query.toLowerCase()) ||
            query.toLowerCase().includes('fire') && card.type === 'Fire' ||
            query.toLowerCase().includes('charizard') && card.name.toLowerCase().includes('charizard') ||
            query.toLowerCase().includes('pikachu') && card.name.toLowerCase().includes('pikachu')
          );
          setResults(filteredResults.length > 0 ? filteredResults : mockResults.slice(0, 2));
        }
        setIsSearching(false);
      }, 1500);
    } catch (error) {
      console.error('Demo search error:', error);
      setIsSearching(false);
    }
  };

  const handleExampleClick = (example: string) => {
    handleSearch(example);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
      >
        {/* Demo Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🎮 Live Demo - Probiere es selbst aus!
          </h3>
          <p className="text-gray-400">
            Erlebe die Macht unserer intelligenten Kartensuche in Echtzeit
          </p>
        </div>

        {/* Search Interface */}
        <div className="mb-8">
          <div className="relative">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Suche z.B. name:charizard oder types:fire..."
                className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Suchen...</span>
                  </div>
                ) : (
                  '🔍 Suchen'
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Search Examples */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm mr-2">Beispiele:</span>
            {searchExamples.map((example, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExampleClick(example.query)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  index === currentExample
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 text-blue-300'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {example.query}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="mb-8">
          <div className="bg-black/60 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 ml-4 text-sm font-mono">TCG-MATES Search Engine</span>
            </div>
            
            <div className="font-mono text-sm space-y-2">
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400"
                >
                  $ search &quot;{searchQuery}&quot;
                </motion.div>
              )}
              
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-400 flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Durchsuche 50,000+ Karten...</span>
                </motion.div>
              )}
              
              {results.length > 0 && !isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white"
                >
                  ✓ {results.length} Treffer gefunden in 0.08s
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-bold text-white mb-4">Suchergebnisse:</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {results.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                      <div className="text-4xl opacity-60">🃏</div>
                    </div>
                    <h5 className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {card.name}
                    </h5>
                    <p className="text-gray-400 text-sm mb-1">{card.set}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                        {card.rarity}
                      </span>
                      <span className="text-xs text-gray-500">{card.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-2xl hover:shadow-green-500/25"
            >
              🚀 Vollständige App öffnen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
          <p className="text-gray-400 text-sm mt-4">
            Kostenlos • Keine Registrierung erforderlich • Sofortiger Zugang
          </p>
        </div>
      </motion.div>
    </div>
  );
}
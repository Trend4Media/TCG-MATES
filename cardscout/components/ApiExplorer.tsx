'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ApiExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('basic');

  const apiFeatures = {
    basic: {
      title: 'Grunddaten',
      icon: '📋',
      items: [
        { field: 'id', description: 'Eindeutige Karten-ID', example: 'xy1-1' },
        { field: 'name', description: 'Kartenname', example: 'Pikachu' },
        { field: 'supertype', description: 'Haupttyp (Pokémon, Trainer, Energy)', example: 'Pokémon' },
        { field: 'subtypes', description: 'Untertypen (Basic, Stage 1, VMAX, etc.)', example: ['Basic'] },
        { field: 'hp', description: 'Lebenspunkte', example: '60' },
        { field: 'types', description: 'Elementtypen', example: ['Lightning'] },
        { field: 'rarity', description: 'Seltenheit', example: 'Common' },
        { field: 'artist', description: 'Künstler', example: 'Mitsuhiro Arita' }
      ]
    },
    images: {
      title: 'Bilder & Medien',
      icon: '🖼️',
      items: [
        { field: 'images.small', description: 'Kleine Kartenansicht (245x342px)', example: 'https://images.pokemontcg.io/xy1/1.png' },
        { field: 'images.large', description: 'Große Kartenansicht (734x1024px)', example: 'https://images.pokemontcg.io/xy1/1_hires.png' },
        { field: 'set.images.symbol', description: 'Set-Symbol', example: 'https://images.pokemontcg.io/xy1/symbol.png' },
        { field: 'set.images.logo', description: 'Set-Logo', example: 'https://images.pokemontcg.io/xy1/logo.png' }
      ]
    },
    combat: {
      title: 'Kampf & Fähigkeiten',
      icon: '⚔️',
      items: [
        { field: 'abilities', description: 'Pokémon-Fähigkeiten mit Namen und Text', example: [{ name: 'Static', text: 'If this Pokémon is your Active Pokémon...' }] },
        { field: 'attacks', description: 'Attacken mit Kosten, Schaden und Effekten', example: [{ name: 'Thunder Jolt', cost: ['Lightning'], damage: '30' }] },
        { field: 'weaknesses', description: 'Schwächen gegen bestimmte Typen', example: [{ type: 'Fighting', value: '×2' }] },
        { field: 'resistances', description: 'Resistenzen gegen Schaden', example: [{ type: 'Metal', value: '-20' }] },
        { field: 'retreatCost', description: 'Kosten für Rückzug', example: ['Colorless'] },
        { field: 'convertedRetreatCost', description: 'Numerische Rückzugskosten', example: 1 }
      ]
    },
    evolution: {
      title: 'Entwicklung',
      icon: '🔄',
      items: [
        { field: 'evolvesFrom', description: 'Entwickelt sich von diesem Pokémon', example: 'Pichu' },
        { field: 'evolvesTo', description: 'Entwickelt sich zu diesen Pokémon', example: ['Raichu'] },
        { field: 'level', description: 'Pokémon-Level (bei LV.X Karten)', example: '40' },
        { field: 'nationalPokedexNumbers', description: 'Pokédex-Nummern', example: [25] }
      ]
    },
    set: {
      title: 'Set-Informationen',
      icon: '📦',
      items: [
        { field: 'set.name', description: 'Name des Sets', example: 'XY—Kalos Starter Set' },
        { field: 'set.series', description: 'Serie', example: 'XY' },
        { field: 'set.printedTotal', description: 'Gedruckte Kartenzahl', example: 39 },
        { field: 'set.total', description: 'Gesamtzahl inkl. Secret Rares', example: 39 },
        { field: 'set.releaseDate', description: 'Erscheinungsdatum', example: '2013/11/08' },
        { field: 'number', description: 'Kartennummer im Set', example: '1' },
        { field: 'set.ptcgoCode', description: 'PTCGO/PTCGL Code', example: 'KSS' }
      ]
    },
    market: {
      title: 'Marktdaten',
      icon: '💰',
      items: [
        { field: 'tcgplayer.prices', description: 'TCGPlayer Preise nach Zustand', example: { normal: { low: 0.12, mid: 0.25, high: 1.0, market: 0.18 } } },
        { field: 'cardmarket.prices', description: 'Cardmarket Preise (Europa)', example: { averageSellPrice: 0.15, lowPrice: 0.05, trendPrice: 0.12 } },
        { field: 'tcgplayer.url', description: 'Link zur TCGPlayer Seite', example: 'https://prices.pokemontcg.io/tcgplayer/xy1-1' },
        { field: 'cardmarket.url', description: 'Link zur Cardmarket Seite', example: 'https://prices.pokemontcg.io/cardmarket/xy1-1' }
      ]
    },
    legal: {
      title: 'Legalität & Regeln',
      icon: '⚖️',
      items: [
        { field: 'legalities.standard', description: 'Standard Format Legalität', example: 'Legal' },
        { field: 'legalities.expanded', description: 'Expanded Format Legalität', example: 'Legal' },
        { field: 'legalities.unlimited', description: 'Unlimited Format Legalität', example: 'Legal' },
        { field: 'rules', description: 'Spezielle Kartenregeln', example: ['Pokémon-ex rule: When Pokémon-ex is Knocked Out...'] },
        { field: 'ancientTrait', description: 'Ancient Trait (spezielle Fähigkeit)', example: { name: 'Ω Barrier', text: 'Prevent all effects...' } },
        { field: 'flavorText', description: 'Flavor Text der Karte', example: 'When several of these Pokémon gather...' }
      ]
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔍 Pokemon TCG API Explorer</h2>
        <p className="text-gray-600">Entdecke alle verfügbaren Daten der Pokemon TCG API</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.entries(apiFeatures).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === key
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">{apiFeatures[selectedCategory as keyof typeof apiFeatures].icon}</span>
          {apiFeatures[selectedCategory as keyof typeof apiFeatures].title}
        </h3>

        <div className="grid gap-4">
          {apiFeatures[selectedCategory as keyof typeof apiFeatures].items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <code className="text-sm font-mono bg-blue-50 text-blue-800 px-2 py-1 rounded">
                  {item.field}
                </code>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="bg-gray-50 rounded p-3">
                <span className="text-xs font-medium text-gray-500 mb-1 block">Beispiel:</span>
                <pre className="text-xs text-gray-700 overflow-x-auto">
                  {typeof item.example === 'string' 
                    ? item.example 
                    : JSON.stringify(item.example, null, 2)}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* API Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">📊 API Statistiken</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">50,000+</div>
            <div className="text-sm text-gray-600">Karten</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">400+</div>
            <div className="text-sm text-gray-600">Sets</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">100+</div>
            <div className="text-sm text-gray-600">Datenfelder</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">Live</div>
            <div className="text-sm text-gray-600">Marktpreise</div>
          </div>
        </div>
      </div>

      {/* Search Examples */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">🔍 Erweiterte Suchbeispiele</h4>
        <div className="space-y-2 text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono mr-2">hp:&gt;=100</code>
            <span className="text-gray-600">Karten mit 100+ HP</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono mr-2">attacks.damage:&gt;=50</code>
            <span className="text-gray-600">Attacken mit 50+ Schaden</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono mr-2">set.series:&quot;Sun &amp; Moon&quot;</code>
            <span className="text-gray-600">Alle Sun & Moon Karten</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono mr-2">rarity:&quot;Secret Rare&quot;</code>
            <span className="text-gray-600">Nur Secret Rare Karten</span>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono mr-2">tcgplayer.prices.holofoil.market:&gt;=10</code>
            <span className="text-gray-600">Holofoil Karten über $10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Card } from '@/lib/types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CardDetailModalProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardDetailModal({ card, isOpen, onClose }: CardDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{card.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {card.types?.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {type}
                    </span>
                  ))}
                  {card.subtypes?.map((subtype) => (
                    <span
                      key={subtype}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {subtype}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Card Image */}
              <div className="space-y-4">
                <div className="aspect-[3/4] relative bg-gray-100 rounded-xl overflow-hidden">
                  {!imageError ? (
                    <Image
                      src={showLargeImage ? card.images.large : card.images.small}
                      alt={`${card.name} card`}
                      fill
                      className="object-contain cursor-pointer hover:scale-105 transition-transform"
                      onError={() => setImageError(true)}
                      onClick={() => setShowLargeImage(!showLargeImage)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-6xl mb-4">🃏</div>
                        <p>Bild nicht verfügbar</p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowLargeImage(!showLargeImage)}
                  className="w-full text-sm text-blue-600 hover:text-blue-800"
                >
                  {showLargeImage ? '📱 Kleine Ansicht' : '🔍 Große Ansicht'}
                </button>
              </div>

              {/* Card Details */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Grundinformationen</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Supertyp:</span>
                      <p className="text-gray-900">{card.supertype}</p>
                    </div>
                    {card.hp && (
                      <div>
                        <span className="font-medium text-gray-600">HP:</span>
                        <p className="text-gray-900 font-bold text-lg text-red-600">{card.hp}</p>
                      </div>
                    )}
                    {card.level && (
                      <div>
                        <span className="font-medium text-gray-600">Level:</span>
                        <p className="text-gray-900">{card.level}</p>
                      </div>
                    )}
                    {card.rarity && (
                      <div>
                        <span className="font-medium text-gray-600">Seltenheit:</span>
                        <p className="text-gray-900">{card.rarity}</p>
                      </div>
                    )}
                    {card.artist && (
                      <div>
                        <span className="font-medium text-gray-600">Künstler:</span>
                        <p className="text-gray-900">{card.artist}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Set Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Set Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Set:</span>
                      <span className="text-gray-900">{card.set.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Serie:</span>
                      <span className="text-gray-900">{card.set.series}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Nummer:</span>
                      <span className="text-gray-900">{card.number}/{card.set.printedTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Erscheinungsdatum:</span>
                      <span className="text-gray-900">{new Date(card.set.releaseDate).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>
                </div>

                {/* Evolution Chain */}
                {(card.evolvesFrom || card.evolvesTo) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Entwicklungskette</h3>
                    <div className="space-y-2">
                      {card.evolvesFrom && (
                        <div className="flex items-center text-sm">
                          <span className="text-gray-600">Entwickelt sich von:</span>
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">{card.evolvesFrom}</span>
                        </div>
                      )}
                      {card.evolvesTo && card.evolvesTo.length > 0 && (
                        <div className="flex items-center text-sm">
                          <span className="text-gray-600">Entwickelt sich zu:</span>
                          <div className="ml-2 flex flex-wrap gap-1">
                            {card.evolvesTo.map((evolution) => (
                              <span key={evolution} className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{evolution}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Abilities */}
                {card.abilities && card.abilities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Fähigkeiten</h3>
                    <div className="space-y-3">
                      {card.abilities.map((ability, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{ability.name}</h4>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{ability.type}</span>
                          </div>
                          <p className="text-sm text-gray-600">{ability.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attacks */}
                {card.attacks && card.attacks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Attacken</h3>
                    <div className="space-y-3">
                      {card.attacks.map((attack, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{attack.name}</h4>
                            {attack.damage && (
                              <span className="text-lg font-bold text-red-600">{attack.damage}</span>
                            )}
                          </div>
                          {attack.cost && attack.cost.length > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-sm font-medium text-gray-600">Kosten:</span>
                              {attack.cost.map((cost, costIndex) => (
                                <span key={costIndex} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                  {cost.charAt(0)}
                                </span>
                              ))}
                              {attack.convertedEnergyCost && (
                                <span className="text-sm text-gray-500 ml-2">({attack.convertedEnergyCost})</span>
                              )}
                            </div>
                          )}
                          {attack.text && (
                            <p className="text-sm text-gray-600">{attack.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weaknesses & Resistances */}
                {((card.weaknesses && card.weaknesses.length > 0) || (card.resistances && card.resistances.length > 0)) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Schwächen & Resistenzen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {card.weaknesses && card.weaknesses.length > 0 && (
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Schwächen</h4>
                          {card.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                              <span>{weakness.type}</span>
                              <span className="font-bold text-red-600">{weakness.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {card.resistances && card.resistances.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">Resistenzen</h4>
                          {card.resistances.map((resistance, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                              <span>{resistance.type}</span>
                              <span className="font-bold text-green-600">{resistance.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Retreat Cost */}
                {card.retreatCost && card.retreatCost.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Rückzugskosten</h3>
                    <div className="flex items-center gap-1">
                      {card.retreatCost.map((cost, index) => (
                        <span key={index} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                          {cost.charAt(0)}
                        </span>
                      ))}
                      {card.convertedRetreatCost && (
                        <span className="text-sm text-gray-500 ml-2">({card.convertedRetreatCost})</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Rules */}
                {card.rules && card.rules.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Regeln</h3>
                    <div className="space-y-2">
                      {card.rules.map((rule, index) => (
                        <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                          {rule}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavor Text */}
                {card.flavorText && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Flavor Text</h3>
                    <blockquote className="italic text-gray-600 border-l-4 border-gray-300 pl-4">
                      {card.flavorText}
                    </blockquote>
                  </div>
                )}

                {/* Legalities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legalität</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(card.legalities).map(([format, status]) => (
                      <span
                        key={format}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          status === 'Legal' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {format}: {status}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Market Prices */}
                {card.tcgplayer?.prices && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Marktpreise (TCGPlayer)</h3>
                    <div className="space-y-3">
                      {Object.entries(card.tcgplayer.prices).map(([variant, prices]) => (
                        <div key={variant} className="border border-gray-200 rounded-lg p-3">
                          <h4 className="font-medium text-gray-900 mb-2 capitalize">{variant.replace(/([A-Z])/g, ' $1')}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            {prices.low && (
                              <div>
                                <span className="text-gray-600">Niedrig:</span>
                                <span className="ml-1 font-semibold">${prices.low}</span>
                              </div>
                            )}
                            {prices.mid && (
                              <div>
                                <span className="text-gray-600">Mittel:</span>
                                <span className="ml-1 font-semibold">${prices.mid}</span>
                              </div>
                            )}
                            {prices.high && (
                              <div>
                                <span className="text-gray-600">Hoch:</span>
                                <span className="ml-1 font-semibold">${prices.high}</span>
                              </div>
                            )}
                            {prices.market && (
                              <div>
                                <span className="text-gray-600">Markt:</span>
                                <span className="ml-1 font-semibold text-green-600">${prices.market}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
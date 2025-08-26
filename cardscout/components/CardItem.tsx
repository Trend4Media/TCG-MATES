'use client';

import { Card } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';

interface CardItemProps {
  card: Card;
}

export default function CardItem({ card }: CardItemProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
      <div className="aspect-[3/4] relative bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        )}
        
        {!imageError ? (
          <Image
            src={card.images.small}
            alt={`${card.name} (${card.set.name} #${card.number})`}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-200 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.566M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-xs">Image not available</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {card.name}
        </h3>
        
        <div className="space-y-1 text-xs text-gray-600">
          <p className="truncate">
            <span className="font-medium">Set:</span> {card.set.name}
          </p>
          
          <p>
            <span className="font-medium">Number:</span> {card.number}
            {card.set.printedTotal && (
              <span className="text-gray-500">/{card.set.printedTotal}</span>
            )}
          </p>
          
          {card.rarity && (
            <p>
              <span className="font-medium">Rarity:</span> {card.rarity}
            </p>
          )}
          
          {card.types && card.types.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {card.types.map((type) => (
                <span
                  key={type}
                  className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
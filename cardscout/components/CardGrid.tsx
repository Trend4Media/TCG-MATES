'use client';

import { Card } from '@/lib/types';
import CardItem from './CardItem';

interface CardGridProps {
  cards: Card[];
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default function CardGrid({ cards, isLoading = false }: CardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cards found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search query or use different search terms.
          </p>
          <div className="text-sm text-gray-500">
            <p className="mb-1"><strong>Search examples:</strong></p>
            <ul className="space-y-1">
              <li>• <code className="bg-gray-100 px-1 rounded">name:pikachu</code></li>
              <li>• <code className="bg-gray-100 px-1 rounded">name:&quot;charizard ex&quot;</code></li>
              <li>• <code className="bg-gray-100 px-1 rounded">name:char*</code> (wildcard)</li>
              <li>• <code className="bg-gray-100 px-1 rounded">name:charizard subtypes:vmax</code></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
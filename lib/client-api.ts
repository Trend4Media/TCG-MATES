import { ApiResponse } from './types';

export class ClientApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: string
  ) {
    super(message);
    this.name = 'ClientApiError';
  }
}

// For GitHub Pages deployment, we'll use direct API calls
export async function searchCardsClient(query: string, page: number = 1): Promise<ApiResponse> {
  if (!query.trim()) {
    throw new ClientApiError('Query is required');
  }

  try {
    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&page=${page}&pageSize=250`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Note: For production, you might want to add an API key here
    // headers['X-Api-Key'] = 'your-api-key';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pokemon TCG API Error:', errorText);
      throw new ClientApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        errorText
      );
    }

    const data: ApiResponse = await response.json();
    return data;

  } catch (error) {
    if (error instanceof ClientApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ClientApiError(
      'Failed to fetch cards. Please check your connection and try again.',
      undefined,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Mock data for demo purposes when API is not available
export const mockCards = [
  {
    id: 'demo-1',
    name: 'Charizard ex',
    supertype: 'Pokémon',
    subtypes: ['Basic', 'ex'],
    hp: '180',
    types: ['Fire'],
    set: {
      id: 'demo-set',
      name: 'Obsidian Flames',
      series: 'Scarlet & Violet',
      printedTotal: 230,
      total: 230,
      legalities: { standard: 'Legal' },
      releaseDate: '2023/08/11',
      updatedAt: '2023/08/11 13:00:00',
      images: {
        symbol: '/TCG-MATES/demo-symbol.png',
        logo: '/TCG-MATES/demo-logo.png'
      }
    },
    number: '199',
    artist: 'Demo Artist',
    rarity: 'Double Rare',
    legalities: { standard: 'Legal' },
    images: {
      small: '/TCG-MATES/demo-charizard-small.jpg',
      large: '/TCG-MATES/demo-charizard-large.jpg'
    }
  },
  {
    id: 'demo-2',
    name: 'Pikachu VMAX',
    supertype: 'Pokémon',
    subtypes: ['VMAX'],
    hp: '310',
    types: ['Lightning'],
    set: {
      id: 'demo-set-2',
      name: 'Vivid Voltage',
      series: 'Sword & Shield',
      printedTotal: 185,
      total: 185,
      legalities: { standard: 'Legal' },
      releaseDate: '2020/11/13',
      updatedAt: '2020/11/13 13:00:00',
      images: {
        symbol: '/TCG-MATES/demo-symbol.png',
        logo: '/TCG-MATES/demo-logo.png'
      }
    },
    number: '188',
    artist: 'Demo Artist 2',
    rarity: 'VMAX',
    legalities: { standard: 'Legal' },
    images: {
      small: '/TCG-MATES/demo-pikachu-small.jpg',
      large: '/TCG-MATES/demo-pikachu-large.jpg'
    }
  }
];

export function getMockApiResponse(query: string): ApiResponse {
  const filteredCards = mockCards.filter(card => 
    card.name.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase().includes('fire') && card.types?.includes('Fire') ||
    query.toLowerCase().includes('charizard') && card.name.toLowerCase().includes('charizard') ||
    query.toLowerCase().includes('pikachu') && card.name.toLowerCase().includes('pikachu') ||
    query.toLowerCase().includes('lightning') && card.types?.includes('Lightning')
  );

  return {
    data: filteredCards.length > 0 ? filteredCards : mockCards,
    page: 1,
    pageSize: 250,
    count: filteredCards.length > 0 ? filteredCards.length : mockCards.length,
    totalCount: filteredCards.length > 0 ? filteredCards.length : mockCards.length
  };
}
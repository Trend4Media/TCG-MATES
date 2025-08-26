import { ApiResponse } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function searchCards(query: string, page: number = 1): Promise<ApiResponse> {
  if (!query.trim()) {
    throw new ApiError('Query is required');
  }

  try {
    const response = await fetch(`/api/cards?q=${encodeURIComponent(query)}&page=${page}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.details
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      'Failed to fetch cards. Please check your connection and try again.',
      undefined,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export function buildSearchQuery(params: {
  name?: string;
  subtypes?: string[];
  types?: string[];
  set?: string;
  rarity?: string;
}): string {
  const queryParts: string[] = [];

  if (params.name) {
    // If name contains spaces and isn't already quoted, wrap in quotes
    const nameQuery = params.name.includes(' ') && !params.name.startsWith('"') 
      ? `"${params.name}"` 
      : params.name;
    queryParts.push(`name:${nameQuery}`);
  }

  if (params.subtypes?.length) {
    queryParts.push(...params.subtypes.map(subtype => `subtypes:${subtype}`));
  }

  if (params.types?.length) {
    queryParts.push(...params.types.map(type => `types:${type}`));
  }

  if (params.set) {
    const setQuery = params.set.includes(' ') && !params.set.startsWith('"') 
      ? `"${params.set}"` 
      : params.set;
    queryParts.push(`set.name:${setQuery}`);
  }

  if (params.rarity) {
    const rarityQuery = params.rarity.includes(' ') && !params.rarity.startsWith('"') 
      ? `"${params.rarity}"` 
      : params.rarity;
    queryParts.push(`rarity:${rarityQuery}`);
  }

  return queryParts.join(' ');
}

export const SEARCH_EXAMPLES = [
  { query: 'name:pikachu', description: 'Find cards with "pikachu" in the name' },
  { query: 'name:"charizard ex"', description: 'Find exact phrase matches' },
  { query: 'name:char*', description: 'Use wildcards for partial matches' },
  { query: 'name:charizard subtypes:vmax', description: 'Combine multiple search criteria' },
  { query: 'types:fire rarity:rare', description: 'Search by type and rarity' },
  { query: 'set.name:"base set"', description: 'Find cards from a specific set' }
] as const;
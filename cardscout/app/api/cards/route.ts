import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  // Validate query parameter
  if (!query || query.trim().length < 1) {
    return NextResponse.json(
      { 
        error: 'Query parameter "q" is required and must be at least 1 character long.',
        hint: 'Try searching for: name:pikachu or name:"charizard ex"'
      },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.POKEMONTCG_API_KEY;
    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&page=${page}&pageSize=250`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Only add API key if it exists
    if (apiKey) {
      headers['X-Api-Key'] = apiKey;
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pokemon TCG API Error:', errorText);
      return NextResponse.json(
        { 
          error: `API request failed: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();
    
    // Return the API response as-is
    return NextResponse.json(data);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error occurred while fetching cards.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
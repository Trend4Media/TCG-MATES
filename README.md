# Cardscout 🔍

A modern Pokemon card search application built with Next.js and the Pokemon TCG API.

## Features

- **Powerful Search**: Search Pokemon cards using Lucene-like syntax
- **Beautiful UI**: Clean, responsive design with Tailwind CSS
- **Fast Performance**: Server-side API proxy with client-side pagination
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Mobile First**: Responsive design that works on all devices

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up API key (optional but recommended):**
   - Get a free API key from [Pokemon TCG Developer Portal](https://dev.pokemontcg.io/)
   - Copy `.env.local.example` to `.env.local`
   - Add your API key: `POKEMONTCG_API_KEY=your_key_here`

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Search Examples

The app supports powerful search queries using the Pokemon TCG API syntax:

- `name:pikachu` - Find cards with "pikachu" in the name
- `name:"charizard ex"` - Exact phrase matching
- `name:char*` - Wildcard searches
- `name:charizard subtypes:vmax` - Multiple criteria
- `types:fire rarity:rare` - Search by type and rarity
- `set.name:"base set"` - Find cards from specific sets

## Project Structure

```
cardscout/
├── app/
│   ├── api/cards/route.ts    # API proxy endpoint
│   ├── globals.css           # Global styles
│   └── page.tsx             # Main page
├── components/
│   ├── SearchBar.tsx        # Search input with debounce
│   ├── CardGrid.tsx         # Card display grid
│   ├── CardItem.tsx         # Individual card component
│   └── Pagination.tsx       # Pagination controls
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── api.ts              # API utilities
└── .env.local              # Environment variables
```

## API Configuration

The app works without an API key but with limited rate limits. For better performance:

1. Register at [dev.pokemontcg.io](https://dev.pokemontcg.io/)
2. Get your free API key
3. Add it to `.env.local`:
   ```
   POKEMONTCG_API_KEY=your_key_here
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Pokemon TCG API v2
- **Deployment**: Vercel-ready

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.
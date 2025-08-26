# Contributing to Cardscout

Thank you for your interest in contributing to Cardscout! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/cardscout.git
   cd cardscout
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment** (optional but recommended):
   ```bash
   cp .env.example .env.local
   # Add your Pokemon TCG API key to .env.local
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following the coding standards
3. **Test your changes**:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
5. **Push to your fork** and create a Pull Request

## Coding Standards

- **TypeScript**: All new code should be written in TypeScript
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code formatting will be handled automatically
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS for styling

## Project Structure

```
cardscout/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main pages
├── components/            # React components
├── lib/                   # Utility functions and types
├── public/                # Static assets
└── README.md
```

## Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Pull Request Guidelines

1. **Describe your changes** clearly in the PR description
2. **Link any related issues** using `Fixes #issue-number`
3. **Ensure all tests pass** and the build succeeds
4. **Keep PRs focused** - one feature or fix per PR
5. **Update documentation** if needed

## API Guidelines

When working with the Pokemon TCG API:

- Always use the server-side proxy route (`/api/cards`)
- Never expose API keys in client-side code
- Handle rate limiting gracefully
- Cache responses when appropriate

## Questions?

Feel free to open an issue for any questions or join the discussions!
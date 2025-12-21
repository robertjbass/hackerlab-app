# CLAUDE.md

This file provides guidance to AI agents such as Claude Code (claude.ai/code) when working with code in this repository.


## Conventions:
Use the @ alias for src/ directory
`import { Users } from '@/collections/Users'`

## Collections
- Collections should be singular with 1 exception: users
- users collection can not be renamed

## Database


**Query Optimization**:
- Limited query depth (`maxDepth: 2` in collection configs, higher depths used in queries when needed)
- Junction tables for efficient relationship queries
- Pagination disabled for small datasets to reduce overhead
- **Always use `populate` parameter** with `payload.find()` to opt-in to specific fields
- Use `pnpm analyze:queries` to monitor query sizes and performance

**Database**:
- PostgreSQL 17.7
- Custom migrations in `src/migrations/`

### PayloadCMS Query Optimization with `populate`

**Critical**: Without using `populate`, PayloadCMS returns ALL relationship data, which can result in massive JSON payloads. Always use `populate` to specify exactly which fields you need.

**📚 Query Documentation**: Before writing or modifying Payload queries, review the comprehensive query syntax guide at [docs/payload-query.md](docs/payload-query.md). This document covers:
- `payload.find()` - Server-side queries
- `payload.findByID()` - Single document queries
- `queryPayload()` - Client-side queries
- Query structure, populate syntax, depth handling, and output structure
- Collection joins reference and naming patterns

## UI Components (shadcn/ui)

This project uses [shadcn/ui](https://ui.shadcn.com) with Tailwind CSS v4.

### Adding Components

```bash
pnpm add:ui <component-name>
```

Examples:
```bash
pnpm add:ui button
pnpm add:ui card dialog
pnpm add:ui table --overwrite
```

### Key Files

- `components.json` - shadcn/ui configuration
- `src/lib/utils.ts` - `cn()` class merging utility
- `src/lib/theme.ts` - Central color palette configuration
- `src/components/ui/` - shadcn component directory
- `src/app/globals.css` - CSS variables (OKLCH colors)

### Color Palette

- **Primary:** Indigo (`--primary`)
- **Neutrals:** Slate
- To change the palette, edit `src/lib/theme.ts` for reference values and update `src/app/globals.css` for CSS variables

### Component Patterns

- Use `Button` from `@/components/ui/button` instead of custom button styles
- Use `Card` for content containers
- Use `Input` + `Label` for form fields
- Use `sonner` for toast notifications (not deprecated `toast`)
- Use semantic color classes: `text-primary`, `bg-muted`, `border-border`, `text-muted-foreground`

### Icons

**Always import icons from `@/components/icons`** - never directly from lucide-react.

```tsx
import { ArrowRight, Github, Menu, Terminal } from '@/components/icons'
```

This barrel file:
- Re-exports lucide icons for UI (Menu, Terminal, ArrowRight, etc.)
- Contains local SVG backups for brand icons (Github, XIcon)

To add a new icon:
- Lucide icon: Add to the export list in `src/components/icons/index.tsx`
- Brand icon: Copy SVG from https://simpleicons.org and create a component

## Code Comments

**Philosophy:** Good code is self-documenting through clear naming and conventions. Comments should be minimal.

**When to comment:**
- Explain WHY something unintuitive was done (not WHAT)
- Document non-obvious workarounds or edge cases

**When NOT to comment:**
- Never restate what a function/variable does when the name is self-explanatory
- No JSDoc-style comments unless absolutely necessary
- No file header comments describing what the file contains

**Comment style:**
```ts
// Single line for brief explanations

/*
 * Multi-line ONLY when multiple lines are
 * absolutely required due to significant context
 */
```

**Bad examples:**
```ts
// Gets the user by ID (redundant - name already says this)
function getUserById() {}

/**
 * Links configuration file
 * Contains social and external links
 */  // (unnecessary file header)
```

**Good examples:**
```ts
// Offset by 1 because the API uses 1-based indexing
const index = position + 1

/*
 * Using a junction table here instead of a direct relation
 * because Payload's depth queries become expensive with
 * nested user data across multiple collections
 */
```

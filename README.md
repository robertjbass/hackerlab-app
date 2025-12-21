# HackerLab Web App

A full-stack developer tools platform built with Next.js and PayloadCMS.

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **CMS/Backend:** PayloadCMS 3
- **Database:** PostgreSQL 17
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Language:** TypeScript

## Prerequisites

- Node.js 22.x or 24.x
- pnpm 9.x or 10.x
- PostgreSQL 17

## Getting Started


```bash
pnpm install

vercel env pull
mv .env.local .env

# create a new database if needed
pnpx spindb create hackerlab-app --engine postgresql --version 17

# create a new payload secret if needed
node -e "console.log(\`PAYLOAD_SECRET=\${require('crypto').randomBytes(32).toString('base64')}\")" >> .env
```

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/      # Public-facing pages
│   └── (payload)/       # PayloadCMS admin & API
├── collections/         # PayloadCMS collections
├── components/          # React components
├── lib/                 # Utilities and helpers
└── migrations/          # Database migrations
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests |
| `pnpm prep` | Generate types and migrations |
| `pnpm add:ui <name>` | Add a shadcn/ui component |


# Desktop App Module Breakdown (9 major modules accessible via a sidebar)

## 1. Database Container Management

- Manage local database containers (PostgreSQL, MySQL, SQLite, Redis, MongoDB)
- Start/stop/delete operations with status indicators
- Connection string generation and copy-to-clipboard
- Filter by type, search by name
- Stats bar showing running/stopped/error counts

## 2. PGP Key Management

- Dual storage: "My Keys" (with private keys) and "Address Book" (public only)
- Encrypt/decrypt messages with selected keys
- Private key visibility toggle (masked by default)
- Add/delete/copy keys

## 3. GitHub Repository Management

- List repositories with metadata (name, language, stars, visibility)
- Bulk operations: batch rename, update descriptions, change visibility, delete
- Multi-select with "Select All" toggle
- Search and filter capabilities

## 4. Environment Variables Management

- Multi-file support (.env.example, .env.local, etc.)
- Three view modes: Table, Raw (syntax-highlighted), JSON
- Add/edit/delete variables
- Enable/disable (comment out) individual lines
- Value visibility toggle for sensitive data

## 5. Dotfiles Management

- Backup and sync config files from GitHub or local sources
- Hierarchical file browser with folder tree
- Pull/push/bi-directional sync operations
- Manage backup sources

## 6. TypeScript Playground

- Monaco editor with live TypeScript execution
- Auto-run on code change (500ms debounce)
- Custom type-stripping (TS → JS conversion)
- Console output capture and display

## 7. TypeScript Notebook

- Jupyter-style cell-based TypeScript editor
- Individual cell execution or run-all
- Per-cell output display
- Add/delete/reorder cells

## 8. Markdown Playground

- Split view: editor (Monaco) + live preview
- GitHub Flavored Markdown support
- Custom client-side Markdown parser
- Export as .md file or copy HTML

## 9. Settings

- Sections: General, Appearance, Storage, Integrations, Notifications, Security
- Theme selection, auto-start, GitHub integration
- Toggle switches for preferences





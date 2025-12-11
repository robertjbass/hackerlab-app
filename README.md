# HackerLab App

A full-stack developer tools platform built with Next.js and PayloadCMS.

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **CMS/Backend:** PayloadCMS 3
- **Database:** PostgreSQL 17
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## Prerequisites

- Node.js 22.x or 24.x
- pnpm 9.x or 10.x
- PostgreSQL 17

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your `.env` file with:
   - `DATABASE_URI` - PostgreSQL connection string
   - `PAYLOAD_SECRET` - Secret key for PayloadCMS

4. **Run database migrations**
   ```bash
   pnpm payload migrate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
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

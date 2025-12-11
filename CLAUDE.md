# CLAUDE.md

This file provides guidance to AI agents such as Claude Code (claude.ai/code) when working with code in this repository.

## Database

**Query Optimization**:
- Limited query depth (`maxDepth: 2` in collection configs, higher depths used in queries when needed)
- Junction tables for efficient relationship queries
- Pagination disabled for small datasets to reduce overhead
- **Always use `populate` parameter** with `payload.find()` to opt-in to specific fields
- Use `pnpm analyze:queries` to monitor query sizes and performance

**Database**:
- PostgreSQL 16.2 on Neon with connection pooling
- Database branching for preview deployments
- Custom migrations in `src/migrations/`

### PayloadCMS Query Optimization with `populate`

**Critical**: Without using `populate`, PayloadCMS returns ALL relationship data, which can result in massive JSON payloads. Always use `populate` to specify exactly which fields you need.

**📚 Query Documentation**: Before writing or modifying Payload queries, review the comprehensive query syntax guide at [docs/payload-query.md](docs/payload-query.md). This document covers:
- `payload.find()` - Server-side queries
- `payload.findByID()` - Single document queries
- `queryPayload()` - Client-side queries
- Query structure, populate syntax, depth handling, and output structure
- Collection joins reference and naming patterns

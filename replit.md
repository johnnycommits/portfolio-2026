# replit.md

## Overview

This is a personal portfolio/link-in-bio web application for John Ludena, a Product Engineer. The application showcases professional work including enterprise website projects (KBR, ABS Wavesight, Loomis, Chevron) with interactive project modals, image carousels, and an animated starfield background. It's built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server
- **Development**: tsx for TypeScript execution, Vite dev server with HMR
- **Production Build**: esbuild bundles server code, Vite builds client assets

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Current Schema**: Basic users table with id, username, password
- **Storage Pattern**: Abstracted through `IStorage` interface in `server/storage.ts`, currently using in-memory implementation (`MemStorage`)

### Project Structure
```
client/           # React frontend application
├── src/
│   ├── components/ui/  # shadcn/ui components
│   ├── pages/          # Route components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities and query client
server/           # Express backend
├── index.ts      # Server entry point
├── routes.ts     # API route definitions
├── storage.ts    # Data access layer
└── vite.ts       # Vite dev server integration
shared/           # Shared code between client/server
└── schema.ts     # Drizzle database schema
```

### Key Design Decisions
- **Monorepo Structure**: Single repository with client, server, and shared directories enables code sharing (schemas, types)
- **Path Aliases**: TypeScript path aliases (`@/`, `@shared/`, `@assets/`) simplify imports
- **Component Library**: Full shadcn/ui installation provides consistent, accessible UI components
- **Dark Theme Default**: Application uses a dark color scheme by default

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations stored in `./migrations`

### Third-Party Services
- **Google Fonts**: Plus Jakarta Sans and Inter fonts loaded from Google Fonts CDN

### Key NPM Packages
- **UI**: Radix UI primitives, Lucide icons, Embla Carousel, cmdk (command palette)
- **Forms**: React Hook Form with Zod validation
- **Dates**: date-fns for date formatting
- **Session**: connect-pg-simple for PostgreSQL session storage (available but not currently used)
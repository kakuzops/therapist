# Copilot Instructions for therapist

## Project Overview
- This is a Next.js app using the `/src` directory for all source code, with Prisma for database access and PostgreSQL (via Docker) as the main database.
- The backend API routes are under `src/app/api/`, following Next.js conventions.
- Authentication logic is in `src/lib/auth.ts` and `src/lib/auth-client.ts`.
- UI components are in `src/components/ui/` and feature-specific components are grouped by feature in subfolders (e.g., `src/app/(panel)/dashboard/_components/`).
- Database schema and migrations are managed in `prisma/schema.prisma` and `prisma/migrations/`.

## Developer Workflows
- **Start dev server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Database:** Use Docker Compose (`docker-compose up -d`) to start PostgreSQL. Connection string: `postgresql://postgres:postgres@localhost:5432/therapist_db`.
- **Prisma:**
  - Generate client: `npx prisma generate`
  - Run migrations: `npx prisma migrate dev`
- **Linting:** Run `npx eslint .` (config in `eslint.config.mjs`).
- **TypeScript:** Config in `tsconfig.json` and `next-env.d.ts`.

## Patterns & Conventions
- **App structure:** Uses Next.js `/app` directory routing. Pages are in `src/app/`, with nested routes for features (e.g., `src/app/(panel)/dashboard/page.tsx`).
- **Component organization:** Shared UI in `src/components/ui/`, feature-specific in local `_components/` folders.
- **Environment variables:** Store secrets in `.env` (see `env.copy` for template). Use `DATABASE_URL` for database connection.
- **Prisma usage:** Import Prisma client from `src/lib/prisma.ts`.
- **Auth:** Use helpers from `src/lib/auth.ts` and `src/lib/auth-client.ts` for authentication flows.

## Integration Points
- **Database:** PostgreSQL via Docker Compose, Prisma ORM.
- **Frontend/Backend:** Next.js API routes for server logic, React for UI.
- **External:** No third-party auth or payment integrations detected.

## Examples
- To add a new dashboard feature, create a new folder in `src/app/(panel)/dashboard/_components/` and update `src/app/(panel)/dashboard/page.tsx`.
- To add a new API route, create a folder in `src/app/api/` and add a `route.ts` file.

---

If any section is unclear or missing, please provide feedback to improve these instructions.

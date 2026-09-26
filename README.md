# BUSINESS_NAME Platform



## Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS (`apps/web`)
- **Backend:** NestJS, TypeScript (`apps/api`)
- **Database:** PostgreSQL + Prisma
- **Shared:** Brand constants, Zod schemas, API types (`packages/shared`)

## Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (for local PostgreSQL)

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Environment variables**

```bash
cp .env.example .env
```

Edit `.env` as needed. Never commit real secrets.

3. **Start PostgreSQL**

```bash
npm run db:up
```

4. **Build shared package**

```bash
npm run build -w @consultancy/shared
```

5. **Prisma migrate & seed**

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

When prompted for a migration name, use `init` (or run `npx prisma migrate dev --name init` from `apps/api`).

6. **Run development servers**

```bash
npm run dev
```

- Web: http://localhost:3000  
- API: http://localhost:3001/api/health  

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start web + API |
| `npm run build` | Build shared, API, and web |
| `npm run start` | Start production builds |
| `npm run lint` | Lint workspaces |
| `npm run test` | Run API + web tests |
| `npm run db:up` | Start Postgres (Docker) |
| `npm run db:down` | Stop Postgres |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed admin user |
| `npm run db:generate` | Generate Prisma client |

## Brand name

Company name is centralized in `packages/shared/src/brand.ts` as `BUSINESS_NAME`. Replace that constant to rebrand globally.

## API overview

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | Public |
| POST | `/api/leads` | Public (rate limited + honeypot) |
| GET/PATCH/DELETE | `/api/leads` | JWT cookie |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Auth |
| GET | `/api/auth/me` | Auth |

Default seeded admin (from `.env`):

- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

## Email

If `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASSWORD` are set, lead notifications are sent via SMTP. Otherwise the email service logs and continues (no-op).

## Booking & analytics

- `NEXT_PUBLIC_BOOKING_URL` — when set, primary CTAs open this URL (e.g. Calendly)
- `NEXT_PUBLIC_ANALYTICS_ID` — when set, client analytics events are emitted

## Production build

```bash
npm run build
npm run start
```

## Testing

```bash
npm run test
```

API tests cover lead create/validation, auth-protected lead management, and error shapes. Frontend tests cover contact form rendering, validation, success/error submission, and CTA open behaviour.

## Project layout

```
apps/web          Next.js marketing site + contact form
apps/api          NestJS API, Prisma, auth, email
packages/shared   Shared types, Zod schemas, BUSINESS_NAME
docker-compose.yml
```

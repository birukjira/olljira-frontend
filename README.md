# OllJira Website — Frontend

React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui.

Public marketing site (home, about, services, projects, blogs, careers,
contact, booking) plus the CMS admin panel UI (`/admin`) and login (`/login`).
All data comes from the companion API: **olljira-backend**.

## First-time source import

The full source ships as `olljira-frontend.tar.gz` (download it from the link
you were given, or from your project workspace). Then:

```bash
git clone https://github.com/birukjira/olljira-frontend.git
cd olljira-frontend
./bootstrap.sh ~/Downloads/olljira-frontend.tar.gz
```

`bootstrap.sh` unpacks the archive into the repo and commits everything
(source, assets, configs). No secrets are included — `.env` never ships.

## Setup (after import)

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend origin in production
npm run dev            # dev server on :5173, proxies /api to VITE_API_ORIGIN
```

## Build

```bash
npm run build          # static bundle in dist/
```

Deploy `dist/` to any static host. The browser calls
`${VITE_API_URL}/api/trpc`; if `VITE_API_URL` is empty it calls `/api` on the
same origin (use a reverse proxy in that case). Session cookies are
`credentials: "include"` — the backend must allow this origin via CORS.

## Structure

- `src/pages` — public pages; `src/pages/admin` — CMS screens
- `src/components` — site components; `src/components/ui` — shadcn/ui
- `shared/` — **type-only mirror of the backend** (`api/`, `contracts/`,
  `db/schema.ts`). Never edited here; re-copy from olljira-backend when the
  API changes. See `shared/README.md`.
- `public/images` — brand & portfolio assets (owned by OllJira)

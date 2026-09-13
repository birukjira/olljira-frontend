# shared/ — type mirror of olljira-backend

This folder is a verbatim copy of the backend's `api/`, `contracts/`, and
`db/schema.ts`. It exists so the frontend keeps end-to-end tRPC type safety
(`AppRouter`) without installing or deploying the backend.

**It is never bundled or executed** — `src/providers/trpc.tsx` imports
`type AppRouter` only, and TypeScript resolves the rest.

When the backend API changes, re-copy these files from the
`olljira-backend` repo:

```bash
cp -r ../olljira-backend/api ../olljira-backend/contracts shared/
cp ../olljira-backend/db/schema.ts ../olljira-backend/db/relations.ts shared/db/
```

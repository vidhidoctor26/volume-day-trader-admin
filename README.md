# Volume Trader Admin

React + Vite admin dashboard with Redux Saga, integrated with the Express API on port **5000**.

## Run

**1. API server** (port 5000) — ensure CORS allows the admin app:

```env
ADMIN_CLIENT_URL=http://localhost:5173
```

**2. Admin client**

```bash
cd client
cp .env.example .env   # optional — defaults to http://localhost:5000
npm install
npm run dev
```

Open http://localhost:5173

In dev, requests to `/api/*` are proxied to `http://localhost:5000` when `VITE_API_URL` is unset. With `VITE_API_URL=http://localhost:5000`, the client calls the API directly.

## Auth API (`/api/auth`)

| Method | Path | Used by |
|--------|------|---------|
| POST | `/login` | Sign in |
| POST | `/forgot-password` | Forgot password |
| POST | `/reset-password` | Reset password (`email`, `token`, `newPassword`) |
| GET | `/me` | Session restore (Bearer token) |
| PATCH | `/change-password` | Not wired in UI yet |

Reset links must include `?token=...&email=...` in the URL.

## Project structure (`client/src`)

| Layer | Folder | Purpose |
|-------|--------|---------|
| Pages | `pages/` | Route screens |
| Components | `components/` | UI |
| Redux | `redux/` | State, sagas, slices |
| Services | `services/` | App logic |
| API | `api/` | HTTP client + auth endpoints |
| Schemas | `schemas/` | Zod validation |
| Types | `types/` | TypeScript types |

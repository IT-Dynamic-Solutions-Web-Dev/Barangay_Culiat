# Backend — Barangay Culiat

This document covers the backend service for the Barangay Culiat project (Express + Node + MongoDB).

## Overview

The backend provides RESTful APIs for authentication, reports, announcements, and audit logs. It uses JWT for authentication and a small role-based access control system.

Tech stack
- Node.js (CommonJS)
- Express
- MongoDB (Mongoose)
- JWT for authentication

## Prerequisites

- Node.js (14+)
- npm
- MongoDB (local or cloud URI)

## Environment

Create a `.env.local` (for development) or `.env.production` (for production) in this folder. At minimum you should set:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/barangay_culiat
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

There is a `seed.js` file used to populate sample data; see the scripts below.

## Install

From the `backend` folder:

```powershell
cd backend
npm install
```

## Available npm scripts

These are defined in `backend/package.json`:

- `npm run dev` — Run the server in development mode loading `.env.local`.
- `npm run dev:watch` — Run the server with `nodemon` for auto-reload in development.
- `npm run start` — Run the server with production env file (`.env.production`).
- `npm run seed` — Run `seed.js` using `.env.local` (populate sample/test data).
- `npm run seed:prod` — Run `seed.js` using `.env.production`.

Example (start dev server):

```powershell
cd backend
npm run dev
```

The server starts on the configured `PORT` (default 5000). API base path is `/api`.

## Useful files

- `server.js` — Express app and route mounting
- `config/db.js` — MongoDB connection helper
- `controllers/` — Route handlers (auth, reports, announcements, logs, etc.)
- `models/` — Mongoose schemas (User, Report, Logs, ...)
- `routes/` — Express routers
- `seed.js` — Seeder to create sample data

## Important endpoints (quick reference)

Authentication
- `POST /api/auth/register` — Register user (public)
- `POST /api/auth/login` — Login user (public)
- `GET /api/auth/me` — Current user (protected)
- `PUT /api/auth/profile` — Update profile (protected)

Logs / Auditing
- `GET /api/logs` — List logs (admin/superadmin only)
- `POST /api/logs` — Create log (admin/superadmin only; server also creates logs automatically for actions like CREATE_ACCOUNT)

Reports & Announcements
- See `routes/` for full list — typical paths: `/api/reports`, `/api/announcements`

## Auditing notes

- Account creation and barangay ID lifecycle events are logged to the `Logs` collection. Each log contains:
  - `action` (e.g., `CREATE_ACCOUNT`, `BARANGAY_ID_REQUEST`)
  - `description`
  - `performedBy` (user id who performed the action)
  - `performedByRole` (role snapshot when action occurred)
  - `timestamp`

## Running seed data

To populate sample data for local development:

```powershell
cd backend
npm run seed
```

## Debugging & common issues

- If the server is not reachable, confirm MongoDB is running and `MONGO_URI` is correct.
- Check logs printed by `server.js` for connection errors.
- If environment variables are not loaded, ensure you're using the `-r dotenv/config` wrapper in the scripts (already configured in the provided `package.json`).

## Tests

There are no automated tests in the backend right now. Add unit/integration tests under a `test/` folder and configure a `test` script in `package.json` when you add them.

## Next steps / suggestions

- Add a backend-specific README.md (done) and link to it from the top-level README.
- Harden log creation so the server always sets `performedBy` from `req.user` (do not trust client-supplied `performedBy`).
- Add pagination/filtering to the logs endpoint for production usage.

---

If you want, I can also:
- Link this `backend/README.md` from the top-level README.
- Add a small example Postman collection for auth -> create user -> view logs flow.
- Add a simple smoke test script to validate startup.

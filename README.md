# PAAWS Frontend — Developer README

This document is written for developers who will read, extend or deploy the PAAWS frontend.

Overview
--------
The frontend is a React single-page application built with Vite. Production output is a static site in `PAAWS2/dist/` served by an Nginx container (see `docker-compose.yml`). The app demonstrates responsive UI, asset handling (images/GIFs/video) and a small Docker-based static deploy.

Architecture and key decisions
--------------------------------
- Build tool: **Vite** — chosen for fast dev server and modern bundling.
- UI: **React** + **Bootstrap 5**.
- Assets: Desktop banner is an MP4 video; mobile uses an imported GIF to avoid autoplay and cross-browser mobile issues.
- Deployment: static `dist` served by Nginx in Docker for simple hosting.

Repository layout (important paths)
----------------------------------
- `PAAWS2/` — frontend project
  - `src/` — source code
    - `pages/` (e.g. `Home.jsx`) — page-level components
    - `components/` — reusable UI components
    - `images/` — images, `gifs/` and `videos/`
  - `dist/` — production build output
  - `package.json` — scripts & deps
- `docker-compose.yml` — mounts `PAAWS2/dist` into Nginx container (default host:container port `3000:80`)

Important files to review
-------------------------
- `PAAWS2/src/pages/Home.jsx` — landing page; handles banner selection (video vs GIF) and contains the `isMobile` detection.
- `PAAWS2/src/images/gifs/` — GIFs used by the site. GIFs must be imported in code to be included by Vite.
- `docker-compose.yml` — deployment mapping; change host port on the left side to avoid conflicts.

Development
-----------
Requirements
- Node.js (v18+ recommended)
- npm or yarn

Install and run:

```bash
cd PAAWS2
npm ci
npm run dev
```

Notes
- Vite default dev server port: `5173`. To use `3000` for parity with production: `npm run dev -- --port 3000` or `PORT=3000 npm run dev`.
- When editing assets that should be included in `dist`, import them in JS/JSX rather than using absolute paths.

Building for production
-----------------------
```bash
cd PAAWS2
npm run build
```

Verify output in `PAAWS2/dist` — hashed asset filenames will be in `dist/assets`.

Serve with Docker (static)
--------------------------
```bash
docker compose up -d paaws-frontend
```
This maps host port `3000` to container port `80` by default. Confirm with `docker ps`.

If you change site assets, rebuild (`npm run build`) and restart the container. If Nginx serves stale content, run:

```bash
docker compose rm -f paaws-frontend && docker compose up -d --build paaws-frontend
```

Asset handling gotchas
---------------------
- Vite processes imported assets and copies them into `dist/assets` with hashing. Do `import bannerGif from '../images/gifs/bannergif.gif'` in `Home.jsx` to include the GIF in the build.
- Absolute paths like `/src/images/...` are not processed by Vite and will not appear in `dist` automatically.

Troubleshooting & tips
----------------------
- If the app is not reachable on `http://localhost:3000`, check `docker ps` to verify `paaws_frontend` status and port mapping.
- Use `ss -ltnp | grep :3000` to check if a host process blocks port `3000`.
- Browser caching can mask asset updates; test with an incognito window or clear cache.

Scripts (from package.json)
---------------------------
- `dev` — `vite` (dev server)
- `build` — `vite build` (production build)
- `preview` — `vite preview` (serve locally preview build)
- `lint` — run ESLint

Recommended next improvements
-----------------------------
- Replace large GIFs with animated WebP for better compression.
- Add automated CI checks (lint + build) and ensure the CI publishes or deploys `dist` artifacts.
- Add unit/integration tests for key components.
- Improve accessibility on carousel controls (ARIA labels, keyboard navigation).

Presenting this project to employers
-----------------------------------
When demonstrating this repo, emphasize:
- concrete changes you made (e.g., switching mobile banner to imported GIF and fixing build pipeline),
- how the build & deploy pipeline works (Vite -> dist -> Nginx in Docker), and
- planned improvements (performance, tests, accessibility).

License
-------
Add a `LICENSE` file (e.g., MIT) if you plan to publish publicly.



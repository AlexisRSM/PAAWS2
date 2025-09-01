# PAAWS Frontend

This repository contains the frontend for PAAWS — a community-driven pet adoption and animal welfare platform. The frontend is built with React and Vite and is designed to be served as a static site via Nginx in production or run in development mode with Vite.

- Framework: React
- Bundler / Dev server: Vite
- Styling: Bootstrap
- Assets: images, GIFs and a short animated banner video

## Table of Contents

- Installation
- Development
- Production build and Docker
- Project structure
- Contributing
- License

## Installation

Requirements
- Node.js (v18+ recommended)
- npm or yarn
- Docker & Docker Compose (for production static site with Nginx)

Install dependencies:

```bash
cd /path/to/paaws-frontend/PAAWS2
npm ci
```

If `npm ci` fails (e.g., package-lock mismatch), run `npm install`.

## Development

Run the dev server (Vite):

```bash
npm run dev
```

By default Vite serves on port `5173`. To run on port `3000` explicitly:

```bash
npm run dev -- --port 3000
# or
PORT=3000 npm run dev
```

Open `http://localhost:5173` (or the port you configured) to view the app.

## Production build and Docker

Build the production assets:

```bash
cd PAAWS2
npm run build
```

To serve the built `dist` folder with Nginx via Docker Compose, the repository includes a `docker-compose.yml` that maps `3000:80` by default. Start the service with:

```bash
docker compose up -d paaws-frontend
```

Then open `http://localhost:3000` to view the site.

If another service is using `3000`, change the host port mapping in `docker-compose.yml` or stop the conflicting service.

## Project structure

- `PAAWS2/src/` — source code (React components, pages, images, videos)
- `PAAWS2/dist/` — production build output
- `PAAWS2/src/images/` — static images and GIFs used in the app
- `PAAWS2/src/images/videos/` — banner video used on desktop
- `docker-compose.yml` — simple Nginx service to serve `PAAWS2/dist`

Important files:
- `PAAWS2/src/pages/Home.jsx` — landing page component that serves the banner; in mobile it will serve a GIF and on desktop the video
- `PAAWS2/src/images/gifs/` — folder for GIFs; ensure referenced images are imported in code so Vite bundles them into the `dist` output

## Notes about the banner asset

To ensure the mobile GIF is included in the production build, import the GIF in `Home.jsx` and reference it as an imported asset (e.g., `import bannerGif from '../images/gifs/bannergif.gif'`), rather than using absolute paths. This allows Vite to copy and hash the asset into `dist`.

## Contributing

1. Fork the repository and create a feature branch.
2. Keep commits small and focused; write meaningful commit messages.
3. Run `npm ci` and `npm run build` locally before opening a PR to ensure no build regressions.

## Commit & Deploy

- After making code changes, commit and push. If you want me to commit these changes for you, I can initialize Git here and push to a remote if you provide the remote URL and credentials.

## License

Specify the project license here (e.g., MIT) — update `LICENSE` file accordingly.



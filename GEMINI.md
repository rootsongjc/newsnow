# GEMINI.md

This document provides a comprehensive overview of the NewsNow project, its architecture, and development guidelines.

## Project Overview

NewsNow is a full-stack web application that provides an elegant and real-time reading experience for the hottest news. It features a clean UI, GitHub OAuth login for data synchronization, and a caching mechanism to optimize resource usage.

The project is built with a modern tech stack:

-   **Frontend:** React, Vite, TypeScript, TanStack Router, and UnoCSS.
-   **Backend:** Nitro, a server engine for modern JavaScript/TypeScript.
-   **Database:** Supports various databases through `db0`, with `better-sqlite3` for local development and Cloudflare D1 for production.
-   **Deployment:** Can be deployed on Cloudflare Pages, Vercel, or with Docker.

A key feature of NewsNow is its extensibility. New news sources can be easily added by creating a new source fetcher file in the `server/sources` directory. The application also includes a "MCP server" for additional functionality.

## Building and Running

### Prerequisites

-   Node.js >= 20
-   pnpm

### Installation

```bash
corepack enable
pnpm i
```

### Development

To start the development server, run:

```bash
pnpm dev
```

### Build

To build the application for production, run:

```bash
pnpm build
```

### Start

To start the production server, run:

```bash
node --env-file .env.server dist/output/server/index.mjs
```

### Testing

To run tests, use:

```bash
pnpm test
```

### Linting

To lint the code, run:

```bash
pnpm lint
```

## Development Conventions

### Adding a New Source

Adding a new news source is a core part of this project. Follow these steps:

1.  **Create a Feature Branch:**
    ```bash
    git checkout -b feature/add-<source-name>
    ```

2.  **Register the Source:**
    Add your new source to the configuration in `/shared/pre-sources.ts`.

3.  **Implement the Source Fetcher:**
    Create a new file in the `/server/sources/` directory (e.g., `newsource.ts`). This file should export a function that fetches and returns an array of `NewsItem` objects. You can use libraries like `cheerio` for web scraping or fetch data from an API.

4.  **Regenerate Source Files:**
    Run the following command to update the `sources.json` file:
    ```bash
    npm run presource
    ```

5.  **Test Your Changes:**
    Run the development server and verify that your new source is working correctly.

6.  **Commit and Create a Pull Request.**

### Code Style

The project uses TypeScript and follows modern ES6+ conventions. Please adhere to the existing code style.

## Project Structure

-   `src/`: Contains the frontend React application code.
-   `server/`: Contains the backend Nitro server code.
-   `server/api/`: API routes for the backend.
-   `server/sources/`: Contains the logic for fetching news from different sources.
-   `shared/`: Contains shared code and types between the frontend and backend.
-   `public/`: Static assets.
-   `vite.config.ts`: Vite configuration file.
-   `nitro.config.ts`: Nitro server configuration file.
-   `package.json`: Project dependencies and scripts.
-   `CONTRIBUTING.md`: Detailed contribution guidelines.
-   `README.md`: Project overview and setup instructions.

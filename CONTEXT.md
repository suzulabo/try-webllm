# Project Context: try-webllm

## Project Overview
This project is a WebLLM demo application built as a Single Page Application (SPA) using SvelteKit.

## Tech Stack
- **Framework:** SvelteKit (Svelte 5 with Runes)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **UI Components:** shadcn-svelte
- **Linting/Formatting:** @antfu/eslint-config
- **Deployment target:** Static Site (SPA mode) via `@sveltejs/adapter-static`

## Current Status
- [x] **Initialization:** Project created with `create-svelte`.
- [x] **Dependencies:** Installed via `pnpm`.
- [x] **Configuration:**
    - `svelte.config.js`: Configured for static adapter.
    - `vite.config.ts`: Configured with TailwindCSS v4 plugin.
    - `eslint.config.js`: Configured with `@antfu/eslint-config`.
    - `components.json`: Configured for shadcn-svelte (aliases: `$lib/components`, `$lib/utils`, etc.).
- [x] **Structure:**
    - `src/lib/components/ui`: Shadcn UI components location.
    - `src/routes`: Basic routing setup.

## Next Steps
1. **WebLLM Integration:** Implement the logic to load and run LLMs in the browser.
2. **UI Implementation:** Build the chat interface using shadcn components.
3. **Testing:** Verify WebLLM functionality and UI responsiveness.

## Important Notes
- **Svelte 5 Runes:** The project uses Svelte 5's new reactivity model (Runes).
- **Tailwind 4:** Note the use of the Vite plugin for Tailwind 4.

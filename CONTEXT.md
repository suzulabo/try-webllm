# Project Context: try-webllm

## Project Overview
This project is a WebLLM demo application built as a Single Page Application (SPA) using SvelteKit.
It includes a verification tool to run multiple LLM models sequentially in the browser.

## Tech Stack
- **Framework:** SvelteKit (Svelte 5 with Runes)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **UI Components:** shadcn-svelte
- **LLM Engine:** `@mlc-ai/web-llm`
- **Linting/Formatting:** @antfu/eslint-config
- **Deployment target:** Static Site (SPA mode) via `@sveltejs/adapter-static`

## Current Status
- [x] **Initialization:** Project created with `create-svelte`.
- [x] **Dependencies:** Installed via `pnpm` (including `@mlc-ai/web-llm` and `shadcn-svelte`).
- [x] **Configuration:**
    - `svelte.config.js`: Configured for static adapter.
    - `vite.config.ts`: Configured with TailwindCSS v4 plugin.
    - `eslint.config.js`: Configured with `@antfu/eslint-config`.
    - `components.json`: Configured for shadcn-svelte.
- [x] **App Implementation:**
    - **Logic:** `ModelRunner` class implemented using Svelte 5 Runes for sequential model execution.
    - **UI:** Main verification page built with shadcn components (Card, Button, Progress, Badge, Textarea).
    - **Models:** Configured to verify 6 specific models (Qwen, Llama, Gemma, Phi variants).
    - **Styles:** Corrected `app.css` import in layout to ensure Tailwind styles apply.

## Next Steps
1.  **Refinement:** Add error handling for specific WebLLM initialization failures (e.g., WebGPU support check).
2.  **Features:** Add ability to download/export results.
3.  **Optimization:** Consider caching model weights more aggressively or providing clear cache management UI.

## Important Notes
- **Svelte 5 Runes:** The project uses Svelte 5's new reactivity model (Runes).
- **Tailwind 4:** Note the use of the Vite plugin for Tailwind 4.
- **WebGPU Requirement:** The app requires a browser with WebGPU support.

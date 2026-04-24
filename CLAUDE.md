# movie-app — Claude Code Guidelines

## Stack
- React 18 + TypeScript (strict mode enabled in `tsconfig.json`)
- Tailwind CSS for all styling
- Vite for bundling
- Redux Toolkit + RTK Query for API/state
- React Router v6 for routing
- Framer Motion for animations

## TypeScript
- `strict: true` is enforced — no `any`, no `as unknown`, no `@ts-ignore`
- Use `import("@/types").IMovie` inline only when circular imports would result; prefer top-level imports
- All props must be explicitly typed — no implicit prop spreading without a typed interface

## Styling
- **Tailwind only** — no inline `style={{}}` props, no CSS modules, no styled-components
- Use the `cn()` helper from `src/utils/helper.ts` when conditionally combining classes
- Follow existing responsive breakpoints: `xs:`, `sm:`, `md:`, `lg:`
- Dark mode via `dark:` prefix — always pair light and dark variants

## Components
- Keep components small and focused — if a component exceeds ~80 lines, extract sub-components
- Pages live in `src/pages/<PageName>/index.tsx`; sub-components go in `src/pages/<PageName>/components/`
- Shared/reusable components live in `src/common/`
- No business logic in page-level components — extract to hooks in `src/hooks/` or context in `src/context/`

## Hooks & Context
- Custom hooks live in `src/hooks/`
- Shared reactive state lives in `src/context/` as a context + provider
- Use `useCallback` on all functions exposed from context to avoid unnecessary re-renders
- Initialise state from localStorage with the function-reference form: `useState(getterFn)` not `useState(getterFn())`

## Routing
- All pages are lazy-loaded via `lazy()` + `<Suspense>` in `src/App.tsx`
- Literal routes (e.g. `/watchlist`) must be declared **before** dynamic routes (e.g. `/:category`)

## Environment & Secrets
- API keys go in `.env` using the `VITE_` prefix (e.g. `VITE_API_KEY`)
- `.env` is gitignored — never commit secrets
- Access via `import.meta.env.VITE_*`; centralise in `src/utils/config.ts`

## Linting
- Run `./node_modules/.bin/eslint src/` before committing
- Zero lint warnings/errors expected on clean code

## Rating Feature
- Users can rate any movie 1–5 stars
- Ratings are persisted in `localStorage` under the key `"ratings"` as `Record<number, number>` (movieId → stars)
- State lives in `src/context/ratingContext.tsx` — wrapped with `<RatingProvider>` in `main.tsx`
- Use `useRating()` hook to read/write ratings in any component
- `StarRating` component (`src/common/StarRating/index.tsx`) handles both interactive and read-only display
  - `size="sm" readOnly` on `MovieCard` — shows saved rating only, renders nothing if unrated
  - `size="md"` (default) on the Detail page — fully interactive, click to set/remove
- Storage helpers: `saveRatings` / `getRatings` in `src/utils/helper.ts`

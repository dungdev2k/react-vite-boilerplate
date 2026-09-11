# React Vite Boilerplate

Enterprise-grade boilerplate for React + TypeScript applications. **Feature-based** structure following the [bulletproof-react](https://github.com/alan2207/bulletproof-react) philosophy, optimized to scale across multiple teams and modules.

## Tech stack

| Layer         | Package                                                 |
| ------------- | ------------------------------------------------------- |
| Build tool    | Vite 8                                                  |
| Framework     | React 19 + TypeScript 6                                 |
| Routing       | TanStack Router (file-based, type-safe)                 |
| Data fetching | TanStack Query 5                                        |
| UI            | Ant Design 6 + Tailwind CSS 4                           |
| Form          | React Hook Form + Zod                                   |
| State (client)| Zustand (persist middleware)                            |
| i18n          | react-i18next + i18next-browser-languagedetector        |
| HTTP          | Axios (instance + interceptors)                         |
| Lint          | ESLint 10 flat config + typescript-eslint + react-hooks |
| Storybook     | Storybook 10 + @storybook/react-vite + addon-a11y/themes |
| Compiler      | React Compiler (via `@vitejs/plugin-react` + `oxc-transform-react`) |

## Prerequisites

- **Node.js** >= 22.13 or >= 24 (required by ESLint 10). Node 23 works but emits engine warnings.
- **pnpm** >= 9 — this project uses **pnpm** as its package manager (locked via `packageManager` in `package.json`). Enable it once with `corepack enable`.

## Use as boilerplate (recommended)

Bootstrap a fresh project from this template in one command:

```bash
# 1. Clone the boilerplate under a new directory name
git clone <this-repo-url> my-new-app
cd my-new-app

# 2. Interactive setup — renames the project, creates .env, resets git, installs
pnpm setup -- --reset-git

# You'll be prompted for the project name (kebab-case).
# The script rewrites: package.json, index.html <title>, README heading,
# .env / .env.example VITE_APP_NAME, and locales' appName.
```

Non-interactive:

```bash
pnpm setup -- \
  --name my-new-app \
  --display "My New App" \
  --reset-git \
  --yes
```

Rename only (no install, no git reset):

```bash
pnpm rename -- --name another-name
```

Flags:

| Flag                  | Effect                                                     |
| --------------------- | ---------------------------------------------------------- |
| `--name <kebab>`      | Package name (also used to derive the display name)         |
| `--display "<Title>"` | Overrides the derived display name                          |
| `--reset-git`         | Wipe `.git/` and create a fresh `chore: initialize <name>` commit |
| `--no-install`        | Skip `pnpm install`                                         |
| `--dry-run`           | Print what would change, don't touch files                  |
| `--yes`               | Skip the confirmation prompt                                |
| `--help`              | Show help                                                   |

## Manual setup

If you prefer to do it yourself:

```bash
cd react-vite-boilerplate
pnpm install
cp .env.example .env
# Point VITE_API_URL at your real backend
```

## Scripts

| Command                     | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `pnpm setup`                | Interactive boilerplate setup (rename + env + install)         |
| `pnpm rename`               | Rename the project only (no install, no git reset)             |
| `pnpm dev`                  | Start dev server at `http://localhost:5173` with HMR           |
| `pnpm build`                | Type-check + production build (output to `dist/`)              |
| `pnpm preview`              | Preview the production build at `http://localhost:4173`        |
| `pnpm typecheck`            | Run `tsc -b` for type checking only                            |
| `pnpm lint`                 | Run ESLint on the whole codebase                               |
| `pnpm lint:fix`             | Run ESLint and auto-fix what it can                            |
| `pnpm storybook`            | Start Storybook dev server at `http://localhost:6006`          |
| `pnpm build-storybook`      | Build a static Storybook to `storybook-static/`                |
| `pnpm clean`                | Remove `dist/`, `storybook-static/`, Vite cache, generated route tree |

## Environment variables

All env vars must be prefixed with `VITE_` to be exposed to the client bundle. See `.env.example`:

| Variable         | Description                                |
| ---------------- | ------------------------------------------ |
| `VITE_API_URL`   | Base URL for the Axios instance            |
| `VITE_APP_NAME`  | Display name of the app                    |

## Directory structure

```
.storybook/                 # Storybook config: main.ts + preview.tsx
src/
├── app/                    # App-level bootstrap (NO business logic)
│   ├── providers/          # Context/Provider composition
│   │   ├── AppProviders.tsx
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── I18nProvider.tsx
│   ├── stores/             # App-level global stores (theme, ...)
│   └── router.tsx          # createRouter() for TanStack Router
│
├── routes/                 # File-based routes (auto-generates routeTree.gen.ts)
│   ├── __root.tsx          # Root layout (Outlet + Devtools)
│   ├── _auth.tsx           # Layout for UNAUTHENTICATED users
│   ├── _auth/
│   │   └── login.tsx
│   ├── _app.tsx            # Layout for AUTHENTICATED users (guard in beforeLoad)
│   └── _app/
│       ├── index.tsx       # Dashboard "/"
│       ├── settings.tsx    # "/settings"
│       └── users/
│           ├── index.tsx   # "/users" — list
│           └── $userId.tsx # "/users/:userId" — detail
│
├── features/               # Business features — each is a self-contained slice
│   ├── auth/
│   │   ├── api/            # useLoginMutation, ...
│   │   ├── components/     # LoginForm
│   │   ├── hooks/          # useAuth
│   │   ├── stores/         # authStore (Zustand)
│   │   ├── schemas.ts      # Zod schemas
│   │   └── types.ts
│   └── users/
│       ├── api/            # useUsersQuery, useUserQuery, useCreateUserMutation
│       ├── components/     # UserForm
│       ├── schemas.ts
│       └── types.ts
│
├── shared/                 # Shared across multiple features
│   ├── components/
│   │   └── layout/         # AppSidebar, AppHeader, ThemeToggle, LanguageToggle
│   ├── constants/          # queryKeys.ts
│   ├── lib/                # Wrappers around third-party libs
│   │   ├── axios.ts        # Axios instance + auth/error interceptors
│   │   ├── queryClient.ts  # QueryClient config
│   │   ├── i18n.ts         # i18next init + SUPPORTED_LANGUAGES
│   │   └── theme.ts        # AntD light/dark theme tokens
│   └── types/              # ApiError, Pagination, ...
│
├── locales/                # i18n resource files
│   ├── en/{common,auth,users}.json
│   └── vi/{common,auth,users}.json
│
├── index.css               # Tailwind v4 imports + custom dark variant
├── main.tsx                # Entry: <AppProviders><RouterProvider/></AppProviders>
└── routeTree.gen.ts        # Auto-generated by @tanstack/router-plugin
```

### Dependency rules (enforced)

```
app       ─────►  shared / features   (app can use both)
routes    ─────►  features / shared   (routes only orchestrate)
features  ─────►  shared              (features MUST NOT import each other)
shared    ─────► (must not import features)
```

If two features need to share something → move it up to `shared/`. If a feature grows too large → split into sub-features (`features/orders/refunds/`).

## Data flow

### 1. Auth flow (login + protected route)

```
LoginForm (RHF + Zod)
    │
    │  submit(values)
    ▼
useLoginMutation  ─── mutationFn ──►  loginRequest (mock / axios.post)
    │
    │  onSuccess
    ▼
setAuthToken(token) ──► localStorage["auth_token"]
useAuthStore.setUser(user) ──► localStorage["auth-user"] (persist)
    │
    ▼
navigate({ to: "/" })
    │
    ▼
Route "/_app" beforeLoad
    │
    ├─ isAuthenticated() === true  → render <AppLayout/>
    └─ isAuthenticated() === false → redirect({ to: "/login" })
```

- Token: `shared/lib/axios.ts` reads `localStorage["auth_token"]` and attaches it as `Authorization: Bearer <token>` on every request.
- Response 401: the interceptor clears the token and redirects to `/login`.

### 2. API / TanStack Query flow

```
Component (e.g. UsersListPage)
    │
    │  const users = useUsersQuery()
    ▼
useUsersQuery  ── queryKey: queryKeys.users.list() ──►  QueryCache
    │                                                       │
    │  cache MISS / stale                                    │  cache HIT
    ▼                                                       │
queryFn: fetchUsers ─► http.get('/users')                   │
    │                                                       │
    │  request interceptor: attaches Bearer token           │
    ▼                                                       │
Backend  ─────► response                                    │
    │                                                       │
    ▼                                                       │
QueryCache.set(key, data)  ◄────────────────────────────────┘
    │
    ▼
Component receives { data, isLoading, isError, ... }
```

After a successful `useMutation` → call `queryClient.invalidateQueries({ queryKey: queryKeys.users.all })` to trigger a refetch automatically.

### 3. Theme flow (dark/light synced across AntD + Tailwind)

```
ThemeToggle click
    │
    ▼
useThemeStore.toggle()  ─── persist ──► localStorage["theme-mode"]
    │
    ▼
ThemeProvider re-render:
    ├─ document.documentElement.classList.add/remove('dark')  ── Tailwind `dark:` variants
    └─ <ConfigProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
                                                    │
                                                    ▼
                                          AntD components apply darkAlgorithm
```

### 4. i18n flow

```
LanguageToggle click
    │
    ▼
i18n.changeLanguage('vi')  ─── LanguageDetector ──► localStorage["i18nextLng"]
    │
    ▼
useTranslation() re-renders the whole tree  ─►  t('auth:login.title') = "Đăng nhập"
    │
    ▼
ThemeProvider also watches i18n.resolvedLanguage → sets <ConfigProvider locale={viVN}>
    (translates AntD defaults like Table "No data", DatePicker, ...)
```

## Routing

- **File-based**: every file under `src/routes/` is one route. `routeTree.gen.ts` is auto-generated — do NOT edit by hand.
- **Layout routes** are prefixed with `_` (hidden from the URL): `_auth.tsx`, `_app.tsx`.
- **Dynamic params**: `$userId.tsx` → route `/users/:userId`, read via `Route.useParams()`.
- **Guards**: put them in `beforeLoad` of the layout route and `throw redirect({ to: '...' })`.

## Provider tree

```
<StrictMode>
  <AppProviders>            ← src/app/providers/AppProviders.tsx
    <I18nProvider>
      <ThemeProvider>       ← AntD ConfigProvider + toggles html.dark
        <QueryProvider>     ← QueryClientProvider + Devtools
          <RouterProvider router={router} />
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  </AppProviders>
</StrictMode>
```

## Path alias

`@/` → `src/`. Configured in `vite.config.ts` (Vite resolve) and `tsconfig.app.json` (TS paths). Example:

```ts
import { http } from '@/shared/lib/axios'
import { useAuth } from '@/features/auth/hooks/useAuth'
```

## Devtools

Only mounted in dev (`import.meta.env.DEV`):
- **TanStack Router Devtools** — "TanStack Router" pill in the bottom-left.
- **TanStack Query Devtools** — logo icon in the bottom-right.

## Theming

One **source of truth** in `src/shared/lib/designTokens.ts` (colors, radius, font, spacing, breakpoints, control height). Both Tailwind and Ant Design consume these tokens so utilities like `bg-primary` / `rounded-md` line up with `<Button/>` / `<Card/>` visually.

```
src/shared/lib/designTokens.ts          # colors, radius, fontFamily, ... (source of truth)
     │
     ├──► tailwind.config.ts            # extend Tailwind theme (bg-primary, rounded-md, ...)
     │       │
     │       └──► src/index.css         # @config '../tailwind.config.ts'
     │
     └──► src/shared/lib/theme.ts       # AntD ConfigProvider (token + component overrides)
             │
             └──► src/app/providers/ThemeProvider.tsx
                     │
                     └──► <ConfigProvider theme={lightTheme | darkTheme}>
```

**Adding a new token:**
1. Add it to `src/shared/lib/designTokens.ts`.
2. Reference it in `tailwind.config.ts` (for Tailwind utilities).
3. Reference it in `src/shared/lib/theme.ts` (for AntD components).

**Ant Design component overrides** live in `sharedComponents` inside `src/shared/lib/theme.ts` (Button, Input, Card, Menu, Table, Layout, Form, ...). Prefer overriding here rather than writing global CSS.

**Tailwind preflight is skipped** (via modular imports in `src/index.css`) to avoid conflicts with Ant Design's internal reset. If you need extra base styles, add them to `src/index.css`.

## React Compiler

Enabled in `vite.config.ts` via `react({ compiler: true })`. It automatically memoises components and values at build time so you rarely need `useMemo` / `useCallback` / `React.memo` by hand.

- Runtime: `babel-plugin-react-compiler` (invoked through `oxc-transform-react`).
- Lint: `eslint-plugin-react-hooks@^7` bundles the `react-hooks/react-compiler` rule and enforces the Rules of React.
- Applies to both `pnpm build` and Storybook (same Vite config).
- Prefer plain code over manual memoisation — the compiler handles the common cases. Only fall back to `useMemo`/`useCallback` when profiling shows you need to.

## Storybook

Run `pnpm storybook` and open `http://localhost:6006`.

- Config lives in `.storybook/main.ts` (framework, addons, stories glob).
- Global decorators in `.storybook/preview.tsx`:
  - Loads Tailwind (`src/index.css`) and initializes i18next.
  - Wraps every story in AntD `ConfigProvider` (light/dark) and `QueryClientProvider`.
- **Global toolbar**:
  - **Theme** (light / dark) — `@storybook/addon-themes` toggles the `dark` class on `<html>`.
  - **Language** (English / Tiếng Việt) — swaps `i18n.language` at runtime.
- Story files are **co-located** next to the component: `LoginForm.tsx` ↔ `LoginForm.stories.tsx`.
- Title naming: `Layer/SubLayer/Component`, e.g. `Features/Auth/LoginForm`, `Shared/Layout/ThemeToggle`.

## Extension notes

- **Real auth**: the `loginRequest` in `features/auth/api/useLoginMutation.ts` is a mock — replace it with `http.post('/auth/login', input)` once you have a real backend.
- **Bundle size**: the production bundle is ~1.3 MB (unsplit). Consider `build.rollupOptions.output.manualChunks` or `React.lazy` on routes when needed.
- **Testing**: not set up. Recommended stack is `vitest` + `@testing-library/react`, co-located (`Component.test.tsx`) or under `__tests__/` per feature.
- **Mock API**: for offline development, consider [MSW](https://mswjs.io/).

## Coding standards

See [CODING_STANDARDS.md](./CODING_STANDARDS.md) for details.

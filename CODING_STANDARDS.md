# Coding Standards

Coding rules for this project. Follow them so the whole team writes in one style — code stays readable and easy to scale.

> Read [README.md](./README.md) first to understand the directory structure and data flow.

---

## 1. General principles

1. **YAGNI** — Only write code for the current requirement. No premature abstractions, no "just in case".
2. **Type safety first** — No `any`. If truly unavoidable, use `unknown` + a type guard.
3. **Don't handle impossible cases** — Only validate at boundaries (user input, external APIs).
4. **Don't comment WHAT** — Variable and function names should self-document. Comments are for WHY, only when the reason isn't obvious.
5. **Delete > comment out** — Remove unused code, don't leave it commented.

---

## 2. TypeScript

### 2.1 `type` vs `interface`
- Use `type` for object shapes, unions, intersections. Use `interface` only when you need declaration merging (rare).
- Component props: put `type Props = { ... }` right above the component.

```ts
// ✅
type User = {
  id: number
  name: string
}

type Props = {
  user: User
  onEdit?: (id: number) => void
}
```

### 2.2 Type-only imports
- Type-only imports must use `import type` (`verbatimModuleSyntax` is enabled).

```ts
// ✅
import type { User } from '@/features/users/types'
import { useUsersQuery } from '@/features/users/api/useUsersQuery'

// ❌
import { User, useUsersQuery } from '...'
```

### 2.3 Function return types
- Components: don't annotate the return type (TS infers JSX).
- Utility / API functions: **do** annotate the return type to make the contract explicit.

```ts
// ✅
async function fetchUsers(): Promise<User[]> {
  const { data } = await http.get<User[]>('/users')
  return data
}
```

### 2.4 Do not use
- `any` (use `unknown`).
- `enum` (use `as const` object or literal unions).
- `namespace`.
- Non-null assertion `!` (unless TS is genuinely wrong — comment WHY).

---

## 3. Naming conventions

| Category                        | Convention                | Example                              |
| ------------------------------- | ------------------------- | ------------------------------------ |
| Component file                  | `PascalCase.tsx`          | `LoginForm.tsx`, `AppHeader.tsx`     |
| Hook / util file                | `camelCase.ts`            | `useAuth.ts`, `queryKeys.ts`         |
| Route file (TanStack Router)    | `kebab-case` / `_prefix`  | `login.tsx`, `_app.tsx`, `$userId.tsx` |
| Folder                          | `kebab-case`              | `features/auth`, `shared/lib`        |
| React component                 | `PascalCase`              | `LoginForm`, `ThemeToggle`           |
| Hook                            | `camelCase`, prefix `use` | `useAuth`, `useUsersQuery`           |
| Zustand store                   | `camelCase`, suffix `Store` | `useAuthStore`, `useThemeStore`   |
| Zod schema                      | `camelCase`, suffix `Schema` | `loginSchema`, `userSchema`      |
| Schema-inferred type            | `PascalCase`, suffix `Input` | `LoginInput`, `UserInput`         |
| Constant                        | `SCREAMING_SNAKE_CASE`    | `SUPPORTED_LANGUAGES`, `AUTH_TOKEN_KEY` |
| Boolean                         | prefix `is/has/should`    | `isAuthenticated`, `hasError`        |
| Event handler                   | prefix `on` (prop) / `handle` (impl) | `onSubmit={handleSubmit}` |

---

## 4. Feature file layout

Every feature under `src/features/<name>/` follows this template:

```
features/<name>/
├── api/                # 1 file = 1 API call = 1 hook
│   ├── useXxxQuery.ts
│   └── useXxxMutation.ts
├── components/         # Components used only inside this feature
├── hooks/              # Hooks used only inside this feature
├── stores/             # (Optional) Local Zustand store
├── schemas.ts          # Zod schemas + inferred types
└── types.ts            # Primary entity types
```

**Do not** dump every API into a single `api.ts` — one hook per file makes it easier to tree-shake and to locate code.

---

## 5. Import order

Three groups, separated by a blank line, alphabetised within each group:

```ts
// 1. External packages (from the registry)
import { useMutation } from '@tanstack/react-query'
import { Button, Form } from 'antd'
import { useForm } from 'react-hook-form'

// 2. Internal absolute (@/...)
import { useAuthStore } from '@/features/auth/stores/authStore'
import { http } from '@/shared/lib/axios'

// 3. Relative (./...) — reserved for same-folder imports
import { LoginForm } from './LoginForm'
```

**Never use relative imports across folders** (`../../foo`). Use the `@/` alias.

---

## 6. Boundary rules (critical)

```
app       →  shared, features, routes, ...   (may import anything)
routes    →  features, shared                (only orchestrate — no business logic)
features  →  shared                          (MUST NOT import another feature)
shared    →  only third-party libs + shared  (MUST NOT import features/routes/app)
```

**How to handle a boundary break:**
- Feature A needs logic from Feature B → move that logic up to `shared/`.
- A component / hook is used in ≥2 features → move to `shared/components/` or `shared/hooks/`.
- A store is used cross-feature (theme, layout, ...) → put it in `app/stores/`.

---

## 7. React components

### 7.1 Function components + hooks only. No class components.

### 7.2 File layout
```tsx
// 1. Imports (see section 5)

// 2. Props type
type Props = {
  onSuccess?: () => void
}

// 3. Component (named export — no default export, except route files)
export function LoginForm({ onSuccess }: Props) {
  // 4. Hooks
  const { t } = useTranslation(['auth'])
  const login = useLoginMutation()

  // 5. Local state + derived state
  const { control, handleSubmit } = useForm<LoginInput>({ ... })

  // 6. Handlers
  const onSubmit = handleSubmit((values) => {
    login.mutate(values, { onSuccess: () => onSuccess?.() })
  })

  // 7. Early return (loading / error)
  if (login.isPending) return <Skeleton />

  // 8. JSX
  return <Form onFinish={onSubmit}>...</Form>
}
```

### 7.3 Named export vs default export
- **Route files** (`src/routes/**/*.tsx`) — export a named `Route` per the TanStack Router API.
- **Every other file** — use **named exports**. No default exports (safer renames, more accurate IDE auto-import).

### 7.4 Props
- `Props` is a **local type**, not exported unless there is a real reuse case.
- Optional callbacks: `onXxx?: () => void`. Do not default them to `() => {}`.

### 7.5 Memoisation (React Compiler)
React Compiler is enabled — it auto-memoises components, values, and callbacks at build time.

- **Do not** wrap things in `useMemo` / `useCallback` / `React.memo` by default. Write plain code.
- Only add manual memoisation when profiling proves it's needed AND the compiler skipped it (check with `eslint-plugin-react-hooks` — it warns if a component isn't memoisable).
- Follow the Rules of React strictly (no mutation of props/state, no side effects in render). The ESLint rule `react-hooks/react-compiler` enforces this.

---

## 8. Routing (TanStack Router)

### 8.1 File-based, don't edit `routeTree.gen.ts`
- Add/remove routes by adding/removing files under `src/routes/`. The plugin regenerates the tree.
- If the editor complains about a route path, run `pnpm dev` or `pnpm build` to regenerate.

### 8.2 Layout routes
- Prefix with `_` (hidden from URL).
- Guards live in `beforeLoad`; use `throw redirect({ to: '/login' })`.

```tsx
// src/routes/_app.tsx
export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    if (!useAuthStore.getState().isAuthenticated()) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  component: AppLayout,
})
```

### 8.3 Dynamic segments
- File `$paramName.tsx` → route `/parent/:paramName`. Read via `Route.useParams()`.
- Type-safe navigation:
```tsx
<Link to="/users/$userId" params={{ userId: String(id) }}>...</Link>
```

### 8.4 Route components only orchestrate
Route files **must not contain business logic**. They only:
- Declare `Route` (params, loader, beforeLoad).
- Render components from `features/*/components/` or `shared/components/`.

---

## 9. Data fetching (TanStack Query)

### 9.1 One API call = one hook = one file
Put the file in `features/<name>/api/`, named `useXxxQuery.ts` or `useXxxMutation.ts`.

### 9.2 Query keys always come from the factory
Defined in `src/shared/constants/queryKeys.ts`. Never hardcode keys inside a hook.

```ts
// shared/constants/queryKeys.ts
export const queryKeys = {
  users: {
    all: ['users'] as const,
    list: (params?: Record<string, unknown>) => ['users', 'list', params ?? {}] as const,
    detail: (id: number | string) => ['users', 'detail', id] as const,
  },
}

// features/users/api/useUsersQuery.ts
useQuery({ queryKey: queryKeys.users.list(), queryFn: fetchUsers })
```

### 9.3 Mutation invalidation
- After a successful mutation → invalidate related keys by the root (`queryKeys.users.all`) to refetch every list/detail.

```ts
onSuccess: () => {
  void qc.invalidateQueries({ queryKey: queryKeys.users.all })
}
```

### 9.4 Where to call the API
- **Only** inside `useXxxQuery` / `useXxxMutation` hooks. Never call `http.get(...)` directly from a component.

---

## 10. Forms (React Hook Form + Zod)

### 10.1 Schemas live in `features/<name>/schemas.ts`
Error messages are written as **i18n keys** so the component can pass them through `t()`.

```ts
export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'auth:errors.emailRequired' })
    .email({ message: 'auth:errors.emailInvalid' }),
  password: z.string()
    .min(6, { message: 'auth:errors.passwordShort' }),
})
export type LoginInput = z.infer<typeof loginSchema>
```

### 10.2 Use `Controller` to bind AntD components
```tsx
<Controller
  control={control}
  name="email"
  render={({ field, fieldState }) => (
    <Form.Item
      label={t('auth:login.email')}
      validateStatus={fieldState.error ? 'error' : ''}
      help={fieldState.error ? t(fieldState.error.message ?? '') : undefined}
    >
      <Input {...field} />
    </Form.Item>
  )}
/>
```

### 10.3 Submission
- Use RHF's `handleSubmit(callback)`. Do not use AntD's `Form.useForm()`.
- Inside the callback, call the mutation and handle side effects in `onSuccess`/`onError`.

---

## 11. State management (Zustand)

### 11.1 When to use Zustand
- Truly **global / cross-component** state: theme, auth user, layout collapsed, ...
- **Do not** use it for:
  - Server state → use TanStack Query.
  - Form state → use React Hook Form.
  - Local UI state → use `useState`.

### 11.2 Convention
- Hook name: `useXxxStore` (e.g. `useAuthStore`, `useThemeStore`).
- If it needs to persist → use the `persist` middleware with a unique `name`.
- Use the selector pattern to avoid unnecessary re-renders:

```tsx
// ✅
const user = useAuthStore((s) => s.user)
const reset = useAuthStore((s) => s.reset)

// ❌ — re-renders whenever ANY state changes
const { user, reset } = useAuthStore()
```

### 11.3 Access outside of React
Inside guards / interceptors, read the store via `getState()`:

```ts
if (useAuthStore.getState().isAuthenticated()) { ... }
```

---

## 12. HTTP (Axios)

- **Never create another axios instance** inside a component / feature. Use `http` from `@/shared/lib/axios`.
- Never call `axios.get(url)` directly — always go through `http`.
- If a specific API needs a custom config (custom timeout, cancel token, ...), build a helper in `features/<name>/api/` on top of `http`.

```ts
// ✅
import { http } from '@/shared/lib/axios'
const { data } = await http.get<User[]>('/users')

// ❌
import axios from 'axios'
const { data } = await axios.get('https://...')
```

---

## 13. i18n

### 13.1 Namespaces
- One namespace per feature: `common`, `auth`, `users`, ...
- Resource files at `src/locales/<lang>/<namespace>.json`.

### 13.2 Key format
- Nested object; `:` targets a namespace, `.` walks the path:
```ts
t('auth:login.title')        // namespace auth, key login.title
t('common:actions.save')
t('nav.dashboard')           // default namespace = common
```

### 13.3 No hardcoded text
Every user-facing string (label, placeholder, message) goes through `t()`. Exception: technical text (console.log, error stacks) may be hardcoded.

### 13.4 Adding a new language
1. Create the folder `src/locales/<code>/`.
2. Add the import + resources in `src/shared/lib/i18n.ts`.
3. Append `<code>` to `SUPPORTED_LANGUAGES`.
4. Add a mapping in `antdLocaleMap` in `src/app/providers/ThemeProvider.tsx`.
5. Add a `language.<code>` entry to `common.json` for every language.

---

## 14. Styling (AntD + Tailwind)

### 14.1 Roles
- **AntD** — structured components (Button, Form, Table, Modal, Select, DatePicker, message, notification).
- **Tailwind** — layout, spacing, responsive, utility. Only use it for the layout around AntD; don't rebuild UI that AntD already ships.

### 14.1.1 Design tokens (single source of truth)
`src/shared/lib/designTokens.ts` is the ONLY place to define colors / radius / font / spacing / breakpoints / control height. Both Tailwind (`tailwind.config.ts`) and AntD (`src/shared/lib/theme.ts`) import from it.

- **Never hardcode** hex colors, radii, or font sizes in components — reference the token indirectly via a Tailwind utility (`bg-primary`, `rounded-md`) or the AntD theme.
- Adding a new token → put it in `designTokens.ts` first, then wire into both configs.

### 14.2 Don't
- Don't create per-component CSS files. Exception: global tokens in `src/index.css`.
- Don't use inline `style={{...}}` unless the value is dynamic (e.g. `style={{ width: percent + '%' }}`).
- Don't touch AntD internal classes (`.ant-btn`) — customise through `theme.token` in `shared/lib/theme.ts` or a scoped `ConfigProvider`.

### 14.3 Dark mode
- Tailwind: use the `dark:` prefix (e.g. `bg-white dark:bg-neutral-900`).
- Toggle via `useThemeStore.toggle()` — it sets the `dark` class on `<html>` and switches the AntD `ConfigProvider` theme.

### 14.4 Class names
- Order: layout → spacing → sizing → color → state (hover/focus/dark). Install `prettier-plugin-tailwindcss` if you want auto-sorting.
- If the class list is very long (>3 lines) → extract a variable or a subcomponent.

---

## 15. Error handling

### 15.1 UI (component)
- Query error: use `useQuery.isError` and render `<Alert type="error">`.
- Mutation error: use `useMutation.isError` and either AntD `message.error()` or an `<Alert>`.
- **Do not** wrap the whole app in try/catch. TanStack Query already handles it.

### 15.2 Interceptor
- `shared/lib/axios.ts` handles 401 (clear token + redirect to login). Other statuses propagate to the caller.

### 15.3 Error boundary
- Not set up yet. When needed → add `shared/components/ErrorBoundary.tsx` and wrap it in `AppProviders`.

---

## 16. Assets

- Icons: use `@ant-design/icons`. Import only the icons you need (tree-shakeable).
- Static images: put them in `public/` (served from `/`) or `src/assets/` (goes through the Vite bundler with a content hash).
- Inline SVG: if you need to customise color → render as a React component.

---

## 17. ESLint & format

- ESLint config at `eslint.config.js` (flat config).
- Run `pnpm lint` before committing. Use `pnpm lint:fix` to auto-fix.
- **Do not use `eslint-disable`** unless truly necessary. If you do, add a WHY comment on the line above.

```ts
// ✅
// eslint-disable-next-line react-hooks/exhaustive-deps
// Runs once on mount; the mounted-flag guard below keeps it idempotent
useEffect(() => { ... }, [])
```

---

## 18. Git commit

Conventional commits are recommended (not enforced):

```
feat(users): add create user modal
fix(auth): redirect to login on 401
refactor(shared): extract axios interceptor
chore: bump antd to 6.6.3
docs: update coding standards
```

- Scope: feature name or `shared`, `app`, `routes`.
- Type: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`.

---

## 19. Storybook

### 19.1 Co-locate stories
Place `.stories.tsx` files **next to** the component, do not split them into a separate folder:
```
features/auth/components/
├── LoginForm.tsx
└── LoginForm.stories.tsx
```

### 19.2 Title convention
`<Layer>/<SubLayer>/<Component>`:
- `Shared/Layout/ThemeToggle`
- `Features/Auth/LoginForm`
- `Features/Users/UserForm`

### 19.3 Story file layout
```tsx
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { MyComponent } from './MyComponent'

const meta = {
  title: 'Features/Foo/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),   // use fn() for every callback
  },
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
```

### 19.4 Don't re-wrap global decorators
`.storybook/preview.tsx` already wraps everything with `ConfigProvider` (AntD), `QueryClientProvider`, i18n, and Tailwind CSS. **Do not** re-wrap them inside a story unless you need to override.

### 19.5 Mock data in stories
- API queries: mock by adding a story-level decorator that seeds a custom `QueryClient`.
- Router: if the component uses `useNavigate` / `Link`, add a `RouterProvider` mock in that story's `decorators`.
- Zustand: reset in `beforeEach` (`useAuthStore.setState({ user: null })`) when needed.

### 19.6 A11y check
`@storybook/addon-a11y` is installed — open the "Accessibility" tab in Storybook to inspect violations for the current story. Fix every **serious/critical** violation before merging.

---

## 20. Pre-PR checklist

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes (no new warnings)
- [ ] `pnpm build` passes
- [ ] `pnpm build-storybook` passes
- [ ] New components ship with a co-located `.stories.tsx`
- [ ] No stray `console.log`
- [ ] No unexplained `TODO`
- [ ] Every new string is translated in all `src/locales/` languages
- [ ] No boundary-rule violations (section 6)
- [ ] New components live in the right layer (features vs shared vs routes)
- [ ] New mutations invalidate the right queries

---

## 21. Example: adding a new "posts" feature

```
1. Scaffold
   src/features/posts/
   ├── api/
   │   ├── usePostsQuery.ts
   │   ├── usePostQuery.ts
   │   └── useCreatePostMutation.ts
   ├── components/
   │   ├── PostList.tsx
   │   └── PostForm.tsx
   ├── schemas.ts
   └── types.ts

2. Add query keys
   src/shared/constants/queryKeys.ts
   → add posts: { all, list, detail }

3. Add locales
   src/locales/{en,vi}/posts.json
   → add the 'posts' namespace to i18n.ts

4. Add routes
   src/routes/_app/posts/index.tsx
   src/routes/_app/posts/$postId.tsx
   → appears in routeTree automatically when you run dev/build

5. Add a sidebar menu item
   src/shared/components/layout/AppSidebar.tsx

6. Add co-located stories
   src/features/posts/components/PostForm.stories.tsx
   src/features/posts/components/PostList.stories.tsx
```

Follow the existing patterns → faster reviews, fewer bugs.

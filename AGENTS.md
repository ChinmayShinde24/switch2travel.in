<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Switch2Travel — agent conventions

Follow these on **every** task in this project (features, fixes, admin, APIs, UI).

## 1. Backend flow (always in this order)

When adding or changing server features, keep the pipeline:

```text
types → models → validation/helpers → routes (API)
```

| Step | Location | Responsibility |
|------|----------|----------------|
| **Types** | `src/types/<domain>.ts` | Shared TS shapes, enums, inputs, payloads |
| **Model** | `src/models/<Name>.ts` | Mongoose schema + model export |
| **Validation / helpers** | `src/lib/<domain>-validation.ts`, `src/lib/<domain>-server.ts` | Zod schemas, serializers, DRY helpers |
| **Routes** | `src/app/api/.../route.ts` | `safeParse` → `connectDB` → model → `NextResponse` |

Do **not** invent ad-hoc types only inside a route when the domain already has (or should have) a `types` + `models` layer.

Auth pattern to mirror: `types/user.ts` → `models/User.ts` → `lib/auth-validation.ts` / `lib/auth-server.ts` → `app/api/auth/*`.

Admin bootstrap is Postman-only: `POST /api/admin/auth/create` (never create `role: "admin"` from public signup).

## 2. UI — prefer shadcn; install what you need

- For UI work, **use shadcn/ui components** from `src/components/ui/` whenever they fit (Button, DropdownMenu, Sheet, ScrollArea, Sonner, etc.).
- If a needed shadcn component is missing, **install it** (do not hand-roll a duplicate):

```bash
npx shadcn@latest add <component> --yes
```

- Install related npm packages when required (e.g. `sonner`, `@imagekit/next`, TipTap). Prefer matching versions already used in the repo.
- Keep custom UI in feature folders (`src/components/home/`, `src/components/admin/`, `src/components/layout/`) and compose shadcn primitives there.

## 3. Brand — match logo, color, and typography on every new UI

When creating or restyling **any** component (public site, auth, admin), reuse the existing brand — do **not** invent a parallel look.

| Token | Use |
|-------|-----|
| **Logo** | `/public/final.png` — same asset as navbar/auth (`NavbarLogo`, auth shell). Prefer the real logo over text-only “Switch2Travel” wordmarks when branding a shell/header/account chip. The mark has **dark text** — on dark shells always sit it on a light `BentoCell` / white card (`bg-card`), never directly on `slate-950`. |
| **Primary actions** | `bg-sky-600` / `hover:bg-sky-700` / text white (buttons, admin CTA, profile chip). |
| **Accents / labels** | `text-sky-700` (light surfaces), `text-sky-400` / `sky-300` (dark surfaces), cyan only as a secondary glow (e.g. home rail), not a second primary. |
| **Surfaces** | Light pages: `bg-slate-100` + white cards + `border-slate-200`. Dark shells (admin sidebar, hero overlays): `bg-slate-950` + white/10 borders. |
| **Typography** | `font-display` (Geist) for titles/nav labels; `font-lato` for body/supporting copy; `font-open-sans` for small uppercase eyebrows/tags (`tracking-[0.16em]`–`0.22em`). Default `font-sans` (Roboto Condensed) only where already established. |
| **Shape** | Prefer `rounded-xl` / `rounded-2xl` for admin cards and controls; match auth/navbar radii near those surfaces. |

Admin must feel like the same product as the marketing site: logo in the shell + account area, sky CTAs, display/lato/open-sans hierarchy.

## 4. State — Context only where it is required

- **Keep** `AuthProvider` / `useAuth` for session (`user`, `isAdmin`, login/logout). Auth cookies hold `_id` + `role` (httpOnly).
- **Do not** add Redux unless there is a clear, large shared client graph that Context/Query cannot handle.
- **Local `useState` / `useReducer`** for forms and one-off UI.
- **Add a new Context only when** the same client state is truly shared across unrelated components (e.g. booking cart). Prefer URL params for filters; prefer fetch/TanStack Query later for server lists (trips, taxonomies).
- Until that shared need exists: **no extra Context**.

## Quick checklist before finishing work

- [ ] Backend: types → model → lib validation/helpers → API route
- [ ] UI: shadcn used or installed via CLI; no unnecessary custom primitives
- [ ] Brand: logo (`/final.png`), sky palette, and display/lato/open-sans match existing surfaces (including admin)
- [ ] State: Auth Context only unless a new shared client concern is justified
- [ ] Public signup never creates admins; admin create stays Postman + `ADMIN_SETUP_SECRET`

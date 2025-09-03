### Part 1: Project File Structure

```plaintext
/ (monorepo root)
├── 📂 apps/
│   └── 📂 web/                  # Main Next.js application
│       ├── 📂 app/
│       │   ├── 📂 (public-sites)/ # Route group for public sites
│       │   │   ├── [site]/      # Dynamic route for each project/site
│       │   │   │   ├── [...slug]/page.tsx
│       │   │   │   └── layout.tsx
│       │   │   └── page.tsx
│       │   ├── 📂 admin/        # Built-in Headless CMS
│       │   │   ├── (auth)/      # Authentication routes
│       │   │   ├── dashboard/
│       │   │   ├── collections/ # CRUD interfaces for content collections
│       │   │   │   ├── [collection]/[item]/page.tsx
│       │   │   │   └── [collection]/page.tsx
│       │   │   └── layout.tsx   # Protected layout for the admin panel
│       │   ├── 📂 api/
│       │   │   ├── auth/          # NextAuth.js endpoints
│       │   │   ├── content/       # API for CMS CRUD operations
│       │   │   ├── pdf/route.ts   # API for PDF generation
│       │   │   └── preview/route.ts # API for Next.js Draft Mode
│       │   └── layout.tsx         # Global HTML/Body layout
│       ├── 📂 content/            # Data source (Git-as-CMS)
│       │   ├── _schemas/          # Schema definitions for collections
│       │   │   ├── product.ts     # (Zod Schema)
│       │   │   └── article.ts     # (Zod Schema)
│       │   └── 📂 site-a/
│       │       ├── _config/       # Site configuration
│       │       │   ├── settings.ts  # (designSystem: 'company-a', etc.)
│       │       │   └── navigation.ts
│       │       └── 📂 products/   # 'products' collection
│       │           └── super-product.mdx
│       ├── 📂 lib/                # Core engine and utilities
│       │   ├── api.ts             # Data Abstraction Layer
│       │   ├── design-systems.ts  # Logic for managing design systems
│       │   ├── content-loader.ts  # Functions for loading and parsing MDX
│       │   └── zod-schemas.ts     # Unified export of all Zod schemas
│       ├── 📂 public/
│       │   ├── 📂 design-systems/ # Static assets (logos, icons)
│       │   │   └── 📂 company-a/
│       │   └── search-index.json  # Generated index for search
│       └── 📂 emails/             # React Email templates
│           └── ProposalNotification.tsx
├── 📂 packages/                   # Reusable code
│   ├── 📂 ui/                     # Shared UI library (Shadcn)
│   ├── 📂 config/                 # Shared configs (ESLint, TSConfig)
│   └── 📂 pdf-templates/          # Templates for @react-pdf/renderer
│       └── ProposalTemplate.tsx
├── 📂 scripts/                    # Automation scripts
│   ├── build-search-index.js    # Generates public/search-index.json
│   └── migrate-content.js       # Script for migrating data in MDX files
└── package.json
```

---

### Part 2: Technology Stack

#### Core & Architecture
*   **Runtime:** Bun
*   **Monorepo:** Bun Workspaces
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Data Strategy:** Git-as-CMS
*   **Data Abstraction:** Repository Pattern

#### UI & Frontend
*   **Component Library:** Shadcn/ui
*   **Icons:** Lucide React
*   **Constructor UI:** dnd-kit (Drag & Drop)
*   **User Onboarding:** Driver.js (Interactive Tours)
*   **Data Visualization:** Tremor (Dashboards in CMS)
*   **Notifications:** Sonner

#### Backend & Automation
*   **Authentication:** NextAuth.js
*   **AI Agent Trigger:** Cloudflare Cron Triggers
*   **AI Agent Logic:** Cloudflare Worker
*   **GitHub API Client:** Octokit.js

#### Data & Content
*   **Content Format:** MDX (Markdown with JSX)
*   **Schema Definition & Validation:** Zod
*   **Client-Side Search:** Fuse.js
*   **PDF Generation:** @react-pdf/renderer
*   **MDX Rendering:** next-mdx-remote
*   **MDX Styling:** @tailwindcss/typography

#### Communication & Analytics
*   **Transactional Emails:** React Email + Resend
*   **Comments:** Giscus
*   **Web Analytics:** Plausible
*   **Error Tracking:** GlitchTip

#### Tooling & DX (Developer Experience)
*   **Forms:** React Hook Form
*   **Git Hooks:** Husky + lint-staged
*   **Linter/Formatter:** ESLint + Prettier
*   **Code Generation:** Hygen
*   **Testing:** Bun Test (Unit), Playwright (E2E)

---

### Part 3: Implementation Steps (Roadmap)

#### Phase 1: Foundation & Core Setup
1.  **Monorepo Setup:** Initialize the project with Bun Workspaces.
2.  **Next.js Initialization:** Create the `apps/web` application.
3.  **Base Tooling Setup:** Install and configure TypeScript, ESLint, Prettier, and Husky in `packages/config`.
4.  **Shadcn/ui Integration:** Set up the UI library and move shared components to `packages/ui`.
5.  **Directory Scaffolding:** Implement the file structure as defined in Part 1.

#### Phase 2: Content Engine & Data Layer
6.  **Schema Definition:** Describe base collection schemas (e.g., `product`, `article`) using Zod in `content/_schemas`.
7.  **DAL Implementation:** Write functions in `lib/api.ts` to read, parse, and validate MDX files based on Zod schemas.
8.  **Search Index Script:** Create the `scripts/build-search-index.js` script to generate `search-index.json`.

#### Phase 3: Public Sites
9.  **Dynamic Routing:** Implement the `app/(public-sites)/[site]` structure to render multiple sites.
10. **Dynamic Layout:** Create a `layout.tsx` that loads the site configuration (`settings.ts`, `navigation.ts`) and applies the corresponding design system.
11. **Content Rendering:** Create `[...slug]/page.tsx` pages that call the DAL to fetch and display content.

#### Phase 4: Custom Headless CMS
12. **Authentication:** Set up NextAuth.js with a provider (e.g., GitHub) and protect the `/admin` routes via Middleware.
13. **CMS Interface:** Build the UI for navigating collections and items in `/app/admin` using the `Table` component from Shadcn/ui.
14. **Editing Forms:** Create dynamic forms based on Zod schemas using `React Hook Form` and Shadcn components.
15. **Content API:** Write API routes in `/app/api/content/` to handle data from the CMS and perform write/delete/update operations on MDX files.

#### Phase 5: Key Product Features
16. **Block-Based Constructor:** Integrate `dnd-kit` into the CMS interface to create and manage content blocks.
17. **PDF Generation:** Create templates in `packages/pdf-templates` and an API route `/api/pdf/route.ts` to generate PDFs using `@react-pdf/renderer`.
18. **React Email Integration:** Create templates in `/emails` and set up sending via Resend.
19. **Giscus Integration:** Add the Giscus component to article/documentation pages.

#### Phase 6: Automation & Operations
20. **AI Agent:** Write the Cloudflare Worker code to generate content and commit it to GitHub via Octokit.js.
21. **Cron Trigger:** Set up Cloudflare Cron Triggers to periodically invoke the Worker.
22. **Analytics & Monitoring:** Deploy (or connect) Plausible and GlitchTip; integrate them into the application.
23. **E2E Testing:** Write Playwright tests for critical user flows: login, content creation/editing, and PDF generation.
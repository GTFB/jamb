# Jamb Project Structure

## Root Structure
```
jamb/
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/            # Next.js App Router
│       │   │   ├── (public-sites)/  # Public site routes
│       │   │   │   └── [site]/      # Dynamic site routes
│       │   │   ├── admin/           # Admin dashboard
│       │   │   ├── login/          # Login page
│       │   │   └── layout.tsx      # Root layout
│       │   ├── components/         # Shared components
│       │   │   ├── auth/          # Authentication components
│       │   │   ├── blocks/        # Content block components
│       │   │   ├── forms/         # Form components
│       │   │   └── media/         # Media management components
│       │   ├── content/           # Content files (MDX)
│       │   │   ├── _schemas/      # Zod schemas for content validation
│       │   │   └── site-a/        # Site-specific content
│       │   │       ├── _config/   # Site configuration
│       │   │       ├── articles/  # Article content
│       │   │       └── products/  # Product content
│       │   ├── emails/            # Email templates
│       │   ├── lib/               # Utility libraries
│       │   │   ├── api.ts         # Content repository
│       │   │   └── utils.ts       # Utility functions
│       │   └── styles/            # Global styles
│       ├── public/                # Static assets
│       ├── tailwind.config.ts     # Tailwind CSS configuration
│       └── package.json           # Web app dependencies
├── packages/
│   └── ui/                       # Shared UI components
│       ├── components/            # React components
│       │   ├── Header.tsx        # Site header component
│       │   ├── Footer.tsx        # Site footer component
│       │   ├── LoginForm.tsx     # Login form component
│       │   ├── button.tsx        # Button component
│       │   ├── input.tsx         # Input component
│       │   ├── card.tsx          # Card component
│       │   └── ...               # Other UI components
│       ├── lib/                   # UI utilities
│       │   └── utils.ts           # Utility functions
│       ├── styles.css             # Component styles
│       ├── index.ts               # Component exports
│       └── package.json           # UI package dependencies
├── _templates/                    # Hygen templates
│   ├── component/                 # Component generation templates
│   ├── page/                      # Page generation templates
│   └── form/                      # Form generation templates
├── scripts/                       # Build and utility scripts
│   ├── build-search-index.js     # Search index generation
│   └── generate-sitemap.js        # Sitemap generation
├── bun.lockb                      # Bun lock file
├── package.json                   # Root package.json (workspace)
└── README.md                      # Project documentation
```

## Key Architectural Decisions

### 1. Monorepo Structure
- **apps/web**: Main Next.js application
- **packages/ui**: Shared UI components library
- Clear separation between application logic and reusable components

### 2. Content Organization
- **Git-as-CMS**: All content stored in Git repositories
- **Site-specific content**: Each site has its own content directory
- **Schema validation**: Zod schemas ensure content type safety
- **MDX support**: Rich content with React components

### 3. Component Architecture
- **Shared UI library**: Common components in packages/ui
- **Site-specific components**: Layout components in apps/web
- **Styled-components**: Consistent styling across components
- **TypeScript**: Full type safety for all components

### 4. Routing Structure
- **App Router**: Next.js 13+ App Router for modern routing
- **Dynamic routes**: [site] for multi-site support
- **Route groups**: (public-sites) for public site organization
- **Middleware**: Authentication and routing protection

### 5. Development Tools
- **Hygen**: Code generation for consistency
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality assurance

## Content Flow

1. **Content Creation**: MDX files with frontmatter
2. **Schema Validation**: Zod schemas validate content structure
3. **Content Repository**: API layer for content access
4. **Component Rendering**: React components render content
5. **Static Generation**: Next.js generates static pages

## Deployment Strategy

- **Static Generation**: Pre-rendered pages for performance
- **Incremental Static Regeneration**: Dynamic content updates
- **CDN Distribution**: Global content delivery
- **Git-based Deployment**: Automatic deployments on content changes

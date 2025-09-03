# Jamb - Git-as-CMS Platform

A modern content management system built with Next.js, TypeScript, and Bun. Jamb provides a Git-as-CMS approach with multi-site support, dynamic content management, and advanced features like PDF generation and email templates.

## 🚀 Features

- **Git-as-CMS**: Manage content through Git with MDX files and automatic validation
- **Multi-Site Support**: Create and manage multiple sites from a single platform
- **Dynamic Content**: Render content with Next.js App Router and MDX
- **Admin Panel**: Built-in headless CMS with collection management
- **PDF Generation**: Create professional PDFs with React PDF templates
- **Email Templates**: Send transactional emails with React Email
- **Modern Stack**: Built with Next.js, TypeScript, Tailwind CSS, and Bun

## 🏗️ Architecture

### Monorepo Structure
```
/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── ui/                  # Shared UI components (Shadcn/ui)
│   ├── config/              # Shared configurations (ESLint, Prettier)
│   └── pdf-templates/       # PDF templates (@react-pdf/renderer)
└── scripts/                 # Automation scripts
```

### Technology Stack
- **Runtime**: Bun
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with Zod validation
- **UI**: Shadcn/ui components
- **PDF**: @react-pdf/renderer
- **Email**: React Email + Resend

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.0.0 or later)
- Node.js (for development tools)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/jamb.git
cd jamb
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

### Content Management
- `apps/web/content/_schemas/` - Zod schemas for content validation
- `apps/web/content/site-*/` - Site-specific content directories
- `apps/web/lib/api.ts` - Data Abstraction Layer (DAL)

### Admin Panel
- `apps/web/src/app/admin/` - Admin panel routes
- `apps/web/src/app/admin/collections/` - Collection management

### Public Sites
- `apps/web/src/app/(public-sites)/` - Public site routes
- `apps/web/src/app/(public-sites)/[site]/` - Dynamic site pages

### Shared Components
- `packages/ui/` - Reusable UI components
- `packages/pdf-templates/` - PDF generation templates

## 🔧 Development

### Available Scripts
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run test` - Run tests

### Adding New Content Types
1. Create a Zod schema in `apps/web/content/_schemas/`
2. Add the schema to the exports in `apps/web/content/_schemas/index.ts`
3. Create content directories as needed
4. Update the DAL if necessary

### Creating PDF Templates
1. Create a new template in `packages/pdf-templates/`
2. Export it from `packages/pdf-templates/index.ts`
3. Use it in API routes or components

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables:
   - `RESEND_API_KEY` - For email functionality
   - `NEXTAUTH_SECRET` - For authentication
   - `GITHUB_CLIENT_ID` - For GitHub OAuth
   - `GITHUB_CLIENT_SECRET` - For GitHub OAuth

### Environment Variables
Create a `.env.local` file in the `apps/web/` directory:
```env
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 📚 Documentation

- [TECH_SPEC.md](./TECH_SPEC.md) - Detailed technical specification
- [API Documentation](./docs/api.md) - API reference
- [Content Management](./docs/content.md) - Content management guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

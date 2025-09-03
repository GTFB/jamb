import { contentRepo } from '@/lib/api';
import { notFound } from 'next/navigation';

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    site: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { site } = params;
  
  // Get site configuration
  const siteConfig = await contentRepo.getSiteConfig(site);
  
  if (!siteConfig) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">
              {siteConfig.settings?.name || site}
            </div>
            <div className="flex space-x-6">
              {siteConfig.navigation?.map((item: any) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 {siteConfig.settings?.name || site}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

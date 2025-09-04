'use client'

import { Header, Footer } from '@jamb/ui';

interface SiteConfig {
  name?: string;
  navigation?: {
    main?: Array<{ label: string; url: string }>;
  };
}

interface SiteLayoutClientProps {
  children: React.ReactNode;
  siteConfig: SiteConfig;
  site: string;
}

export function SiteLayoutClient({ children, siteConfig, site }: SiteLayoutClientProps) {
  return (
    <>
      <Header 
        siteName={siteConfig?.name || site}
        navigation={siteConfig?.navigation?.main}
      />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      
      <Footer siteName={siteConfig?.name || site} />
    </>
  );
}

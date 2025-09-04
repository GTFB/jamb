import { contentRepo } from '@/lib/api';
import { notFound } from 'next/navigation';
import { SiteLayoutClient } from './SiteLayoutClient';

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    site: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { site } = await params;
  
  // Get site configuration with fallback
  let siteConfig;
  try {
    siteConfig = await contentRepo.getSiteConfig(site);
  } catch (error) {
    console.error(`Error loading site config for ${site}:`, error);
    siteConfig = {
      name: site,
      navigation: { main: [] }
    };
  }
  
  if (!siteConfig) {
    siteConfig = {
      name: site,
      navigation: { main: [] }
    };
  }

  return (
    <SiteLayoutClient 
      siteConfig={siteConfig}
      site={site}
    >
      {children}
    </SiteLayoutClient>
  );
}

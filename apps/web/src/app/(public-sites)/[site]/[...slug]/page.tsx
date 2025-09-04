import { notFound } from 'next/navigation';

interface ContentPageProps {
  params: {
    site: string;
    slug: string[];
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { site, slug } = await params;
  
  // For now, just show a 404 for dynamic routes
  notFound();
}

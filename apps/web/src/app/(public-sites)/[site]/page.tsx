import { contentRepo } from '@/lib/api';
import Link from 'next/link';

interface SitePageProps {
  params: {
    site: string;
  };
}

export default function SitePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Site A</h1>
      <p className="text-lg mb-4">
        This is a sample site built with Jamb CMS. You can customize this page with your own content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p>Learn how to use Jamb CMS to build your next website.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <p>Discover the powerful features of Jamb CMS.</p>
        </div>
      </div>
    </div>
  );
}

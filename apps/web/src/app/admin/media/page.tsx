import { MediaLibrary } from '@/components/media/MediaLibrary';
import { ImageUpload } from '@/components/media/ImageUpload';

interface MediaPageProps {
  searchParams: {
    site?: string;
  };
}

export default function MediaPage({ searchParams }: MediaPageProps) {
  const { site } = searchParams;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Media Library
          </h1>
          <p className="text-gray-600">
            Manage your media files
            {site && ` for site: ${site}`}
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New File</h2>
        <ImageUpload
          onUpload={(url) => {
            // Refresh the page to show new file
            window.location.reload();
          }}
          siteId={site}
        />
      </div>

      {/* Media Library */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Media Files</h2>
        <MediaLibrary
          onSelect={(url) => {
            // Copy URL to clipboard
            navigator.clipboard.writeText(url);
            alert('URL copied to clipboard!');
          }}
          siteId={site}
        />
      </div>
    </div>
  );
}

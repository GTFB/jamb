import Link from 'next/link';
import { contentRepo } from '@/lib/api';
import { Button } from '@jamb/ui';

interface CollectionsPageProps {
  params: {
    collection: string;
  };
  searchParams: {
    site?: string;
  };
}

export default async function CollectionsPage({ params, searchParams }: CollectionsPageProps) {
  const { collection } = params;
  const { site } = searchParams;
  
  // Get items from the collection
  const items = await contentRepo.getCollection(collection as any, site);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {collection.charAt(0).toUpperCase() + collection.slice(1)} Collection
          </h1>
          <p className="text-gray-600">
            Manage your {collection} content
            {site && ` for site: ${site}`}
          </p>
        </div>
        <Link
          href={`/admin/collections/${collection}/new${site ? `?site=${site}` : ''}`}
        >
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New {collection.charAt(0).toUpperCase() + collection.slice(1)}
          </Button>
        </Link>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.frontmatter.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.frontmatter.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.frontmatter.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.frontmatter.createdAt 
                      ? new Date(item.frontmatter.createdAt).toLocaleDateString()
                      : 'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/collections/${collection}/${item.slug}${site ? `?site=${site}` : ''}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/${site || ''}/${collection}/${item.slug}`}
                        className="text-gray-600 hover:text-gray-800"
                        target="_blank"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {items.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No {collection} found</p>
              <Link
                href={`/admin/collections/${collection}/new${site ? `?site=${site}` : ''}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Create your first {collection}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

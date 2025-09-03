import Link from 'next/link';
import { contentRepo } from '@/lib/api';

interface CollectionsPageProps {
  params: {
    collection: string;
  };
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const { collection } = params;
  
  // Get items from the collection
  const items = await contentRepo.getCollection(collection as any);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {collection.charAt(0).toUpperCase() + collection.slice(1)} Collection
          </h1>
          <p className="text-gray-600">
            Manage your {collection} content
          </p>
        </div>
        <Link
          href={`/admin/collections/${collection}/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New {collection.charAt(0).toUpperCase() + collection.slice(1)}
        </Link>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            All {collection.charAt(0).toUpperCase() + collection.slice(1)}s
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {item.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.frontmatter.description || 'No description'}
                  </p>
                </div>
                
                {/* Status badges */}
                <div className="flex items-center space-x-2">
                  {item.frontmatter.published ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Draft
                    </span>
                  )}
                  
                  {item.frontmatter.featured && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  href={`/admin/collections/${collection}/${item.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </Link>
                <Link
                  href={`/${collection}/${item.slug}`}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                  target="_blank"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No {collection} found</p>
              <Link
                href={`/admin/collections/${collection}/new`}
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

import Link from 'next/link';
import { contentRepo } from '@/lib/api';

export default async function AdminPage() {
  // Get basic stats
  const sites = await contentRepo.getSites();
  const products = await contentRepo.getCollection('product');
  const articles = await contentRepo.getCollection('article');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Jamb admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sites</p>
              <p className="text-2xl font-bold text-gray-900">{sites.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Articles</p>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/collections/product"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Add Product</p>
              <p className="text-sm text-gray-600">Create a new product</p>
            </div>
          </Link>

          <Link
            href="/admin/collections/article"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900">Add Article</p>
              <p className="text-sm text-gray-600">Create a new article</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Content</h2>
        <div className="space-y-4">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{product.frontmatter.title}</p>
                <p className="text-sm text-gray-600">Product • {product.frontmatter.price} {product.frontmatter.currency}</p>
              </div>
              <Link
                href={`/admin/collections/product/${product.slug}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

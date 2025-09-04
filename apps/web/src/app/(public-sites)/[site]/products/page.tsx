import { contentRepo } from '@/lib/api';
import Link from 'next/link';

interface ProductsPageProps {
  params: {
    site: string;
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { site } = await params;
  
  // Get all products
  const products = await contentRepo.getCollection('products', site);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                {product.category && (
                  <div className="mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {product.price} {product.currency}
                  </span>
                  <Link
                    href={`/${site}/products/${product.slug}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}
    </div>
  );
}

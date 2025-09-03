import { contentRepo } from '@/lib/api';
import Link from 'next/link';

interface SitePageProps {
  params: {
    site: string;
  };
}

export default async function SitePage({ params }: SitePageProps) {
  const { site } = params;
  
  // Get site configuration and featured products
  const [siteConfig, products] = await Promise.all([
    contentRepo.getSiteConfig(site),
    contentRepo.getCollection('product', site),
  ]);

  const featuredProducts = products.filter(p => p.frontmatter.featured).slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to {siteConfig.settings?.name || site}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {siteConfig.settings?.description || 'Discover amazing products and services.'}
        </p>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.frontmatter.images?.[0] && (
                  <img
                    src={product.frontmatter.images[0]}
                    alt={product.frontmatter.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.frontmatter.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      {product.frontmatter.price} {product.frontmatter.currency}
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
        </section>
      )}

      {/* About Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
        <p className="text-gray-600">
          We are dedicated to providing the best products and services to our customers. 
          Our commitment to quality and innovation drives everything we do.
        </p>
      </section>
    </div>
  );
}

import { contentRepo } from '@/lib/api';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ContentPageProps {
  params: {
    site: string;
    slug: string[];
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { site, slug } = params;
  const [collection, itemSlug] = slug;
  
  // Get the content item
  const item = await contentRepo.getItem(collection as any, itemSlug, site);
  
  if (!item) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {item.frontmatter.title}
        </h1>
        {item.frontmatter.description && (
          <p className="text-xl text-gray-600 mb-4">
            {item.frontmatter.description}
          </p>
        )}
        
        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {item.frontmatter.category && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {item.frontmatter.category}
            </span>
          )}
          {item.frontmatter.price && (
            <span className="text-green-600 font-semibold">
              {item.frontmatter.price} {item.frontmatter.currency}
            </span>
          )}
          {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
            <div className="flex gap-2">
              {item.frontmatter.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Images */}
      {item.frontmatter.images && item.frontmatter.images.length > 0 && (
        <div className="mb-8">
          <img
            src={item.frontmatter.images[0]}
            alt={item.frontmatter.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={item.content} />
      </div>
    </article>
  );
}

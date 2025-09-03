import { contentRepo } from '@/lib/api';
import { ContentEditor } from '@/components/forms/ContentEditor';
import { notFound } from 'next/navigation';

interface EditItemPageProps {
  params: {
    collection: string;
    slug: string;
  };
  searchParams: {
    site?: string;
  };
}

export default async function EditItemPage({ params, searchParams }: EditItemPageProps) {
  const { collection, slug } = params;
  const { site } = searchParams;

  // Get the item to edit
  const item = await contentRepo.getItem(collection as any, slug, site);

  if (!item) {
    notFound();
  }

  return (
    <ContentEditor
      collection={collection as any}
      item={item}
      siteId={site}
    />
  );
}

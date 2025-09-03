import { ContentEditor } from '@/components/forms/ContentEditor';
import { Schemas, SchemaName } from '@/content/_schemas';

interface NewItemPageProps {
  params: {
    collection: string;
  };
  searchParams: {
    site?: string;
  };
}

export default function NewItemPage({ params, searchParams }: NewItemPageProps) {
  const { collection } = params;
  const { site } = searchParams;

  // Validate collection exists
  if (!Schemas[collection as SchemaName]) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
        <p className="text-gray-600">The collection "{collection}" does not exist.</p>
      </div>
    );
  }

  return (
    <ContentEditor
      collection={collection as SchemaName}
      siteId={site}
    />
  );
}

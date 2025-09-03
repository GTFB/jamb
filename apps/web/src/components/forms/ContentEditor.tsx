'use client';

import { useState } from 'react';
import { DynamicForm } from './DynamicForm';
import { Schemas, SchemaName } from '@/content/_schemas';
import { useRouter } from 'next/navigation';

interface ContentEditorProps {
  collection: SchemaName;
  item?: any;
  siteId?: string;
}

export function ContentEditor({ collection, item, siteId }: ContentEditorProps) {
  const [content, setContent] = useState(item?.content || '');
  const router = useRouter();
  const schema = Schemas[collection];
  const isEditing = !!item;

  const handleSubmit = async (data: any) => {
    const url = '/api/content';
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection,
        slug: item?.slug,
        siteId,
        data,
        content,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save content');
    }

    const result = await response.json();
    
    // Redirect to collection page
    const redirectPath = siteId 
      ? `/admin/collections/${collection}?site=${siteId}`
      : `/admin/collections/${collection}`;
    
    router.push(redirectPath);
  };

  const handleDelete = async () => {
    if (!item?.slug) return;

    const confirmed = confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    const url = `/api/content?collection=${collection}&slug=${item.slug}${siteId ? `&siteId=${siteId}` : ''}`;

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete content');
    }

    // Redirect to collection page
    const redirectPath = siteId 
      ? `/admin/collections/${collection}?site=${siteId}`
      : `/admin/collections/${collection}`;
    
    router.push(redirectPath);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit' : 'Create'} {collection.charAt(0).toUpperCase() + collection.slice(1)}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update' : 'Add'} content to the {collection} collection
          </p>
        </div>
        {isEditing && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Details</h2>
          <DynamicForm
            schema={schema}
            defaultValues={item?.frontmatter}
            onSubmit={handleSubmit}
            submitLabel={isEditing ? 'Update' : 'Create'}
            siteId={siteId}
          />
        </div>

        {/* Content Editor */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your content here in Markdown..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Use Markdown syntax for formatting
          </p>
        </div>
      </div>
    </div>
  );
}

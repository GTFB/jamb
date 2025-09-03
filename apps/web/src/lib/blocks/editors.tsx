'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';
import { ImageField } from '@/components/media/ImageField';
import { BlockEditorProps } from './types';
import { BlockSchemas } from './configs';

export function TextBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const schema = BlockSchemas.text;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: block.data,
  });

  const onSubmit = (data: any) => {
    onUpdate({
      ...block,
      data,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Text Block</span>
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(block.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-4 bg-white">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your text content..."
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <Controller
              name="alignment"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <Controller
              name="fontSize"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="2xl">2XL</option>
                  <option value="3xl">3XL</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" size="sm">
            Save
          </Button>
          <Button
            type="button"
            onClick={() => setIsEditing(false)}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export function ImageBlockEditor({ block, onUpdate, onDelete, siteId }: BlockEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const schema = BlockSchemas.image;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: block.data,
  });

  const onSubmit = (data: any) => {
    onUpdate({
      ...block,
      data,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Image Block</span>
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(block.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
        {block.data.src && (
          <img
            src={block.data.src}
            alt={block.data.alt}
            className="w-full h-32 object-cover rounded"
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-4 bg-white">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <Controller
            name="src"
            control={control}
            render={({ field }) => (
              <ImageField
                value={field.value}
                onChange={field.onChange}
                siteId={siteId}
                label=""
              />
            )}
          />
          {errors.src && (
            <p className="text-sm text-red-600">{errors.src.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt Text
          </label>
          <Controller
            name="alt"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Describe the image for accessibility"
              />
            )}
          />
          {errors.alt && (
            <p className="text-sm text-red-600">{errors.alt.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption (Optional)
          </label>
          <Controller
            name="caption"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Image caption"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <Controller
              name="alignment"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <Controller
              name="width"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="full">Full Width</option>
                  <option value="1/2">Half Width</option>
                  <option value="1/3">One Third</option>
                  <option value="1/4">One Quarter</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <Controller
              name="rounded"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  className="rounded border-gray-300"
                />
              )}
            />
            <span className="text-sm text-gray-700">Rounded corners</span>
          </label>

          <label className="flex items-center space-x-2">
            <Controller
              name="shadow"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  className="rounded border-gray-300"
                />
              )}
            />
            <span className="text-sm text-gray-700">Add shadow</span>
          </label>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" size="sm">
            Save
          </Button>
          <Button
            type="button"
            onClick={() => setIsEditing(false)}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

// Placeholder editors for other block types
export function GalleryBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Gallery Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Gallery editor coming soon...</p>
    </div>
  );
}

export function VideoBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Video Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Video editor coming soon...</p>
    </div>
  );
}

export function CodeBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Code Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Code editor coming soon...</p>
    </div>
  );
}

export function QuoteBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Quote Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Quote editor coming soon...</p>
    </div>
  );
}

export function CTABlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">CTA Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">CTA editor coming soon...</p>
    </div>
  );
}

export function DividerBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Divider Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Divider editor coming soon...</p>
    </div>
  );
}

export function SpacerBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Spacer Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Spacer editor coming soon...</p>
    </div>
  );
}

export function EmbedBlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Embed Block</span>
        <div className="flex space-x-2">
          <Button
            onClick={() => onDelete(block.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">Embed editor coming soon...</p>
    </div>
  );
}

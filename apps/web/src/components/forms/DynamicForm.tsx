'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';
import { useState } from 'react';

interface DynamicFormProps {
  schema: z.ZodSchema<any>;
  defaultValues?: any;
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
}

export function DynamicForm({ schema, defaultValues, onSubmit, submitLabel = 'Submit' }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render form fields based on schema
  const renderField = (fieldName: string, fieldSchema: any) => {
    const fieldError = errors[fieldName];
    
    if (fieldSchema._def.typeName === 'ZodString') {
      return (
        <div key={fieldName} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={fieldError ? 'border-red-500' : ''}
                placeholder={`Enter ${fieldName}`}
              />
            )}
          />
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError.message}</p>
          )}
        </div>
      );
    }

    if (fieldSchema._def.typeName === 'ZodNumber') {
      return (
        <div key={fieldName} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className={fieldError ? 'border-red-500' : ''}
                placeholder={`Enter ${fieldName}`}
              />
            )}
          />
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError.message}</p>
          )}
        </div>
      );
    }

    if (fieldSchema._def.typeName === 'ZodBoolean') {
      return (
        <div key={fieldName} className="space-y-2">
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </span>
              </label>
            )}
          />
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError.message}</p>
          )}
        </div>
      );
    }

    if (fieldSchema._def.typeName === 'ZodArray') {
      return (
        <div key={fieldName} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value?.join(', ') || ''}
                onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                className={fieldError ? 'border-red-500' : ''}
                placeholder="Enter values separated by commas"
              />
            )}
          />
          {fieldError && (
            <p className="text-sm text-red-600">{fieldError.message}</p>
          )}
        </div>
      );
    }

    // Default text input for unknown types
    return (
      <div key={fieldName} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        </label>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className={fieldError ? 'border-red-500' : ''}
              placeholder={`Enter ${fieldName}`}
            />
          )}
        />
        {fieldError && (
          <p className="text-sm text-red-600">{fieldError.message}</p>
        )}
      </div>
    );
  };

  // Extract schema shape for rendering fields
  const schemaShape = schema.shape || {};

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(schemaShape).map(([fieldName, fieldSchema]) => {
          // Skip internal fields
          if (['id', 'createdAt', 'updatedAt'].includes(fieldName)) {
            return null;
          }
          return renderField(fieldName, fieldSchema);
        })}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

---
to: apps/web/src/components/forms/<%= name %>.tsx
---
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';
import { Label } from '@jamb/ui';
import { Textarea } from '@jamb/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@jamb/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@jamb/ui';

const <%= h.changeCase.camelCase(name) %>Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
});

type <%= h.changeCase.pascalCase(name) %>FormData = z.infer<typeof <%= h.changeCase.camelCase(name) %>Schema>;

interface <%= h.changeCase.pascalCase(name) %>FormProps {
  onSubmit: (data: <%= h.changeCase.pascalCase(name) %>FormData) => void;
  initialData?: Partial<<%= h.changeCase.pascalCase(name) %>FormData>;
  isLoading?: boolean;
}

export default function <%= h.changeCase.pascalCase(name) %>Form({ 
  onSubmit, 
  initialData, 
  isLoading = false 
}: <%= h.changeCase.pascalCase(name) %>FormProps) {
  const form = useForm<<%= h.changeCase.pascalCase(name) %>FormData>({
    resolver: zodResolver(<%= h.changeCase.camelCase(name) %>Schema),
    defaultValues: initialData || {
      title: '',
      description: '',
      category: '',
      content: '',
    },
  });

  const handleSubmit = (data: <%= h.changeCase.pascalCase(name) %>FormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle><%= h.changeCase.pascalCase(name) %></CardTitle>
        <CardDescription>
          <%= description %>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...form.register('title')}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-600">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              {...form.register('description')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={form.watch('category')} 
              onValueChange={(value) => form.setValue('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-sm text-red-600">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Enter content"
              className="min-h-[120px]"
              {...form.register('content')}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-600">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

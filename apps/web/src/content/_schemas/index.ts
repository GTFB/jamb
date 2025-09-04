import { z } from 'zod';

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  currency: z.string().default('USD'),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  category: z.string().optional(),
  image: z.string().optional(),
});

export const Schemas = {
  articles: articleSchema,
  products: productSchema,
} as const;

export type SchemaName = keyof typeof Schemas;

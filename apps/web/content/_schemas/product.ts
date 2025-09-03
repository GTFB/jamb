import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  currency: z.enum(['USD', 'EUR', 'RUB']).default('USD'),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  metadata: z.record(z.unknown()).optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductFrontmatterSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ProductFrontmatter = z.infer<typeof ProductFrontmatterSchema>;

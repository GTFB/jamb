import { z } from 'zod';

export const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be non-negative'),
  currency: z.string().default('USD'),
  images: z.array(z.string()).default([]),
  category: z.string().optional(),
  brand: z.string().optional(),
  inStock: z.boolean().default(true),
  variants: z.array(z.object({
    name: z.string(),
    value: z.string(),
    price: z.number().optional(),
  })).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductFrontmatterSchema = ProductSchema;

export type ProductFrontmatter = z.infer<typeof ProductFrontmatterSchema>;

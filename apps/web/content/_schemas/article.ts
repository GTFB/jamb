import { z } from 'zod';

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  author: z.string().optional(),
  publishedAt: z.date().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).default([]),
  }).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  metadata: z.record(z.unknown()).optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticleFrontmatterSchema = ArticleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

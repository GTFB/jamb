import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  readingTime: z.number().optional(),
  category: z.string().optional(),
  published: z.boolean().default(false),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticleFrontmatterSchema = ArticleSchema;

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

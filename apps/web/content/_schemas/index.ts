export * from './product';
export * from './article';

import { ProductSchema, ArticleSchema } from './product';
import { ArticleSchema as ArticleSchemaImport } from './article';

export const Schemas = {
  product: ProductSchema,
  article: ArticleSchemaImport,
} as const;

export type SchemaName = keyof typeof Schemas;

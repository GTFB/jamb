import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { Schemas, SchemaName } from '../content/_schemas';

export interface ContentItem<T = any> {
  id: string;
  slug: string;
  frontmatter: T;
  content: string;
  filePath: string;
}

export class ContentRepository {
  private contentDir: string;

  constructor(contentDir: string = path.join(process.cwd(), 'content')) {
    this.contentDir = contentDir;
  }

  /**
   * Get all items from a collection
   */
  async getCollection<T extends SchemaName>(
    collectionName: T,
    siteId?: string
  ): Promise<ContentItem<z.infer<typeof Schemas[T]>>[]> {
    const schema = Schemas[collectionName];
    const collectionPath = siteId
      ? path.join(this.contentDir, siteId, collectionName)
      : path.join(this.contentDir, collectionName);

    try {
      const files = await fs.readdir(collectionPath);
      const items: ContentItem<z.infer<typeof Schemas[T]>>[] = [];

      for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const filePath = path.join(collectionPath, file);
          const item = await this.getItem<T>(collectionName, file, siteId);
          if (item) {
            items.push(item);
          }
        }
      }

      return items.sort((a, b) => {
        const dateA = new Date(a.frontmatter.createdAt || 0);
        const dateB = new Date(b.frontmatter.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
    } catch (error) {
      console.error(`Error reading collection ${collectionName}:`, error);
      return [];
    }
  }

  /**
   * Get a single item by slug
   */
  async getItem<T extends SchemaName>(
    collectionName: T,
    slug: string,
    siteId?: string
  ): Promise<ContentItem<z.infer<typeof Schemas[T]>> | null> {
    const schema = Schemas[collectionName];
    const filePath = siteId
      ? path.join(this.contentDir, siteId, collectionName, `${slug}.mdx`)
      : path.join(this.contentDir, collectionName, `${slug}.mdx`);

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Validate frontmatter against schema
      const validatedData = schema.parse({
        ...data,
        id: slug,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      });

      return {
        id: slug,
        slug,
        frontmatter: validatedData,
        content,
        filePath,
      };
    } catch (error) {
      console.error(`Error reading item ${slug} from ${collectionName}:`, error);
      return null;
    }
  }

  /**
   * Get site configuration
   */
  async getSiteConfig(siteId: string) {
    const configPath = path.join(this.contentDir, siteId, '_config');
    
    try {
      const settingsPath = path.join(configPath, 'settings.ts');
      const navigationPath = path.join(configPath, 'navigation.ts');

      const [settings, navigation] = await Promise.all([
        fs.readFile(settingsPath, 'utf-8').catch(() => '{}'),
        fs.readFile(navigationPath, 'utf-8').catch(() => '[]'),
      ]);

      return {
        settings: JSON.parse(settings),
        navigation: JSON.parse(navigation),
      };
    } catch (error) {
      console.error(`Error reading site config for ${siteId}:`, error);
      return {
        settings: {},
        navigation: [],
      };
    }
  }

  /**
   * Get all available sites
   */
  async getSites(): Promise<string[]> {
    try {
      const entries = await fs.readdir(this.contentDir, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
        .map(entry => entry.name);
    } catch (error) {
      console.error('Error reading sites:', error);
      return [];
    }
  }
}

// Export singleton instance
export const contentRepo = new ContentRepository();

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

  constructor(contentDir: string = path.join(process.cwd(), 'src', 'content')) {
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
      }) as z.infer<typeof Schemas[T]>;

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

      // Try to read files, but provide fallbacks
      const settingsContent = await fs.readFile(settingsPath, 'utf-8').catch(() => '');
      const navigationContent = await fs.readFile(navigationPath, 'utf-8').catch(() => '');

      // Simple parsing for TypeScript exports - extract object content
      let settings: any = {};
      let navigation: any = { main: [] };

      if (settingsContent) {
        const settingsMatch = settingsContent.match(/export default\s*({[\s\S]*?});?\s*$/);
        if (settingsMatch) {
          try {
            // Convert TypeScript object to valid JSON
            const tsObject = settingsMatch[1];
            const jsonString = tsObject
              .replace(/(\w+):/g, '"$1":') // Add quotes to property names
              .replace(/'/g, '"') // Replace single quotes with double quotes
              .replace(/,(\s*})/g, '$1'); // Remove trailing commas
            
            settings = JSON.parse(jsonString);
          } catch (parseError) {
            console.error('Error parsing settings:', parseError);
            settings = { name: siteId };
          }
        }
      }

      if (navigationContent) {
        const navigationMatch = navigationContent.match(/export default\s*({[\s\S]*?});?\s*$/);
        if (navigationMatch) {
          try {
            // Convert TypeScript object to valid JSON
            const tsObject = navigationMatch[1];
            const jsonString = tsObject
              .replace(/(\w+):/g, '"$1":') // Add quotes to property names
              .replace(/'/g, '"') // Replace single quotes with double quotes
              .replace(/,(\s*})/g, '$1'); // Remove trailing commas
            
            navigation = JSON.parse(jsonString);
          } catch (parseError) {
            console.error('Error parsing navigation:', parseError);
            navigation = { main: [] };
          }
        }
      }

      return {
        name: settings.name || siteId,
        description: settings.description || '',
        navigation,
      };
    } catch (error) {
      console.error(`Error reading site config for ${siteId}:`, error);
      return {
        name: siteId,
        description: '',
        navigation: { main: [] },
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

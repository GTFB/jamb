import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Schemas, SchemaName } from '@/content/_schemas';

// Content repository class
class ContentRepository {
  private contentDir = path.join(process.cwd(), 'content');

  // Get all sites
  async getSites() {
    try {
      const sitesDir = path.join(this.contentDir);
      const entries = await fs.readdir(sitesDir, { withFileTypes: true });
      
      const sites = [];
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('_')) {
          const configPath = path.join(sitesDir, entry.name, '_config', 'settings.ts');
          try {
            const config = await import(configPath);
            sites.push({
              id: entry.name,
              ...config.default
            });
          } catch {
            // Fallback if no config
            sites.push({
              id: entry.name,
              name: entry.name,
              description: `Site ${entry.name}`
            });
          }
        }
      }
      return sites;
    } catch (error) {
      console.error('Error getting sites:', error);
      return [];
    }
  }

  // Get site configuration
  async getSiteConfig(siteId: string) {
    try {
      const configPath = path.join(this.contentDir, siteId, '_config', 'settings.ts');
      const config = await import(configPath);
      return config.default;
    } catch (error) {
      console.error(`Error getting site config for ${siteId}:`, error);
      return null;
    }
  }

  // Get site navigation
  async getSiteNavigation(siteId: string) {
    try {
      const navPath = path.join(this.contentDir, siteId, '_config', 'navigation.ts');
      const nav = await import(navPath);
      return nav.default;
    } catch (error) {
      console.error(`Error getting navigation for ${siteId}:`, error);
      return [];
    }
  }

  // Get collection items
  async getCollection(collectionName: SchemaName, siteId?: string) {
    try {
      const collectionDir = siteId 
        ? path.join(this.contentDir, siteId, collectionName)
        : path.join(this.contentDir, collectionName);
      
      const entries = await fs.readdir(collectionDir, { withFileTypes: true });
      const items = [];

      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.mdx')) {
          const filePath = path.join(collectionDir, entry.name);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          // Validate with schema
          const schema = Schemas[collectionName];
          if (schema) {
            const validatedData = schema.parse(data);
            items.push({
              ...validatedData,
              slug: entry.name.replace('.mdx', ''),
              content
            });
          } else {
            items.push({
              ...data,
              slug: entry.name.replace('.mdx', ''),
              content
            });
          }
        }
      }

      return items;
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      return [];
    }
  }

  // Get single item
  async getItem(collectionName: SchemaName, slug: string, siteId?: string) {
    try {
      const filePath = siteId 
        ? path.join(this.contentDir, siteId, collectionName, `${slug}.mdx`)
        : path.join(this.contentDir, collectionName, `${slug}.mdx`);
      
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // Validate with schema
      const schema = Schemas[collectionName];
      if (schema) {
        const validatedData = schema.parse(data);
        return {
          ...validatedData,
          slug,
          content
        };
      } else {
        return {
          ...data,
          slug,
          content
        };
      }
    } catch (error) {
      console.error(`Error getting item ${slug} from ${collectionName}:`, error);
      return null;
    }
  }

  // Compile MDX content
  async compileMDX(content: string, options = {}) {
    try {
      const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
        ...options
      });
      return compiledContent;
    } catch (error) {
      console.error('Error compiling MDX:', error);
      return null;
    }
  }
}

// Export singleton instance
export const contentRepo = new ContentRepository();

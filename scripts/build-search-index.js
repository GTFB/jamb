#!/usr/bin/env bun

import fs from 'fs/promises';
import path from 'path';
import { contentRepo } from '../apps/web/lib/api';

interface SearchIndexItem {
  id: string;
  title: string;
  content: string;
  url: string;
  type: string;
  siteId?: string;
  tags: string[];
  category?: string;
}

async function buildSearchIndex() {
  console.log('Building search index...');

  const searchIndex: SearchIndexItem[] = [];
  const sites = await contentRepo.getSites();

  // Add global content (not site-specific)
  const globalCollections = ['articles', 'products'];
  
  for (const collection of globalCollections) {
    try {
      const items = await contentRepo.getCollection(collection as any);
      
      for (const item of items) {
        if (item.frontmatter.published !== false) {
          searchIndex.push({
            id: item.id,
            title: item.frontmatter.title,
            content: item.content,
            url: `/${collection}/${item.slug}`,
            type: collection,
            tags: item.frontmatter.tags || [],
            category: item.frontmatter.category,
          });
        }
      }
    } catch (error) {
      console.warn(`Skipping global collection ${collection}:`, error);
    }
  }

  // Add site-specific content
  for (const siteId of sites) {
    for (const collection of globalCollections) {
      try {
        const items = await contentRepo.getCollection(collection as any, siteId);
        
        for (const item of items) {
          if (item.frontmatter.published !== false) {
            searchIndex.push({
              id: `${siteId}-${item.id}`,
              title: item.frontmatter.title,
              content: item.content,
              url: `/${siteId}/${collection}/${item.slug}`,
              type: collection,
              siteId,
              tags: item.frontmatter.tags || [],
              category: item.frontmatter.category,
            });
          }
        }
      } catch (error) {
        console.warn(`Skipping collection ${collection} for site ${siteId}:`, error);
      }
    }
  }

  // Write search index to public directory
  const indexPath = path.join(process.cwd(), 'apps/web/public/search-index.json');
  await fs.writeFile(indexPath, JSON.stringify(searchIndex, null, 2));

  console.log(`Search index built with ${searchIndex.length} items`);
  console.log(`Index written to: ${indexPath}`);
}

buildSearchIndex().catch(console.error);

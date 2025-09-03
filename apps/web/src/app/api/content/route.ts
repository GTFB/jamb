import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { Schemas, SchemaName } from '@/content/_schemas';

// Validation schema for API requests
const ContentRequestSchema = z.object({
  collection: z.string(),
  slug: z.string().optional(),
  siteId: z.string().optional(),
  data: z.record(z.unknown()),
  content: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collection, slug, siteId, data, content } = ContentRequestSchema.parse(body);

    // Validate data against collection schema
    const schema = Schemas[collection as SchemaName];
    if (!schema) {
      return NextResponse.json(
        { error: `Unknown collection: ${collection}` },
        { status: 400 }
      );
    }

    const validatedData = schema.parse({
      ...data,
      id: slug,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: new Date(),
    });

    // Generate slug if not provided
    const finalSlug = slug || validatedData.title.toLowerCase().replace(/\s+/g, '-');

    // Determine file path
    const contentDir = path.join(process.cwd(), 'content');
    const collectionPath = siteId
      ? path.join(contentDir, siteId, collection)
      : path.join(contentDir, collection);

    // Ensure directory exists
    await fs.mkdir(collectionPath, { recursive: true });

    // Create MDX file
    const filePath = path.join(collectionPath, `${finalSlug}.mdx`);
    const frontmatter = matter.stringify(content, validatedData);

    await fs.writeFile(filePath, frontmatter, 'utf-8');

    return NextResponse.json({
      success: true,
      slug: finalSlug,
      filePath,
    });
  } catch (error) {
    console.error('Content creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { collection, slug, siteId, data, content } = ContentRequestSchema.parse(body);

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required for updates' },
        { status: 400 }
      );
    }

    // Validate data against collection schema
    const schema = Schemas[collection as SchemaName];
    if (!schema) {
      return NextResponse.json(
        { error: `Unknown collection: ${collection}` },
        { status: 400 }
      );
    }

    const validatedData = schema.parse({
      ...data,
      id: slug,
      updatedAt: new Date(),
    });

    // Determine file path
    const contentDir = path.join(process.cwd(), 'content');
    const collectionPath = siteId
      ? path.join(contentDir, siteId, collection)
      : path.join(contentDir, collection);

    const filePath = path.join(collectionPath, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    // Update MDX file
    const frontmatter = matter.stringify(content, validatedData);
    await fs.writeFile(filePath, frontmatter, 'utf-8');

    return NextResponse.json({
      success: true,
      slug,
      filePath,
    });
  } catch (error) {
    console.error('Content update error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const slug = searchParams.get('slug');
    const siteId = searchParams.get('siteId');

    if (!collection || !slug) {
      return NextResponse.json(
        { error: 'Collection and slug are required' },
        { status: 400 }
      );
    }

    // Determine file path
    const contentDir = path.join(process.cwd(), 'content');
    const collectionPath = siteId
      ? path.join(contentDir, siteId, collection)
      : path.join(contentDir, collection);

    const filePath = path.join(collectionPath, `${slug}.mdx`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    // Delete file
    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    console.error('Content deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}

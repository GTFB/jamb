import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Validation schema for upload requests
const UploadRequestSchema = z.object({
  file: z.string(), // base64 encoded file
  filename: z.string(),
  siteId: z.string().optional(),
});

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { file, filename, siteId } = UploadRequestSchema.parse(body);

    // Decode base64 file
    const buffer = Buffer.from(file, 'base64');
    
    // Validate file size
    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = path.extname(filename);
    const name = path.basename(filename, extension);
    const uniqueFilename = `${name}-${timestamp}${extension}`;

    // Determine upload path
    const mediaDir = path.join(process.cwd(), 'apps/web/public/media');
    const uploadPath = siteId 
      ? path.join(mediaDir, 'sites', siteId)
      : path.join(mediaDir, 'global');

    // Ensure directory exists
    await mkdir(uploadPath, { recursive: true });

    // Save file
    const filePath = path.join(uploadPath, uniqueFilename);
    await writeFile(filePath, buffer);

    // Generate public URL
    const publicUrl = siteId 
      ? `/media/sites/${siteId}/${uniqueFilename}`
      : `/media/global/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: buffer.length,
    });
  } catch (error) {
    console.error('File upload error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Determine media directory
    const mediaDir = path.join(process.cwd(), 'apps/web/public/media');
    const targetDir = siteId 
      ? path.join(mediaDir, 'sites', siteId)
      : path.join(mediaDir, 'global');

    // Get list of files
    const files = await getFilesFromDirectory(targetDir, siteId);
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFiles = files.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      files: paginatedFiles,
      pagination: {
        page,
        limit,
        total: files.length,
        pages: Math.ceil(files.length / limit),
      },
    });
  } catch (error) {
    console.error('File list error:', error);
    return NextResponse.json(
      { error: 'Failed to get file list' },
      { status: 500 }
    );
  }
}

async function getFilesFromDirectory(dir: string, siteId?: string | null) {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      if (entry.isFile()) {
        const filePath = path.join(dir, entry.name);
        const stats = await fs.stat(filePath);
        
        files.push({
          name: entry.name,
          size: stats.size,
          modified: stats.mtime,
          url: siteId 
            ? `/media/sites/${siteId}/${entry.name}`
            : `/media/global/${entry.name}`,
        });
      }
    }

    return files.sort((a, b) => b.modified.getTime() - a.modified.getTime());
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

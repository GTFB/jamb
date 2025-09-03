import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Validation schema for upload requests
const UploadRequestSchema = z.object({
  file: z.string(), // base64 encoded file
  filename: z.string(),
  siteId: z.string().optional(),
  optimize: z.boolean().default(true),
  quality: z.number().min(1).max(100).default(80),
  format: z.enum(['webp', 'jpeg', 'png', 'avif']).default('webp'),
  maxWidth: z.number().optional(),
  maxHeight: z.number().optional(),
});

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (increased for source files)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      file, 
      filename, 
      siteId, 
      optimize = true, 
      quality = 80, 
      format = 'webp',
      maxWidth,
      maxHeight
    } = UploadRequestSchema.parse(body);

    // Decode base64 file
    const buffer = Buffer.from(file, 'base64');
    
    // Validate file size
    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalExtension = path.extname(filename);
    const name = path.basename(filename, originalExtension);
    const optimizedExtension = optimize ? `.${format}` : originalExtension;
    const uniqueFilename = `${name}-${timestamp}${optimizedExtension}`;

    // Determine upload path
    const mediaDir = path.join(process.cwd(), 'apps/web/public/media');
    const uploadPath = siteId 
      ? path.join(mediaDir, 'sites', siteId)
      : path.join(mediaDir, 'global');

    // Ensure directory exists
    await mkdir(uploadPath, { recursive: true });

    let processedBuffer: Buffer;
    let finalFilename: string;

    if (optimize) {
      // Process image with Sharp
      let sharpInstance = sharp(buffer);

      // Resize if dimensions specified
      if (maxWidth || maxHeight) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Apply format-specific optimizations
      switch (format) {
        case 'webp':
          processedBuffer = await sharpInstance.webp({ quality }).toBuffer();
          break;
        case 'jpeg':
          processedBuffer = await sharpInstance.jpeg({ quality }).toBuffer();
          break;
        case 'png':
          processedBuffer = await sharpInstance.png({ quality }).toBuffer();
          break;
        case 'avif':
          processedBuffer = await sharpInstance.avif({ quality }).toBuffer();
          break;
        default:
          processedBuffer = await sharpInstance.webp({ quality }).toBuffer();
      }

      finalFilename = uniqueFilename;
    } else {
      // Use original file without optimization
      processedBuffer = buffer;
      finalFilename = `${name}-${timestamp}${originalExtension}`;
    }

    // Save file
    const filePath = path.join(uploadPath, finalFilename);
    await writeFile(filePath, processedBuffer);

    // Generate public URL
    const publicUrl = siteId 
      ? `/media/sites/${siteId}/${finalFilename}`
      : `/media/global/${finalFilename}`;

    // Get image metadata
    const metadata = await sharp(processedBuffer).metadata();

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: processedBuffer.length,
      originalSize: buffer.length,
      compressionRatio: Math.round((1 - processedBuffer.length / buffer.length) * 100),
      metadata: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        hasAlpha: metadata.hasAlpha,
      },
      optimization: {
        applied: optimize,
        format,
        quality,
        maxWidth,
        maxHeight,
      },
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
    const paginatedFiles = files.slice(startIndex, limit);

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
        
        // Get image metadata if it's an image file
        let metadata = null;
        try {
          const imageBuffer = await fs.readFile(filePath);
          metadata = await sharp(imageBuffer).metadata();
        } catch {
          // Not an image file, skip metadata
        }
        
        files.push({
          name: entry.name,
          size: stats.size,
          modified: stats.mtime,
          url: siteId 
            ? `/media/sites/${siteId}/${entry.name}`
            : `/media/global/${entry.name}`,
          metadata,
        });
      }
    }

    return files.sort((a, b) => b.modified.getTime() - a.modified.getTime());
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

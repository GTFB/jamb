#!/usr/bin/env bun

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

interface OptimizationOptions {
  quality: number;
  format: 'webp' | 'jpeg' | 'png' | 'avif';
  maxWidth?: number;
  maxHeight?: number;
}

const defaultOptions: OptimizationOptions = {
  quality: 80,
  format: 'webp',
  maxWidth: 1920,
  maxHeight: 1080,
};

async function optimizeImage(
  inputPath: string, 
  outputPath: string, 
  options: OptimizationOptions = defaultOptions
) {
  try {
    console.log(`Processing ${path.basename(inputPath)}...`);

    let sharpInstance = sharp(inputPath);

    // Resize if dimensions specified
    if (options.maxWidth || options.maxHeight) {
      sharpInstance = sharpInstance.resize(options.maxWidth, options.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Apply format-specific optimizations
    switch (options.format) {
      case 'webp':
        await sharpInstance.webp({ quality: options.quality }).toFile(outputPath);
        break;
      case 'jpeg':
        await sharpInstance.jpeg({ quality: options.quality }).toFile(outputPath);
        break;
      case 'png':
        await sharpInstance.png({ quality: options.quality }).toFile(outputPath);
        break;
      case 'avif':
        await sharpInstance.avif({ quality: options.quality }).toFile(outputPath);
        break;
    }

    // Get file sizes for comparison
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath);
    const compressionRatio = Math.round((1 - optimizedStats.size / originalStats.size) * 100);

    console.log(`✅ Optimized ${path.basename(inputPath)}`);
    console.log(`   Original: ${(originalStats.size / 1024).toFixed(1)} KB`);
    console.log(`   Optimized: ${(optimizedStats.size / 1024).toFixed(1)} KB`);
    console.log(`   Compression: ${compressionRatio}%`);

  } catch (error) {
    console.error(`❌ Error processing ${path.basename(inputPath)}:`, error);
  }
}

async function optimizeImagesInDirectory(
  inputDir: string, 
  outputDir: string, 
  options: OptimizationOptions = defaultOptions
) {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Get all files in input directory
    const entries = await fs.readdir(inputDir, { withFileTypes: true });
    const imageFiles = entries.filter(entry => 
      entry.isFile() && /\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i.test(entry.name)
    );

    if (imageFiles.length === 0) {
      console.log('No image files found in input directory');
      return;
    }

    console.log(`Found ${imageFiles.length} image files to optimize`);
    console.log(`Output format: ${options.format}, Quality: ${options.quality}%`);
    console.log('---');

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file.name);
      const nameWithoutExt = path.parse(file.name).name;
      const outputFilename = `${nameWithoutExt}.${options.format}`;
      const outputPath = path.join(outputDir, outputFilename);

      await optimizeImage(inputPath, outputPath, options);
    }

    console.log('---');
    console.log('✅ Image optimization completed!');

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: bun run optimize-images <input-dir> <output-dir> [options]');
    console.log('');
    console.log('Options:');
    console.log('  --format <format>    Output format (webp, jpeg, png, avif) [default: webp]');
    console.log('  --quality <number>    Quality 1-100 [default: 80]');
    console.log('  --max-width <number>  Maximum width in pixels');
    console.log('  --max-height <number> Maximum height in pixels');
    console.log('');
    console.log('Example:');
    console.log('  bun run optimize-images ./images_original ./images_optimized --format webp --quality 85');
    return;
  }

  const [inputDir, outputDir] = args;
  
  // Parse options
  const options: OptimizationOptions = { ...defaultOptions };
  
  for (let i = 2; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    
    switch (flag) {
      case '--format':
        if (['webp', 'jpeg', 'png', 'avif'].includes(value)) {
          options.format = value as any;
        }
        break;
      case '--quality':
        const quality = parseInt(value);
        if (quality >= 1 && quality <= 100) {
          options.quality = quality;
        }
        break;
      case '--max-width':
        options.maxWidth = parseInt(value);
        break;
      case '--max-height':
        options.maxHeight = parseInt(value);
        break;
    }
  }

  await optimizeImagesInDirectory(inputDir, outputDir, options);
}

// Run if called directly
if (import.meta.main) {
  main().catch(console.error);
}

export { optimizeImage, optimizeImagesInDirectory };

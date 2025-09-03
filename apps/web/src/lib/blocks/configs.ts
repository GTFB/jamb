import { z } from 'zod';
import { BlockConfig, BlockType } from './types';
import {
  TextBlockRenderer,
  ImageBlockRenderer,
  GalleryBlockRenderer,
  VideoBlockRenderer,
  CodeBlockRenderer,
  QuoteBlockRenderer,
  CTABlockRenderer,
  DividerBlockRenderer,
  SpacerBlockRenderer,
  EmbedBlockRenderer,
} from './renderers';

// Text Block
export const TextBlockSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
  fontSize: z.enum(['sm', 'base', 'lg', 'xl', '2xl', '3xl']).default('base'),
  fontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
  color: z.string().default('text-gray-900'),
});

export const TextBlockConfig: BlockConfig = {
  type: 'text',
  name: 'Text Block',
  description: 'Add formatted text content',
  icon: '📝',
  category: 'content',
  schema: TextBlockSchema,
  defaultData: {
    content: 'Enter your text here...',
    alignment: 'left',
    fontSize: 'base',
    fontWeight: 'normal',
    color: 'text-gray-900',
  },
  component: TextBlockRenderer,
};

// Image Block
export const ImageBlockSchema = z.object({
  src: z.string().url('Valid image URL is required'),
  alt: z.string().min(1, 'Alt text is required'),
  caption: z.string().optional(),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  width: z.enum(['full', '1/2', '1/3', '1/4']).default('full'),
  rounded: z.boolean().default(false),
  shadow: z.boolean().default(false),
});

export const ImageBlockConfig: BlockConfig = {
  type: 'image',
  name: 'Image Block',
  description: 'Add images with captions',
  icon: '🖼️',
  category: 'media',
  schema: ImageBlockSchema,
  defaultData: {
    src: '',
    alt: '',
    caption: '',
    alignment: 'center',
    width: 'full',
    rounded: false,
    shadow: false,
  },
  component: ImageBlockRenderer,
};

// Gallery Block
export const GalleryBlockSchema = z.object({
  images: z.array(z.object({
    src: z.string().url(),
    alt: z.string(),
    caption: z.string().optional(),
  })).min(1, 'At least one image is required'),
  columns: z.enum(['1', '2', '3', '4']).default('3'),
  gap: z.enum(['sm', 'md', 'lg']).default('md'),
  rounded: z.boolean().default(false),
});

export const GalleryBlockConfig: BlockConfig = {
  type: 'gallery',
  name: 'Gallery Block',
  description: 'Display multiple images in a grid',
  icon: '🖼️',
  category: 'media',
  schema: GalleryBlockSchema,
  defaultData: {
    images: [],
    columns: '3',
    gap: 'md',
    rounded: false,
  },
  component: GalleryBlockRenderer,
};

// Video Block
export const VideoBlockSchema = z.object({
  src: z.string().url('Valid video URL is required'),
  title: z.string().optional(),
  description: z.string().optional(),
  autoplay: z.boolean().default(false),
  controls: z.boolean().default(true),
  loop: z.boolean().default(false),
  muted: z.boolean().default(false),
  width: z.enum(['full', '1/2', '1/3']).default('full'),
});

export const VideoBlockConfig: BlockConfig = {
  type: 'video',
  name: 'Video Block',
  description: 'Embed videos from various sources',
  icon: '🎥',
  category: 'media',
  schema: VideoBlockSchema,
  defaultData: {
    src: '',
    title: '',
    description: '',
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    width: 'full',
  },
  component: VideoBlockRenderer,
};

// Code Block
export const CodeBlockSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  language: z.enum(['javascript', 'typescript', 'html', 'css', 'json', 'python', 'bash']).default('javascript'),
  title: z.string().optional(),
  showLineNumbers: z.boolean().default(true),
  theme: z.enum(['light', 'dark']).default('dark'),
});

export const CodeBlockConfig: BlockConfig = {
  type: 'code',
  name: 'Code Block',
  description: 'Display formatted code snippets',
  icon: '💻',
  category: 'content',
  schema: CodeBlockSchema,
  defaultData: {
    code: '// Enter your code here',
    language: 'javascript',
    title: '',
    showLineNumbers: true,
    theme: 'dark',
  },
  component: CodeBlockRenderer,
};

// Quote Block
export const QuoteBlockSchema = z.object({
  text: z.string().min(1, 'Quote text is required'),
  author: z.string().optional(),
  source: z.string().optional(),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  style: z.enum(['simple', 'bordered', 'background']).default('simple'),
});

export const QuoteBlockConfig: BlockConfig = {
  type: 'quote',
  name: 'Quote Block',
  description: 'Display highlighted quotes',
  icon: '💬',
  category: 'content',
  schema: QuoteBlockSchema,
  defaultData: {
    text: 'Enter your quote here...',
    author: '',
    source: '',
    alignment: 'center',
    style: 'simple',
  },
  component: QuoteBlockRenderer,
};

// CTA Block
export const CTABlockSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  buttonText: z.string().min(1, 'Button text is required'),
  buttonUrl: z.string().url('Valid URL is required'),
  buttonStyle: z.enum(['primary', 'secondary', 'outline']).default('primary'),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  background: z.enum(['none', 'light', 'dark', 'gradient']).default('none'),
});

export const CTABlockConfig: BlockConfig = {
  type: 'cta',
  name: 'Call to Action',
  description: 'Create action buttons and links',
  icon: '🎯',
  category: 'interactive',
  schema: CTABlockSchema,
  defaultData: {
    title: 'Ready to get started?',
    description: 'Join thousands of satisfied customers',
    buttonText: 'Get Started',
    buttonUrl: '#',
    buttonStyle: 'primary',
    alignment: 'center',
    background: 'none',
  },
  component: CTABlockRenderer,
};

// Divider Block
export const DividerBlockSchema = z.object({
  style: z.enum(['solid', 'dashed', 'dotted', 'gradient']).default('solid'),
  color: z.string().default('border-gray-300'),
  width: z.enum(['full', '1/2', '1/3']).default('full'),
  spacing: z.enum(['sm', 'md', 'lg']).default('md'),
});

export const DividerBlockConfig: BlockConfig = {
  type: 'divider',
  name: 'Divider',
  description: 'Add visual separators',
  icon: '➖',
  category: 'layout',
  schema: DividerBlockSchema,
  defaultData: {
    style: 'solid',
    color: 'border-gray-300',
    width: 'full',
    spacing: 'md',
  },
  component: DividerBlockRenderer,
};

// Spacer Block
export const SpacerBlockSchema = z.object({
  height: z.enum(['sm', 'md', 'lg', 'xl', '2xl']).default('md'),
  background: z.string().optional(),
});

export const SpacerBlockConfig: BlockConfig = {
  type: 'spacer',
  name: 'Spacer',
  description: 'Add vertical spacing',
  icon: '↕️',
  category: 'layout',
  schema: SpacerBlockSchema,
  defaultData: {
    height: 'md',
    background: '',
  },
  component: SpacerBlockRenderer,
};

// Embed Block
export const EmbedBlockSchema = z.object({
  url: z.string().url('Valid URL is required'),
  title: z.string().optional(),
  height: z.number().min(200).max(800).default(400),
  responsive: z.boolean().default(true),
});

export const EmbedBlockConfig: BlockConfig = {
  type: 'embed',
  name: 'Embed',
  description: 'Embed external content',
  icon: '🔗',
  category: 'interactive',
  schema: EmbedBlockSchema,
  defaultData: {
    url: '',
    title: '',
    height: 400,
    responsive: true,
  },
  component: EmbedBlockRenderer,
};

// Block Library
export const BlockLibrary: Record<BlockType, BlockConfig> = {
  text: TextBlockConfig,
  image: ImageBlockConfig,
  gallery: GalleryBlockConfig,
  video: VideoBlockConfig,
  code: CodeBlockConfig,
  quote: QuoteBlockConfig,
  cta: CTABlockConfig,
  divider: DividerBlockConfig,
  spacer: SpacerBlockConfig,
  embed: EmbedBlockConfig,
};

export const BlockSchemas = {
  text: TextBlockSchema,
  image: ImageBlockSchema,
  gallery: GalleryBlockSchema,
  video: VideoBlockSchema,
  code: CodeBlockSchema,
  quote: QuoteBlockSchema,
  cta: CTABlockSchema,
  divider: DividerBlockSchema,
  spacer: SpacerBlockSchema,
  embed: EmbedBlockSchema,
};

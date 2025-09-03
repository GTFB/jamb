export interface ContentBlock {
  id: string;
  type: BlockType;
  data: Record<string, any>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type BlockType = 
  | 'text'
  | 'image'
  | 'gallery'
  | 'video'
  | 'code'
  | 'quote'
  | 'cta'
  | 'divider'
  | 'spacer'
  | 'embed';

export interface BlockConfig {
  type: BlockType;
  name: string;
  description: string;
  icon: string;
  category: 'content' | 'media' | 'interactive' | 'layout';
  schema: Record<string, any>; // Zod schema for validation
  defaultData: Record<string, any>;
  component: React.ComponentType<any>;
}

export interface BlockLibrary {
  [key: string]: BlockConfig;
}

export interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
  onDelete: (blockId: string) => void;
  siteId?: string;
}

export interface BlockRendererProps {
  block: ContentBlock;
  siteId?: string;
}

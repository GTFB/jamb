'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentBlock } from '../../lib/blocks/types';
import {
  TextBlockEditor,
  ImageBlockEditor,
  GalleryBlockEditor,
  VideoBlockEditor,
  CodeBlockEditor,
  QuoteBlockEditor,
  CTABlockEditor,
  DividerBlockEditor,
  SpacerBlockEditor,
  EmbedBlockEditor,
} from '../../lib/blocks/editors';

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
  onDelete: (blockId: string) => void;
  siteId?: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const editorMap = {
  text: TextBlockEditor,
  image: ImageBlockEditor,
  gallery: GalleryBlockEditor,
  video: VideoBlockEditor,
  code: CodeBlockEditor,
  quote: QuoteBlockEditor,
  cta: CTABlockEditor,
  divider: DividerBlockEditor,
  spacer: SpacerBlockEditor,
  embed: EmbedBlockEditor,
};

export function BlockEditor({ 
  block, 
  onUpdate, 
  onDelete, 
  siteId, 
  isSelected, 
  onSelect 
}: BlockEditorProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const EditorComponent = editorMap[block.type];

  if (!EditorComponent) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="border rounded-lg p-4 bg-white"
      >
        <p className="text-gray-500">Unknown block type: {block.type}</p>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <EditorComponent
        block={block}
        onUpdate={onUpdate}
        onDelete={onDelete}
        siteId={siteId}
      />
    </div>
  );
}

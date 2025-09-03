'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentBlock } from '../../lib/blocks/types';
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
} from '../../lib/blocks/renderers';

interface BlockRendererProps {
  block: ContentBlock;
  siteId?: string;
}

const rendererMap = {
  text: TextBlockRenderer,
  image: ImageBlockRenderer,
  gallery: GalleryBlockRenderer,
  video: VideoBlockRenderer,
  code: CodeBlockRenderer,
  quote: QuoteBlockRenderer,
  cta: CTABlockRenderer,
  divider: DividerBlockRenderer,
  spacer: SpacerBlockRenderer,
  embed: EmbedBlockRenderer,
};

export function BlockRenderer({ block, siteId }: BlockRendererProps) {
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

  const RendererComponent = rendererMap[block.type];

  if (!RendererComponent) {
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
      className="cursor-move"
    >
      <RendererComponent block={block} siteId={siteId} />
    </div>
  );
}

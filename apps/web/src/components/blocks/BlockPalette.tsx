'use client';

import { Button } from '@jamb/ui';
import { BlockType } from '../../lib/blocks/types';
import { BlockLibrary } from '../../lib/blocks/configs';

interface BlockPaletteProps {
  onAddBlock: (blockType: BlockType) => void;
}

const categories = [
  { id: 'content', name: 'Content', icon: '📝' },
  { id: 'media', name: 'Media', icon: '🖼️' },
  { id: 'interactive', name: 'Interactive', icon: '🎯' },
  { id: 'layout', name: 'Layout', icon: '📐' },
];

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  const blocksByCategory = categories.map(category => ({
    ...category,
    blocks: Object.values(BlockLibrary).filter(block => block.category === category.id),
  }));

  return (
    <div className="space-y-6">
      {blocksByCategory.map((category) => (
        <div key={category.id}>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </h4>
          <div className="space-y-2">
            {category.blocks.map((block) => (
              <Button
                key={block.type}
                onClick={() => onAddBlock(block.type)}
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto py-2"
              >
                <span className="mr-2 text-lg">{block.icon}</span>
                <div>
                  <div className="font-medium text-sm">{block.name}</div>
                  <div className="text-xs text-gray-500">{block.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

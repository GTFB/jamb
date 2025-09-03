'use client';

import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@jamb/ui';
import { ContentBlock, BlockType } from '../../lib/blocks/types';
import { BlockLibrary } from '../../lib/blocks/configs';
import { BlockRenderer } from './BlockRenderer';
import { BlockEditor } from './BlockEditor';
import { BlockPalette } from './BlockPalette';

interface BlockConstructorProps {
  blocks: ContentBlock[];
  onBlocksChange: (blocks: ContentBlock[]) => void;
  siteId?: string;
  className?: string;
}

export function BlockConstructor({ blocks, onBlocksChange, siteId, className }: BlockConstructorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);

      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      onBlocksChange(newBlocks);
    }
  }, [blocks, onBlocksChange]);

  const addBlock = useCallback((blockType: BlockType) => {
    const config = BlockLibrary[blockType];
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: blockType,
      data: { ...config.defaultData },
      order: blocks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newBlocks = [...blocks, newBlock];
    onBlocksChange(newBlocks);
    setSelectedBlockId(newBlock.id);
    setIsEditing(true);
  }, [blocks, onBlocksChange]);

  const updateBlock = useCallback((updatedBlock: ContentBlock) => {
    const newBlocks = blocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    onBlocksChange(newBlocks);
  }, [blocks, onBlocksChange]);

  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    onBlocksChange(newBlocks);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
      setIsEditing(false);
    }
  }, [blocks, onBlocksChange, selectedBlockId]);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setSelectedBlockId(null);
    }
  }, [isEditing]);

  const selectBlock = useCallback((blockId: string) => {
    setSelectedBlockId(blockId);
    setIsEditing(true);
  }, []);

  return (
    <div className={`flex h-full ${className}`}>
      {/* Block Palette */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Blocks</h3>
          <Button
            onClick={toggleEditMode}
            variant={isEditing ? 'default' : 'outline'}
            size="sm"
            className="w-full"
          >
            {isEditing ? 'Preview Mode' : 'Edit Mode'}
          </Button>
        </div>

        <BlockPalette onAddBlock={addBlock} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Content Constructor
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {blocks.length} block{blocks.length !== 1 ? 's' : ''}
              </span>
              {isEditing && selectedBlockId && (
                <Button
                  onClick={() => setSelectedBlockId(null)}
                  variant="outline"
                  size="sm"
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          {blocks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blocks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start building your content by adding blocks from the palette
              </p>
              <Button
                onClick={() => addBlock('text')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Text Block
              </Button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map(block => block.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4 max-w-4xl mx-auto">
                  {blocks.map((block) => (
                    <div
                      key={block.id}
                      className={`relative ${
                        selectedBlockId === block.id && isEditing
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                    >
                      {isEditing ? (
                        <BlockEditor
                          block={block}
                          onUpdate={updateBlock}
                          onDelete={deleteBlock}
                          siteId={siteId}
                          isSelected={selectedBlockId === block.id}
                          onSelect={() => selectBlock(block.id)}
                        />
                      ) : (
                        <BlockRenderer
                          block={block}
                          siteId={siteId}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}

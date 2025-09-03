'use client';

import { useState } from 'react';
import { BlockConstructor } from '@/components/blocks/BlockConstructor';
import { ContentBlock } from '@/lib/blocks/types';

export default function BlockConstructorPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  return (
    <div className="h-screen bg-gray-50">
      <BlockConstructor
        blocks={blocks}
        onBlocksChange={setBlocks}
        className="h-full"
      />
    </div>
  );
}

---
to: apps/web/src/components/dnd/<%= name %>.tsx
---
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@jamb/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@jamb/ui';
import { GripVertical, X } from 'lucide-react';

interface <%= h.changeCase.pascalCase(name) %>Props {
  id: string;
  data: any;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function <%= h.changeCase.pascalCase(name) %>({ 
  id, 
  data, 
  onEdit, 
  onDelete 
}: <%= h.changeCase.pascalCase(name) %>Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className={`${isDragging ? 'shadow-lg' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg"><%= h.changeCase.pascalCase(name) %></CardTitle>
            <div className="flex items-center space-x-2">
              <button
                {...attributes}
                {...listeners}
                className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4 text-gray-500" />
              </button>
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(id)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              ID: {id}
            </p>
            <pre className="text-xs bg-gray-50 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

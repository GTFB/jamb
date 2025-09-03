'use client';

import { useState } from 'react';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';
import { ImageUpload } from './ImageUpload';
import { MediaLibrary } from './MediaLibrary';

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  siteId?: string;
  label?: string;
  className?: string;
}

export function ImageField({ value, onChange, siteId, label, className }: ImageFieldProps) {
  const [showLibrary, setShowLibrary] = useState(false);

  const handleSelect = (url: string) => {
    onChange(url);
    setShowLibrary(false);
  };

  const handleUpload = (url: string) => {
    onChange(url);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Current Image */}
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Selected"
            className="w-full h-32 object-cover rounded-lg border"
          />
          <Button
            onClick={() => onChange('')}
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 bg-white"
          >
            Remove
          </Button>
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Image URL or upload file"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowLibrary(!showLibrary)}
            variant="outline"
            size="sm"
          >
            {showLibrary ? 'Hide Library' : 'Browse Library'}
          </Button>
          
          <ImageUpload
            onUpload={handleUpload}
            siteId={siteId}
            className="flex-1"
          />
        </div>
      </div>

      {/* Media Library */}
      {showLibrary && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <MediaLibrary
            onSelect={handleSelect}
            siteId={siteId}
          />
        </div>
      )}
    </div>
  );
}

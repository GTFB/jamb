'use client';

import { useState } from 'react';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';

interface OptimizationSettingsProps {
  settings: {
    enabled: boolean;
    quality: number;
    format: 'webp' | 'jpeg' | 'png' | 'avif';
    maxWidth?: number;
    maxHeight?: number;
  };
  onChange: (settings: any) => void;
  className?: string;
}

export function OptimizationSettings({ settings, onChange, className }: OptimizationSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: string, value: any) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">
            Enable Image Optimization
          </span>
        </label>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="sm"
        >
          {isExpanded ? 'Hide' : 'Settings'}
        </Button>
      </div>

      {/* Settings Panel */}
      {isExpanded && settings.enabled && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <select
              value={settings.format}
              onChange={(e) => handleChange('format', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="webp">WebP (Recommended)</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="avif">AVIF</option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: {settings.quality}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              onChange={(e) => handleChange('quality', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Width (px)
              </label>
              <Input
                type="number"
                value={settings.maxWidth || ''}
                onChange={(e) => handleChange('maxWidth', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="1920"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Height (px)
              </label>
              <Input
                type="number"
                value={settings.maxHeight || ''}
                onChange={(e) => handleChange('maxHeight', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="1080"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-xs text-gray-500">
            <p>• WebP: Best compression, modern browsers</p>
            <p>• JPEG: Universal support, good compression</p>
            <p>• PNG: Lossless, supports transparency</p>
            <p>• AVIF: Best compression, limited browser support</p>
          </div>
        </div>
      )}
    </div>
  );
}

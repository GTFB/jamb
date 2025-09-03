'use client';

import { useState, useEffect } from 'react';
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';

interface MediaFile {
  name: string;
  size: number;
  modified: string;
  url: string;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    hasAlpha?: boolean;
  };
}

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  siteId?: string;
  className?: string;
}

export function MediaLibrary({ onSelect, siteId, className }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadFiles = async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '20',
      });
      
      if (siteId) {
        params.append('siteId', siteId);
      }

      const response = await fetch(`/api/media?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to load media files');
      }

      const data = await response.json();
      
      if (pageNum === 1) {
        setFiles(data.files);
      } else {
        setFiles(prev => [...prev, ...data.files]);
      }
      
      setHasMore(data.pagination.page < data.pagination.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [siteId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFiles(nextPage);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      <div>
        <Input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.name}
            className="border rounded-lg p-3 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => onSelect(file.url)}
          >
            <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  // Fallback for non-image files
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '📄';
                }}
              />
            </div>
                         <div className="text-xs text-gray-600 truncate" title={file.name}>
               {file.name}
             </div>
             <div className="text-xs text-gray-500">
               {formatFileSize(file.size)}
             </div>
             {file.metadata && (
               <div className="text-xs text-gray-400">
                 {file.metadata.width}×{file.metadata.height}
               </div>
             )}
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Loading...</p>
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="sm"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredFiles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No media files found</p>
        </div>
      )}
    </div>
  );
}

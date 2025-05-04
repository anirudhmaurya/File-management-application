import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fileService } from '../services/fileService';

export const StorageStats: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storageStats'],
    queryFn: fileService.getStorageStats,
  });

  if (isLoading) return <div className="p-4">Loading storage stats...</div>;
  if (error || !data) return <div className="p-4 text-red-600">Failed to load storage stats.</div>;

  return (
    <div className="p-4 bg-green-50 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Storage Stats</h3>
      <p>Total Files: {data.total_files}</p>
      <p>Space Saved via Deduplication: {(data.total_saved_bytes / 1024).toFixed(2)} KB</p>
    </div>
  );
};
import React, { useState } from 'react';

export interface FilterState {
  search: string;
  fileType: string;
  sizeMin: number;
  sizeMax: number;
  uploadedAfter: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    fileType: '',
    sizeMin: 0,
    sizeMax: 10000000,
    uploadedAfter: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name.includes('size') ? parseInt(value) || 0 : value;
    const updatedFilters = { ...filters, [name]: parsedValue };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="text-lg font-semibold mb-2">Search & Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search filename</label>
          <input
            name="search"
            placeholder="Enter filename"
            value={filters.search}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File type</label>
          <select name="fileType" value={filters.fileType} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="text/markdown">Markdown</option>
            <option value="text/yaml">YAML</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded after</label>
          <input
            type="date"
            name="uploadedAfter"
            value={filters.uploadedAfter}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum size (bytes)</label>
          <input
            type="number"
            name="sizeMin"
            placeholder="Enter minimum size"
            value={filters.sizeMin}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum size (bytes)</label>
          <input
            type="number"
            name="sizeMax"
            placeholder="Enter maximum size"
            value={filters.sizeMax}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
    </div>
  );
};
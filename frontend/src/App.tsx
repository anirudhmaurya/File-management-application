import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { FilterPanel, FilterState } from './components/FilterPanel';
import { StorageStats } from './components/StorageStats';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    fileType: '',
    sizeMin: 0,
    sizeMax: 10000000,
    uploadedAfter: '',
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleUploadSuccess = (isDuplicate: boolean) => {
    setRefreshKey((prev) => prev + 1);
    if (isDuplicate) {
      setNotification('Duplicate file detected. Linked to existing file.');
    } else {
      setNotification('File uploaded successfully!');
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Abnormal Security - File Hub</h1>
          <p className="mt-1 text-sm text-gray-500">File management system</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {notification && (
            <div className="p-4 rounded bg-blue-50 border border-blue-300 text-blue-700 shadow">
              {notification}
            </div>
          )}
          <StorageStats />
          <FilterPanel onFilterChange={setFilters} />
          <div className="bg-white shadow sm:rounded-lg">
            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
          <div className="bg-white shadow sm:rounded-lg">
            <FileList key={refreshKey} filters={filters} />
          </div>
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© 2024 File Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

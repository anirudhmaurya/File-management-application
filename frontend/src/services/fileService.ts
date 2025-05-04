import axios from 'axios';
import { File as FileType } from '../types/file';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const fileService = {
  async uploadFile(file: File): Promise<FileType> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/files/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getFiles(): Promise<FileType[]> {
    const response = await axios.get(`${API_URL}/files/`);
    return response.data;
  },

  async deleteFile(id: string): Promise<void> {
    await axios.delete(`${API_URL}/files/${id}/`);
  },

  async downloadFile(fileUrl: string, filename: string): Promise<void> {
    const response = await axios.get(fileUrl, { responseType: 'blob' });
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  async getStorageStats() {
    const response = await axios.get(`${API_URL}/storage-stats/`);
    return response.data;
  },

  async getFilteredFiles(filters: any): Promise<FileType[]> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.fileType) params.append('file_type', filters.fileType);
    if (filters.sizeMin) params.append('size_min', filters.sizeMin.toString());
    if (filters.sizeMax) params.append('size_max', filters.sizeMax.toString());
    if (filters.uploadedAfter) params.append('uploaded_after', filters.uploadedAfter);

    const response = await axios.get(`${API_URL}/files/?${params.toString()}`);
    return response.data;
  },
};

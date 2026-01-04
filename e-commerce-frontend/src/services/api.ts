import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiService = {
  get: async <T>(url: string): Promise<T> => {
    console.log('API REQUEST →', `${API_BASE_URL}${url}`);
    const response = await axios.get<T>(`${API_BASE_URL}${url}`);
    return response.data;
  },
};

import { apiService } from './api';
import { Product } from '@/types';

export interface ProductQuery {
  category?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
}

export const getProducts = async (query?: ProductQuery) => {
  if (!query) {
    return apiService.get<Product[]>('/products');
  }

  const params = new URLSearchParams();

  if (query.category) {
    params.append('category', query.category);
  }

  if (query.min_price !== undefined) {
    params.append('min_price', String(query.min_price));
  }

  if (query.max_price !== undefined) {
    params.append('max_price', String(query.max_price));
  }

  if (query.search) {
    params.append('search', query.search);
  }

  const url =
    params.toString().length > 0
      ? `/products?${params.toString()}`
      : '/products';

  return apiService.get<Product[]>(url);
};

// 🔽 SADECE BURAYA EKLİYORSUN
export const getProductById = async (id: number) => {
  return apiService.get<Product>(`/products/${id}`);
};

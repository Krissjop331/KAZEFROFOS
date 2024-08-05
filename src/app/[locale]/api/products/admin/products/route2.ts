import axios from 'axios';

// Интерфейсы
export interface Characteristic {
  id?: number;
  name: string;
  value: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  characteristics: Characteristic[];
  images: Image[];
  description: string;
}

// Функции
export const fetchProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`http://195.49.212.124:5000/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Omit<Product, 'images'>): Promise<void> => {
  try {
    await axios.put(`http://195.49.212.124:5000/products/${id}`, {
      ...product,
      characteristics: JSON.stringify(product.characteristics),
    });
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
};

export const removeCharacteristic = async (productId: number, characteristicId: number): Promise<void> => {
  try {
    await axios.delete(`http://195.49.212.124:5000/products/${productId}/characteristics/${characteristicId}`);
  } catch (error) {
    console.error('Failed to remove characteristic:', error);
    throw error;
  }
};

export const uploadImages = async (productId: number, files: File[]): Promise<Image[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    const response = await axios.post<Image[]>(`http://195.49.212.124:5000/products/${productId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload images:', error);
    throw error;
  }
};

export const removeImage = async (productId: number, imageId: number): Promise<void> => {
  try {
    await axios.delete(`http://195.49.212.124:5000/products/${productId}/images/${imageId}`);
  } catch (error) {
    console.error('Failed to remove image:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'images'>): Promise<Product> => {
  try {
    const response = await axios.post<Product>('http://195.49.212.124:5000/products', product);
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};
import axios from "axios";

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
  

export const createProduct = async (product: Omit<Product, 'id' | 'images'>): Promise<Product> => {
    try {
      const response = await axios.post<Product>('http://localhost:5000/products', product);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
      throw error;
    }
  };

  export const uploadImages = async (productId: number, files: File[]): Promise<Image[]> => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));
      
      const response = await axios.post<Image[]>(`http://localhost:5000/products/${productId}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
      throw error;
    }
  };
import ProductList from './ProductList';
import styles from './Product.module.css';
import { Suspense } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  description?: string;
  createdAt: string;
  images?: { url: string }[];
}

async function fetchProducts(): Promise<Product[]> {
  const apiUrl = process.env.API_URL;
  
  if (!apiUrl) {
    throw new Error('API_URL is not defined');
  }

  const response = await axios.get<Product[]>(`${apiUrl}/products`);
  return response.data;
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className={styles.products}>
      {/* Убираем Suspense, так как данные уже загружены */}
      <ProductList initialProducts={products} />
    </div>
  );
}
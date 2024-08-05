import { notFound } from 'next/navigation';
import axios from 'axios';
import ProductPageClient from './ProductPageClient';
import { Product } from '@/types/product';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      throw new Error('API_URL is not defined');
    }
    const response = await axios.get<Product>(`${apiUrl}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
    return null;
  }

  return <ProductPageClient product={product} />;
}
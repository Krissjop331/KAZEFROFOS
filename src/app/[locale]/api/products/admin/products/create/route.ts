import { NextRequest, NextResponse } from 'next/server';
import { createProduct, uploadImages } from '../../../../utils/productApi';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newProduct = await createProduct(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании продукта:', error);
    return NextResponse.json({ error: 'Ошибка при создании продукта' }, { status: 500 });
  }
}
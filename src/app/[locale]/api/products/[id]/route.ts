import axios from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    const response = await axios.get(`http://195.49.212.124:5000/products/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return NextResponse.json({ error: 'Не удалось получить продукт' }, { status: 500 });
  }
}
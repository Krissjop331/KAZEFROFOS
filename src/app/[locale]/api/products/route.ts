import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const response = await axios.get('http://195.49.212.124:5000/products');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
import axios from 'axios';
import { NextResponse } from 'next/server';

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  let loginRequest: LoginRequest;

  try {
    loginRequest = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { username, password } = loginRequest;

  try {
    const response = await axios.post('http://localhost:5000/auth/login', { username, password });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Login error:', error); // Logging the error for debugging
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
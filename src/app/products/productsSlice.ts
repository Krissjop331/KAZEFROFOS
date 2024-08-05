import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/product';

// Определение типа состояния
interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Начальное состояние
const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

// Асинхронный экшен для получения продуктов
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>('http://195.49.212.124:5000/products');
    return response.data;
  }
);

// Создание среза состояния
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
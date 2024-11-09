// src/features/deals/dealsAPI.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Deal } from './dealsSlice';

export const fetchDeals = createAsyncThunk<Deal[]>('deals/fetchDeals', async () => {
  const response = await axios.get('/api/deals'); // URL вашего API
  return response.data;
});

// Другие асинхронные действия (например, создание, обновление, удаление сделок) можно добавить аналогично
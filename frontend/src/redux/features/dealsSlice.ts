import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Deal {
  id: number;
  title: string;
  status: 'Новый' | 'В работе' | 'Почти завершен' | 'Успешно' | 'Провал';
  createdAt: string; // Можно использовать Date, но в рамках тз не увидел, что есть смысл. А со строками легче
}

interface DealsState {
  deals: Deal[];
}

const initialState: DealsState = {
  deals: [],
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setDeals: (state, action: PayloadAction<Deal[]>) => {
      state.deals = action.payload;
    },
    addDeal: (state, action: PayloadAction<Deal>) => {
      state.deals.push(action.payload);
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const index = state.deals.findIndex(deal => deal.id === action.payload.id);
      if (index !== -1) {
        state.deals[index] = action.payload;
      }
    },
    deleteDeal: (state, action: PayloadAction<number>) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
    },
  },
});

export const { setDeals, addDeal, updateDeal, deleteDeal } = dealsSlice.actions;
export default dealsSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDeal {
  id: number;
  title: string;
  status: 'Новый' | 'В работе' | 'Почти завершен' | 'Успешно' | 'Провал';
  createdAt: string; // Можно использовать Date, но в рамках тз не увидел, что есть смысл. А со строками легче
}

export class Deal implements IDeal {
  constructor(
      public id: number,
      public title: string,
      public status: 'Новый' | 'В работе' | 'Почти завершен' | 'Успешно' | 'Провал',
      public createdAt: string
  ) {}
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
    setDeals: (state, action: PayloadAction<IDeal[]>) => {
      state.deals = action.payload;
    },
    addDeal: (state, action: PayloadAction<IDeal>) => {
      state.deals.push(action.payload);
    },
    updateDeal: (state, action: PayloadAction<IDeal>) => {
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
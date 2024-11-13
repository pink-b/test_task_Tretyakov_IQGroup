import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export type Status = 'Новый' | 'В работе' | 'Почти завершен' | 'Успешно' | 'Провал';

export interface IDeal {
  id: number;
  title: string;
  status: Status;
  createdAt: string; // Можно использовать Date, но в рамках тз не увидел, что есть смысл. А со строками легче
  phoneNumber?: string;
  budget?: number;
  fullName?: string;  
  comments: IComment[];
}

export interface IComment {
  id: number;
  dealId: number;
  text: string;
  createdAt: string;
}

export class Deal implements IDeal {
  constructor(
    public id: number,
    public title: string,
    public status: Status,
    public createdAt: string,
    public phoneNumber?: string,
    public budget?: number,
    public fullName?: string, 
    public comments: IComment[] = []
  ) {}
}

export class Comment implements IComment {
   constructor(
    public id: number,
    public dealId: number,
    public text: string,
    public createdAt: string
   ) {}
}

interface DealsState {
  deals: Deal[];
  currentDeal?: Deal;
}

const initialState: DealsState = {
  deals: [],
  currentDeal: undefined,
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
    updateCompleteDeal: (state, action: PayloadAction<IDeal>) => {
      const index = state.deals.findIndex(deal => deal.id === action.payload.id);
      if (index !== -1) {
        state.deals[index] = action.payload;
      }
    },
    updatePartialDeal: (state, action: PayloadAction<Partial<IDeal>>) => {
      if (state.currentDeal) {
        state.currentDeal = { ...state.currentDeal, ...action.payload };
      }
    },
    deleteDeal: (state, action: PayloadAction<number>) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
    },

    addComment: (state, action: PayloadAction<{ dealId: number; comment: IComment }>) => {
      const deal = state.deals.find(deal => deal.id === action.payload.dealId);
      if (deal) {
        deal.comments.push(action.payload.comment);
      }
    },

    deleteComment: (state, action: PayloadAction<{ dealId: number; commentId: number }>) => {
      const deal = state.deals.find(deal => deal.id === action.payload.dealId);
      if (deal) {
        deal.comments = deal.comments.filter(comment => comment.id !== action.payload.commentId);
      }
    },
  },
});

export const selectDeals = (state: RootState) => state.deals.deals;

export const { 
  setDeals, 
  addDeal, 
  updateCompleteDeal, 
  updatePartialDeal,
  deleteDeal, 
  addComment, 
  deleteComment 
} = dealsSlice.actions;

export default dealsSlice.reducer;  
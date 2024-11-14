import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import {
  fetchAllDeals,
  createNewDeal,
  updateExistingDeal,
  removeDeal
} from '../asyncActions/dealsAsyncActions';

export type Status = 'new' | 'in_progress' | 'almost_done' | 'successful' | 'failed';

export interface IDeal {
  id: number;
  title: string;
  status: Status;
  createdAt: string; // Можно использовать Date, но в рамках тз не увидел, что есть смысл. А со строками легче
  phoneNumber?: string;
  budget?: number;
  fullName?: string;  
  comments?: IComment[];
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
    public comments?: IComment[]
  ) {
    this.comments = comments || [];
  }
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
  loading: boolean;
  error: string | null;
}

const initialState: DealsState = {
  deals: [],
  currentDeal: undefined,
  loading: false,
  error: null,
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
    // updatePartialDeal: (state, action: PayloadAction<Partial<IDeal>>) => {
    //   console.log(state)
    //   console.log(state.currentDeal)
    //   console.log(action.payload)
    //   if (state.deals[action.payload.id]) {
    //     state.currentDeal = { ...state.currentDeal, ...action.payload };
    //   }
    // },
    updatePartialDeal: (state, action: PayloadAction<Partial<IDeal> & { id: number }>) => {
      const index = state.deals.findIndex(deal => deal.id === action.payload.id);
      if (index !== -1) {
        state.deals[index] = {
          ...state.deals[index],
          ...action.payload,     
        };
      }
    },
    // deleteDeal: (state, action: PayloadAction<number>) => {
    //   state.deals = state.deals.filter(deal => deal.id !== action.payload);
    // },
    deleteDeal: (state, action: PayloadAction<number>) => {
      state.deals = state.deals.filter(deal => deal.id !== action.payload);
      
      if (state.currentDeal && state.currentDeal.id === action.payload) {
        state.currentDeal = undefined;
      }
    },

    // addComment: (state, action: PayloadAction<{ dealId: number; comment: IComment }>) => {
    //   const deal = state.deals.find(deal => deal.id === action.payload.dealId);
    //   if (deal) {
    //     deal.comments.push(action.payload.comment);
    //   }
    // },

    // deleteComment: (state, action: PayloadAction<{ dealId: number; commentId: number }>) => {
    //   const deal = state.deals.find(deal => deal.id === action.payload.dealId);
    //   if (deal) {
    //     deal.comments = deal.comments.filter(comment => comment.id !== action.payload.commentId);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch deals';
      })
      .addCase(createNewDeal.fulfilled, (state, action) => {
        state.deals.push(action.payload);
      })
      .addCase(updateExistingDeal.fulfilled, (state, action) => {
        const index = state.deals.findIndex(deal => deal.id === action.payload.id);
        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      })
      .addCase(removeDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter(deal => deal.id !== action.payload);
        
        if (state.currentDeal && state.currentDeal.id === action.payload) {
          state.currentDeal = undefined;
        }
      })
  },
});

export const selectDeals = (state: RootState) => state.deals.deals;
export const selectCurrentDeal = (state: RootState) => state.deals.currentDeal;
export const selectLoading = (state: RootState) => state.deals.loading;
export const selectError = (state: RootState) => state.deals.error;

export const { 
  setDeals, 
  addDeal, 
  updateCompleteDeal, 
  updatePartialDeal,
  deleteDeal, 
  // addComment, 
  // deleteComment 
} = dealsSlice.actions;

export default dealsSlice.reducer;  
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dealsReducer from '../features/dealsSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    deals: dealsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
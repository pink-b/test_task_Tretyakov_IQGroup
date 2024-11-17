import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllDeals, createDeal, updateDeal, removeDeal, getDealById } from '../../api/requests';
import { IDeal } from '../features/dealsSlice';

export const fetchAllDeals = createAsyncThunk('deals/fetchAll', async () => {
  const response = await getAllDeals();
  return response;
});

export const fetchDealsById = createAsyncThunk('deals/fetchById', async (id: number) => {
  const response = await getDealById(id);
  return response;
});

export const createNewDeal = createAsyncThunk('deals/create', async (dealData: IDeal) => {
  const response = await createDeal(dealData);
  return response;
});

export const updateExistingDeal = createAsyncThunk('deals/update', async (dealData: IDeal) => {
  const response = await updateDeal(dealData.id, dealData);
  return response;
});

export const deleteDealAsyncAction = createAsyncThunk('deals/delete', async (id: number) => {
  await removeDeal(id);
  return id;
});

// export const addNewComment = createAsyncThunk('deals/addComment', async (payload: { dealId: number; comment: IComment }) => {
//   const response = await addComment(payload.dealId, payload.comment.text);
//   return { dealId: payload.dealId, comment: response };
// });

// export const removeComment = createAsyncThunk('deals/deleteComment', async (payload: { dealId: number; commentId: number }) => {
//   await deleteComment(payload.dealId, payload.commentId);
//   return payload;
// });
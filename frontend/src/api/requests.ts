import { IDeal } from '../redux/features/dealsSlice';
import axiosInstance from './axiosInstance';

export const getAllDeals = async () => {
  try {
    const response = await axiosInstance.get('/deals');
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const getArchivedDeals = async () => {
    try {
      const response = await axiosInstance.get('/deals/archived');
      return response.data;
    } catch (error) {
      console.error('Error fetching archived deals:', error);
      throw error;
    }
  };

  export const createDeal = async (dealData: IDeal) => {
    try {
      const response = await axiosInstance.post('/deals', dealData);
      return response.data;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  };

  export const getDealById = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/deals/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deal:', error);
      throw error;
    }
  };

  export const updateDeal = async (id: number, dealData: any) => {
    try {
      const response = await axiosInstance.patch(`/deals/${id}`, dealData);
      return response.data;
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  };

  export const deleteDeal = async (id: number) => {
    try {
      await axiosInstance.delete(`/deals/${id}`);
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  };

  export const addComment = async (id: number, comment: string) => {
    try {
      const response = await axiosInstance.post(`/deals/${id}/comments`, { comment });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };
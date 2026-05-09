import { create } from 'zustand';
import axiosInstance from '../axios-service';
import { get } from 'lodash';
import { API_TOP_HEADLINES } from '../routes';

interface NewsPreviewState {
  fetching: boolean;
  fetched: boolean;
  error: string | null;
  data: any[];
  setFetching: () => void;
  setFetched: (error?: string | null, data?: any[]) => void;
  fetchTopNews: () => Promise<void>;
}

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
};

export const useNewsPreviewStore = create<NewsPreviewState>((set) => ({
  ...initialState,

  setFetching: () => {
    set({
      fetching: true,
      fetched: false,
      error: null
    });
  },

  setFetched: (error = null, data = []) => {
    set({
      fetching: false,
      fetched: true,
      error,
      data
    });
  },

  fetchTopNews: async () => {
    set({ fetching: true, fetched: false, error: null });
    try {
      const response = await axiosInstance.get(API_TOP_HEADLINES, {});
      set({
        fetching: false,
        fetched: true,
        error: null,
        data: get(response, 'data.articles', [])
      });
    } catch (error: any) {
      console.error(error.toJSON?.());
      set({
        fetching: false,
        fetched: true,
        error: error.message,
        data: []
      });
    }
  }
}));

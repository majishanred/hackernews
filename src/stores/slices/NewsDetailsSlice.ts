import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsDetails } from '../../types/NewsDetails.ts';

export type NewsStore = {
  newsDetails: NewsDetails | null;
  error: unknown;
  refetchTrigger: number;
};

const initialState: NewsStore = {
  newsDetails: null,
  refetchTrigger: Date.now(),
  error: null,
};

const NewsSlice = createSlice({
  name: 'NewsSlice',
  initialState,
  reducers: {
    changeNews: (state, action: PayloadAction<NewsDetails>) => {
      state.newsDetails = action.payload;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    triggerRefetch: (state) => {
      state.refetchTrigger = Date.now();
    },
    resetStore: (state) => {
      state.newsDetails = null;
    },
  },
});

export const { changeNews, setError, triggerRefetch, resetStore } = NewsSlice.actions;

export default NewsSlice.reducer;

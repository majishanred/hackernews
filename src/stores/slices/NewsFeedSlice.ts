import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedItem } from '../../types/FeedItem.ts';

export type NewsFeedStore = {
  newsFeed: FeedItem[];
  error: unknown;
  refetchIndicator: number;
  isLoading: boolean;
};

const initialState: NewsFeedStore = {
  newsFeed: [],
  error: null,
  refetchIndicator: Date.now(),
  isLoading: false,
};

const NewsFeedSlice = createSlice({
  name: 'NewsFeed',
  initialState,
  reducers: {
    changeNewsFeed: (state, action: PayloadAction<FeedItem[]>) => {
      state.newsFeed = action.payload;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
      state.newsFeed = [];
    },
    triggerRefetch: (state) => {
      state.refetchIndicator = Date.now();
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading, changeNewsFeed, setError, triggerRefetch } = NewsFeedSlice.actions;

export default NewsFeedSlice.reducer;

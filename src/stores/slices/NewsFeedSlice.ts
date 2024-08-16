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
    triggerRefetch: (state) => {
      state.refetchIndicator = Date.now();
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading, changeNewsFeed, triggerRefetch } = NewsFeedSlice.actions;

export default NewsFeedSlice.reducer;

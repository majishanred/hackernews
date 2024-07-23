import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isShallowlyEquals } from '../../utils/utils.ts';
import { FeedItem } from '../../types/FeedItem.ts';

export type NewsFeedStore = {
  newsFeed: FeedItem[];
  error: unknown;
  refetchTrigger: number;
};

const initialState: NewsFeedStore = {
  newsFeed: [],
  error: null,
  refetchTrigger: Date.now(),
};

const NewsFeedSlice = createSlice({
  name: 'NewsFeed',
  initialState,
  reducers: {
    changeNewsFeed: (state, action: PayloadAction<FeedItem[]>) => {
      if (isShallowlyEquals(state.newsFeed, action.payload)) {
        return;
      }

      state.newsFeed = action.payload;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
      state.newsFeed = [];
    },
    triggerRefetch: (state) => {
      state.refetchTrigger = Date.now();
    },
  },
});

export const { changeNewsFeed, setError, triggerRefetch } = NewsFeedSlice.actions;

export default NewsFeedSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import newsDetailsReducer, { NewsStore } from './slices/NewsDetailsSlice.ts';
import newsFeedReducer, { NewsFeedStore } from './slices/NewsFeedSlice.ts';

export type StoresState = {
  newsStore: NewsStore;
  newsFeedStore: NewsFeedStore;
};

export default configureStore({
  reducer: {
    newsStore: newsDetailsReducer,
    newsFeedStore: newsFeedReducer,
  },
});

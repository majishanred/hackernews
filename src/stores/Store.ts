import { configureStore } from '@reduxjs/toolkit';
import newsDetailsReducer, { ItemStore } from './slices/ItemDetailsSlice.ts';
import newsFeedReducer, { NewsFeedStore } from './slices/NewsFeedSlice.ts';

export type StoresState = {
  itemStore: ItemStore;
  newsFeedStore: NewsFeedStore;
};

export const newsStore = configureStore({
  reducer: {
    itemStore: newsDetailsReducer,
    newsFeedStore: newsFeedReducer,
  },
});

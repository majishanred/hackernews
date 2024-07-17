import { configureStore } from '@reduxjs/toolkit';
import newsDetailsReducer, { NewsStore } from './slices/NewsDetailsSlice.ts';

export type StoresState = {
  newsStore: NewsStore;
};

export default configureStore({
  reducer: {
    newsStore: newsDetailsReducer,
  },
});

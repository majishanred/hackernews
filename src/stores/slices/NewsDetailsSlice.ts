import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Commentary } from '../../types/Commentary.ts';
import { NewsDetails } from '../../types/NewsDetails.ts';
import { isShallowlyEquals } from '../../utils/utils.ts';

export type NewsStore = {
  newsDetails: NewsDetails | null;
  firstLevelComments: number[];
  comments: Record<string, StoredCommentary>;
  error: unknown;
  refetchTrigger: number;
};

export type StoredCommentary = Omit<Commentary, 'comments'> & {
  comments: number[];
};

const initialState: NewsStore = {
  newsDetails: null,
  firstLevelComments: [],
  comments: {},
  refetchTrigger: Date.now(),
  error: null,
};

const NewsSlice = createSlice({
  name: 'NewsSlice',
  initialState,
  reducers: {
    changeComments(state, action: PayloadAction<Commentary[]>) {
      action.payload.forEach((comment) => {
        const nestedCommentsIds = comment.comments.map((element) => element.id);
        const commentToStore: StoredCommentary = {
          ...comment,
          comments: nestedCommentsIds,
        };

        if (!state.comments[comment.id]) {
          if (comment.level === 0) {
            state.firstLevelComments.push(comment.id);
          }

          state.comments[comment.id] = commentToStore;
          return;
        }

        if (isShallowlyEquals(state.comments[comment.id], commentToStore)) {
          return;
        }

        state.comments[comment.id] = commentToStore;
      });
    },
    changeNewsDetails: (state, action: PayloadAction<NewsDetails>) => {
      if (isShallowlyEquals<NewsDetails>(state.newsDetails, action.payload)) return;
      state.newsDetails = action.payload;
    },
    resetStore: (state) => {
      state.newsDetails = initialState.newsDetails;
      state.firstLevelComments = initialState.firstLevelComments;
      state.comments = initialState.comments;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
    },
    triggerRefetch: (state) => {
      state.refetchTrigger = Date.now();
    },
  },
});

export const { changeComments, changeNewsDetails, resetStore, setError, triggerRefetch } = NewsSlice.actions;

export default NewsSlice.reducer;

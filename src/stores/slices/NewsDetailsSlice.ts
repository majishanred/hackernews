import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Commentary } from '../../types/Commentary.ts';
import { NewsDetails } from '../../types/NewsDetails.ts';

export type NewsStore = {
  newsDetails: NewsDetails | null;
  firstLevelComments: number[];
  comments: {
    [id: number]: StoredCommentary;
  };
};

export type StoredCommentary = Omit<Commentary, 'comments'> & {
  comments: number[];
};

const initialState: NewsStore = {
  newsDetails: null,
  firstLevelComments: [],
  comments: {},
};

const NewsSlice = createSlice({
  name: 'NewsSlice',
  initialState,
  reducers: {
    changeComment(state, action: PayloadAction<Commentary[]>) {
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

        const commentJson = JSON.stringify(state.comments[comment.id]);
        const newCommentJson = JSON.stringify(commentToStore);

        if (commentJson === newCommentJson) {
          return;
        } else {
          state.comments[comment.id] = commentToStore;
        }
      });
    },
    changeNewsDetails: (state, action: PayloadAction<NewsDetails>) => {
      if (JSON.stringify(state.newsDetails) === JSON.stringify(action.payload)) return;
      state.newsDetails = action.payload;
    },
    resetStore: (state) => {
      state.newsDetails = initialState.newsDetails;
      state.firstLevelComments = initialState.firstLevelComments;
      state.comments = initialState.comments;
    },
  },
});

export const { changeComment, changeNewsDetails, resetStore } = NewsSlice.actions;

export default NewsSlice.reducer;

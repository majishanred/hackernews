import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemDetails } from '../../types/ItemDetails.ts';
import { Commentary } from '../../types/Commentary.ts';

export type ItemStore = {
  itemDetails: ItemDetails;
  expandedComments: number[];
  refetchIndicator: number;
  isLoading: boolean;
};

const itemDetailsPlaceholder: ItemDetails = {
  id: 0,
  title: '',
  points: null,
  user: '',
  time: 0,
  comments_count: 0,
  comments: [],
};

const initialState: ItemStore = {
  itemDetails: itemDetailsPlaceholder,
  expandedComments: [],
  refetchIndicator: Date.now(),
  isLoading: true,
};

const ItemSlice = createSlice({
  name: 'ItemSlice',
  initialState,
  reducers: {
    changeItem: (state, action: PayloadAction<ItemDetails>) => {
      state.itemDetails = action.payload;
    },
    triggerRefetch: (state) => {
      state.refetchIndicator = Date.now();
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    expandComment: (state, action: PayloadAction<Commentary>) => {
      !state.expandedComments.includes(action.payload.id) &&
        !!action.payload.comments.length &&
        state.expandedComments.push(action.payload.id);
    },
  },
});

export const { changeItem, triggerRefetch, setIsLoading, expandComment } = ItemSlice.actions;

export default ItemSlice.reducer;

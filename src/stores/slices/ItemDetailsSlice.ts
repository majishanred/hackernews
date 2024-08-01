import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemDetails } from '../../types/ItemDetails.ts';
import { Commentary } from '../../types/Commentary.ts';

export type ItemStore = {
  itemDetails: ItemDetails | null;
  expandedComments: number[];
  error: unknown;
  refetchIndicator: number;
  isLoading: boolean;
};

const initialState: ItemStore = {
  itemDetails: null,
  expandedComments: [],
  refetchIndicator: Date.now(),
  error: null,
  isLoading: false,
};

const ItemSlice = createSlice({
  name: 'ItemSlice',
  initialState,
  reducers: {
    changeItem: (state, action: PayloadAction<ItemDetails>) => {
      state.itemDetails = action.payload;
    },
    setError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload;
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

export const { changeItem, setError, triggerRefetch, setIsLoading, expandComment } = ItemSlice.actions;

export default ItemSlice.reducer;

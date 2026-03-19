import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { List } from '@shared/types/list';

type ListsState = {
  selectedList: List | undefined;
};

const initialState: ListsState = {
  selectedList: undefined,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  selectors: {
    selectSelectedList: (state) => state.selectedList,
  },
  reducers: {
    setSelectedList: (state, action: PayloadAction<{ list: List }>) => {
      state.selectedList = action.payload.list;
    },
    removeSelectedList: (state) => {
      state.selectedList = undefined;
    },
  },
});

export const listSelectors = listSlice.selectors;
export const listActions = listSlice.actions;

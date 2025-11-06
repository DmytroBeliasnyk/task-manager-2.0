import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { List, ListId } from '@shared/types/list';

type ListsState = {
  entities: Record<ListId, List>;
  selectedList: ListId | undefined;
}

const initialState: ListsState = {
  entities: {},
  selectedList: undefined,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  selectors: {
    selectLists: createSelector(
      (state: ListsState) => state.entities,
      (entities) => Object.values(entities)
    ),
    selectList: (state, listId: ListId) => state.entities[listId],
    selectSelectedList: state => state.selectedList,
  },
  reducers: {
    addList: (state, action: PayloadAction<{ list: List }>) => {
      const list = action.payload.list;
      state.entities[list.id] = list;
    },
    editList: (state, action: PayloadAction<{ list: List }>) => {
      const list = action.payload.list;
      state.entities[list.id] = list;
    },
    removeList: (state, action: PayloadAction<{ listId: ListId }>) => {
      delete state.entities[action.payload.listId];
    },
    setSelectedList: (state, action: PayloadAction<{ listId: ListId }>) => {
      state.selectedList = action.payload.listId;
    },
    removeSelectedList: (state) => {
      state.selectedList = undefined;
    },
  },
});

export const listSelectors = listSlice.selectors;
export const listActions = listSlice.actions;
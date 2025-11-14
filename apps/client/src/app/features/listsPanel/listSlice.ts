import { rootReducer } from '../../redux';
import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { List, ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';

type ListsState = {
  entities: Record<ListId, List>;
  selectedList: List | undefined;
  fetchListsStatus: 'idle' | 'pending' | 'success' | 'failed';
}

const initialState: ListsState = {
  entities: {},
  selectedList: undefined,
  fetchListsStatus: 'idle',
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  selectors: {
    selectLists: createSelector(
      (state: ListsState) => state.entities,
      (entities) => Object.values(entities),
    ),
    selectList: (state, listId: ListId) => state.entities[listId],
    selectSelectedList: state => state.selectedList,
    selectIsFetchListsIdle: state => state.fetchListsStatus === 'idle',
    selectIsFetchListsPending: state => state.fetchListsStatus === 'pending',
  },
  reducers: {
    fetchListsSuccess: (state, action: PayloadAction<{ lists: List[] }>) => {
      action.payload.lists.forEach(list => state.entities[list.id] = list);
      state.fetchListsStatus = 'success';
    },
    attachTasksToList: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      action.payload.tasks.forEach(({ id, listId }) =>
        state.entities[listId].tasksIds.push(id));
    },
    fetchListsPending: state => {
      state.fetchListsStatus = 'pending';
    },
    fetchListsFailed: state => {
      state.fetchListsStatus = 'failed';
    },
    addList: (state, action: PayloadAction<{ list: List }>) => {
      const list = action.payload.list;
      state.entities[list.id] = list;
    },
    addTaskId: (state, action: PayloadAction<{ listId: ListId, taskId: TaskId }>) => {
      const { listId, taskId } = action.payload;
      const list = state.entities[listId]
      list.tasksIds.push(taskId);

      if (state.selectedList?.id === listId) {
        state.selectedList = list;
      }
    },
    editList: (state, action: PayloadAction<{ id: ListId, title: string, description: string }>) => {
      const { id, title, description } = action.payload;
      const list = state.entities[id];

      list.title = title;
      list.description = description;

      if (state.selectedList?.id === id) {
        state.selectedList = list;
      }
    },
    removeList: (state, action: PayloadAction<{ listId: ListId }>) => {
      delete state.entities[action.payload.listId];
    },
    setSelectedList: (state, action: PayloadAction<{ list: List }>) => {
      state.selectedList = action.payload.list;
    },
  },
}).injectInto(rootReducer);

export const listSelectors = listSlice.selectors;
export const listActions = listSlice.actions;
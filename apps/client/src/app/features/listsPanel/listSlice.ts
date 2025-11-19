import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { List, ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';
import type { RequestStatus } from '../../redux';

type ListsState = {
  entities: Record<ListId, List>;
  selectedList: List | undefined;
  addListStatus: RequestStatus;
  fetchListsStatus: RequestStatus;
  editListStatus: RequestStatus;
  removeListStatus: RequestStatus;
}

const initialState: ListsState = {
  entities: {},
  selectedList: undefined,
  addListStatus: 'idle',
  fetchListsStatus: 'idle',
  editListStatus: 'idle',
  removeListStatus: 'idle',
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  selectors: {
    selectLists: createSelector(
      (state: ListsState) => state.entities,
      (entities) => Object.values(entities),
    ),
    selectList: (state, listId: ListId) => state.entities[listId],
    selectSelectedList: state => state.selectedList,
  },
  reducers: {
    attachTasksToList: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      action.payload.tasks.forEach(({ id, listId }) =>
        state.entities[listId].tasksIds.push(id));
    },
    addTaskId: (state, action: PayloadAction<{ listId: ListId, taskId: TaskId }>) => {
      const { listId, taskId } = action.payload;
      const list = state.entities[listId];
      list.tasksIds.push(taskId);

      if (state.selectedList?.id === listId) {
        state.selectedList = list;
      }
    },
    setSelectedList: (state, action: PayloadAction<{ list: List }>) => {
      state.selectedList = action.payload.list;
    },
  },
});

export const listSelectors = listSlice.selectors;
export const listActions = listSlice.actions;
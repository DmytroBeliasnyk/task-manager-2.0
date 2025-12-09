import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { List, ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';
import { rootReducer } from '../../../store';
import { fetchLists } from './model/fetchLists';
import type { RequestStatus } from '../../redux';
import { addList } from './model/addList';
import { editList } from './model/editList';
import { removeList } from './model/removeList';

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
  extraReducers: builder => {
    builder.addCase(addList.pending, (state) => {
      state.addListStatus = 'pending';
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      const list = action.payload;
      state.entities[list.id] = list;
      state.addListStatus = 'success';
    });
    builder.addCase(addList.rejected, (state) => {
      state.addListStatus = 'failed';
    });

    builder.addCase(fetchLists.pending, (state) => {
      state.fetchListsStatus = 'pending';
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      action.payload.forEach(list => state.entities[list.id] = list);
      state.fetchListsStatus = 'success';
    });
    builder.addCase(fetchLists.rejected, (state) => {
      state.fetchListsStatus = 'failed';
    });

    builder.addCase(editList.pending, (state) => {
      state.editListStatus = 'pending';
    });
    builder.addCase(editList.fulfilled, (state, action) => {
      const { id, title, description } = action.payload;
      const list = state.entities[id];

      list.title = title;
      list.description = description;

      if (state.selectedList?.id === id) {
        state.selectedList = list;
      }

      state.editListStatus = 'success';
    });
    builder.addCase(editList.rejected, (state) => {
      state.editListStatus = 'failed';
    });

    builder.addCase(removeList.pending, (state) => {
      state.removeListStatus = 'pending';
    });
    builder.addCase(removeList.fulfilled, (state, action) => {
      delete state.entities[action.payload];
      state.removeListStatus = 'success';
    });
    builder.addCase(removeList.rejected, (state) => {
      state.removeListStatus = 'failed';
    });
  },
}).injectInto(rootReducer);

export const listSelectors = listSlice.selectors;
export const listActions = listSlice.actions;
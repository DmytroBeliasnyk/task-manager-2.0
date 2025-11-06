import type { Task, TaskId } from '@shared/types/task';
import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListId } from '@shared/types/list';
import { rootReducer } from '../../redux';

type TasksState = {
  entities: Record<TaskId, Task>
}

const initialState: TasksState = {
  entities: {},
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: createSelector(
      (state: TasksState) => state.entities,
      (_: TasksState, listId: ListId) => listId,
      (entities, listId: ListId) =>
        Object.values(entities).filter(task => task.listId === listId),
    ),
  },
  reducers: {
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      const task = action.payload.task;
      state.entities[task.id] = task;
    },
    editTask: (state, action: PayloadAction<{ task: Task }>) => {
      const task = action.payload.task;
      state.entities[task.id] = task;
    },
    removeTask: (state, action: PayloadAction<{ taskId: TaskId }>) => {
      delete state.entities[action.payload.taskId];
    },
  },
}).injectInto(rootReducer);

export const taskSelectors = taskSlice.selectors;
export const taskActions = taskSlice.actions;
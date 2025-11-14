import type { Task, TaskId } from '@shared/types/task';
import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ListId } from '@shared/types/list';
import { rootReducer } from '../../redux';

type TasksState = {
  entities: Record<TaskId, Task>
  fetchTasksStatus: 'idle' | 'pending' | 'success' | 'failed';
}

const initialState: TasksState = {
  entities: {},
  fetchTasksStatus: 'idle',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: createSelector(
      (state: TasksState) => state.entities,
      (_: TasksState, listId: ListId | undefined) => listId,
      (entities, listId: ListId | undefined) => {
        let tasks: Task[] = [];
        if (listId) {
          tasks = Object.values(entities).filter(task => task.listId === listId);
        }
        return tasks;
      },
    ),
    selectIsFetchTasksIdle: state => state.fetchTasksStatus === 'idle',
    selectIsFetchTasksPending: state => state.fetchTasksStatus === 'pending',
  },
  reducers: {
    fetchTasksSuccess: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      action.payload.tasks.forEach(task => state.entities[task.id] = task);
      state.fetchTasksStatus = 'success';
    },
    fetchTasksPending: state => {
      state.fetchTasksStatus = 'pending';
    },
    fetchTasksFailed: state => {
      state.fetchTasksStatus = 'failed';
    },
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      const task = action.payload.task;
      state.entities[task.id] = task;
    },
    editTask: (state, action: PayloadAction<{ id: TaskId, title: string, description: string }>) => {
      const { id, title, description } = action.payload;
      const task = state.entities[id];

      task.title = title;
      task.description = description;
    },
    removeTask: (state, action: PayloadAction<{ taskId: TaskId }>) => {
      delete state.entities[action.payload.taskId];
    },
  },
}).injectInto(rootReducer);

export const taskSelectors = taskSlice.selectors;
export const taskActions = taskSlice.actions;
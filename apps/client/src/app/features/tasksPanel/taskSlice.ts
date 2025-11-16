import type { Task, TaskId } from '@shared/types/task';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from './model/fetchTasks';
import { rootReducer } from '../../../store';
import type { RequestStatus } from '../../redux';
import { addTask } from './model/addTask';
import { editTask } from './model/editTask';
import { removeTask } from './model/removeTask';

type TasksState = {
  entities: Record<TaskId, Task>
  addTaskStatus: RequestStatus;
  fetchTasksStatus: RequestStatus;
  editTaskStatus: RequestStatus;
  removeTaskStatus: RequestStatus;
}

const initialState: TasksState = {
  entities: {},
  addTaskStatus: 'idle',
  fetchTasksStatus: 'idle',
  editTaskStatus: 'idle',
  removeTaskStatus: 'idle',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: createSelector(
      (state: TasksState) => state.entities,
      (_: TasksState, tasksIds: TaskId[] | undefined) => tasksIds,
      (entities, tasksIds) =>
        tasksIds?.map(id => entities[id]) ?? [],
    ),
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTask.pending, (state) => {
      state.addTaskStatus = 'pending';
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      const task = action.payload;
      state.entities[task.id] = task;
      state.addTaskStatus = 'success';
    });
    builder.addCase(addTask.rejected, (state) => {
      state.addTaskStatus = 'failed';
    });

    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchTasksStatus = 'pending';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      action.payload.forEach(task => state.entities[task.id] = task);
      state.fetchTasksStatus = 'success';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchTasksStatus = 'failed';
    });

    builder.addCase(editTask.pending, (state) => {
      state.editTaskStatus = 'pending';
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.entities[id];

      task.title = title;
      task.description = description;
      state.editTaskStatus = 'success';
    });
    builder.addCase(editTask.rejected, (state) => {
      state.editTaskStatus = 'failed';
    });

    builder.addCase(removeTask.pending, (state) => {
      state.removeTaskStatus = 'pending';
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      delete state.entities[action.payload];
      state.removeTaskStatus = 'success';
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.removeTaskStatus = 'failed';
    });
  },
}).injectInto(rootReducer);

export const taskSelectors = taskSlice.selectors;
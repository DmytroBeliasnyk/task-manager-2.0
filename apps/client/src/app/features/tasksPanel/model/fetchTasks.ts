import { createAppAsyncThunk } from '../../../redux';

export const fetchTasks = createAppAsyncThunk(
  'tasks/fetchTasks',
  async (_, thunkApi) =>
    thunkApi.extra.api.tasks.getAll(),
);
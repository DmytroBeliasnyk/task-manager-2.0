import type { TaskId } from '@shared/types/task';
import { createAppAsyncThunk } from '../../../redux';

type RemoveTaskParams = {
  id: TaskId;
}

export const removeTask = createAppAsyncThunk(
  'tasks/removeTask',
  async ({ id }: RemoveTaskParams, thunkApi) =>
    thunkApi.extra.api.tasks.delete(id),
);
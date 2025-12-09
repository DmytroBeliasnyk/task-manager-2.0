import { createAppAsyncThunk } from '../../../redux';
import type { TaskId } from '@shared/types/task';

type EditTaskParams = {
  id: TaskId;
  title: string;
  description: string;
}

export const editTask = createAppAsyncThunk(
  'tasks/editTasks',
  async ({ id, title, description }: EditTaskParams, thunkApi) =>
    thunkApi.extra.api.tasks.edit(id, title, description),
);
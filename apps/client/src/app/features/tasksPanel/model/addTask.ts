import { createAppAsyncThunk } from '../../../redux';
import type { ListId } from '@shared/types/list';

type AddTaskParams = {
  title: string;
  description: string;
  listId: ListId;
}

export const addTask = createAppAsyncThunk(
  'tasks/addTask',
  async ({ title, description, listId }: AddTaskParams, thunkApi) =>
    thunkApi.extra.api.tasks.add(title, description, listId),
);
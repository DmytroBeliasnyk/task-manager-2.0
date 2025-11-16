import type { ListId } from '@shared/types/list';
import { createAppAsyncThunk } from '../../../redux';

type EditListParams = {
  id: ListId;
  title: string;
  description: string;
}

export const editList = createAppAsyncThunk(
  'lists/editList',
  async ({ id, title, description }: EditListParams, thunkApi) =>
    thunkApi.extra.api.lists.edit(id, title, description),
);
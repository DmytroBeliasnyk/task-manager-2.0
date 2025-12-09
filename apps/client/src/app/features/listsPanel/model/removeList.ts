import type { ListId } from '@shared/types/list';
import { createAppAsyncThunk } from '../../../redux';

type RemoveListParams = {
  id: ListId;
}

export const removeList = createAppAsyncThunk(
  'lists/removeList',
  async ({ id }: RemoveListParams, thunkApi) =>
    thunkApi.extra.api.lists.delete(id),
);
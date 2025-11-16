import { createAppAsyncThunk } from '../../../redux';

type AddListParams = {
  title: string;
  description: string;
}

export const addList = createAppAsyncThunk(
  'lists/addList',
  async ({ title, description }: AddListParams, thunkApi) =>
    thunkApi.extra.api.lists.add(title, description),
);
import { createAppAsyncThunk } from '../../../redux';

export const fetchLists = createAppAsyncThunk(
  'lists/fetchLists',
  async (_, thunkApi) =>
    thunkApi.extra.api.lists.getAll(),
);
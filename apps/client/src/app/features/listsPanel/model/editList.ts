import { listActions } from '../listSlice';
import type { ListId } from '@shared/types/list';
import type { AppThunk } from '../../../redux';

export const editList =
  (id: ListId, title: string, description: string): AppThunk =>
    (dispatch, _, { api }) => {
      api.lists
        .edit(id, title, description)
        .then(() => {
          dispatch(listActions.editList({ id, title, description }));
        });
    };
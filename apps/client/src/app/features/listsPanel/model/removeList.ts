import type { ListId } from '@shared/types/list';
import type { AppThunk } from '../../../redux';
import { listActions } from '../listSlice';

export const removeList =
  (listId: ListId): AppThunk =>
    (dispatch, _, { api }) => {
      api.lists
        .delete(listId)
        .then(() => {
          dispatch(listActions.removeList({ listId }));
        });
    };
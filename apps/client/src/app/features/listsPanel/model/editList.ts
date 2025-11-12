import type { AppDispatch } from '../../../redux';
import { listActions } from '../listSlice';
import type { ListId } from '@shared/types/list';
import { api } from '@api/api';

export function editList(id: ListId, title: string, description: string, dispatch: AppDispatch) {
  api.lists
    .edit(id, title, description)
    .then(() => {
      dispatch(listActions.editList({ id, title, description }));
    });
}
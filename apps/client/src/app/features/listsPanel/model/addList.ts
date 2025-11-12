import type { AppDispatch } from '../../../redux';
import { listActions } from '../listSlice';
import type { List } from '@shared/types/list';
import { api } from '@api/api';

export function addList(title: string, description: string, dispatch: AppDispatch) {
  api.lists
    .add(title, description)
    .then(id => {
      let list: List = {
        id: id,
        title: title,
        description: description,
        tasksIds: [],
      };
      dispatch(listActions.addList({ list }));
    });
}
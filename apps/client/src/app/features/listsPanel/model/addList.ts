import type { AppThunk } from '../../../redux';
import { listActions } from '../listSlice';
import type { List } from '@shared/types/list';

export const addList =
  (title: string, description: string): AppThunk =>
    (dispatch, _, { api }) => {
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
    };
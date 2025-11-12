import { listActions, listSelectors } from '../listSlice';
import type { AppDispatch, AppState } from '../../../redux';
import { api } from '@api/api';

export function fetchLists(dispatch: AppDispatch, getState: () => AppState) {
  if (!listSelectors.selectIsFetchListsIdle(getState())) return;

  dispatch(listActions.fetchListsPending());
  api.lists
    .getAll()
    .then(lists => {
      dispatch(listActions.fetchListsSuccess({ lists }));
    })
    .catch(() => {
      dispatch(listActions.fetchListsFailed());
    });
}
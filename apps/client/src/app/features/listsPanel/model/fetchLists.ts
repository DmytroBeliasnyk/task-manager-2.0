import { listActions, listSelectors } from '../listSlice';
import type { AppDispatch, AppState } from '../../../redux';
import { listsApi } from '@api/lists';

export function fetchLists(dispatch: AppDispatch, getState: () => AppState) {
  if (!listSelectors.selectIsFetchListsIdle(getState())) return;

  dispatch(listActions.fetchListsPending());
  listsApi
    .getAll()
    .then(lists => {
      dispatch(listActions.fetchListsSuccess({ lists }));
    })
    .catch(() => {
      dispatch(listActions.fetchListsFailed());
    });
}
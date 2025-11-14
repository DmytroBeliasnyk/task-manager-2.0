import { listActions, listSelectors } from '../listSlice';
import type { AppThunk } from '../../../redux';

export const fetchLists =
  (): AppThunk =>
    (dispatch, getState, { api }) => {
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
    };
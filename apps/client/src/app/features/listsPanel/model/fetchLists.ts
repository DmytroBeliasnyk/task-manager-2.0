import { listActions, listSelectors } from '../listSlice';
import type { AppThunk } from '../../../redux';

export const fetchLists =
  (): AppThunk<Promise<void>> =>
    async (dispatch, getState, { api }) => {
      if (!listSelectors.selectIsFetchListsIdle(getState())) return;

      dispatch(listActions.fetchListsPending());
      try {
        const lists = await api.lists.getAll();
        dispatch(listActions.fetchListsSuccess({ lists }));
      } catch {
        dispatch(listActions.fetchListsFailed());
      }
    };
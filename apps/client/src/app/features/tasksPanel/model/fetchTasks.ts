import type { AppThunk } from '../../../redux';
import { taskActions, taskSelectors } from '../taskSlice';

export const fetchTasks = (): AppThunk =>
  (dispatch, getState, { api }) => {
    if (!taskSelectors.selectIsFetchTasksIdle(getState())) return;

    dispatch(taskActions.fetchTasksPending());
    api.tasks
      .getAll()
      .then(tasks => {
        dispatch(taskActions.fetchTasksSuccess({ tasks }));
      })
      .catch(() => {
        dispatch(taskActions.fetchTasksFailed());
      });
  };
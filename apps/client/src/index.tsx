import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';
import { fetchLists } from './app/features/listsPanel/model/fetchLists';
import { fetchTasks } from './app/features/tasksPanel/model/fetchTasks';
import type { AppThunk } from './app/redux';
import { listActions } from './app/features/listsPanel/listSlice';

store.dispatch(fetchData());

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );


function fetchData(): AppThunk {
  return async (dispatch) => {
    await dispatch(fetchLists());
    const tasks = await dispatch(fetchTasks()).unwrap();

    if (tasks) {
      dispatch(listActions.attachTasksToList({ tasks }));
    }
  };
}
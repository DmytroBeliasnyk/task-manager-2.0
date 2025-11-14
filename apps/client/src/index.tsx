import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';
import { fetchLists } from './app/features/listsPanel/model/fetchLists';
import { fetchTasks } from './app/features/tasksPanel/model/fetchTasks';

store.dispatch(fetchLists());
store.dispatch(fetchTasks());

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );

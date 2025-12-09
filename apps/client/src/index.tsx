import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { StrictMode } from 'react';
import { listsApi } from '@api/lists/api';

store.dispatch(listsApi.util.prefetch('getLists', undefined));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

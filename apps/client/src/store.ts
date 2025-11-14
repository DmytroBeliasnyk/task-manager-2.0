import { configureStore } from '@reduxjs/toolkit';
import { extraArgument, rootReducer } from './app/redux';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});
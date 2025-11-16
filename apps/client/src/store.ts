import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { api } from './app/api/api';

export const extraArgument = {
  api,
};

export const rootReducer = combineSlices();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});
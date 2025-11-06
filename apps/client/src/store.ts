import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './app/redux';

export const store = configureStore({
  reducer: rootReducer,
});
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@api/baseApi';
import { listSlice } from './app/features/listsPanel/listSlice';
import { formSlice } from './app/features/forms/itemsManagement/formSlice';

export const extraArgument = {};

export type ExtraArgument = typeof extraArgument

export const rootReducer = combineSlices(
  listSlice, formSlice, baseApi,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
      baseApi.middleware,
    ),
});
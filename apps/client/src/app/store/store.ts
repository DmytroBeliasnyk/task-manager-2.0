import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@api/baseApi';
import { listSlice } from '@store/slices/listSlice';
import { formSlice } from '@store/slices/formSlice';

export const extraArgument = {};

export type ExtraArgument = typeof extraArgument;

export const rootReducer = combineSlices(listSlice, formSlice, baseApi);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});

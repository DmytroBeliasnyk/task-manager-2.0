import { baseApi } from '@api/baseApi';
import { formSlice } from '@features/forms/itemsManagement/slice/formSlice';
import { listSlice } from '@features/listsPanel/slice/listSlice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

export const extraArgument = {};

export type ExtraArgument = typeof extraArgument;

export const rootReducer = combineSlices(listSlice, formSlice, baseApi);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});

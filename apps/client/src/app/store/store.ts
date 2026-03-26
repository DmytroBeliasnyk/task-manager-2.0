import { apiSlice } from '@api/apiSlice';
import { authSlice } from '@features/auth/slice/authSlice';
import { formSlice } from '@features/itemsManagementForm/slice/formSlice';
import { listSlice } from '@features/listsPanel/slice/listSlice';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

export const extraArgument = {};

export type ExtraArgument = typeof extraArgument;

export const rootReducer = combineSlices(listSlice, formSlice, authSlice, apiSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(apiSlice.middleware),
});

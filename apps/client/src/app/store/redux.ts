import {
  createAsyncThunk,
  createSelector,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit';
import { type ExtraArgument, rootReducer, type store } from '@store/store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export type RequestStatus = 'idle' | 'pending' | 'success' | 'failed';
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, ExtraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: ExtraArgument;
}>();

import { combineSlices, createSelector, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';
import { store } from '../store';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { api } from '../api/api';

export const extraArgument = {
  api,
};

export const rootReducer = combineSlices();

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
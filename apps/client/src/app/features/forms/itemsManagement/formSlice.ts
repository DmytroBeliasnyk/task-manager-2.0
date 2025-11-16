import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ItemsManagementFormMode, type ItemsManagementFormOptions } from './itemsManagementFormOptions';
import { rootReducer } from '../../../../store';

type FormState = {
  options: ItemsManagementFormOptions;
  isOpen: boolean;
};

const initialState: FormState = {
  options: {
    mode: ItemsManagementFormMode.Close,
  },
  isOpen: false,
};

const formSlice = createSlice({
  name: 'itemsManagementForm',
  initialState,
  selectors: {
    selectOptions: state => state.options,
    isOpen: state => state.isOpen,
  },
  reducers: {
    openForm: (state, action: PayloadAction<{options: ItemsManagementFormOptions}>) => {
      state.options = action.payload.options;
      state.isOpen = true
    },
    closeForm: (state) => {
      state.options = { mode: ItemsManagementFormMode.Close };
      state.isOpen = false;
    },
  },
}).injectInto(rootReducer);

export const itemsManagementFormSelectors = formSlice.selectors;
export const itemsManagementFormActions = formSlice.actions;
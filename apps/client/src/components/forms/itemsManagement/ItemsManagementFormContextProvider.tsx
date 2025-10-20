import { createContext, type FC, type ReactNode, useState } from 'react';
import { ItemsManagementFormMode, type ItemsManagementFormOptions } from './formOptions';

type ItemsManagementFormContextProviderProps = {
  children: ReactNode;
}

type ItemsManagementFormState = {
  isOpen: boolean;
  options: ItemsManagementFormOptions;
};

type ItemsManagementFormContextType = {
  formState: ItemsManagementFormState;
  openForm: (options: ItemsManagementFormOptions) => void;
  closeForm: () => void;
}

export const ItemsManagementFormContext =
  createContext<ItemsManagementFormContextType>({
    formState: {
      isOpen: false,
      options: { mode: ItemsManagementFormMode.AddList },
    },
    openForm: () => {
    },
    closeForm: () => {
    },
  });

export const ItemsManagementFormContextProvider: FC<ItemsManagementFormContextProviderProps> =
  ({ children }) => {
    const [formState, setFormState] = useState<ItemsManagementFormState>({
      isOpen: false,
      options: { mode: ItemsManagementFormMode.AddList }
    });

    function openForm(options: ItemsManagementFormOptions): void {
      setFormState({ isOpen: true, options });
    }

    function closeForm(): void {
      setFormState({
        isOpen: false,
        options: { mode: ItemsManagementFormMode.AddList },
      });
    }

    return (
      <ItemsManagementFormContext value={{ formState, openForm, closeForm }}>
        {children}
      </ItemsManagementFormContext>
    );
  };
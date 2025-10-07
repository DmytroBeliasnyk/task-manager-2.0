import { Sidebar } from './sidebar/Sidebar';
import { Main } from './main/Main';
import { type FC, useEffect, useState, createContext } from 'react';
import { ListManagementForm } from './forms/ListManagementForm';
import clsx from 'clsx/lite';
import type { FormOptions } from '@utils/formOptions.ts';
import type { List } from '@shared/types/list.ts';
import { Header } from './header/Header';

type AppContextType = {
  openForm: (options: FormOptions) => void;
  lists: Array<List>;
};
export const AppContext = createContext<AppContextType | null>(null);

type FormState = {
  isOpen: boolean;
  options?: FormOptions;
};

export const App: FC = () => {
  const [lists, setLists] = useState<Array<List>>([]);
  const [formState, setFormState] = useState<FormState>({ isOpen: false });

  useEffect(() => {
    fetch('/api/lists')
      .then((res) => res.json())
      .then((res) => setLists(res.data));
  }, []);

  function openForm(options: FormOptions): void {
    setFormState({ isOpen: true, options });
  }

  function closeForm(): void {
    setFormState({ isOpen: false });
  }

  const containerClassName: string = clsx('flex flex-row h-full', formState.isOpen && 'relative');

  return (
    <div className={containerClassName}>
      <Sidebar />
      <div className="flex flex-col size-full p-4">
        <Header />
        <AppContext value={{ openForm, lists }}>
          <Main />
        </AppContext>
        {formState.isOpen && (
          <ListManagementForm options={formState.options!} closeModal={closeForm} />
        )}
      </div>
    </div>
  );
};

import { type FC } from 'react';
import { Header } from './ui/header/Header';
import { Main } from './app/Main';
import { Sidebar } from './ui/sidebar/Sidebar';
import {
  ItemsManagementFormContextProvider,
} from './app/features/forms/itemsManagement/ItemsManagementFormContextProvider';
import { HeaderContextProvider } from './ui/header/HeaderContextProvider';

export const App: FC = () => {
  return (
    <div className="flex flex-row h-full relative">
      <Sidebar />
        <div className="flex flex-col size-full p-4">
          <HeaderContextProvider>
            <Header />
            <ItemsManagementFormContextProvider>
              <Main />
            </ItemsManagementFormContextProvider>
          </HeaderContextProvider>
        </div>
    </div>
  );
};

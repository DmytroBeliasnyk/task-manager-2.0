import { Header } from '@ui/header/Header';
import { Main } from './features/Main';
import { Sidebar } from '@ui/sidebar/Sidebar';
import { HeaderContextProvider } from '@ui/header/HeaderContextProvider';

export const App= () => {
  return (
    <div className="flex flex-row h-full relative">
      <Sidebar />
      <div className="flex flex-col size-full p-4">
        <HeaderContextProvider>
          <Header />
          <Main />
        </HeaderContextProvider>
      </div>
    </div>
  );
};

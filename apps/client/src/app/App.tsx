import { Header } from '@ui/Header/Header';
import { Main } from '@ui/Main/Main';
import { Sidebar } from '@ui/Sidebar/Sidebar';
import { HeaderContextProvider } from '@ui/Header/HeaderContextProvider';

export const App = () => {
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

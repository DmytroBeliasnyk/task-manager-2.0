import { Header } from '@ui/header/Header';
import { HeaderContextProvider } from '@ui/header/HeaderContextProvider';
import { Main } from '@ui/main/Main';
import { Sidebar } from '@ui/sidebar/Sidebar';

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

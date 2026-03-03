import { Header } from '@ui/header/Header';
import { HeaderContextProvider } from '@ui/header/HeaderContextProvider';
import { Main } from '@ui/main/Main';
import { Sidebar } from '@ui/sidebar/Sidebar';

export const App = () => {
  return (
    <div className="bg-primary-bg text-primary-text flex h-screen text-base">
      <Sidebar />
      <div className="flex size-full flex-col p-4">
        <HeaderContextProvider>
          <Header />
          <Main />
        </HeaderContextProvider>
      </div>
    </div>
  );
};

import { Header } from '@ui/header/Header';
import { HeaderContextProvider } from '@ui/header/HeaderContextProvider';
import { Main } from '@ui/main/Main';
import { Sidebar } from '@ui/sidebar/Sidebar';

export const Dashboard = () => {
  return (
    <div className="bg-primary-bg text-primary-text grid h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] gap-2 text-base sm:grid-cols-[25%_1fr] sm:grid-rows-[auto_1fr] sm:gap-4 sm:p-4">
      <Sidebar />
      <HeaderContextProvider>
        <Header />
        <Main />
      </HeaderContextProvider>
    </div>
  );
};

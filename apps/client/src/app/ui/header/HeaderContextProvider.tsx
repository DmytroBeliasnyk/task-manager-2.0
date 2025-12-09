import { createContext, type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';

type HeaderContextType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};
export const HeaderContext = createContext<HeaderContextType>({
  searchValue: '',
  setSearchValue: () => {},
});

export const HeaderContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return <HeaderContext value={{ searchValue, setSearchValue }}>{children}</HeaderContext>;
};

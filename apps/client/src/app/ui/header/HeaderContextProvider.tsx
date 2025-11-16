import { createContext, type Dispatch, type FC, type ReactNode, type SetStateAction, useState } from 'react';

type HeaderContextProviderProps = {
  children: ReactNode;
}

type HeaderContextType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}
export const HeaderContext = createContext<HeaderContextType>({
  searchValue: '',
  setSearchValue: () => {
  },
});

export const HeaderContextProvider: FC<HeaderContextProviderProps> =
  ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
      <HeaderContext value={{ searchValue, setSearchValue }}>
        {children}
      </HeaderContext>
    );
  };
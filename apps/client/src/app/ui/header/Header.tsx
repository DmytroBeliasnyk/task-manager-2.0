import { useContext } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { HeaderContext } from './HeaderContextProvider';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import { ThemeToggler } from '@ui/toggler/ThemeToggler';

export const Header = () => {
  const { setSearchValue } = useContext(HeaderContext);

  const debouncedChangeHandler = useDebouncedCallback(
    (value: string) => setSearchValue(value),
    500,
  );

  return (
    <header className="border-border flex justify-between border-t px-4 pt-2 sm:border-0 sm:px-0 sm:pt-0">
      <label className="group bg-secondary-bg focus-within:bg-primary-bg focus-within:ring-accent/20 flex items-center rounded-full pl-4 focus-within:ring-2 sm:pr-10">
        <FaSearch className="text-muted-text group-focus-within:text-accent/20 dark:group-focus-within:text-accent/80 mr-2" />
        <input
          className="placeholder:text-muted-text text-secondary-text outline-none placeholder:italic"
          placeholder="Search list by name"
          type="text"
          onChange={(e) => debouncedChangeHandler(e.target.value)}
        />
      </label>
      <div className="flex gap-2">
        <ThemeToggler />
        <div className="text-secondary-text flex items-center gap-2 text-base font-medium">
          <div className="bg-accent/20 size-8 rounded-full">{/* avatar */}</div>
          <span className="hidden sm:block">username</span>
          <FaAngleDown />
          {/* open options list */}
        </div>
      </div>
    </header>
  );
};

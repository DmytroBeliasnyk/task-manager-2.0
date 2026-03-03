import { useContext, useMemo } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { HeaderContext } from './HeaderContextProvider';
import debounce from 'debounce';

export const Header = () => {
  const { setSearchValue } = useContext(HeaderContext);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 500),
    [setSearchValue],
  );

  return (
    <header className="flex justify-between pb-2">
      <label className="group bg-secondary-bg focus-within:bg-primary-bg focus-within:ring-accent/20 flex items-center rounded-full pr-10 pl-4 focus-within:ring-2">
        <FaSearch className="text-muted-text group-focus-within:text-accent/20 dark:group-focus-within:text-accent/80 mr-2" />
        <input
          className="placeholder:text-muted-text text-secondary-text outline-none placeholder:italic"
          placeholder="Search list by name"
          type="text"
          onChange={(e) => debouncedChangeHandler(e.target.value)}
        />
      </label>
      <div className="text-secondary-text flex items-center gap-2 text-base font-medium">
        <div className="bg-accent/20 size-8 rounded-full">{/* avatar */}</div>
        <span>username</span>
        <FaAngleDown />
        {/* open options list */}
      </div>
    </header>
  );
};

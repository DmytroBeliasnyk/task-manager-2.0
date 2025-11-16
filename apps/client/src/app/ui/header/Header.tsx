import { type FC, useContext, useMemo } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { HeaderContext } from './HeaderContextProvider';
import debounce from 'debounce';

export const Header: FC = () => {
  const { setSearchValue } = useContext(HeaderContext);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 500),
    [setSearchValue]
  );

  return (
    <header className="flex justify-between pb-2 text-1g">
      <label className="flex items-center bg-secondary-bg py-1 px-2 text-gray-400">
        <FaSearch className="mr-2" />
        <input
          className="placeholder:text-gray-400 placeholder:italic focus:outline-none text-text-secondary"
          placeholder="Search list by name"
          type="text"
          onChange={(e) =>
            debouncedChangeHandler(e.target.value)
          }
        />
      </label>
      <div className="flex items-center gap-2 text-base text-text-secondary font-medium">
        <div className="size-8 rounded-full bg-text-secondary">{/* avatar */}</div>
        <span>username</span>
        <FaAngleDown />{/* open options list */}
      </div>
    </header>
  );
};

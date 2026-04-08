import { useLogOutMutation } from '@api/auth/auth';
import { authSelectors } from '@features/auth/slice/authSlice';
import { useDebouncedCallback } from '@hooks/useDebouncedCallback';
import type { User } from '@shared/types/user';
import { useAppSelector } from '@store/redux';
import { Button } from '@ui/button/Button';
import { ThemeToggler } from '@ui/toggler/ThemeToggler';
import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineAccountCircle, MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { HeaderContext } from './HeaderContextProvider';

export const Header = () => {
  const { setSearchValue } = useContext(HeaderContext);
  const user = useAppSelector(authSelectors.selectUser) as User;
  const [logout] = useLogOutMutation();
  const navigate = useNavigate();

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
          <MdOutlineAccountCircle className="bg-accent/20 text-secondary-text h-full w-fit rounded-full p-1" />
          <span className="hidden sm:block">{user.username}</span>
          <Button
            intent="ghost"
            size="icon"
            onClick={() => {
              logout();
              navigate('/auth');
            }}
          >
            <MdOutlineLogout className="text-2xl" />
          </Button>
        </div>
      </div>
    </header>
  );
};

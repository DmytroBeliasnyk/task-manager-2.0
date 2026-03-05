import { BsMoonStarsFill } from 'react-icons/bs';
import { IoSunnyOutline } from 'react-icons/io5';
import { useThemeToggle } from '@hooks/useThemeToggle';
import { Button } from '@ui/button/Button';

export const ThemeToggler = () => {
  const { isDark, toggle } = useThemeToggle();

  return (
    <Button intent="ghost" size="icon" onClick={toggle}>
      {isDark ? <BsMoonStarsFill /> : <IoSunnyOutline className="text-2xl" />}
    </Button>
  );
};

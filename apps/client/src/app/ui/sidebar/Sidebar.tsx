import { FaList, FaShare } from 'react-icons/fa';
import { FaGear, FaListCheck } from 'react-icons/fa6';

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-12 h-full w-1/4 p-4 bg-secondary-bg">
      <header className="flex items-center text-2xl font-semibold">
        <div className="h-8 w-8 flex items-center justify-center">
          <FaListCheck />
        </div>
        <span className="ml-2">TaskManager</span>
      </header>
      <nav className="flex flex-col flex-auto justify-between text-text-secondary font-medium text-1g">
        <ul className="flex flex-col gap-2">
          <li className="flex items-center cursor-pointer">
            <FaList />
            <span className="ml-2">My lists</span>
          </li>
          <li className="flex items-center cursor-pointer">
            <FaShare />
            <span className="ml-2">Shared lists</span>
          </li>
        </ul>
        <div className="flex items-center  cursor-pointer">
          <FaGear />
          <span className="ml-2">Settings</span>
        </div>
      </nav>
    </aside>
  );
};

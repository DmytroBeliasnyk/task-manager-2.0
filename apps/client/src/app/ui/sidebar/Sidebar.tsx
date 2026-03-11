import { FaList, FaShare } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

const navItems = [
  {
    icon: FaList,
    label: 'My lists',
    href: '#',
  },
  {
    icon: FaShare,
    label: 'Shared lists',
    href: '#',
  },
];

export const Sidebar = () => {
  return (
    <aside className="bg-primary-bg border-border flex px-4 pt-2 sm:row-span-full sm:flex-col sm:border-r sm:px-0 sm:pt-0">
      <a
        href="#"
        className="hover:text-accent mb-12 hidden text-2xl font-semibold transition-colors sm:block"
      >
        TaskManager
      </a>

      <nav className="text-secondary-text flex flex-1 gap-8 text-lg font-medium sm:flex-col sm:gap-4">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.label}
            className="group hover:text-accent hover:bg-secondary-bg flex items-center transition-colors"
          >
            <item.icon className="transition-transform group-hover:scale-110" />
            <span className="ml-3">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="text-secondary-text sm:border-border flex items-center text-lg font-medium sm:border-t sm:pt-4">
        <a
          href="#"
          className="group hover:text-accent hover:bg-secondary-bg flex items-center transition-colors sm:justify-start"
        >
          <FaGear className="transition-transform group-hover:rotate-90" />
          <span className="ml-3 hidden sm:block">Settings</span>
        </a>
      </div>
    </aside>
  );
};

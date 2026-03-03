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
    <aside className="bg-primary-bg border-border flex h-full w-1/4 flex-col border-r p-4">
      <a href="#" className="hover:text-accent mb-12 text-2xl font-semibold transition-colors">
        TaskManager
      </a>

      <nav className="text-secondary-text flex flex-1 flex-col gap-2 text-lg font-medium">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.label}
            className="group hover:text-accent hover:bg-secondary-bg flex items-center transition-colors"
          >
            <item.icon className="transition-transform group-hover:scale-110" />
            <span className="ml-2">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="border-border border-t pt-4">
        <a
          href="#"
          className="group hover:text-accent hover:bg-secondary-bg flex items-center transition-colors"
        >
          <FaGear className="transition-transform group-hover:rotate-90" />
          <span className="ml-2">Settings</span>
        </a>
      </div>
    </aside>
  );
};

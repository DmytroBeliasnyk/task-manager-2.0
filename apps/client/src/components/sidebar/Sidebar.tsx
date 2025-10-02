import type {JSX} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Sidebar: () => JSX.Element = (): JSX.Element => {
  return (
    <aside className="flex flex-col gap-12 h-full w-1/5 p-4 bg-secondary-bg">
      <header className="text-2xl font-semibold">
        <FontAwesomeIcon icon="list-check"/>
        <span className="ml-2">TaskManager</span>
      </header>
      <nav className="flex flex-col flex-auto justify-between text-text-secondary font-medium text-1g">
        <ul className="flex flex-col gap-2">
          <li className="cursor-pointer">
            <FontAwesomeIcon icon="list"/>
            <span className="ml-2">My lists</span>
          </li>
          <li className="cursor-pointer">
            <FontAwesomeIcon icon="share"/>
            <span className="ml-2">Shared lists</span>
          </li>
        </ul>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon="gear"/>
          <span className="ml-2">Settings</span>
        </div>
      </nav>
    </aside>
  )
}
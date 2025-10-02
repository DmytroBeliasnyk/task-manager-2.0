import type {JSX} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Header: () => JSX.Element = (): JSX.Element => {
  return (
    <header className="flex justify-between pb-2 text-1g">
      <label className="rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
        <input
          className="placeholder:text-gray-400 placeholder:italic focus:outline-none text-text-secondary"
          placeholder="Search list by name"
          type="text"
        />
        <FontAwesomeIcon icon="search"/>
      </label>
      <div className="flex items-center gap-2 text-base text-text-secondary font-medium">
        <div className="size-8 rounded-full bg-text-secondary">{/* avatar */}</div>
        <span>username</span>
        <FontAwesomeIcon icon="angle-down"/> {/* open options list */}
      </div>
    </header>
  )
}
import React from "react";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = () => {
  const { url } = usePage();

  const isActive = (href) => url === href;

  return (
    <aside className="bg-gray-700 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          <li className={`py-2 ${isActive('/dashboard') ? 'bg-gray-900' : ''}`}>
            <Link href="/dashboard" className="block p-2">Dashboard</Link>
          </li>
          <li className={`py-2 ${isActive('/dashboard/artikel') ? 'bg-gray-900' : ''}`}>
            <Link href="/dashboard/artikel" className="block p-2">Artikel</Link>
          </li>
          <li className={`py-2 ${isActive('/dashboard/member') ? 'bg-gray-900' : ''}`}>
            <Link href="/dashboard/member" className="block p-2">Member</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

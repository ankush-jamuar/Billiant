import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = "block rounded px-3 py-2 text-gray-700 hover:bg-gray-200";

  const activeClass = "bg-gray-200 font-medium";

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h1 className="mb-6 text-xl font-semibold">Billiant</h1>

      <nav className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/clients"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Clients
        </NavLink>

        <NavLink
          to="/invoices"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Invoices
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

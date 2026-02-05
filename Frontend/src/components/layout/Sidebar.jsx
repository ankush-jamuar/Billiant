import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useUi } from "../../context/UiContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { openPlans } = useUi();


  // Load persisted state
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const navClass = ({ isActive }) =>
    `
      flex items-center gap-3
      rounded-lg px-3 py-2
      text-sm font-medium transition
      ${isActive
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-600 hover:bg-slate-100"
    }
    `;

  return (
    <aside
      className={`
        relative flex h-screen flex-col
        border-r bg-white
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header / Brand */}
      <div className="h-14 border-b px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          {collapsed ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
              B
            </div>
          ) : (
            <span className="text-lg font-semibold text-slate-900">
              Billiant
            </span>
          )}
        </div>

        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-2 py-4">
        {!collapsed && (
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Workspace
          </p>
        )}

        <div className="space-y-1">
          <NavLink to="/dashboard" className={navClass}>
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/clients" className={navClass}>
            <Users size={18} />
            {!collapsed && <span>Clients</span>}
          </NavLink>

          <NavLink to="/invoices" className={navClass}>
            <FileText size={18} />
            {!collapsed && <span>Invoices</span>}
          </NavLink>

          <NavLink to="/settings" className={navClass}>
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>

        {!collapsed && (
          <button
            className="
              mt-6 w-full rounded-xl
              bg-indigo-600 px-4 py-2
              text-sm font-medium text-white
              hover:bg-indigo-700 transition
            "
            onClick={() => navigate("/invoices/new")}
          >
            + New Invoice
          </button>
        )}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t bg-white px-4 py-3">
        <div
          className={`
      flex items-center
      ${collapsed ? "justify-center" : "justify-between"}
    `}
        >
          {!collapsed && (
            <span className="text-sm font-medium text-slate-700">
              Current plan
            </span>
          )}

          <div className="flex items-center gap-2">
            <span
              className="
          rounded-full bg-slate-100
          px-3 py-1 text-xs
          font-medium text-slate-700
        "
            >
              Free
            </span>

            {!collapsed && (
              <button
                onClick={openPlans}
                className="text-[11px] font-medium text-indigo-600 hover:underline"
              >
                Upgrade
              </button>

            )}
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;

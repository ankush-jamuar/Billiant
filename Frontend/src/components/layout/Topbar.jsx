import { useState, useRef, useEffect } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { PAGE_TITLES } from "../../constants/PageTitles";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentPage =
    PAGE_TITLES.find((page) =>
      matchPath(page.path, location.pathname)
    ) || PAGE_TITLES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="h-14 border-b bg-white px-6 flex items-center justify-between">
      {/* Page title */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900">
          {currentPage.title}
        </h1>
        {currentPage.subtitle && (
          <p className="text-xs text-slate-500">
            {currentPage.subtitle}
          </p>
        )}
      </div>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="
            flex items-center gap-2 rounded-lg
            px-2 py-1.5
            hover:bg-slate-100 transition
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <ChevronDown
            size={16}
            className={`text-slate-500 transition ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {open && (
          <div
            className="
              absolute right-0 mt-2 w-56
              rounded-xl border bg-white
              shadow-lg z-50
            "
          >
            {/* Header */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-slate-800 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email}
              </p>
            </div>

            {/* Links */}
            <div className="py-1">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <Settings size={16} />
                Settings
              </button>
            </div>

            {/* Logout */}
            <div className="border-t py-1">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate("/login");
                }}
                className="
                  flex w-full items-center gap-2
                  px-4 py-2 text-sm
                  text-red-600 hover:bg-red-50
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

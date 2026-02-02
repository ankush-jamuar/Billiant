import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "../../constants/PageTitles";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage =
    PAGE_TITLES.find((page) =>
      matchPath(page.path, location.pathname)
    ) || PAGE_TITLES[0];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="h-14 border-b bg-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-900">
        {currentPage.title}
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;

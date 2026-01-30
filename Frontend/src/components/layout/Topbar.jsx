import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../../constants/PageTitles";

const Topbar = () => {
  const location = useLocation();

  const title =
    PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <div className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <h1 className="text-lg font-medium">{title}</h1>
      <button>Logout</button>
    </div>
  );
};

export default Topbar;

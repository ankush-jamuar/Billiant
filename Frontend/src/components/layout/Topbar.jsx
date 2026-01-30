import { useLocation, matchPath } from "react-router-dom";
import { PAGE_TITLES } from "../../constants/PageTitles";

const Topbar = () => {
  const location = useLocation();

  const currentPage =
    PAGE_TITLES.find((page) =>
      matchPath(page.path, location.pathname)
    ) || PAGE_TITLES[0];

  return (
    <div className="h-14 border-b bg-white px-6 flex items-center justify-between">
      <h1 className="text-lg font-medium">
        {currentPage.title}
      </h1>

      <button className="text-sm text-gray-600">Logout</button>
    </div>
  );
};

export default Topbar;

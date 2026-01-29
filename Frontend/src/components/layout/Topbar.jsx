import { useAuth } from "../../context/AuthContext.jsx";

const Topbar = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h2 className="text-lg font-medium text-gray-800">
        Dashboard
      </h2>

      <button
        onClick={logout}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;

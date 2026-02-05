import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import PlansOverlay from "../components/plans/PlansOverlay";
import { useUi } from "../context/UiContext";
function App() {
  const { showPlans, closePlans } = useUi();
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
      <AppRoutes />
      {showPlans && (
        <PlansOverlay onClose={closePlans} />
      )}
    </BrowserRouter>
  );
}

export default App;

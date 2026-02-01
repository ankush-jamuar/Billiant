import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
function App() {
  const [count, setCount] = useState(0);

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
    </BrowserRouter>
  );
}

export default App;

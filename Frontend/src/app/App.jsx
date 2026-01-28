import { useState } from "react";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

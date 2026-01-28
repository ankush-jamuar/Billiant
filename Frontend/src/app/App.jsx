import { useState } from "react";
import Routes from "./routes";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-blue-600">
          Billiant Frontend Ready
        </h1>
      </div>
    </>
  );
}

export default App;

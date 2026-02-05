import { createContext, useContext, useState } from "react";

const UiContext = createContext();

export const UiProvider = ({ children }) => {
  const [showPlans, setShowPlans] = useState(false);

  const openPlans = () => setShowPlans(true);
  const closePlans = () => setShowPlans(false);

  return (
    <UiContext.Provider
      value={{ showPlans, openPlans, closePlans }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => useContext(UiContext);

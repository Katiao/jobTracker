import { useContext } from "react";

import { DashboardContext } from "./DashboardLayout";

// Hook so that context values are accessible througout it the app
export const useDashboardContext = () => useContext(DashboardContext);

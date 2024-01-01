import { Outlet } from "react-router-dom";
import { useState, createContext } from "react";

import { Wrapper } from "../../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Navbar } from "../../components";

// TODO: update later
type DashboardContextValues = {
  user: { name: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: void;
  toggleSidebar: () => void;
  logoutUser: () => void;
};

// We explicitly allow `undefined` as a potential value here
// to tell the compiler we plan to deal with it.
export const DashboardContext = createContext<
  DashboardContextValues | undefined
>(undefined);

export const DashboardLayout = () => {
  // Context default Values & setting functions setting values
  const user = { name: "John" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = console.log("toggle dark theme");

  const logoutUser = () => console.log("Log out user");

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

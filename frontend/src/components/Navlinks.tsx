import { NavLink } from "react-router-dom";

import { useDashboardContext } from "../pages/DashboardLayout/useDashboardContext";
import { links } from "../utils/links";

export const NavLinks = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;

        return (
          <NavLink
            to={path}
            key={text}
            // Added so that active class is not added to index path (addJob)
            // New react router adds active class to active page by default!
            end
            className="nav-link"
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

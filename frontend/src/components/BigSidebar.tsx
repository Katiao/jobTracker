import { NavLinks } from "./Navlinks";
import { Logo } from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store: RootState) => store.user);
  return (
    <Wrapper>
      <h1>Big sidebar</h1>
    </Wrapper>

    // <Wrapper>
    //   <div
    //     className={
    //       isSidebarOpen
    //         ? "sidebar-container "
    //         : "sidebar-container show-sidebar"
    //     }
    //   >
    //     <div className="content">
    //       <header>
    //         <Logo />
    //       </header>
    //       <NavLinks />
    //     </div>
    //   </div>
    // </Wrapper>
  );
};

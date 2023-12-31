import { useState } from "react";
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";

import Wrapper from "../assets/wrappers/Navbar";
import { toggleSidebar, clearStore } from "../features/user/userSlice";
import { Logo } from "./Logo";
import { RootState, AppDispatch } from "../store";

import { useDispatch, useSelector } from "react-redux";
export const Navbar = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const [showLogout, setShowLogout] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <h1>navbar</h1>
    // <Wrapper>
    //   <div className="nav-center">
    //     <button type="button" className="toggle-btn" onClick={toggle}>
    //       <FaAlignLeft />
    //     </button>

    //     <div>
    //       <Logo />
    //       <h3 className="logo-text">dashboard</h3>
    //     </div>
    //     <div className="btn-container">
    //       <button
    //         type="button"
    //         className="btn"
    //         onClick={() => setShowLogout(!showLogout)}
    //       >
    //         <FaUserCircle />
    //         {user?.name}

    //         {showLogout ? <FaCaretUp /> : <FaCaretDown />}
    //       </button>
    //       <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
    //         <button
    //           type="button"
    //           className="dropdown-btn"
    //           onClick={() => dispatch(clearStore("Logout Successful..."))}
    //         >
    //           logout
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </Wrapper>
  );
};

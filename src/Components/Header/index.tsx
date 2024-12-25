import React from "react";
import "./header.css";
import { logout } from "../../Features/Auth/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {

  const dispatch = useDispatch();
  
  return (
    <div className="header">
      <div className="header-right">
        <span className="user-name">Ayyandurai Govindaraj</span>
        <img
          className="power-icon"
          src="/IconImages/power-on.png"
          alt="power-off"
          onClick={() => dispatch(logout())}
        />
      </div>
    </div>
  );
};

export default Header;

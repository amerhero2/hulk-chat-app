import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="HULK-header">
      <div className="HULK-header-label">
        <span className="HULK-header-label-left">HULK</span>
        <span className="HULK-header-label-right">chat</span>
      </div>
      <div>Log out</div>
    </div>
  );
};

export default Header;

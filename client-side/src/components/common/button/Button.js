import React from "react";
import "./Button.css";

const Button = ({ type = "submit", disabled = false, children, onClick }) => {
  return (
    <button
      className="HULK-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

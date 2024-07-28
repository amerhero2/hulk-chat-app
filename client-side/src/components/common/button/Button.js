import React from "react";
import "./Button.css";
import classNames from "classnames";

const Button = ({
  type = "submit",
  disabled = false,
  children,
  onClick,
  style,
}) => {
  return (
    <button
      className={classNames("HULK-button", {
        "HULK-button-disabled": disabled,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

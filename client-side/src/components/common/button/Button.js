import React from "react";
import "./Button.css";
import classNames from "classnames";
import Loader from "../loader/loader";

const Button = ({
  type = "submit",
  disabled = false,
  isLoading = false,
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
      {isLoading && <Loader />}
      {children}
    </button>
  );
};

export default Button;

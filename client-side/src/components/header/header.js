import React from "react";
import "./header.css";
import Button from "../common/button/Button";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="HULK-header">
      <div className="HULK-header-label">
        <span className="HULK-header-label-left">HULK</span>
        <span className="HULK-header-label-right">chat</span>
      </div>
      <Button
        onClick={() => {
          dispatch(logoutUser());
          navigate("/login");
        }}
        style={{ backgroundColor: "#F96C6C" }}
      >
        Log out
      </Button>
    </div>
  );
};

export default Header;

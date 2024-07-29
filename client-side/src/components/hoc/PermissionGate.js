import React from "react";
import { useSelector } from "react-redux";

const PermissionGate = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default PermissionGate;

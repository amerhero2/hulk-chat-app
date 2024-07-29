import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getUserDetails } from "../../redux/actions/authActions";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const { user, userLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

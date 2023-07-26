import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Link } from "react-router-dom";

export default () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : "Protected route. Please log in.";
};

import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Link } from "react-router-dom";

export default () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <>
          {" "}
          <Link to={"/login"}>
            <div className="mx-5 rounded-xl bg-teal-100 bg-opacity-50 p-5 mt-20 text-red-700">
              Protected route, please log in.
            </div>
          </Link>
        </>
      )}
    </>
  );
};

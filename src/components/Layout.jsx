import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/index.css";
import useAuth from "../hooks/useAuth";
import Navbar from "./Navbar.jsx";

export default () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="min-w-screen bg-center bg-backgroundImage bg-cover content-center min-h-screen max-w-lg">
        <h2 className="">
          <div
            className="font-typewriter font-medium
           text-2xl pt-8 pl-5 pb-5"
          >
            routine reminder.
          </div>
        </h2>
        <div className="pb-16 font-sans">
          <Outlet />
        </div>
        {isAuthenticated && <Navbar />}
      </div>
    </>
  );
};

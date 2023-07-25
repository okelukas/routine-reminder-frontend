import React from "react";
import "../styles/index.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <nav className="fixed bottom-0 backdrop-blur-sm bg-navbar  bg-opacity-50 max-w-lg  w-full h-16 font-sans font-light ">
        <div className="grid h-full  grid-cols-3 mx-auto text-white-100 text-xl ">
          <button type="button">
            {" "}
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          </button>

          <button type="button">
            <Link to="/home">
              <span>Home</span>
            </Link>
          </button>

          <button type="button">
            <Link to="/routines">
              <span>Routines</span>
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
};

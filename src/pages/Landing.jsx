import React from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="flex justify-center m-20">
        <NavLink to="/home">
          <div className="flex-col rounded-xl overflow-hidden shadow-md m-5 max-w-md">
            <img
              src="../src/assets/toothbrush.png"
              alt="RR"
              className="bg-amber-200 p-20"
            />
            <p className="text-amber-100 font-bold p-10 text-4xl text-center	bg-black">
              routine reminder.
            </p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

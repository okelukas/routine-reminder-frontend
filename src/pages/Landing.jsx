import React from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="min-w-screen bg-center bg-backgroundImage bg-cover flex	mx-auto min-h-screen max-w-lg  justify-center">
        <NavLink to="/login">
          <div className="rounded-xl mt-56 bg-teal-100 bg-opacity-90 flex flex-col shadow-xl">
            <span className="text-4xl font-md font-typewriter p-10 py-15 leading-relaxed">
              routine <br />
              reminder.
            </span>
          </div>
        </NavLink>
      </div>
    </>
  );
}

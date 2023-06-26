import React from "react";

import "../styles/App.css";

export default function ListRoutines({ routine, time, active }) {
  const displayTime = time.slice(0, 5);
  return (
    <>
      <h3 className="text-lg">{displayTime}</h3>
      <p className="text-gray-500 font-bold">{routine}</p>
      <button className="flex justify-center">
        <img src="..\src\assets\bin.png" alt="delete" className="h-5" />
      </button>
      <button className="flex justify-center">
        <img src="..\src\assets\pencil.png" alt="edit" className="h-5" />
      </button>
    </>
  );
}

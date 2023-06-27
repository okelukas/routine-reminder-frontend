import React, { useEffect } from "react";

import "../styles/App.css";

export default function ListRoutines({
  routine,
  time,
  active,
  id,
  deactivateRoutine,
  completeRoutine,
  complete,
}) {
  const displayTime = time.slice(0, 5);
  console.log(complete);

  return (
    <>
      <div
        className="grid bg-amber-200 grid-cols-[2fr_5fr_1fr_1fr] pl-5 p-2 m-2"
        key={id}
      >
        <h3 className="text-lg">{displayTime}</h3>
        {complete ? (
          <p
            className="text-green-300 font-bold line-through"
            onClick={() => completeRoutine(id)}
          >
            {routine}
          </p>
        ) : (
          <p
            className="text-gray-500 font-bold"
            onClick={() => completeRoutine(id)}
          >
            {routine}
          </p>
        )}
        <button className="flex justify-center">
          <img
            src="..\src\assets\bin.png"
            alt="delete"
            className="h-5"
            onClick={() => deactivateRoutine(id)}
          />
        </button>
        <button className="flex justify-center">
          <img src="..\src\assets\pencil.png" alt="edit" className="h-5" />
        </button>
      </div>
    </>
  );
}

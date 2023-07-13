import React, { useRef, useState } from "react";
import axios from "axios";
import "../styles/App.css";

export default function ListRoutines({
  routine,
  time,
  id,
  deactivateRoutine,
  completeRoutine,
  complete,
  editRoutine,
  editRequest,
  editRequestStatusAPI,
}) {
  const displayTime = time.slice(0, 5);
  const routineRef = useRef();
  const timeRef = useRef();
  const [inputState, setInputState] = useState(true);

  //console.log(inputState);

  const handleSubmit = async () => {
    await editRoutine(routineRef.current.value, timeRef.current.value, id);
    setInputState(true);
  };
  return (
    <>
      <div
        className="grid bg-amber-200 grid-cols-[2fr_5fr_1fr_1fr] pl-5 p-2 m-2"
        key={id}
      >
        {editRequestStatusAPI ? (
          <>
            <input
              className="rounded-md mr-3"
              type="time"
              name="time"
              placeholder={time}
              ref={timeRef}
              defaultValue={time}
              step="3600"
            />
            <div>
              <input
                className="rounded-md"
                type="text"
                name="routine"
                placeholder={routine}
                ref={routineRef}
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        <button className="flex justify-center">
          <img
            src="../src/assets/bin.png"
            alt="delete"
            className="h-5"
            onClick={() => deactivateRoutine(id)}
          />
        </button>

        <button className="flex justify-center">
          {editRequestStatusAPI ? (
            <img
              src="../src/assets/floppy-disk.png"
              alt="edit"
              className="h-5"
              onClick={() => handleSubmit(id)}
            />
          ) : (
            <img
              src="../src/assets/pencil.png"
              alt="edit"
              className="h-5"
              onClick={() => editRequest(id)}
            />
          )}
        </button>
      </div>
    </>
  );
}

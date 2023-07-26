import React, { useRef, useState } from "react";
import axios from "axios";
import "../styles/App.css";
import { useRoutines } from "../contexts/RoutineContext";
import { Icon } from "semantic-ui-react";

export default function ListRoutines({
  routine,
  time,
  id,
  complete,
  editRequest,
  editItem,
  setEditItem,
  showOptionsRequest,
  showOptions,
}) {
  const displayTime = time.slice(0, 5);
  const routineRef = useRef();
  const timeRef = useRef();
  //const [inputState, setInputState] = useState(true);
  //const [menu, setMenu] = useState(false);
  const { deactivateRoutine, editRoutine, completionStatus, completeRoutine } =
    useRoutines();

  //console.log(optionsRequest);

  const handleSubmit = async () => {
    await editRoutine(routineRef.current.value, timeRef.current.value, id);
    setEditItem(null);
  };
  //console.log(editItem, id);
  return (
    <>
      <div
        className={`content-center rounded-xl py-5 grid grid-cols-12 m-2 mx-10 px-5  ${
          complete
            ? "bg-blend-lighten backdrop-brightness-105"
            : "backdrop-blur-xl bg-teal-100 opacity-90"
        } `}
        key={id}
      >
        {editItem === id ? (
          <>
            <input
              className="inputEdit col-span-3 mr-1"
              type="time"
              name="time"
              placeholder={time}
              ref={timeRef}
              defaultValue={time}
              step="3600"
              id="input"
            />
            <input
              className=" inputEdit col-span-7"
              type="text"
              name="routine"
              placeholder={routine}
              ref={routineRef}
              defaultValue={routine}
              id="input"
            />
          </>
        ) : (
          <>
            <h3 className="col-span-3 font-sans">{displayTime}</h3>
            {complete ? (
              <p
                className="text-gray-100 line-through col-span-7"
                onClick={() => completeRoutine(id)}
              >
                {routine}
              </p>
            ) : (
              <p
                className="text-gray-200 col-span-7"
                onClick={() => completeRoutine(id)}
              >
                {routine}
              </p>
            )}
          </>
        )}

        {showOptions === id ? (
          <>
            <button>
              <Icon
                name="trash"
                alt="delete"
                className=" col-span-1"
                onClick={() => deactivateRoutine(id)}
              />
            </button>

            <button>
              {editItem === id ? (
                <Icon
                  name="save"
                  alt="save"
                  className=" text-gray-200"
                  onClick={() => handleSubmit(id)}
                />
              ) : (
                <Icon
                  name="edit"
                  alt="edit"
                  className=""
                  onClick={() => editRequest(id)}
                />
              )}
            </button>
          </>
        ) : (
          <>
            <button
              className="col-span-2"
              onClick={() => showOptionsRequest(id)}
            >
              <Icon name="ellipsis horizontal" id="ellipsis" />
            </button>
          </>
        )}
      </div>
    </>
  );
}

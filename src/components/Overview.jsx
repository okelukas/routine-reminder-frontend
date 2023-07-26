import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRoutines } from "../contexts/RoutineContext";
import { Link } from "react-router-dom";

export default function Overview({
  routine,
  daily,
  weekdays,
  time,
  id,
  toggleSelection,
  editToggle,
}) {
  const [weekdaysPrepared, setWeekdaysPrepared] = useState();

  const { deactivateRoutine } = useRoutines();

  const displayTime = time.slice(0, 5);

  const prepWeekdays = () => {
    const weekdaysWithoutBrackets = weekdays?.slice(1, -1) ?? "";

    const weekdaysArray = weekdaysWithoutBrackets?.split(",");

    const abbreviatedWeekdays = weekdaysArray?.map((weekday) => {
      const fullWeekday = weekday.replace(/"/g, "");
      return fullWeekday.slice(0, 3);
    });

    const abbreviatedWeekdaysString = abbreviatedWeekdays.join(", ");

    //console.log(abbreviatedWeekdaysString);

    setWeekdaysPrepared(abbreviatedWeekdaysString);
  };

  useEffect(() => {
    prepWeekdays();
  }, []);
  /* console.log(editToggle);
  console.log(id); */
  return (
    <>
      <div
        className={
          "rounded-xl py-5 grid-cols-12 grid-rows-2 grid mx-10 my-3 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-80 justify-center items-center"
        }
      >
        <span className="col-span-10">
          {routine} at {displayTime}
        </span>
        <span className="col-span-10">
          {daily ? "Daily" : `${weekdaysPrepared}`}
        </span>
        {editToggle.includes(`${id}`) ? (
          <>
            {" "}
            <button className="col-start-11 col-end-12 row-start-1 row-end-3">
              <Icon
                name="trash"
                alt="delete"
                className=" col-span-1"
                onClick={() => deactivateRoutine(id)}
              />
            </button>
            <button className="col-start-12 col-end-13 row-start-1 row-end-3">
              <Link
                to="/add"
                state={{
                  routineLink: `${routine}`,
                  timeLink: `${time}`,
                  idLink: `${id}`,
                  dailyLink: `${daily}`,
                  weekdaysLink: `${weekdays}`,
                }}
              >
                <Icon
                  name="edit"
                  alt="edit"
                  className=" text-black"
                  /* onClick={() => editRequest(id)} */
                />
              </Link>
            </button>
          </>
        ) : (
          <button className="col-start-11 col-end-13 row-start-1 row-end-3">
            <Icon
              name="ellipsis horizontal"
              id="ellipsis"
              className=""
              onClick={() => toggleSelection(`${id}`)}
            />
          </button>
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import ListRoutines from "./ListRoutines.jsx";
import "../styles/App.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useRoutines } from "../contexts/RoutineContext.jsx";

export default function Routines() {
  /* const [resetCookie, setResetCookie] = useState(false);
  const [data, setData] = useState([]); */

  //const { getRoutines } = useAuth();
  const {
    sortedRoutines,
    getRoutines,
    fetchData,
    updateRoutines,
    deactivationStatus,
    editRequestStatus,
    completionStatus,
    routines,
    getCurrentDay,
  } = useRoutines();

  // ON RENDER

  useEffect(() => {
    updateRoutines();
    fetchData();
  }, [deactivationStatus, completionStatus, editRequestStatus]);

  //console.log(sortedRoutines.routines?.edit);

  const today = getCurrentDay();
  const day = today.getDate();
  const month = today.getMonth();

  return (
    <>
      <div className=" flex flex-col m-auto font-sans">
        <h1 className="text-2xl pr-5 text-right pb-2 font-sans font-light">
          {sortedRoutines.weekday}, {day}.{month + 1}.
        </h1>

        {sortedRoutines && sortedRoutines.routines?.length ? (
          sortedRoutines.routines.map((routine) => (
            <>
              <ListRoutines
                key={routine.routine_id}
                routine={routine.name}
                time={routine.time}
                id={routine.routine_id}
                complete={routine.complete}
                editRequestStatusAPI={routine.edit}
              />
            </>
          ))
        ) : (
          <p>No routines found for {sortedRoutines.weekday}</p>
        )}

        <div className="flex justify-center ">
          <Link to="/add">
            <button>
              <img
                src="..\src\assets\plus.png"
                alt="add"
                className="max-w-12 max-h-12 rounded-xl p-2 backdrop-blur-xl bg-teal-100 opacity-90 m-5"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

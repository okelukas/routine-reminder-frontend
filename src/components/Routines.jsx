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
  } = useRoutines();

  // ON RENDER

  useEffect(() => {
    updateRoutines();

    fetchData();
  }, [deactivationStatus, completionStatus, editRequestStatus]);

  //console.log(sortedRoutines.routines?.edit);
  return (
    <>
      <div className="w-96 flex flex-col m-auto">
        <h1 className="text-2xl text-center p-5">
          Routines – {sortedRoutines.weekday}
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

        <div className="flex justify-center p-5">
          <Link to="/add">
            <button>
              <img
                src="..\src\assets\plus.png"
                alt="add"
                className="h-10 p-1 bg-amber-200"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

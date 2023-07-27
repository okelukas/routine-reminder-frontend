import React, { useState, useEffect } from "react";
import axios from "axios";
import ListRoutines from "./ListRoutines.jsx";
import "../styles/App.css";
import { Link } from "react-router-dom";
import useRoutines from "../hooks/useRoutines.jsx";

export default function Routines() {
  const [editItem, setEditItem] = useState();
  const [showOptions, setShowOptions] = useState();
  const {
    sortedRoutines,
    fetchData,
    updateRoutines,
    deactivationStatus,
    editRequestStatus,
    completionStatus,
    getCurrentDay,
  } = useRoutines();

  const editRequest = (id) => {
    setEditItem(id);
  };
  const showOptionsRequest = (id) => {
    setShowOptions(id);
    setEditItem(null);
  };

  // ON RENDER

  useEffect(() => {
    //updateRoutines();
    fetchData();
  }, [
    deactivationStatus,
    completionStatus,
    editRequestStatus,
    editItem,
    showOptions,
  ]);

  //console.log(sortedRoutines.routines?.edit);

  const today = getCurrentDay();
  const day = today.getDate();
  const month = today.getMonth();
  const currentMonth = month + 1;

  //console.log(currentMonth);

  return (
    <>
      <div className=" flex flex-col font-sans">
        <h1 className="text-2xl pr-5 text-right pb-2 font-sans font-light">
          {sortedRoutines.weekday}, {day < 10 ? "0" : ""}
          {day}.{currentMonth < 10 ? "0" : ""}
          {currentMonth}.
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
                editItem={editItem}
                setEditItem={setEditItem}
                editRequest={editRequest}
                showOptionsRequest={showOptionsRequest}
                showOptions={showOptions}
              />
            </>
          ))
        ) : (
          <div className="mt-16  rounded-xl mx-20 bg-teal-100 bg-opacity-50 px-5 py-5 ">
            <span className="text-lg text-center py-8 font-sans ">
              No routines found for {sortedRoutines.weekday} yet
            </span>
          </div>
        )}

        <div className="flex justify-center ">
          <Link to="/add">
            <button className="rounded-xl backdrop-blur-xl bg-teal-100 opacity-90 m-5 mb-10">
              <img src="/public/plus.png" alt="add" className="h-10 m-3" />
              {/* <div
                id="darkGrayFont"
                className="text-6xl px-5 bb-15 font-gray-200 hover:font-gray-200"
              >
                +
              </div> */}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

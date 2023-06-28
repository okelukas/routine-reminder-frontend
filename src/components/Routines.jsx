import React, { useState, useEffect } from "react";
import axios from "axios";
import ListRoutines from "./ListRoutines.jsx";
import "../styles/App.css";
import { Link } from "react-router-dom";

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [deactivationStatus, setDeactivationStatus] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);
  const [editRequestStatus, setEditRequestStatus] = useState(false);

  /* console.log(routines); */

  useEffect(() => {
    async function getRoutines() {
      try {
        const allRoutines = await axios.get(`http://localhost:3000/api/home`);

        //filter for only the active routines

        const routines = allRoutines.data.filter(
          (item) => item.active === true
        );
        setRoutines(routines);
        return routines.data;
      } catch (err) {
        console.log(err);
      }
    }
    getRoutines();
  }, [deactivationStatus, completionStatus, editRequestStatus]);

  const deactivateRoutine = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/deactivate`
      );
      setDeactivationStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const completeRoutine = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/complete`
      );
      setCompletionStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const editRequest = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/editrequest`
      );
      setEditRequestStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  /* console.log(routines); */

  return (
    <>
      {" "}
      <div className="w-96 flex flex-col m-auto">
        <h1 className="text-2xl text-center p-5">Routines</h1>
        {routines && routines.length ? (
          routines.map((data) => {
            return (
              <div>
                <div>
                  <ListRoutines
                    routine={data.routine}
                    time={data.time}
                    active={data.active}
                    id={data.id}
                    deactivateRoutine={deactivateRoutine}
                    completeRoutine={completeRoutine}
                    complete={data.complete}
                    editRequest={editRequest}
                    editRequestStatusAPI={data.edit}
                    editRequestStatus={editRequestStatus}
          
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>No active routines found.</p>
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

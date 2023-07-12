import React, { useState, useEffect } from "react";
import axios from "axios";
import ListRoutines from "./ListRoutines.jsx";
import "../styles/App.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Routines({ allRoutines }) {
  const [routines, setRoutines] = useState([]);
  const [deactivationStatus, setDeactivationStatus] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);
  const [editRequestStatus, setEditRequestStatus] = useState(false);
  const [resetCookie, setResetCookie] = useState(false);
  const { getRoutines } = useAuth();

  const getHeader = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return headers;
  };

  // RESET COOKIES

  const setCookie = async () => {
    try {
      const header = getHeader();
      const response = await axios.put(
        "http://localhost:3000/api/home/setCookie",
        {},
        {
          headers: header,
        }
      );

      const cookie = response.data;
      //localStorage.setItem("resetCookie", cookie);
      localStorage.setCookie("resetCookie", cookie);
      console.log("Cookie set successfully");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const resetCompletion = async () => {
    try {
      const header = getHeader();
      const response = await axios
        .put(
          "http://localhost:3000/api/home/reset",
          {},
          {
            headers: header,
          }
        )
        .then((response) => {
          console.log("Completion resetted successfully");
        })
        .catch((error) => {
          console.error("Failed to reset completion", error);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const checkCookie = () => {
    const cookieExists = localStorage.getItem("resetCookie") !== null;

    if (cookieExists) {
      console.log("Cookie already exists");
    } else {
      resetCompletion();
      setCookie();
      console.log("New Cookie created");
    }
  };

  const checkCookieExpiration = () => {
    const cookieValue = localStorage.getItem("resetCookie");

    if (cookieValue) {
      const expirationDate = new Date(cookieValue);

      if (expirationDate < new Date()) {
        console.log("Cookie has expired");
      } else {
        console.log("Cookie is still valid");
      }
    } else {
      console.log("Cookie not found");
    }
  };

  // ON RENDER

  useEffect(() => {
    async function updateRoutines() {
      //console.log(allRoutines);

      try {
        checkCookie();
        checkCookieExpiration();
        const allRoutines = await getRoutines();
        setRoutines(allRoutines);
        console.log(routines);
        return routines;
      } catch (err) {
        console.log(err);
      }
    }
    updateRoutines();
  }, [deactivationStatus, completionStatus, editRequestStatus]);

  // ROUTINE FUNCTIONS

  const deactivateRoutine = async (id) => {
    try {
      const header = getHeader();
      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/deactivate`,
        {},
        {
          headers: header,
        }
      );
      setDeactivationStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const completeRoutine = async (id) => {
    console.log(id);
    try {
      const header = getHeader();

      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/complete`,
        {},
        {
          headers: header,
        }
      );

      setCompletionStatus((prevStatus) => !prevStatus);
      console.log(completionStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const editRequest = async (id) => {
    try {
      const header = getHeader();
      const response = await axios.put(
        `http://localhost:3000/api/home/${id}/editrequest`,
        {},
        {
          headers: header,
        }
      );
      setEditRequestStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const editRoutine = async (routineValue, timeValue, idValue) => {
    try {
      const header = getHeader();
      console.log("Sending request with id:", idValue);
      await axios.put(
        `http://localhost:3000/api/home/${idValue}/edit`,
        {
          time: timeValue,
          routine: routineValue,
        },
        {
          headers: header,
        }
      );
      editRequest(idValue);
    } catch (e) {
      console.error(e);
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
                    routine={data.name}
                    time={data.time}
                    id={data.routine_id}
                    deactivateRoutine={deactivateRoutine}
                    completeRoutine={completeRoutine}
                    complete={data.complete}
                    editRequest={editRequest}
                    editRequestStatusAPI={data.edit}
                    editRequestStatus={editRequestStatus}
                    editRoutine={editRoutine}
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

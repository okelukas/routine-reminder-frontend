import React, { useState, useEffect } from "react";
import axios from "axios";
import ListRoutines from "./ListRoutines.jsx";
import "../styles/App.css";
import { Link } from "react-router-dom";

export default function Routines() {
  const [routines, setRoutines] = useState();

  useEffect(() => {
    async function getRoutines() {
      try {
        const routines = await axios.get(`http://localhost:3000/api/home`);
        console.log(routines);
        setRoutines(routines.data);
        return routines.data;
      } catch (err) {
        console.log(err);
      }
    }
    getRoutines();
  }, []);

  console.log(routines);

  return (
    <>
      {" "}
      <div className="w-96 flex flex-col m-auto">
        <h1 className="text-2xl text-center p-5">Routines</h1>

        {routines &&
          routines.map((data) => {
            return (
              <div className=" bg-amber-200">
                <div className="grid grid-cols-4 pl-5 p-2 m-2 grid-flow-col ">
                  <ListRoutines
                    routine={data.routine}
                    time={data.time}
                    active={data.active}
                  />
                </div>
              </div>
            );
          })}

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

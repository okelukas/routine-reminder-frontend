import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import React, { useState, useEffect } from "react";
import Overview from "../components/Overview";
import { useRoutines } from "../contexts/RoutineContext.jsx";

export default function OverviewRoutines() {
  const { getRoutines } = useAuth();
  const [allRoutines, setAllRoutines] = useState();
  const [editToggle, setEditToggle] = useState([]);

  const { deactivationStatus } = useRoutines();

  const toggleSelection = (id) => {
    setEditToggle(id);
  };

  //console.log(editToggle);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await getRoutines();
        const allRoutines = data.sort((a, b) => a.time.localeCompare(b.time));
        setAllRoutines(allRoutines);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchDataAsync();
  }, [deactivationStatus]);

  return (
    <>
      <div className="mb-10">
        {allRoutines &&
          allRoutines.map((routine) => (
            <>
              <Overview
                routine={routine.name}
                daily={routine.daily}
                weekdays={routine.weekdays}
                time={routine.time}
                id={routine.routine_id}
                toggleSelection={toggleSelection}
                editToggle={editToggle}
              />
            </>
          ))}
      </div>
    </>
  );
}

import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import React, { useState, useEffect } from "react";
import Overview from "../components/Overview";

export default function OverviewRoutines() {
  const { getRoutines } = useAuth();
  const [allRoutines, setAllRoutines] = useState();

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
  }, []);

  return (
    <>
      {allRoutines &&
        allRoutines.map((routine) => (
          <>
            <Overview
              routine={routine.name}
              daily={routine.daily}
              weekdays={routine.weekdays}
              time={routine.time}
            />
          </>
        ))}
    </>
  );
}

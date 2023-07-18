/* import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function RoutineCards() {
  const { getRoutines } = useAuth();
  const [data, setData] = useState([]);
  const [sortedRoutines, setSortedRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const routinesData = await getRoutines();

      setData(routinesData);
    };

    fetchRoutines();
  }, [getRoutines]);

  useEffect(() => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const combinedData = [];

    const updateDaily = data.filter((routine) => routine.daily);

    const weekdaysWithRoutines = daysOfWeek.map((day) => {
      return {
        weekday: day,
        routines: [...updateDaily],
      };
    });

    const updateWeekly = data.filter((routine) => !routine.daily);

    for (let i = 0; i < updateWeekly.length; i++) {
      const { weekdays } = updateWeekly[i];
      for (let j = 0; j < weekdaysWithRoutines.length; j++) {
        const { weekday, routines } = weekdaysWithRoutines[j];
        if (weekdays.includes(weekday)) {
          routines.push(updateWeekly[i]);
        }
      }
    }
    //console.log(weekdaysWithRoutines);
    setSortedRoutines(weekdaysWithRoutines);
  }, [data]);

  console.log(sortedRoutines);

  return (
    <>
      <p>Hello</p>
    </>
  );
}
 */
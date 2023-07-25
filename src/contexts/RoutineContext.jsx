import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCookies from "../hooks/useCookies";

export const RoutineContext = createContext();

export const useRoutines = () => useContext(RoutineContext);

const RoutineState = ({ children }) => {
  const { token, getRoutines } = useAuth();
  const { checkCookie, checkCookieExpiration } = useCookies();
  const navigate = useNavigate();
  const [sortedRoutines, setSortedRoutines] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [deactivationStatus, setDeactivationStatus] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);

  const getHeader = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  async function fetchData() {
    const routinesData = await updateRoutines();
    createRoutinesArray(routinesData);
  }

  //PREPARE ARRAY FOR CARDS

  const getCurrentDay = () => {
    return new Date();
  };

  const createRoutinesArray = (routinesData) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const updateDaily = routinesData.filter((routine) => routine.daily);

    const weekdaysWithRoutines = daysOfWeek.map((day) => {
      return {
        weekday: day,
        routines: [...updateDaily],
      };
    });

    const updateWeekly = routinesData.filter((routine) => !routine.daily);

    for (let i = 0; i < updateWeekly.length; i++) {
      const { weekdays } = updateWeekly[i];
      for (let j = 0; j < weekdaysWithRoutines.length; j++) {
        const { weekday, routines } = weekdaysWithRoutines[j];
        if (weekdays.includes(weekday)) {
          routines.push(updateWeekly[i]);
        }
      }
    }

    const d = getCurrentDay();
    let currentDate = d.getDay();
    if (currentDate >= 1) {
      currentDate -= 1;
    } else {
      currentDate = 6;
    }
    console.log(weekdaysWithRoutines[currentDate]);

    //sort routines by time

    const prepRoutes = weekdaysWithRoutines[currentDate];
    const data = prepRoutes.routines;
    data.sort((a, b) => a.time.localeCompare(b.time));
    const newData = {
      routines: data,
      weekday: prepRoutes.weekday,
    };
    console.log(newData);

    setSortedRoutines(weekdaysWithRoutines[currentDate]);
  };

  //update array

  const updateRoutines = async () => {
    try {
      checkCookie();
      checkCookieExpiration();
      const allRoutines = await getRoutines();
      setRoutines(allRoutines);
      console.log(routines);

      return allRoutines;
    } catch (err) {
      console.log(err);
    }
  };

  const deactivateRoutine = async (id) => {
    try {
      const header = getHeader();
      const response = await axios.put(
        `${REACT_APP_API_URL}/api/home/${id}/deactivate`,
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

  const editRoutine = async (routineValue, timeValue, idValue) => {
    try {
      const header = getHeader();
      console.log("Sending request with id:", idValue);
      await axios.put(
        `${REACT_APP_API_URL}/api/home/${idValue}/edit`,
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

  const editEntireRoutine = async (
    routineValue,
    timeValue,
    dailyValue,
    weekdaysValue,
    idValue
  ) => {
    try {
      const header = getHeader();
      console.log("Sending request with id:", idValue);
      await axios.put(
        `${REACT_APP_API_URL}/api/home/${idValue}/editentire`,
        {
          time: timeValue,
          routine: routineValue,
          daily: dailyValue,
          weekdays: weekdaysValue,
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

  const completeRoutine = async (id) => {
    console.log(id);
    try {
      const header = getHeader();

      const response = await axios.put(
        `${REACT_APP_API_URL}/api/home/${id}/complete`,
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

  return (
    <RoutineContext.Provider
      value={{
        sortedRoutines,
        fetchData,
        createRoutinesArray,
        updateRoutines,
        getHeader,
        deactivateRoutine,
        deactivationStatus,
        editRoutine,
        completeRoutine,
        completionStatus,
        getRoutines,
        getCurrentDay,
        editEntireRoutine,
      }}
    >
      {" "}
      {children}
    </RoutineContext.Provider>
  );
};

export default RoutineState;

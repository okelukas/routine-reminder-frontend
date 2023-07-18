import { useContext } from "react";
import { RoutineContext } from "../contexts/RoutineContext";

const useRoutines = () => {
  return useContext(RoutineContext);
};

export default useRoutines;

import React, { useEffect, useState } from "react";
import "../styles/App.css";
import Routines from "../components/Routines";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { getRoutines } = useAuth();
  const [userData, setUserData] = useState(null);
  console.log(userData);
  useEffect(() => {
    getRoutines().then((data) => setUserData(data));
  }, []);
  return (
    <>
      <Routines allRoutines={userData} />
    </>
  );
}

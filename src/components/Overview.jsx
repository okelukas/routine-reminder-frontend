import useAuth from "../hooks/useAuth";
import "../styles/App.css";
import React, { useState, useEffect } from "react";

export default function Overview({ routine, daily, weekdays, time }) {
  const [weekdaysPrepared, setWeekdaysPrepared] = useState();
  const displayTime = time.slice(0, 5);

  const prepWeekdays = () => {
    const weekdaysWithoutBrackets = weekdays?.slice(1, -1) ?? "";

    // Split the string into an array of weekdays
    const weekdaysArray = weekdaysWithoutBrackets?.split(",");

    // Convert the full weekday names to their abbreviated forms
    const abbreviatedWeekdays = weekdaysArray?.map((weekday) => {
      const fullWeekday = weekday.replace(/"/g, ""); // Remove the quotes from each weekday
      return fullWeekday.slice(0, 3); // Extract the first 3 characters (abbreviated form)
    });

    // Join the abbreviated weekday names into a string with commas as separators
    const abbreviatedWeekdaysString = abbreviatedWeekdays.join(", ");

    console.log(abbreviatedWeekdaysString);

    setWeekdaysPrepared(abbreviatedWeekdaysString);
  };

  useEffect(() => {
    prepWeekdays();
  }, []);
  console.log(weekdays);

  return (
    <>
      <div
        className={
          "content-center rounded-xl py-5 grid-cols-12 grid-rows-2 grid m-2 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-90"
        }
      >
        <span className="col-span-10">
          {routine} at {displayTime}
        </span>
        <span className="col-span-10">
          {daily ? "daily" : `${weekdaysPrepared}`}
        </span>
      </div>
    </>
  );
}

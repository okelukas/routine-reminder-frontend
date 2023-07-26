import { Form, Button } from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRoutines } from "../contexts/RoutineContext";

export default function AddRoutine(props) {
  const routineRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [frequency, setFrequency] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const { editEntireRoutine } = useRoutines();
  const apiURL = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const { routineLink, timeLink, idLink, dailyLink, weekdaysLink } =
    location.state || {};
  const weekdaysArray = weekdaysLink?.replace(/"/g, "").slice(1, -1).split(",");

  const setWeeklyState = () => {
    if (dailyLink === "true") {
      setFrequency(true);
    } else {
      setFrequency(false);
    }
  };

  const setWeekdaysEdit = () => {
    if (dailyLink === "false") {
      setSelectedWeekdays(weekdaysArray);
    }
  };

  useEffect(() => {
    if (dailyLink) {
      setWeeklyState();
      setWeekdaysEdit();
    }
  }, []);

  const routineForm = async (
    routineValue,
    timeValue,
    frequency,
    selectedWeekdays
  ) => {
    try {
      const token = localStorage.getItem("token");
      //console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        `${apiURL}/api/home`,
        {
          name: routineValue,
          time: `${timeValue}:00`,
          daily: frequency,
          weekdays: selectedWeekdays,
        },
        {
          headers: headers,
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  const changeFrequency = (selectedFrequency) => {
    setFrequency(selectedFrequency);
    //console.log(frequency);
  };
  const handleDailyClick = (event) => {
    event.preventDefault();
    changeFrequency(true);
  };

  const handleWeeklyClick = (event) => {
    event.preventDefault();
    changeFrequency(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !dailyLink
      ? await routineForm(
          routineRef.current.value,
          timeRef.current.value,
          frequency,
          selectedWeekdays
        )
      : await editEntireRoutine(
          routineRef.current.value,
          timeRef.current.value,
          frequency,
          selectedWeekdays,
          idLink
        );
    navigate("/home");
  };

  // SELECT WEEKDAYS

  const toggleSelection = (weekday) => {
    setSelectedWeekdays((prevWeekdays) => {
      if (prevWeekdays.includes(weekday)) {
        // Weekday already selected
        return prevWeekdays.filter((day) => day !== weekday);
      } else {
        // Weekday not yet selected
        return [...prevWeekdays, weekday];
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-12 pb-8 w-5/6">
          <h1 className="text-xl text-left py-8 font-medium font-typewriter ">
            {routineLink ? "Edit routine" : "New routine"}
          </h1>
          <Form className="" onSubmit={handleSubmit} id="add-form">
            <Form.Field className="">
              <input
                className="rounded-md bg-white"
                required
                type="text"
                name="routine"
                placeholder="Routine"
                ref={routineRef}
                defaultValue={`${routineLink ? `${routineLink}` : ""}`}
                id="input"
              />
            </Form.Field>
            <Form.Field className="">
              <input
                className=" w-full bg-white min-h-"
                required
                type="time"
                name="time"
                placeholder="Time"
                ref={timeRef}
                timeFormat="HH:mm"
                defaultValue={`${timeLink ? `${timeLink}` : ""}`}
                id="input"
              />
            </Form.Field>
            <Form.Field className=" grid grid-cols-2 place-content-stretch">
              <Button
                className={"ui roboto addFrequencyBtn"}
                type="button"
                onClick={handleDailyClick}
                id={`${frequency ? "btnSelected" : "btnNotSelected"}`}
                active={!weekly}
              >
                Daily
              </Button>
              <Button
                className="ui roboto addFrequencyBtn"
                type="button"
                onClick={handleWeeklyClick}
                id={`${!frequency ? "btnSelected" : "btnNotSelected"}`}
                active={weekly}
              >
                Weekly
              </Button>
            </Form.Field>
            {frequency === false && (
              <Form.Field>
                <div className="flex flex-col place-items-center pt-5">
                  <div>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Monday")}
                      id={`${
                        selectedWeekdays.includes("Monday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Mon
                    </Button>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      onClick={() => toggleSelection("Tuesday")}
                      id={`${
                        selectedWeekdays.includes("Tuesday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Tue
                    </Button>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Wednesday")}
                      id={`${
                        selectedWeekdays.includes("Wednesday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Wed
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Thursday")}
                      id={`${
                        selectedWeekdays.includes("Thursday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Thu
                    </Button>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Friday")}
                      id={`${
                        selectedWeekdays.includes("Friday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Fri
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Saturday")}
                      id={`${
                        selectedWeekdays.includes("Saturday")
                          ? "special"
                          : "notSpecial"
                      }`}
                    >
                      Sat
                    </Button>
                    <Button
                      className={`ui roboto weekdayBtn `}
                      type="button"
                      onClick={() => toggleSelection("Sunday")}
                      id={`${
                        selectedWeekdays.includes("Sunday")
                          ? "special"
                          : "notSpecial"
                      }`}
                      /* active={`${
                        weekdaysArray.includes("Sunday") ? true : false
                      }`} */
                    >
                      Sun
                    </Button>
                  </div>
                </div>
              </Form.Field>
            )}
          </Form>
        </div>
        <div className=" mx-10  bg-teal-100 bg-opacity-50 flex flex-col items-center	w-60 pt-4 pb-3  addSubmitBox mb-20">
          <Button
            className=" 
          ui roboto hello submit"
            type="submit"
            form="add-form"
            id="formSubmitBtn"
          >
            {routineLink ? "Save routine" : "Add routine"}
          </Button>
        </div>
      </div>
    </>
  );
}

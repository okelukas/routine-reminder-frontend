import { Form, Button } from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoutine() {
  const routineRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [frequency, setFrequency] = useState(true);

  const routineForm = async (
    routineValue,
    timeValue,
    frequency,
    selectedWeekdays
  ) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        "http://localhost:3000/api/home",
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
    console.log(frequency);
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
    await routineForm(
      routineRef.current.value,
      timeRef.current.value,
      frequency,
      selectedWeekdays
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

  console.log(selectedWeekdays);

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-12 pb-8 w-5/6">
          <h1 className="text-xl text-left py-8 font-medium font-typewriter ">
            New routine
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
              />
            </Form.Field>
            <Form.Field className="">
              <input
                className=" w-full bg-white"
                required
                type="time"
                name="time"
                placeholder="Time"
                ref={timeRef}
                timeFormat="HH:mm"
              />
            </Form.Field>
            <Form.Field className=" grid grid-cols-2 place-content-stretch">
              <Button
                className={"ui roboto addFrequencyBtn"}
                type="button"
                onClick={handleDailyClick}
                id={`${frequency ? "btnFrequencyDaily" : ""}`}
              >
                Daily
              </Button>
              <Button
                className="ui roboto addFrequencyBtn"
                type="button"
                onClick={handleWeeklyClick}
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
            Add routine
          </Button>
        </div>
      </div>
    </>
  );
}

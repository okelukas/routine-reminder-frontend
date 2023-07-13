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
        // Weekday not selected
        return [...prevWeekdays, weekday];
      }
    });
  };
  /*  useEffect(() => {
    console.log(selectedWeekdays);
  }, [selectedWeekdays]); */

  return (
    <>
      <div className="w-96 flex flex-col items-center m-auto ">
        <h1 className="text-lg py-8 font-medium">Add a routine</h1>
        <Form className="bg-amber-200 p-10 " onSubmit={handleSubmit}>
          <Form.Field className="py-5">
            <input
              className="p-5 rounded-md"
              required
              type="text"
              name="routine"
              placeholder="Routine"
              ref={routineRef}
            />
          </Form.Field>
          <Form.Field className="max-w-max ">
            <input
              className="p-5 rounded-md"
              required
              type="time"
              name="time"
              placeholder="Time"
              ref={timeRef}
              timeFormat="HH:mm"
            />
          </Form.Field>
          <Form.Field className="py-5">
            <Button
              className=" my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
              type="button"
              onClick={handleDailyClick}
            >
              Daily
            </Button>
            <Button
              className=" my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
              type="button"
              onClick={handleWeeklyClick}
            >
              Weekly
            </Button>
          </Form.Field>
          {frequency === false && (
            <Form.Field>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Monday")}
              >
                Monday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Tuesday")}
              >
                Tuesday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Wednesday")}
              >
                Wednesday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Thursday")}
              >
                Thursday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Friday")}
              >
                Friday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Saturday")}
              >
                Saturday
              </Button>
              <Button
                className="my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={() => toggleSelection("Sunday")}
              >
                Sunday
              </Button>
            </Form.Field>
          )}
          <Button
            className="submit my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

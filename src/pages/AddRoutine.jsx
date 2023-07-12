import { Form, Button } from "semantic-ui-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoutine() {
  const routineRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();

  const [frequency, setFrequency] = useState("");

  const routineForm = async (routineValue, timeValue) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        "http://localhost:3000/api/home",
        {
          routine: routineValue,
          time: `${timeValue}:00`,
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
  };
  const handleDailyClick = (event) => {
    event.preventDefault();
    changeFrequency("daily");
  };

  const handleWeeklyClick = (event) => {
    event.preventDefault();
    changeFrequency("weekly");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await routineForm(routineRef.current.value, timeRef.current.value);
    navigate("/home");
  };

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

          <Button
            className="submit my-5 p-2 rounded-md border-2 border-gray-300 bg-gray-200 hover:bg-gray-300"
            type="submit"
          >
            submit
          </Button>
        </Form>
      </div>
    </>
  );
}

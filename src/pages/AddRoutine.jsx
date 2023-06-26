import { Form, Button } from "semantic-ui-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoutine() {
  const routineRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();

  const routineForm = async (routineValue, timeValue) => {
    try {
      await axios.post("http://localhost:3000/api/add", {
        routine: routineValue,
        time: `${timeValue}:00`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await routineForm(routineRef.current.value, timeRef.current.value);
    navigate("/home");
  };

  return (
    <>
      <div>
        <h2>Add a routine</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Field className="field">
            <input
              required
              type="text"
              name="routine"
              placeholder="Routine"
              ref={routineRef}
            />
          </Form.Field>
          <Form.Field className="field">
            <input
              required
              type="time"
              name="time"
              placeholder="Time"
              ref={timeRef}
            />
          </Form.Field>
          {/* <Link to="/home"> */}
          <Button className="submit" type="submit">
            submit
          </Button>
          {/* </Link> */}
        </Form>
      </div>
    </>
  );
}

import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Message } from "semantic-ui-react";

const Signup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { loading, error, signUpUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(
      emailRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value
    );
    navigate("/home");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-24">
        <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-12 pb-8 w-5/6">
          <h1 className="text-xl text-left py-8 font-medium font-typewriter ">
            Sign up
          </h1>
          <Form
            size="large"
            onSubmit={handleSubmit}
            /* loading={loading} */
            error={error && error.length !== 0}
            id="signUpForm"
            className="pb-2"
          >
            <Form.Field>
              <input
                required
                name="email"
                placeholder="Email"
                type="email"
                ref={emailRef}
                id="inputEmail"
              />
            </Form.Field>
            <Form.Field>
              <input
                required
                name="username"
                placeholder="Username"
                type="text"
                ref={usernameRef}
                id="inputUsername"
              />
            </Form.Field>
            <Form.Field>
              <input
                required
                name="password"
                placeholder="Password"
                type="password"
                ref={passwordRef}
                id="inputPassword"
              />
            </Form.Field>
            <Message error header={error} />{" "}
            <div className="flex justify-end">
              <span className="textGray200 text-base">
                Already have an account? <Link to="/login">Log In</Link>
              </span>
            </div>
          </Form>
        </div>
        <div className=" mx-10  bg-teal-100 bg-opacity-50 flex flex-col items-center	w-60 pt-4 pb-3  addSubmitBox mb-20">
          <Button
            className=" 
          ui roboto hello submit"
            type="submit"
            form="signUpForm"
            id="formSubmitBtn"
          >
            {" "}
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup;

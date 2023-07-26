import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { loading, error, logInUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    await logInUser(emailValue, passwordValue);
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-12 pb-8 w-5/6">
        <h1 className="text-xl text-left py-8 font-medium font-typewriter ">
          Log in
        </h1>
        <Form
          size="large"
          onSubmit={handleSubmit}
          /* loading={loading} */
          error={error && error.length !== 0}
          id="loginForm"
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
              name="password"
              placeholder="Password"
              type="password"
              ref={passwordRef}
              id="inputPassword"
            />
          </Form.Field>
          <Message error header={error} id="errorMessage" />{" "}
          <div className="flex justify-end">
            <span className="textGray200 ">
              New here? <Link to="/signup">Sign up </Link>
            </span>
          </div>
        </Form>
      </div>
      <div className=" mx-10  bg-teal-100 bg-opacity-50 flex flex-col items-center	w-60 pt-4 pb-3  addSubmitBox mb-20">
        <Button
          className=" 
          ui roboto hello submit"
          type="submit"
          form="loginForm"
          id="formSubmitBtn"
        >
          {" "}
          Log In
        </Button>
      </div>
    </div>
  );
}

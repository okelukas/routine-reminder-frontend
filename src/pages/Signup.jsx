import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
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

const Signup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const timezoneRef = useRef();
  const { loading, error, signUpUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(
      emailRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value,
      timezoneRef.current.value
    );
    navigate("/home");
  };

  return (
    <>
      {" "}
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image
              src="../src/assets/toothbrush.png"
              style={{ height: "30px", width: "30px" }}
            />{" "}
            Sign up
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Field>
                <input
                  required
                  name="email"
                  placeholder="E-mail address"
                  type="email"
                  ref={emailRef}
                />
              </Form.Field>
              <Form.Field>
                <input
                  required
                  name="username"
                  placeholder="Username"
                  type="text"
                  ref={usernameRef}
                />
              </Form.Field>
              <Form.Field>
                <input
                  required
                  name="password"
                  placeholder="Password"
                  type="password"
                  ref={passwordRef}
                />
              </Form.Field>
              <Form.Field>
                <input
                  required
                  name="timezone"
                  placeholder="Timezone"
                  type="text"
                  ref={timezoneRef}
                />
              </Form.Field>

              <Button color="teal" fluid size="large" type="submit">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Log in </Link>
            <br />
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Signup;

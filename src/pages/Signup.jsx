import React, { useRef } from "react";
import axios from "axios";
import "../styles/App.css";
import { Link } from "react-router-dom";
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

  const loginForm = async (
    emailValue,
    usernameValue,
    passwordValue,
    timezoneValue
  ) => {
    try {
      await axios.post("http://localhost:3000/signup", {
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        timezone: timezoneValue,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const timezoneValue = timezoneRef.current.value;
    await loginForm(emailValue, usernameValue, passwordValue, timezoneValue);
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
            Signup
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
            Already have an account? <Link to="#">Log in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Signup;

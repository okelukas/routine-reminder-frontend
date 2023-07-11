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
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image
            src="../src/assets/toothbrush.png"
            style={{ height: "30px", width: "30px" }}
          />{" "}
          Log in
        </Header>
        <Form
          size="large"
          onSubmit={handleSubmit}
          /* error={!!error}*/
          loading={loading}
          error={error && error.length !== 0}
        >
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
                name="password"
                placeholder="Password"
                type="password"
                ref={passwordRef}
              />
            </Form.Field>
            <Button color="teal" fluid size="large" type="submit">
              Log In
            </Button>
            <Message error header={error} />{" "}
          </Segment>{" "}
          <Message>
            New to us? <Link to="/signup">Sign up </Link>
            <br />
          </Message>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

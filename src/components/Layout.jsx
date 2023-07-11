import React from "react";
import { Container } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import "../styles/index.css";
import { useAuth } from "../contexts/AuthContext";

export default () => {
  const { isAuthenticated, logout } = useAuth();

  console.log(isAuthenticated);

  return (
    <>
      <Container className="py-10 ">
        <h2 className="ui header ">
          <img
            src="../src/assets/toothbrush.png"
            style={{ height: "30px", width: "30px" }}
          />
          <div className="content">routine reminder.</div>

          {isAuthenticated && <button className="ml-40" name="logout" onClick={logout}>
            <i class="sign out alternate icon" />{" "}
          </button>}
        </h2>
        <Outlet />
      </Container>
    </>
  );
};

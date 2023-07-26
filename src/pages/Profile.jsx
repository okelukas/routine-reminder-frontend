import React, { useEffect, useState, useRef } from "react";
import "../styles/App.css";
import useAuth from "../hooks/useAuth";
import { Icon } from "semantic-ui-react";
import { useRoutines } from "../contexts/RoutineContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { getProfile, logout } = useAuth();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [edit, setEdit] = useState("");
  const [editPasswordState, setEditPasswordState] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  const { getHeader } = useRoutines();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const loadProfile = async () => {
    try {
      const dataProfile = await getProfile();
      setEmail(dataProfile[0].email);
      setUsername(dataProfile[0].username);
    } catch (err) {
      console.log(err);
    }
  };

  const editProfile = async (emailValue, usernameValue) => {
    try {
      const header = getHeader();
      await axios.put(
        `${apiURL}/api/profile`,
        {
          email: emailValue,
          username: usernameValue,
        },
        {
          headers: header,
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const editPassword = async (passwordValue) => {
    try {
      const header = getHeader();
      await axios.put(
        `${apiURL}/api/profile/password`,
        {
          password: passwordValue,
        },
        {
          headers: header,
        }
      );
      setEditPasswordState(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [edit]);

  console.log(edit);

  const setEditState = (field) => {
    setEdit(field);
  };

  const handleEditRequest = () => {
    if (edit === "email") {
      editProfile(emailRef.current.value, username);
      /* setReload((prevReload) => !prevReload); */
      setEdit("");
    } else {
      editProfile(email, usernameRef.current.value);
      /* setReload((prevReload) => !prevReload); */
      setEdit("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="rounded-xl mx-5 bg-teal-100 bg-opacity-50 flex flex-col px-8 pb-8 w-5/6 ">
          <h1 className="text-2xl text-left py-8 font-normal font-sans">
            Profile
          </h1>
          <div className="content-center rounded-xl py-5 grid grid-cols-7 m-2 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-90">
            {edit === "email" ? (
              <>
                {" "}
                <input
                  className=" inputEdit col-span-6"
                  type="email"
                  name="email"
                  placeholder={"Email"}
                  ref={emailRef}
                  id="input"
                />
                <button onClick={() => handleEditRequest()}>
                  <Icon name="save" alt="save" className="col-span-1" />
                </button>
              </>
            ) : (
              <>
                {" "}
                <span className="col-span-6">{email}</span>
                <button onClick={() => setEditState("email")}>
                  <Icon name="edit" alt="edit" className="col-span-1" />
                </button>
              </>
            )}
          </div>
          <div className="content-center rounded-xl py-5 grid grid-cols-7 m-2 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-90">
            {edit === "username" ? (
              <>
                {" "}
                <input
                  className=" inputEdit col-span-6"
                  type="text"
                  name="username"
                  placeholder={"Username"}
                  ref={usernameRef}
                  id="input"
                />
                <button onClick={() => handleEditRequest()}>
                  <Icon name="save" alt="save" className="col-span-1" />
                </button>
              </>
            ) : (
              <>
                <span className="col-span-6">{username}</span>
                <button onClick={() => setEditState("username")}>
                  <Icon name="edit" alt="edit" className="col-span-1" />
                </button>
              </>
            )}
          </div>

          <div className="content-center rounded-xl py-5 grid grid-cols-7 m-2 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-90">
            <>
              {editPasswordState ? (
                <>
                  {" "}
                  <input
                    className=" inputEdit col-span-6 "
                    type="password"
                    name="username"
                    placeholder={"New password"}
                    ref={passwordRef}
                  />
                  <button
                    onClick={() => editPassword(passwordRef.current.value)}
                  >
                    <Icon name="save" alt="save" className="col-span-1" />
                  </button>
                </>
              ) : (
                <>
                  <span className="col-span-6">Password</span>
                  <button onClick={() => setEditPasswordState(true)}>
                    <Icon name="edit" alt="edit" className="col-span-1" />
                  </button>
                </>
              )}
            </>
          </div>
          <button onClick={() => logout()}>
            <div className="content-center rounded-xl py-5 grid grid-cols-7 m-2 px-5 text-lg backdrop-blur-xl bg-teal-100 opacity-90 mt-10">
              <>
                <span>Logout</span>
              </>
            </div>
          </button>
        </div>
        <Link to="/about">
          <div className="content-center rounded-xl py-5 mb-10 m-2 px-5 text-gray-200 text-lg backdrop-blur-xl bg-teal-100 opacity-90 mt-10">
            <>
              <span>About routine reminder</span>
            </>
          </div>
        </Link>
      </div>
    </>
  );
}

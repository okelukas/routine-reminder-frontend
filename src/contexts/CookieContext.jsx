import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CookieContext = createContext();
const apiURL = import.meta.env.VITE_API_URL;
export const useCookies = () => useContext(CookieContext);

const CookieState = ({ children }) => {
  const getHeader = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  const setCookie = async () => {
    try {
      const header = getHeader();
      const response = await axios.put(
        `${apiURL}/api/home/setCookie`,
        {},
        {
          headers: header,
        }
      );

      const cookie = response.data;
      //localStorage.setItem("resetCookie", cookie);
      localStorage.setItem("resetCookie", cookie);
      //console.log("Cookie set successfully");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const resetCompletion = async () => {
    try {
      const header = getHeader();
      const response = await axios
        .put(
          `${apiURL}/api/home/reset`,
          {},
          {
            headers: header,
          }
        )
        .then((response) => {
          //console.log("Completion resetted successfully");
        })
        .catch((error) => {
          console.error("Failed to reset completion", error);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const checkCookie = () => {
    const cookieExists = localStorage.getItem("resetCookie") !== null;

    if (cookieExists) {
      //console.log("Cookie already exists");
    } else {
      resetCompletion();
      setCookie();
      //console.log("New Cookie created");
    }
  };

  const checkCookieExpiration = () => {
    const cookieValue = localStorage.getItem("resetCookie");

    if (cookieValue) {
      const expirationDate = new Date(cookieValue);

      if (expirationDate < new Date()) {
        console.log("Cookie has expired");
      } else {
        console.log("Cookie is still valid");
      }
    } else {
      console.log("Cookie not found");
    }
  };

  return (
    <CookieContext.Provider
      value={{ setCookie, checkCookieExpiration, checkCookie }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export default CookieState;

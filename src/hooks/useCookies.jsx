import { useContext } from "react";
import { CookieContext } from "../contexts/CookieContext";

const useCookies = () => {
  return useContext(CookieContext);
};

export default useCookies;

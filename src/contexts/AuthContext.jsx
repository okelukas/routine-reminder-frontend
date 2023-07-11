import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const getUser = async () => {
        try {
          setLoading(true);
          const data = await getRoutines();
          setLoginUser(data);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (error) {
          setToken(null);
          localStorage.removeItem("token");
          setLoading(false);
        }
      };

      token && getUser();
    }
  }, [token, isAuthenticated]);

  const logInUser = async (email, password) => {
    try {
      setLoading(true);
      const { data: token } = await axios.post(
        "http://localhost:3000/jwt/login",
        {
          email: email,
          password: password,
        }
      );
      setError(null);
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
    setLoading(false);
  };

  const signUpUser = async (email, username, password, timezone) => {
    try {
      setLoading(true);

      const { data: token } = await axios.post(
        "http://localhost:3000/jwt/signup",
        {
          email: email,
          username: username,
          password: password,
          timezone: timezone,
        }
      );
      setError(null);
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
    setLoading(false);
  };

  const logout = () => {
    console.log("log out");
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const getRoutines = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        error,
        loading,
        isAuthenticated,
        getRoutines,
        logout,
        logInUser,
        signUpUser,
   
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
import "./styles/App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AddRoutine from "./pages/AddRoutine";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { Link, Routes, Route } from "react-router-dom";

import AuthState from "./contexts/AuthContext.jsx";
import RoutineState from "./contexts/RoutineContext.jsx";
import CookieState from "./contexts/CookieContext.jsx";

import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import OverviewRoutines from "./pages/OverviewRoutines";

function App() {
  return (
    <>
      <AuthState>
        <CookieState>
          <RoutineState>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/add" element={<AddRoutine />} />
                  <Route path="/routines" element={<OverviewRoutines />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                </Route>
              </Route>
            </Routes>
          </RoutineState>
        </CookieState>
      </AuthState>
    </>
  );
}

export default App;

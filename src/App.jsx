import "./styles/App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AddRoutine from "./pages/AddRoutine";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Link, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import AuthState from "./contexts/AuthContext";
import { Container } from "semantic-ui-react";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthState>
        <Container>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/add" element={<AddRoutine />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </AuthState>
    </>
  );
}

export default App;

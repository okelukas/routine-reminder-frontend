import "./styles/App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AddRoutine from "./pages/AddRoutine";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Link, Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddRoutine />} />
      </Routes>
    </>
  );
}

export default App;

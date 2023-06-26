import "./styles/App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AddRoutine from "./pages/AddRoutine";
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddRoutine />} />
      </Routes>
    </>
  );
}

export default App;

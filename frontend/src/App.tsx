import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
}

export default App;

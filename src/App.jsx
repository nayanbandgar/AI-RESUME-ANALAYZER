import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import ProfilePage from "./components/profilepage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profilepage" element={<ProfilePage/>} />
    </Routes>
  );
}

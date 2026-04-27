import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Sidebar from "./components/sidebar.jsx";
import ProfilePage from "./components/profilepage.jsx";
import Layout from "./components/layout.jsx";
import Dashboard from "./components/dashboard.jsx";
import Analyze from "./components/analyze.jsx";
import Results from "./components/result.jsx";
import UploadResume from "./components/uploadresume.jsx";
import Candidate from "./components/candidate.jsx";
import Settings from "./components/setting.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profilepage" element={<ProfilePage/>} />
      <Route path="/sidebar" element={<Sidebar />} />
        <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/results" element={<Results />} />
        <Route path="/candidates" element={<Candidate/>} />
        <Route path="/profile" element={<ProfilePage/> } />
        <Route path="/settings" element={<Settings/>} />
        </Route>
    </Routes>
  );
}

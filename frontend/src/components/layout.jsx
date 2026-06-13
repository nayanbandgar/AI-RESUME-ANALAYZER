// import Sidebar from "./Sidebar";
import Header from "./header.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" h-screen bg-linear-to-b from-black via-red-900 to-black">
     
      <Header/>
      <main className="h-screen bg-linear-to-b from-black  via-red-900 to-black p-6">
         
        <Outlet />
      </main>
    </div>
  );
}
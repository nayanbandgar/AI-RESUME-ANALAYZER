// import Sidebar from "./Sidebar";
import Header from "./header.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" h-screen bg-linear-to-b from-red-950 to-black">
     {/* <Sidebar />
      */}
      <Header/>
      <main className=" bg-linear-to-b from-red-950 to-black p-6">
         
        <Outlet />
      </main>
    </div>
  );
}
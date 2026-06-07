import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-linear-to-b from-red-950 to-black">
     <Sidebar />
      <main className="flex-1 overflow-y-auto bg-linear-to-b from-red-950 to-black p-6">
         
        <Outlet />
      </main>
    </div>
  );
}
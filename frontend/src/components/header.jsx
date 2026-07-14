import { useNavigate } from "react-router-dom";
import { useState } from "react";


const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "upload",
    label: "Upload Resume",
    path: "/upload",
  },
  {
    id: "analyze",
    label: "Analyze",
    path: "/analyze",
  },
  {
    id: "candidates",
    label: "Candidates",
    path: "/candidates",
  },
 
];


export default function Header() {
const [showMenu, setShowMenu] = useState(false);


  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="w-full  bg-linear-to-r from-red-900 via-black to-red-900 shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-10 h-10 rounded-full bg-white text-red-950 font-bold flex items-center justify-center">
            HR
          </div>

          <div>
            <h1 className="text-white font-bold text-lg">
              AI Resume Analyzer
            </h1>

            <p className="text-gray-300 text-xs">
              HR Management System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="text-white hover:text-red-300 transition font-medium"
            >
              {item.label}
            </button>
          ))}

        </nav>

        {/* User */}

        <button
    onClick={() => setShowMenu(!showMenu)}
    className="flex items-center gap-3"
  >

    <div className="text-right">
      <p className="text-white font-medium">
        Khushi Arzare
      </p>

      <p className="text-xs text-gray-300">
        HR Manager
      </p>
    </div>

    <div className="w-10 h-10 rounded-full bg-white text-red-950 flex items-center justify-center font-bold">
      KH
    </div>

  </button>

  {showMenu && (

    <div className="absolute right-0 mt-100 w-56 bg-red-100 rounded-xl shadow-lg border z-50">

      <div className="p-4 border-b">
        <h3 className="font-semibold">
          Khushi Arzare
        </h3>

        <p className="text-sm text-gray-500">
          HR Manager
        </p>
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        👤 My Profile
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        ⚙️ Settings
      </button>

      

     

     
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
      >
        🚪 Logout
      </button>
      </div>


 

  

  )}

</div>
     

    </header>
  );
}
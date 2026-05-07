import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#dae2f8] to-[#d6a4a4] flex items-center justify-center px-4">
      <div className="bg-gray-100 border border-white border-bold rounded-2xl p-10 w-full max-w-md text-center">

        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 font-medium text-lg flex items-center justify-center mx-auto mb-4">
          HR
        </div>

        {/* Title */}
        <h1 className="text-2xl font-medium text-gray-900 mb-2">AI Resume Analyzer</h1>
        <p className="text-sm text-gray-500 mb-8">
          Analyze resumes smartly. Find the best candidates faster.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg  border border-gray-200 hover:bg-gray-600 transition-colors hover:scale-105 duration-200  cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-600 transition-colors hover:scale-105 duration-200  cursor-pointer" 
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-r from-red-950  to-black flex items-center justify-center px-4">
      <div className="bg-black-100  border-white border-4 rounded-2xl p-10 w-full max-w-md text-center">

        {/* Logo */}
        <div className="w-16 h-16 rounded-full bg-white border-red-900 border-2 text-red-950 font-medium text-lg flex items-center justify-center mx-auto mb-4">
          HR
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium text-white mb-2">AI Resume Analyzer</h1>
        <p className="text-sm text-gray-400 mb-8">
          Analyze resumes smartly. Find the best candidates faster.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 bg-white text-gray-900 text-l font-medium rounded-lg  border border-gray-200 hover:border-white hover:bg-red-950 hover:text-white transition-colors hover:scale-105 duration-200  cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2.5 bg-white text-gray-900 text-l font-medium rounded-lg border border-gray-200 hover:border-white  hover:bg-red-950  hover:text-white  transition-colors hover:scale-105 duration-200  cursor-pointer"
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}
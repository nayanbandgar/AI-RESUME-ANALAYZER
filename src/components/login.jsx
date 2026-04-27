import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Add your auth logic here
    console.log("Login:", form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#dae2f8] to-[#d6a4a4] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 font-medium text-sm flex items-center justify-center mx-auto mb-3">
            AR
          </div>
          <h2 className="text-xl font-medium text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1.5">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1.5">⚠ {errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm text-gray-500">Password</label>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              errors.password ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1.5">⚠ {errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>

      </div>
    </div>
  );
}
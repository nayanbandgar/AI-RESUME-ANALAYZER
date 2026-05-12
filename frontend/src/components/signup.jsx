import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", otp: "", password: "" });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!otpSent) {
      newErrors.otp = "Please send OTP to your email first.";
    } else if (!form.otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (form.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits.";
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
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSendOtp = () => {
    if (!form.email.trim()) {
      setErrors({ ...errors, email: "Please enter your email before sending OTP." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address." });
      return;
    }
    // Add your OTP API call here
    setOtpSent(true);
    setErrors({ ...errors, email: "" });
    alert(`OTP sent to ${form.email}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Add your signup API call here
    console.log("Signup:", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#dae2f8] to-[#d6a4a4] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 font-medium text-sm flex items-center justify-center mx-auto mb-3">
            AR
          </div>
          <h2 className="text-xl font-medium text-gray-900">Create an account</h2>
          <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1.5">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              errors.name ? "border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.name}</p>}
        </div>

        {/* Email + OTP Button */}
        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1.5">Email address</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={`flex-1 px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-300"
              }`}
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {otpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.email}</p>}
          {otpSent && !errors.email && (
            <p className="text-xs text-green-600 mt-1.5">✓ OTP sent! Check your inbox.</p>
          )}
        </div>

        {/* OTP */}
        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1.5">Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="••••••"
            maxLength={6}
            value={form.otp}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 tracking-widest text-center ${
              errors.otp ? "border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          />
          {errors.otp && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.otp}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-500 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              errors.password ? "border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Create account
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
        </p>

      </div>
    </div>
  );
}
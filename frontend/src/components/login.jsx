import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/login",
      {
        email: form.email,
        password: form.password
      }
    );

    console.log(response.data);

    if (response.data.success) {

      setAlertMessage("Login Successful");

      setShowAlert(true);

      setTimeout(() => {

        setShowAlert(false);

        navigate("/sidebar");

      }, 2000);

    } else {

      setAlertMessage(response.data.message);

      setShowAlert(true);

      setTimeout(() => {

        setShowAlert(false);

      }, 2000);
    }

  } catch (error) {

    console.log(error);
  }
  };
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
    <div className="min-h-screen   bg-linear-to-b from-blue-100 via-blue-900   to-blue-950  flex items-center justify-center px-4">
      <div className="bg-black-100 border border-gray-200 rounded-2xl p-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8 ">
          <div className="w-16 h-16 rounded-full bg-white border-red-900 border-2 text-red-950 font-medium text-lg flex items-center justify-center mx-auto mb-3">
            HR
          </div>
          <h2 className="text-2xl font-medium text-white">Welcome back</h2>
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
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className={`w-full px-3 py-2.5 border text-white placeholder:text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-blue-300"
              }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1.5">⚠ {errors.email}</p>
          )}
        </div>
        {
          showAlert && (

            <div
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                background: "#4CAF50",
                color: "white",
                padding: "14px 24px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                zIndex: "1000",
                fontWeight: "600"
              }}
            >

              {alertMessage}

            </div>

          )
        }

        {/* Password */}
        <div className="mb-6 ">

          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm text-gray-500">Password   {/* Eye Icon */}


            </label>
            <a href="/forgot-password" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"   // ✅ fixed: removed extra space
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })

              }

              className={`w-full px-3 py-2.5 border rounded-lg text-sm  text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.password
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-blue-300"
                }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-3 top-3 text-gray-100 hover:text-gray-100 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>



          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1.5">⚠ {errors.password}</p>
          )}


        </div>


        {/* Submit */}
        <button
          type="button"
          onClick={loginUser}
          className="w-full py-2.5  bg-white text-gray-900 text-l font-medium rounded-lg  hover:bg-red-950 border-gray-200 hover:border-white hover:border-2 hover:text-white transition-colors cursor-pointer"
        >
          Log in
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>

      </div>
    </div >
  );
}